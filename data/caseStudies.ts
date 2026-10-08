/**
 * Real operating examples from Slingshot-owned/operated properties — the
 * experience behind the advice. Figures are owner-reported and approximate
 * (see the note rendered with the section); no invented timelines or
 * unsupported causal claims. Client/third-party website work lives in
 * data/work.ts and is shown separately.
 */
export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  image: { src: string; alt: string };
  challenge: string;
  action: string;
  result: string;
  lesson: string;
  /** Headline metric for the card, when there's a clean one. */
  metric?: { value: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'hub-on-3rd',
    name: 'The Hub on 3rd',
    category: 'Repositioning · Office',
    image: { src: '/photos/hub-on-3rd.jpg', alt: 'The Hub on 3rd private-office community' },
    challenge:
      'A set of underutilized office condominiums that weren’t working hard enough as traditional space.',
    action:
      'Repositioned the space into a furnished private-office community with a real brand, a website, and a simple leasing-inquiry workflow — so prospective members could find it and reach out easily.',
    result: 'Repositioned into a fully occupied private-office concept.',
    lesson:
      'The right concept and clear presentation can turn ordinary space into something people want to be in.',
    metric: { value: '100%', label: 'occupied after repositioning' },
  },
  {
    slug: 'rochester-executive-suites',
    name: 'Rochester Executive Suites',
    category: 'Leasing · Office',
    image: { src: '/photos/rochester-exec-suites.jpg', alt: 'Rochester Executive Suites' },
    challenge:
      'Roughly 12,000 square feet of office condominiums that needed a clear positioning and an active lease-up.',
    action:
      'Developed the positioning and marketing, improved how availability was presented, and ran an active leasing effort supported by simple technology for inquiries.',
    result: 'Occupancy improved substantially through repositioning and active leasing.',
    lesson:
      'Lease-up is a marketing and operations problem as much as a real-estate one — presentation and follow-through matter.',
  },
  {
    slug: 'furnished-stays',
    name: 'Furnished Stays (Center Street)',
    category: 'Revenue · Hospitality',
    image: { src: '/photos/rose.jpg', alt: 'Furnished rental on historic Center Street' },
    challenge:
      'Residential space that was underperforming as a standard rental.',
    action:
      'Repositioned it as a furnished stay, improved the presentation and booking experience, and brought it under one locally operated brand.',
    result: 'Monthly furnished-rental revenue roughly doubled — from about $2,000 to about $4,000.',
    lesson:
      'A better use and a better guest experience can meaningfully change what an asset earns.',
    metric: { value: '~2×', label: 'monthly revenue' },
  },
  {
    slug: 'ironwood-square',
    name: 'Ironwood Square',
    category: 'Technology · Tenant Experience',
    image: { src: '/photos/ironwood.jpg', alt: 'Ironwood Square office building, downtown Rochester' },
    challenge:
      'A multi-tenant office building where visitors and tenants struggled to find businesses and basic information.',
    action:
      'Built a searchable tenant directory and information portal — interactive floor plans, per-business pages, parking and wayfinding — so the building is easy to navigate.',
    result:
      'Information is far more accessible, and repetitive questions to management are reduced.',
    lesson:
      'The right technology quietly improves the tenant and visitor experience every day.',
  },
];
