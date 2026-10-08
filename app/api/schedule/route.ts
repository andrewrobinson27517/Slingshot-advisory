import { NextResponse } from 'next/server';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { scheduleSchema } from '@/lib/validation';
import { rateLimit } from '@/lib/ratelimit';
import { sendEmail, esc } from '@/lib/email';
import { site } from '@/data/site';

export const runtime = 'nodejs';

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  return fwd ? fwd.split(',')[0]!.trim() : req.headers.get('x-real-ip') ?? 'unknown';
}

async function devLog(record: object) {
  if (process.env.NODE_ENV === 'production') return false;
  try {
    const dir = path.join(process.cwd(), '.leads');
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(path.join(dir, 'schedule.jsonl'), JSON.stringify(record) + '\n', 'utf8');
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!rateLimit(`schedule:${clientIp(req)}`, 5, 60_000).ok) {
    return NextResponse.json({ ok: false, message: 'Too many requests.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  const parsed = scheduleSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) {
      const k = String(i.path[0] ?? 'form');
      if (!fieldErrors[k]) fieldErrors[k] = i.message;
    }
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 });
  }
  const input = parsed.data;
  if (input.company_website) return NextResponse.json({ ok: true });

  const record = { ...input, receivedAt: new Date().toISOString(), source: 'strategy-call' };
  const logged = await devLog(record);

  const notify = process.env.LEAD_NOTIFY_EMAIL;
  let emailed = false;
  if (notify) {
    emailed = await sendEmail({
      to: notify,
      subject: `Strategy call request — ${input.name}${input.orderId ? ` (order ${input.orderId})` : ''}`,
      html: `<h2>Strategy call request</h2>
        <p><strong>Name:</strong> ${esc(input.name)}</p>
        <p><strong>Email:</strong> ${esc(input.email)} ${input.phone ? '· ' + esc(input.phone) : ''}</p>
        ${input.orderId ? `<p><strong>Order:</strong> ${esc(input.orderId)}</p>` : ''}
        <p><strong>Preferred times:</strong><br>${esc(input.preferredTimes).replace(/\n/g, '<br>')}</p>
        ${input.notes ? `<p><strong>Notes:</strong> ${esc(input.notes)}</p>` : ''}`,
    });
    // Acknowledge to the requester (pending confirmation — no live calendar).
    await sendEmail({
      to: input.email,
      subject: 'We received your call request — Slingshot Advisory',
      html: `<p>Hi ${esc(input.name.split(' ')[0] || 'there')},</p>
        <p>Thanks — we’ve received your preferred times for a strategy call. We’ll confirm a
        specific time by email shortly. Consider this request <strong>pending confirmation</strong>
        until you hear back.</p>
        <p>— Slingshot Advisory<br>${esc(site.contact.email)}</p>`,
    });
  }

  if (emailed || logged) return NextResponse.json({ ok: true });

  return NextResponse.json({
    ok: false,
    code: 'not_configured',
    message: 'Scheduling isn’t connected yet. Please email your preferred times and we’ll confirm.',
  });
}
