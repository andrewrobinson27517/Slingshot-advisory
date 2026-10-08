import { NextResponse } from 'next/server';
import { verifyStripeSignature } from '@/lib/stripe';
import { readOrder, saveOrder } from '@/lib/orders';
import { sendEmail, esc } from '@/lib/email';
import { site } from '@/data/site';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const raw = await req.text();
  const event = verifyStripeSignature(raw, req.headers.get('stripe-signature'));
  if (!event) {
    // Missing/invalid signature or no webhook secret configured.
    return NextResponse.json({ received: false }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = (event.data as { object?: Record<string, unknown> })?.object ?? {};
    const meta = (session.metadata as Record<string, string>) ?? {};
    const paid = session.payment_status === 'paid';
    const orderId = meta.orderId;

    if (orderId && paid) {
      const existing = await readOrder(orderId);
      const email = existing?.email ?? (session.customer_email as string) ?? '';
      const name = existing?.contactName ?? '';

      if (existing) {
        await saveOrder({
          ...existing,
          status: 'paid',
          paymentStatus: 'paid',
          updatedAt: new Date().toISOString(),
        });
      }

      // Onboarding: confirm to the customer, notify the owner.
      if (email) {
        await sendEmail({
          to: email,
          subject: 'Payment received — let’s build your website',
          html: `<p>Hi ${esc(name.split(' ')[0] || 'there')},</p>
            <p>Thanks — your payment is confirmed and your project is officially started.
            Here’s what happens next:</p>
            <ol>
              <li><strong>Book your strategy call</strong> — a 30–60 minute discovery call to plan your site.</li>
              <li><strong>Send your materials</strong> — logo, photos, copy, and any brand assets.</li>
              <li><strong>We build</strong> — you’ll get a link to review before launch.</li>
            </ol>
            <p>Schedule your call here: <a href="${site.url}/get-started/schedule?order=${esc(orderId)}">${site.url}/get-started/schedule</a></p>
            <p>— Slingshot Advisory<br>${esc(site.contact.email)}</p>`,
        });
      }
      const notify = process.env.LEAD_NOTIFY_EMAIL;
      if (notify) {
        await sendEmail({
          to: notify,
          subject: `PAID — order ${orderId}${existing ? ` (${existing.businessName})` : ''}`,
          html: `<p>Order ${esc(orderId)} is paid. Status moved to <strong>Paid → awaiting discovery</strong>.</p>`,
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
