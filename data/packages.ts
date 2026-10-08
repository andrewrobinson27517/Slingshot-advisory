/**
 * Website-build packages that can be purchased directly. Prices are the single
 * source of truth for the Digital Development page, the homepage conversion
 * section, and the checkout flow. `chargeNowCents` is what Stripe collects up
 * front; `totalCents` is the full project price (for Business Website+, the
 * difference is a balance due at an agreed milestone).
 */
export type WebPackageId = 'starter' | 'business-plus';

export type WebPackage = {
  id: WebPackageId;
  name: string;
  priceDisplay: string;
  totalCents: number;
  chargeNowCents: number;
  chargeLabel: string; // e.g. "Project fee" or "Deposit (credited to total)"
  balanceNote?: string;
  tagline: string;
  ideal: string;
  cta: string;
  features: string[];
  exclusions: string[];
};

export const webPackages: WebPackage[] = [
  {
    id: 'starter',
    name: 'Starter Website',
    priceDisplay: '$500',
    totalCents: 50000,
    chargeNowCents: 50000,
    chargeLabel: 'Project fee',
    tagline: 'A professional digital presence, done for you.',
    ideal: 'Entrepreneurs and small businesses that need a clean, credible website without the agency price tag.',
    cta: 'Build My Website — $500',
    features: [
      'One-page or compact starter website',
      'Mobile-responsive design',
      'Business information & service sections',
      'Contact form or contact action',
      'Basic SEO and metadata',
      'Domain connection assistance',
      'One round of revisions',
    ],
    exclusions: [
      'Multi-page sites, booking systems, databases, or AI features (quoted separately)',
      'Content writing beyond light editing',
      'Ongoing changes after launch (see care plans)',
    ],
  },
  {
    id: 'business-plus',
    name: 'Business Website+',
    priceDisplay: '$750',
    totalCents: 75000,
    chargeNowCents: 50000,
    chargeLabel: 'Deposit (credited to total)',
    balanceNote: '$250 balance due at the agreed final milestone.',
    tagline: 'A more interactive, conversion-focused site.',
    ideal: 'Businesses that want more than a brochure — a site built to turn visitors into inquiries and customers.',
    cta: 'Build My Business Website+ — $750',
    features: [
      'Up to three focused pages or equivalent sections',
      'Responsive custom, conversion-focused design',
      'Lead inquiry form',
      'One defined automated email or notification workflow',
      'Basic analytics integration',
      'Basic SEO configuration',
      'One round of revisions',
      'Deployment and handoff',
    ],
    exclusions: [
      'Complex booking systems, advanced databases, specialized APIs',
      'Extensive AI functionality (quoted separately)',
      'Ongoing changes after launch (see care plans)',
    ],
  },
];

export function getPackage(id: string): WebPackage | undefined {
  return webPackages.find((p) => p.id === id);
}

export type CarePlan = { name: string; price: string; summary: string; features: string[] };

export const carePlans: CarePlan[] = [
  {
    name: 'Essential Care',
    price: '$25/mo',
    summary: 'Keep a simple site healthy and current.',
    features: [
      'Routine content & text updates (reasonable limit)',
      'Security and dependency updates',
      'Uptime monitoring',
      'Email support',
    ],
  },
  {
    name: 'Plus Care',
    price: '$40/mo',
    summary: 'More updates and faster support for active sites.',
    features: [
      'Everything in Essential Care',
      'A larger monthly allotment of changes',
      'Priority support',
      'Light analytics check-ins',
    ],
  },
];

export const carePlansNote =
  'Plans cover routine updates within reasonable limits — not unlimited changes. Hosting, domain, and any API/AI/third-party usage are billed separately where applicable. Major changes or new functionality are quoted separately. Care plans are optional and opt-in, with clear renewal and cancellation terms; we never enroll you in recurring billing without your agreement.';
