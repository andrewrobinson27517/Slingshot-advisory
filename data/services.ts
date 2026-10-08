import { Building2, MonitorSmartphone, LineChart, Briefcase, TrendingUp, Palette } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ServiceKey } from '@/lib/validation';

/**
 * The three primary ways Slingshot Advisory helps (homepage + nav). Underwriting
 * and business advisory remain available as supporting services (see navServices).
 */
export const divisions = [
  {
    key: 'digital',
    title: 'Digital Development & Automation',
    route: '/digital-solutions',
    icon: MonitorSmartphone,
    summary:
      'Websites designed to convert customers — supported by practical automation and affordable maintenance.',
  },
  {
    key: 'realestate',
    title: 'Commercial Real Estate & Tenant Advisory',
    route: '/tenant-advisory',
    icon: Building2,
    summary:
      'CAM expense reviews, lease-renewal analysis, occupancy-cost planning, and financial analysis.',
  },
  {
    key: 'asset',
    title: 'Asset Management & Repositioning',
    route: '/asset-management',
    icon: TrendingUp,
    summary:
      'Evaluate underperforming real estate, improve occupancy, strengthen operations, and rethink how assets function.',
  },
] as const;

/** Full service menu for the nav dropdown: the three divisions + supporting services. */
export const navServices = [
  ...divisions,
  {
    key: 'brand',
    title: 'Brand & Business Strategy',
    route: '/brand-strategy',
    icon: Palette,
    summary: 'Rethink positioning, customer experience, and how the business operates.',
  },
  {
    key: 'underwriting',
    title: 'Real Estate Underwriting',
    route: '/investment-analysis',
    icon: LineChart,
    summary: 'NOI, cap rate, DSCR, cash-flow modeling, and valuation scenarios.',
  },
  {
    key: 'business',
    title: 'Business & Capital Advisory',
    route: '/business-advisory',
    icon: Briefcase,
    summary: 'Cash-flow planning, lender readiness, and operations improvement.',
  },
] as const;

export type Pkg = {
  name: string;
  price: string;
  cadence?: string;
  summary: string;
  features: string[];
  featured?: boolean;
};

export type ServiceSection = {
  title: string;
  intro?: string;
  bullets?: string[];
};

export type Service = {
  slug: string; // route path (without leading slash handled in links)
  route: string;
  key: ServiceKey; // default intake category this page routes to
  nav: string;
  title: string;
  icon: LucideIcon;
  cardSummary: string;
  hero: { eyebrow: string; headline: string; sub: string };
  sections: ServiceSection[];
  packages: Pkg[];
  packagesNote?: string;
  documents?: string[];
  faqs: { q: string; a: string }[];
  disclaimer: string;
  primaryCta: { label: string; service: ServiceKey };
  secondaryCta?: { label: string; service: ServiceKey };
  seo: { title: string; description: string };
};

export const services: Service[] = [
  // ───────────────────────── Commercial Tenant Advisory ─────────────────────
  {
    slug: 'tenant-advisory',
    route: '/tenant-advisory',
    key: 'cam-review',
    nav: 'Commercial Tenant Advisory',
    title: 'Commercial Tenant Advisory',
    icon: Building2,
    cardSummary:
      'Understand your occupancy costs, review CAM reconciliations, and prepare for lease-renewal decisions.',
    hero: {
      eyebrow: 'Commercial Tenant Advisory',
      headline: 'Understand Your Lease. Control Your Costs.',
      sub: 'Commercial leases and occupancy expenses can be complicated. We help business owners analyze costs, review the supporting calculations, and prepare for important occupancy decisions.',
    },
    sections: [
      {
        title: 'CAM Reconciliation Review',
        intro:
          'Annual Common Area Maintenance (CAM) charges are easy to pay and hard to verify. We help you evaluate the reconciliation and understand what you are actually being billed for.',
        bullets: [
          'CAM expense comparison against the lease and prior years',
          'Annual reconciliation analysis',
          'Expense allocation and pro-rata share review',
          'Year-over-year variance analysis',
          'Lease-related financial assumption review',
          'Identification of unclear charges and items that need further documentation',
          'A prepared list of questions for your landlord or property manager',
        ],
      },
      {
        title: 'Lease Renewal Financial Analysis',
        intro:
          'A renewal is a multi-year financial commitment. We help you see the full picture before you sign.',
        bullets: [
          'Evaluate renewal proposals and offered terms',
          'Analyze rent escalations over the term',
          'Compare proposed terms side by side',
          'Calculate total occupancy cost, not just base rent',
          'Model alternative lease lengths',
          'Prepare clear business discussion points',
        ],
      },
      {
        title: 'Occupancy Cost Planning',
        intro:
          'Understand the long-term financial effects of your commercial space commitments so your next move is a deliberate one.',
      },
    ],
    packages: [
      {
        name: 'CAM Expense Review',
        price: '$395',
        cadence: 'starting at',
        summary: 'A focused review of a single CAM reconciliation statement.',
        features: [
          'Review of one annual CAM reconciliation',
          'Comparison to lease language and prior year',
          'Flagged charges and questions to ask',
          'Written summary of findings',
        ],
      },
      {
        name: 'CAM & Occupancy Audit',
        price: '$795',
        cadence: 'starting at',
        summary: 'A deeper look at CAM plus total occupancy cost.',
        featured: true,
        features: [
          'Everything in CAM Expense Review',
          'Multi-year expense trend analysis',
          'Full occupancy-cost breakdown',
          'Variance analysis with likely drivers',
          'Prioritized list of items to document or dispute',
        ],
      },
      {
        name: 'Lease Renewal Financial Analysis',
        price: '$695',
        cadence: 'starting at',
        summary: 'Model a renewal decision before you commit.',
        features: [
          'Renewal proposal evaluation',
          'Escalation and total-cost modeling',
          'Alternative lease-length scenarios',
          'Business discussion points for your landlord',
        ],
      },
    ],
    packagesNote:
      'Custom multi-property reviews are available by quote. Final pricing depends on the number of statements, lease complexity, and documents provided.',
    documents: [
      'Your current lease and any amendments',
      'The CAM reconciliation statement(s) in question',
      'Prior-year CAM statements, if available',
      'Any renewal proposal or letter of intent (for renewal analysis)',
    ],
    faqs: [
      {
        q: 'What is CAM and a CAM reconciliation?',
        a: 'CAM stands for Common Area Maintenance — the shared operating costs a landlord passes through to tenants (things like landscaping, snow removal, parking-lot upkeep, and management fees). A reconciliation is the annual true-up comparing what you were billed in estimates against the landlord’s actual expenses. We help you check that true-up against your lease.',
      },
      {
        q: 'Do you negotiate my lease for me?',
        a: 'No. We provide financial analysis, cost review, and preparation so you can have a well-informed conversation. We do not act as your licensed representative or provide legal advice, and we do not negotiate lease terms on your behalf.',
      },
      {
        q: 'How long does a CAM review take?',
        a: 'Most single-statement reviews are completed within about one to two weeks of receiving your documents. Larger or multi-property engagements are scoped individually.',
      },
    ],
    disclaimer:
      'Commercial Tenant Advisory is a financial analysis, cost-review, and negotiation-preparation service. It is not licensed tenant representation, brokerage, or legal advice, and we do not negotiate lease terms directly on your behalf. For legal interpretation of your lease, consult a licensed attorney.',
    primaryCta: { label: 'Request a CAM Review', service: 'cam-review' },
    secondaryCta: { label: 'Evaluate My Lease Renewal', service: 'lease-renewal' },
    seo: {
      title: 'Commercial Tenant Advisory & CAM Reconciliation Review — Rochester MN',
      description:
        'CAM reconciliation review, lease renewal financial analysis, and occupancy cost planning for commercial tenants in Rochester, MN. Understand your lease and control your costs.',
    },
  },

  // ───────────────────────── Websites & AI Solutions ────────────────────────
  {
    slug: 'digital-solutions',
    route: '/digital-solutions',
    key: 'website',
    nav: 'Digital Development & Automation',
    title: 'Digital Development & Automation',
    icon: MonitorSmartphone,
    cardSummary:
      'One custom business website for $750 (optional $35/mo care) — plus AI assistants and automation quoted separately.',
    hero: {
      eyebrow: 'Digital Development & Automation',
      headline: 'Your Business Is Different. Your Website Should Be Too.',
      sub: 'You’ve got a business to run — you shouldn’t have to become a developer. We build one custom, conversion-focused website for a flat $750, with practical automation and affordable, optional ongoing care.',
    },
    sections: [
      {
        title: 'Website Development',
        bullets: [
          'Modern, responsive business websites',
          'SEO fundamentals built in',
          'Lead-generation and inquiry forms',
          'Service and product pages',
          'Client inquiry workflows',
          'Booking and scheduling integrations',
          'Analytics integration',
        ],
      },
      {
        title: 'AI Assistants',
        bullets: [
          'Website FAQ assistants',
          'AI-powered inquiry assistance',
          'Customer-service workflows',
          'Lead intake and categorization',
          'Knowledge-base-powered responses',
          'A clear path to a human',
        ],
      },
      {
        title: 'Business Automation',
        bullets: [
          'Email workflows',
          'Automated inquiry acknowledgments',
          'Internal notifications',
          'CRM workflows',
          'Administrative process automation',
          'Reporting dashboards',
        ],
      },
    ],
    // Pricing for this service is presented on the custom /digital-solutions page
    // (single $750 offer + optional $35/mo care). No package cards here.
    packages: [],
    packagesNote:
      'One custom website for $750 ($500 up front, $250 at the agreed launch milestone). Optional ongoing care is $35/month. AI assistants, booking infrastructure, databases, and larger integrations are scoped and quoted separately — deliverables and limits are defined before we begin.',
    faqs: [
      {
        q: 'Can you work from my existing website?',
        a: 'Yes. Share your current site URL in the intake form and describe what you want to change. We’ll tell you whether a refresh or a rebuild makes more sense for your goals and budget.',
      },
      {
        q: 'Do the AI assistants make things up?',
        a: 'Our assistants are built to answer from your approved content and knowledge base, and to hand off to a human when they can’t help. We constrain what they say — we don’t let them invent pricing, guarantees, or claims.',
      },
      {
        q: 'What does ongoing Website Care include, and is it required?',
        a: 'It’s optional. For $35/month, Website Care covers a defined, reasonable amount of routine content updates, security and dependency updates, uptime monitoring, and email support — not unlimited changes. Hosting, domains, and any API/AI/third-party usage are billed as actual cost, and larger changes or new functionality are quoted separately. You can opt in after launch, with clear cancellation terms.',
      },
    ],
    disclaimer:
      'Project scope, deliverables, and limits (including revision counts and AI usage) are defined in a written proposal before work begins. We do not promise unlimited revisions or unlimited AI usage.',
    primaryCta: { label: 'Discuss Your Project', service: 'website' },
    secondaryCta: { label: 'Explore AI Automation', service: 'ai-automation' },
    seo: {
      title: 'Business Website Development & AI Automation — Rochester MN',
      description:
        'Modern business websites, AI assistants, and workflow automation for small businesses in Rochester, MN and nationwide. Lead intake, scheduling, and smarter back-office workflows.',
    },
  },

  // ───────────────────────── Real Estate Underwriting ───────────────────────
  {
    slug: 'investment-analysis',
    route: '/investment-analysis',
    key: 'underwriting',
    nav: 'Real Estate Underwriting',
    title: 'Real Estate Underwriting',
    icon: LineChart,
    cardSummary:
      'Cash-flow analysis, commercial valuation scenarios, financing models, and investment underwriting.',
    hero: {
      eyebrow: 'Real Estate Underwriting',
      headline: 'Better Analysis. More Informed Investment Decisions.',
      sub: 'For investors, property owners, and operators evaluating real estate opportunities — a clear financial model and an honest read on the numbers before you commit capital.',
    },
    sections: [
      {
        title: 'What we analyze',
        bullets: [
          'Net Operating Income (NOI) analysis',
          'Cash-flow modeling',
          'Cap-rate analysis',
          'Debt service coverage (DSCR) calculations',
          'Property valuation scenarios',
          'Cash-on-cash return analysis',
          'Debt amortization schedules',
          'Acquisition sensitivity analysis',
          'Refinance scenario modeling',
          'Rent roll and expense analysis',
          'Multi-property scenario comparisons',
        ],
      },
      {
        title: 'What you receive',
        bullets: [
          'A working financial model',
          'A clear assumptions summary',
          'Scenario analysis (base / upside / downside)',
          'A written executive summary you can act on',
        ],
      },
    ],
    packages: [
      {
        name: 'Property Investment Snapshot',
        price: '$395',
        summary: 'A fast first read on a single opportunity.',
        features: [
          'NOI and cash-flow summary',
          'Cap rate and cash-on-cash',
          'Key assumptions documented',
          'Go / no-go discussion points',
        ],
      },
      {
        name: 'Comprehensive Property Underwriting',
        price: '$995',
        summary: 'A full model with scenarios and a written summary.',
        featured: true,
        features: [
          'Full financial model with amortization',
          'DSCR and financing scenarios',
          'Base / upside / downside scenarios',
          'Sensitivity analysis',
          'Written executive summary',
        ],
      },
      {
        name: 'Portfolio Financial Analysis',
        price: '$1,495',
        cadence: 'starting at',
        summary: 'Compare and model multiple properties together.',
        features: [
          'Multi-property comparison',
          'Portfolio-level cash flow',
          'Refinance and disposition scenarios',
          'Consolidated summary',
        ],
      },
    ],
    documents: [
      'Rent roll or income summary',
      'Trailing operating expenses (T-12 if available)',
      'Asking price or purchase terms',
      'Any financing terms or assumptions you want modeled',
    ],
    faqs: [
      {
        q: 'Is this an appraisal?',
        a: 'No. This is financial analysis and modeling to support your own decision-making. It is not an appraisal, a guaranteed valuation, or an investment recommendation. For a certified value, engage a licensed appraiser.',
      },
      {
        q: 'What do you need from me to start?',
        a: 'At minimum, the asking price and a sense of income and expenses (a rent roll and recent operating statements are ideal). The more complete your inputs, the sharper the model — and we’ll clearly document every assumption we make.',
      },
    ],
    disclaimer:
      'Real estate underwriting is financial analysis and modeling to inform your decisions. It is not an appraisal, a guaranteed valuation, or an investment recommendation, and it should not be relied upon as the sole basis for an investment decision.',
    primaryCta: { label: 'Request an Investment Analysis', service: 'underwriting' },
    secondaryCta: { label: 'Discuss My Property', service: 'property' },
    seo: {
      title: 'Real Estate Underwriting & Cash-Flow Modeling — Rochester MN',
      description:
        'Commercial real estate underwriting: NOI, cap rate, DSCR, cash-flow modeling, and valuation scenarios for investors and owners. Clear models with a written executive summary.',
    },
  },

  // ───────────────────────── Business & Capital Advisory ────────────────────
  {
    slug: 'business-advisory',
    route: '/business-advisory',
    key: 'business-advisory',
    nav: 'Business & Capital Advisory',
    title: 'Business & Capital Advisory',
    icon: Briefcase,
    cardSummary:
      'Business financial analysis, lender-readiness prep, operational improvements, and strategic planning.',
    hero: {
      eyebrow: 'Business & Capital Advisory',
      headline: 'Practical Financial and Operational Guidance for Growing Businesses.',
      sub: 'Clear, actionable help with the financial and operational decisions in front of you — from cash-flow visibility to getting lender-ready to tightening how the business runs.',
    },
    sections: [
      {
        title: 'Financial Planning',
        bullets: [
          'Business cash-flow projections',
          'Budget preparation',
          'Expense reviews',
          'Financial scenario modeling',
          'Financial dashboard development',
        ],
      },
      {
        title: 'Lender Readiness',
        bullets: [
          'Financial documentation organization',
          'Debt-service analysis',
          'Business financial presentations',
          'Borrowing-scenario comparisons',
          'Lender package preparation',
        ],
      },
      {
        title: 'Business Operations',
        bullets: [
          'Workflow evaluation',
          'Administrative efficiency',
          'Process improvement',
          'Automation strategy',
          'Software selection & implementation planning',
        ],
      },
    ],
    packages: [
      {
        name: 'Business Strategy Session',
        price: '$250',
        summary: 'A focused working session on a specific challenge.',
        features: [
          'A structured 60–90 minute session',
          'Review of your situation and goals',
          'Clear, prioritized next steps',
          'A short written recap',
        ],
      },
      {
        name: 'Lender Readiness Package',
        price: '$995',
        cadence: 'starting at',
        summary: 'Get your numbers and story ready for financing.',
        featured: true,
        features: [
          'Financial documentation organized',
          'Debt-service and borrowing scenarios',
          'A clean lender presentation',
          'A prepared list of likely lender questions',
        ],
      },
      {
        name: 'Operations Improvement Project',
        price: '$1,495',
        cadence: 'starting at',
        summary: 'Find and fix the friction in how you operate.',
        features: [
          'Workflow and process review',
          'Prioritized improvement plan',
          'Automation and software recommendations',
          'Implementation roadmap',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you help us get a loan or place financing?',
        a: 'We help you get lender-ready — organized financials, clear debt-service analysis, and a presentable package. We do not act as a loan broker, place financing, or negotiate financing for compensation.',
      },
      {
        q: 'Are you our accountant or financial adviser?',
        a: 'No. We provide practical business and operational analysis. We are not a CPA firm, law firm, or registered investment adviser. For tax, audit, legal, or regulated investment advice, we’ll point you to the right licensed professional.',
      },
    ],
    disclaimer:
      'Business & Capital Advisory provides practical financial and operational analysis and preparation. It is not loan brokerage or financing placement, and it is not legal, tax, accounting, or registered investment advice. We do not place or negotiate financing for compensation.',
    primaryCta: { label: 'Discuss Your Business Goals', service: 'business-advisory' },
    seo: {
      title: 'Business & Capital Advisory — Lender Readiness & Operations — Rochester MN',
      description:
        'Business cash-flow planning, lender-readiness and loan package preparation, and operations improvement for growing businesses in Rochester, MN. Practical, owner-led advisory.',
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
