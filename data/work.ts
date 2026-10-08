export type WorkItem = {
  slug: string;
  name: string;
  category: string;
  url?: string;
  role: string;
  summary: string;
  features: string[];
  /**
   * 'client-pending' — a real client project shown only once the client has
   * confirmed public use of their name; until then treat as an internal draft.
   * 'affiliated' — a Slingshot-owned or Slingshot-managed property; no third-
   * party permission required.
   */
  permission: 'client-pending' | 'affiliated';
};

export const work: WorkItem[] = [
  {
    slug: 'seven-medicine',
    name: 'Seven Medicine',
    category: 'Website Development',
    url: 'https://sevenmedicine.netlify.app/',
    role: 'Design & development',
    summary:
      'A clean, modern website for a healthcare clinic — built to communicate services clearly and make it easy for prospective patients to get in touch.',
    features: [
      'Fully responsive, mobile-first design',
      'Clear service and treatment information',
      'Online inquiry workflow for new patients',
      'Tasteful, restrained animation',
    ],
    permission: 'client-pending',
  },
  {
    slug: 'ironwood-square',
    name: 'Ironwood Square',
    category: 'Website & Tenant Directory',
    url: 'https://ironwoodsquare.netlify.app/',
    role: 'Design, development & content',
    summary:
      'The information and wayfinding portal for a downtown Rochester office condominium — a searchable tenant directory, interactive floor plans, and visitor information.',
    features: [
      'Searchable, interactive tenant directory',
      'Per-business and per-suite pages for SEO',
      'Visitor wayfinding (parking, floors, restrooms)',
      'Light/dark mode and strong mobile UX',
    ],
    permission: 'affiliated',
  },
  {
    slug: 'slingshot-real-estate',
    name: 'Slingshot Real Estate',
    category: 'Website',
    url: 'https://slingshot-realestate.com',
    role: 'Design & development',
    summary:
      'The brand site for our affiliated owner-operated real estate company — portfolio, approach, and the operating experience behind Slingshot Advisory.',
    features: [
      'Premium, content-rich brand site',
      'Portfolio and project storytelling',
      'Responsive design and fast page loads',
    ],
    permission: 'affiliated',
  },
];
