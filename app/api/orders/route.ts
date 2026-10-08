import { NextResponse } from 'next/server';
import { orderSchema } from '@/lib/validation';
import { rateLimit } from '@/lib/ratelimit';
import { getPackage } from '@/data/packages';
import { saveOrder, newOrderId, type Order } from '@/lib/orders';
import { createCheckoutSession, stripeConfigured } from '@/lib/stripe';
import { sendEmail, esc } from '@/lib/email';
import { site } from '@/data/site';

export const runtime = 'nodejs';

function origin(req: Request): string {
  const proto = req.headers.get('x-forwarded-proto') ?? 'https';
  const host = req.headers.get('host');
  return host ? `${proto}://${host}` : site.url.replace(/\/$/, '');
}

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  return fwd ? fwd.split(',')[0]!.trim() : req.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(req: Request) {
  const limit = rateLimit(`orders:${clientIp(req)}`, 5, 60_000);
  if (!limit.ok) {
    return NextResponse.json({ ok: false, message: 'Too many requests.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) {
      const k = String(i.path[0] ?? 'form');
      if (!fieldErrors[k]) fieldErrors[k] = i.message;
    }
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 });
  }
  const input = parsed.data;

  // Honeypot — silently accept & drop.
  if (input.company_website) return NextResponse.json({ ok: true, code: 'ok' });

  const pkg = getPackage(input.packageId);
  if (!pkg) {
    return NextResponse.json({ ok: false, message: 'Unknown package.' }, { status: 400 });
  }

  const now = new Date().toISOString();
  const order: Order = {
    id: newOrderId(),
    createdAt: now,
    updatedAt: now,
    packageId: pkg.id,
    packageName: pkg.name,
    totalCents: pkg.totalCents,
    chargeNowCents: pkg.chargeNowCents,
    businessName: input.businessName,
    contactName: input.contactName,
    email: input.email,
    phone: input.phone,
    existingWebsite: input.existingWebsite,
    category: input.category,
    functionality: input.functionality,
    goal: input.goal,
    status: 'pending_payment',
    paymentStatus: 'unpaid',
    source: 'website-checkout',
  };

  await saveOrder(order);

  // Notify the owner of the new order request (even before payment).
  const notify = process.env.LEAD_NOTIFY_EMAIL;
  if (notify) {
    await sendEmail({
      to: notify,
      subject: `New website order (${pkg.name}) — ${order.businessName}`,
      html: `<h2>New order request — ${esc(pkg.name)}</h2>
        <p><strong>Business:</strong> ${esc(order.businessName)}</p>
        <p><strong>Contact:</strong> ${esc(order.contactName)} · ${esc(order.email)} ${order.phone ? '· ' + esc(order.phone) : ''}</p>
        ${order.existingWebsite ? `<p><strong>Existing site:</strong> ${esc(order.existingWebsite)}</p>` : ''}
        ${order.category ? `<p><strong>Category:</strong> ${esc(order.category)}</p>` : ''}
        ${order.functionality ? `<p><strong>Functionality:</strong> ${esc(order.functionality)}</p>` : ''}
        ${order.goal ? `<p><strong>Main goal:</strong> ${esc(order.goal)}</p>` : ''}
        <p><strong>Order:</strong> ${order.id} · charge now ${(order.chargeNowCents / 100).toFixed(0)} USD · payment ${order.paymentStatus}</p>`,
    });
  }

  // Create a Stripe Checkout session when payments are configured.
  if (stripeConfigured()) {
    try {
      const base = origin(req);
      const session = await createCheckoutSession({
        amountCents: pkg.chargeNowCents,
        productName: `${pkg.name} — Slingshot Advisory`,
        description:
          pkg.id === 'business-plus'
            ? 'Deposit credited toward the $750 total ($250 balance at final milestone).'
            : 'Website project fee.',
        customerEmail: order.email,
        successUrl: `${base}/get-started/success?order=${order.id}`,
        cancelUrl: `${base}/get-started?package=${pkg.id}&canceled=1`,
        metadata: { orderId: order.id, packageId: pkg.id },
      });
      if (session) return NextResponse.json({ ok: true, url: session.url });
    } catch {
      return NextResponse.json(
        { ok: false, message: 'We couldn’t start checkout. Please try again or contact us.' },
        { status: 502 },
      );
    }
  }

  // Payments not configured — be honest; the request is saved and the owner is
  // notified, and the client routes the customer to book a strategy call.
  return NextResponse.json({ ok: true, code: 'payment_not_configured', orderId: order.id });
}
