import { NextResponse } from 'next/server';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { intakeSchema } from '@/lib/validation';
import { rateLimit } from '@/lib/ratelimit';
import { getIntakeConfig, fieldLabel } from '@/data/intake';
import { site } from '@/data/site';

export const runtime = 'nodejs';

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0]!.trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

type Lead = {
  id: string;
  receivedAt: string;
  source: string;
  service: string;
  serviceLabel: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  details: { label: string; value: string }[];
  status: 'New';
  flags: string[];
};

async function sendEmail(payload: { to: string; subject: string; html: string }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!key || !from) return false;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from, to: payload.to, subject: payload.subject, html: payload.html }),
  });
  return res.ok;
}

async function postWebhook(lead: Lead) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(lead),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function devLog(lead: Lead) {
  if (process.env.NODE_ENV === 'production') return false;
  try {
    const dir = path.join(process.cwd(), '.leads');
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(path.join(dir, 'leads.jsonl'), JSON.stringify(lead) + '\n', 'utf8');
    return true;
  } catch {
    return false;
  }
}

function esc(s: string) {
  return s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c]!);
}

export async function POST(req: Request) {
  // Rate limit
  const ip = clientIp(req);
  const limit = rateLimit(`intake:${ip}`, 5, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: 'Too many requests.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(limit.retryAfterMs / 1000)) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  // Validate
  const parsed = intakeSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 });
  }
  const input = parsed.data;

  // Honeypot — silently accept & drop (don't signal bots).
  if (input.company_website && input.company_website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Per-service required-field enforcement (server side).
  const cfg = getIntakeConfig(input.service);
  if (!cfg) {
    return NextResponse.json({ ok: false, message: 'Unknown service.' }, { status: 400 });
  }
  const fieldErrors: Record<string, string> = {};
  for (const f of cfg.fields) {
    if (f.required && !(input.details[f.id] ?? '').trim()) {
      fieldErrors[f.id] = 'This field is required.';
    }
  }
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 });
  }

  // Build the normalized lead.
  const flags: string[] = [];
  if (typeof input.elapsedMs === 'number' && input.elapsedMs < 1000) flags.push('fast-submit');
  const detailRows = Object.entries(input.details)
    .filter(([, v]) => (v ?? '').trim().length > 0)
    .map(([id, value]) => ({ label: fieldLabel(input.service, id), value: value.trim() }));

  const lead: Lead = {
    id: `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    receivedAt: new Date().toISOString(),
    source: 'website-intake',
    service: input.service,
    serviceLabel: cfg.label,
    name: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company,
    details: detailRows,
    status: 'New',
    flags,
  };

  // Compose emails.
  const detailsHtml = [
    lead.phone && `<p><strong>Phone:</strong> ${esc(lead.phone)}</p>`,
    lead.company && `<p><strong>Business:</strong> ${esc(lead.company)}</p>`,
    ...lead.details.map((d) => `<p><strong>${esc(d.label)}:</strong> ${esc(d.value)}</p>`),
  ]
    .filter(Boolean)
    .join('');

  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL;
  const ownerHtml = `
    <h2>New lead — ${esc(lead.serviceLabel)}</h2>
    <p><strong>Name:</strong> ${esc(lead.name)}</p>
    <p><strong>Email:</strong> ${esc(lead.email)}</p>
    ${detailsHtml}
    ${lead.flags.length ? `<p><em>Flags: ${lead.flags.join(', ')}</em></p>` : ''}
    <p style="color:#667892">Received ${lead.receivedAt} · ${esc(ip)}</p>`;

  const clientHtml = `
    <p>Hi ${esc(lead.name.split(' ')[0] || 'there')},</p>
    <p>Thanks for reaching out to Slingshot Advisory about <strong>${esc(lead.serviceLabel)}</strong>.
    We’ve received your request and will review the details and follow up with next steps —
    typically within one business day.</p>
    <p>If anything changes in the meantime, just reply to this email.</p>
    <p>— Slingshot Advisory<br>${esc(site.contact.email)}</p>`;

  // Process through whichever channels are configured.
  const results = await Promise.allSettled([
    notifyEmail
      ? sendEmail({ to: notifyEmail, subject: `New lead — ${lead.serviceLabel}: ${lead.name}`, html: ownerHtml })
      : Promise.resolve(false),
    sendEmail({ to: lead.email, subject: 'We received your request — Slingshot Advisory', html: clientHtml }),
    postWebhook(lead),
  ]);
  const emailed = results.some((r) => r.status === 'fulfilled' && r.value === true);
  const logged = await devLog(lead);

  if (emailed || logged) {
    return NextResponse.json({ ok: true });
  }

  // Nothing is configured to persist the lead — be honest, don't fake success.
  return NextResponse.json(
    {
      ok: false,
      code: 'not_configured',
      message:
        'Online submission is not yet connected. Please email us directly and we’ll follow up.',
    },
    { status: 200 },
  );
}
