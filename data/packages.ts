/**
 * Website development offering — ONE simple, custom offer (single source of
 * truth for the Digital Development page, the homepage, and the checkout flow).
 *
 * $750 one-time for a custom website with a clearly agreed scope. $500 is
 * collected up front (credited to the total); the $250 balance is due at the
 * agreed launch milestone. More complex integrations, databases, booking
 * infrastructure, or extensive development are quoted separately.
 */
export type WebPackageId = 'custom';

export type WebPackage = {
  id: WebPackageId;
  name: string;
  priceDisplay: string;
  totalCents: number;
  chargeNowCents: number;
  chargeLabel: string;
  balanceNote?: string;
  tagline: string;
  ideal: string;
  cta: string;
  /** Example capabilities — not a promise that every feature is included for $750. */
  features: string[];
  exclusions: string[];
};

export const webPackage: WebPackage = {
  id: 'custom',
  name: 'Custom Business Website',
  priceDisplay: '$750',
  totalCents: 75000,
  chargeNowCents: 50000,
  chargeLabel: 'Deposit (credited to the $750 total)',
  balanceNote: '$250 balance due at the agreed launch milestone.',
  tagline: 'Your business is different. Your website should be too.',
  ideal:
    'Rochester businesses that want a custom website built around how their customers actually behave — not forced into a generic template.',
  cta: 'Build My Website — $750',
  features: [
    'Custom responsive website design',
    'Conversion-focused customer experience',
    'Lead capture and contact forms',
    'Automated inquiry emails',
    'AI-powered website chat assistant',
    'Appointment and scheduling requests',
    'Service or inventory presentations',
    'Business-specific workflows',
    'API integrations where appropriate',
    'Basic analytics and SEO',
  ],
  exclusions: [
    'Complex booking infrastructure, databases, or large custom development (quoted separately)',
    'Extensive AI functionality and high-volume integrations (quoted separately)',
    'Content writing beyond light editing',
    'Hosting, domains, and any API / AI / third-party usage (billed as actual pass-through costs)',
    'Ongoing changes after launch (optional Website Care, below)',
  ],
};

/** Kept as a one-item array so existing `.map()` call sites keep working. */
export const webPackages: WebPackage[] = [webPackage];

export function getPackage(id: string): WebPackage | undefined {
  return id === webPackage.id ? webPackage : undefined;
}

export type CarePlan = { name: string; price: string; summary: string; features: string[] };

/** A single, optional, narrowly-defined ongoing care offering. */
export const carePlan: CarePlan = {
  name: 'Ongoing Website Care',
  price: '$35/mo',
  summary: 'Optional, affordable support after launch — no expensive agency retainer.',
  features: [
    'A defined, reasonable amount of routine content and text updates',
    'Security and dependency updates',
    'Uptime monitoring',
    'Email support',
  ],
};

export const carePlans: CarePlan[] = [carePlan];

export const carePlansNote =
  'Ongoing Website Care is optional and opt-in, with clear renewal and cancellation terms — we never start recurring billing without your agreement. It covers a narrowly defined amount of routine support and basic updates, not unlimited changes. Hosting, domains, API usage, AI tokens, computing, and other third-party costs are additional when applicable. Major changes or new functionality are quoted separately.';

/** The three cost layers, stated plainly for the pricing UI. */
export const costLayers = [
  {
    title: 'One-time development',
    text: 'A custom website with a clearly agreed scope — $750, with $500 up front and $250 at launch.',
  },
  {
    title: 'Optional ongoing care',
    text: 'Routine support and basic updates for $35/month — only if you want it.',
  },
  {
    title: 'Pass-through infrastructure',
    text: 'Hosting, domains, and any API / AI / third-party usage, billed as actual cost when applicable.',
  },
  {
    title: 'Separately quoted enhancements',
    text: 'Complex booking, databases, large integrations, or major new functionality, scoped and quoted on their own.',
  },
] as const;
