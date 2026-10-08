import crypto from 'node:crypto';

/**
 * Minimal Stripe integration without the SDK dependency:
 *  - `createCheckoutSession` calls the REST API (only when a key is configured).
 *  - `verifyStripeSignature` validates the webhook signature exactly like Stripe’s
 *    library (HMAC-SHA256 over `${timestamp}.${payload}`, constant-time compare,
 *    timestamp tolerance). Never trust a webhook body without this.
 */

export function stripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export async function createCheckoutSession(params: {
  amountCents: number;
  productName: string;
  description: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
  metadata: Record<string, string>;
}): Promise<{ url: string } | null> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;

  const form = new URLSearchParams();
  form.set('mode', 'payment');
  form.set('success_url', params.successUrl);
  form.set('cancel_url', params.cancelUrl);
  form.set('customer_email', params.customerEmail);
  form.set('line_items[0][quantity]', '1');
  form.set('line_items[0][price_data][currency]', 'usd');
  form.set('line_items[0][price_data][unit_amount]', String(params.amountCents));
  form.set('line_items[0][price_data][product_data][name]', params.productName);
  form.set('line_items[0][price_data][product_data][description]', params.description);
  for (const [k, v] of Object.entries(params.metadata)) {
    form.set(`metadata[${k}]`, v);
    form.set(`payment_intent_data[metadata][${k}]`, v);
  }

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: form.toString(),
  });
  if (!res.ok) {
    throw new Error(`Stripe session creation failed: ${res.status}`);
  }
  const data = (await res.json()) as { url?: string };
  if (!data.url) throw new Error('Stripe did not return a Checkout URL.');
  return { url: data.url };
}

/** Verify a Stripe webhook signature. Returns the parsed event or null. */
export function verifyStripeSignature(
  rawBody: string,
  sigHeader: string | null,
  toleranceSec = 300,
): Record<string, unknown> | null {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !sigHeader) return null;

  const parts = Object.fromEntries(
    sigHeader.split(',').map((p) => p.split('=') as [string, string]),
  );
  const t = parts['t'];
  const v1 = parts['v1'];
  if (!t || !v1) return null;

  if (Math.abs(Date.now() / 1000 - Number(t)) > toleranceSec) return null;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${t}.${rawBody}`, 'utf8')
    .digest('hex');

  const a = Buffer.from(expected);
  const b = Buffer.from(v1);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    return JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return null;
  }
}
