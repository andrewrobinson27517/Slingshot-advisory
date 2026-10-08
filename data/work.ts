/**
 * Portfolio / Our Work. Projects are grouped by the kind of problem they
 * solved — brand & strategy, digital development, and real estate. A single
 * project can demonstrate more than one capability (see `capabilities`).
 *
 * Copy is written from the live sites and verified business facts. We do not
 * publish fabricated metrics or testimonials. Figures attributed to a live
 * site (e.g. the Hub Network’s member counts) reflect what that site reports.
 */
export type WorkGroup = 'brand-strategy' | 'digital' | 'real-estate';

export const groupLabels: Record<WorkGroup, string> = {
  'brand-strategy': 'Brand & Business Strategy',
  digital: 'Digital Development & Customer Experience',
  'real-estate': 'Real Estate & Asset Repositioning',
};

export const groupIntros: Record<WorkGroup, string> = {
  'brand-strategy':
    'Sometimes the most valuable work isn’t a website — it’s rethinking how a business is positioned and operated.',
  digital:
    'Custom websites and tools built around how each business’s customers actually behave — not a template.',
  'real-estate':
    'Repositioning and operating real estate we own, so the advice we give others is grounded in doing the work.',
};

export type WorkItem = {
  slug: string;
  name: string;
  group: WorkGroup;
  tagline: string;
  url?: string;
  role: string;
  /** Capability tags shown as chips. */
  capabilities: string[];
  /** One short line on the relationship (ownership / client / partner). */
  affiliation: string;
  /** 0–2 authentic images; empty renders a branded gradient tile. */
  images: { src: string; alt: string }[];
  problem: string;
  solution: string;
  outcome: string;
  features: string[];
  /**
   * 'client-pending' — a client project shown only with the client’s okay.
   * 'affiliated' — a Slingshot-owned / sister / partner project.
   */
  permission: 'client-pending' | 'affiliated';
};

export const work: WorkItem[] = [
  // ───────────────────────── Brand & Business Strategy ──────────────────────
  {
    slug: 'hub-network',
    name: 'The Hub Network',
    group: 'brand-strategy',
    tagline: 'Building a brand around a better operating model.',
    url: 'https://thehubofficenetwork.com/',
    role: 'Brand strategy, operating model, technology & website',
    capabilities: ['Brand & Strategy', 'Operations', 'Technology', 'Website'],
    affiliation: 'Slingshot-affiliated operating business',
    images: [
      { src: '/photos/hub-opening.jpg', alt: 'The Hub on 3rd — opening day of the downtown private-office location' },
      { src: '/photos/hub-office.jpg', alt: 'A furnished private office inside The Hub Network' },
    ],
    problem:
      'Through our real estate operations we ended up running two Rochester private-office and coworking properties with related customer needs and overlapping operations — but as separate brands and separate processes, which added unnecessary complexity. We also didn’t believe great service should require a full-time employee sitting at every location.',
    solution:
      'Rather than run two independent properties, we built an overarching identity — The Hub Network — around how the business should actually function: unified brand architecture, coordinated marketing, centralized inquiries, shared operational systems, technology-supported service, and a consistent member experience that scales across locations. A central part of the story was repositioning the downtown property from “Ironwood Professional Suites” into the bolder, more inviting “Hub on 3rd.”',
    outcome:
      'A recognizable, technology-supported office network. Its live site positions it as Rochester’s largest private-office network and reports two locations, roughly 59 private offices, and 120+ member businesses, with transparent all-inclusive pricing and a mostly digital move-in.',
    features: [
      'Unified brand architecture across two locations',
      'Centralized inquiries and coordinated marketing',
      'Transparent, all-inclusive pricing on every listing',
      'Mostly digital tour-to-move-in workflow',
      'Shared operating systems and technology-supported service',
    ],
    permission: 'affiliated',
  },

  // ───────────────────── Digital Development & Experience ────────────────────
  {
    slug: 'roses-village',
    name: "Rose's Village",
    group: 'digital',
    tagline: 'Hospitality branding and a guest-first booking experience.',
    url: 'https://rosesvillagemn.com/',
    role: 'Brand identity, website & guest experience',
    capabilities: ['Brand & Strategy', 'Website', 'Customer Experience'],
    affiliation: 'Slingshot-affiliated operating business',
    images: [
      { src: '/photos/rose-hero.jpg', alt: "Rose's Village — a furnished stay on East Center Street, Rochester" },
      { src: '/photos/rose-living.jpg', alt: "Interior of a Rose's Village furnished stay" },
    ],
    problem:
      'A Rochester hospitality operation — four independent furnished stays across two neighboring homes on East Center Street — needed a brand and a digital experience that reflected an actual operating business, not a generic listing.',
    solution:
      'We built a distinctive hospitality brand and a guest-focused website: clear presentation of each stay, an availability search across the neighboring homes, a “stay together” concept for groups, a founder’s-story page, and inquiry pathways — plus a cross-link to the sister business, The Hub Network, as a guest workspace amenity.',
    outcome:
      'A digital platform built around how guests actually plan a stay — browse the stays, check dates, and reach out — for a real, locally operated hospitality business.',
    features: [
      'Distinctive hospitality brand identity',
      'Per-stay presentation across two homes',
      'Availability search and booking discovery',
      'Group “stay together” concept',
      'Guest inquiry pathways and mobile-first UX',
    ],
    permission: 'affiliated',
  },
  {
    slug: 'bazooka-arcade',
    name: 'Bazooka Arcade',
    group: 'digital',
    tagline: 'A partnership funnel plus a custom operations platform.',
    url: 'https://bazookaarcade.com/',
    role: 'Brand, website & custom operations dashboard',
    capabilities: ['Brand & Strategy', 'Website', 'Technology', 'Automation'],
    affiliation: 'Design & build for a partner venture',
    images: [
      { src: '/photos/bazooka-play.jpg', alt: 'Arcade equipment Bazooka Arcade installs and services' },
      { src: '/photos/bazooka-pinball.jpg', alt: 'A virtual pinball machine from Bazooka Arcade' },
    ],
    problem:
      'A locally owned arcade, ATM, and vending operator needed to explain a revenue-share partnership clearly to prospective host locations — and to run its own equipment, inventory, and service operations without the chaos of spreadsheets.',
    solution:
      'We built a conversion-focused partnership website with an interactive “before & after” space visualizer, plus a custom in-house operations platform — Bazooka Insights™ — that tracks assets, revenue by location, inventory, and maintenance work orders.',
    outcome:
      'A clear story for prospective partners and an internal dashboard that keeps service organized and accountable across every placement — technology built around how the business actually runs.',
    features: [
      'Conversion-focused partnership funnel',
      'Interactive before/after space visualizer',
      'Custom Bazooka Insights™ operations dashboard',
      'Asset, revenue, inventory & work-order tracking',
      'Responsive, brand-forward design',
    ],
    permission: 'affiliated',
  },
  {
    slug: 'seven-medicine',
    name: 'Seven Medicine',
    group: 'digital',
    tagline: 'A clean, credible website for a healthcare clinic.',
    url: 'https://sevenmedicine.netlify.app/',
    role: 'Design & development',
    capabilities: ['Website', 'Customer Experience'],
    affiliation: 'Client project',
    images: [],
    problem:
      'A healthcare clinic needed to communicate its services clearly and make it easy for prospective patients to understand the practice and get in touch.',
    solution:
      'We designed and built a clean, modern, mobile-first website with clear service information, an inquiry workflow for new patients, and tasteful, restrained motion.',
    outcome:
      'A professional, trustworthy presence that makes the clinic easy to understand and easy to contact.',
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
    group: 'digital',
    tagline: 'A searchable directory that quietly improves every day.',
    url: 'https://ironwoodsquare.netlify.app/',
    role: 'Design, development & content',
    capabilities: ['Website', 'Technology', 'Customer Experience'],
    affiliation: 'Slingshot-affiliated property',
    images: [
      { src: '/photos/ironwood.jpg', alt: 'Ironwood Square office building, downtown Rochester' },
      { src: '/photos/ironwood-interior.jpg', alt: 'Interior common area at Ironwood Square' },
    ],
    problem:
      'A multi-tenant office building where visitors and tenants struggled to find businesses and basic information, generating repetitive questions for management.',
    solution:
      'We built a searchable tenant directory and information portal — interactive floor plans, per-business and per-suite pages for SEO, and visitor wayfinding for parking, floors, and restrooms.',
    outcome:
      'Information is far more accessible, and the repetitive questions that used to land on management are reduced.',
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
    group: 'digital',
    tagline: 'The brand site behind the operating experience.',
    url: 'https://slingshot-realestate.com',
    role: 'Design & development',
    capabilities: ['Brand & Strategy', 'Website'],
    affiliation: 'Slingshot-affiliated company',
    images: [{ src: '/photos/home-hero.jpg', alt: 'Rochester, Minnesota — Slingshot Real Estate' }],
    problem:
      'Our affiliated owner-operated real estate company needed a premium brand site to tell its portfolio and approach — the operating experience that stands behind Slingshot Advisory.',
    solution:
      'A content-rich, fast brand site with portfolio and project storytelling and a responsive, premium design.',
    outcome:
      'A credible home for the real estate company and the track record that informs our advisory work.',
    features: [
      'Premium, content-rich brand site',
      'Portfolio and project storytelling',
      'Responsive design and fast page loads',
    ],
    permission: 'affiliated',
  },

  // ───────────────────── Real Estate & Asset Repositioning ───────────────────
  {
    slug: 'hub-on-3rd',
    name: 'The Hub on 3rd',
    group: 'real-estate',
    tagline: 'From Ironwood Professional Suites to a downtown private-office community.',
    url: 'https://thehubofficenetwork.com/',
    role: 'Repositioning, rebrand, technology & operations',
    capabilities: ['Real Estate & Repositioning', 'Brand & Strategy', 'Technology'],
    affiliation: 'Slingshot-owned / operated property',
    images: [
      { src: '/photos/hub-on-3rd.jpg', alt: 'The Hub on 3rd — downtown Rochester private-office community' },
      { src: '/photos/hub-lounge.jpg', alt: 'Member lounge at The Hub on 3rd' },
    ],
    problem:
      'A set of downtown office condominiums — then branded “Ironwood Professional Suites” — weren’t working as hard as traditional space in a competitive downtown market.',
    solution:
      'We repositioned and rebranded the property as The Hub on 3rd: a bolder, more inviting private-office identity with new messaging, a website, refreshed space identity, and simple leasing-inquiry technology — all supporting the broader Hub Network platform.',
    outcome:
      'Repositioned into a fully occupied private-office concept and the downtown anchor of The Hub Network.',
    features: [
      'Property repositioning and rebrand',
      'New brand identity and market positioning',
      'Website and leasing-inquiry workflow',
      'Space identity and member experience',
    ],
    permission: 'affiliated',
  },
  {
    slug: 'rochester-executive-suites',
    name: 'Rochester Executive Suites',
    group: 'real-estate',
    tagline: 'Positioning and an active lease-up for ~12,000 sf of offices.',
    role: 'Positioning, marketing & lease-up',
    capabilities: ['Real Estate & Repositioning', 'Customer Experience'],
    affiliation: 'Slingshot-owned / operated property',
    images: [
      { src: '/photos/rochester-exec-suites.jpg', alt: 'Rochester Executive Suites office property' },
      { src: '/photos/res-interior.jpg', alt: 'Interior office at Rochester Executive Suites' },
    ],
    problem:
      'Roughly 12,000 square feet of office condominiums that needed clear positioning and an active lease-up.',
    solution:
      'We developed the positioning and marketing, improved how availability was presented, and ran an active leasing effort supported by simple inquiry technology — and brought it under the Hub Network as the northwest-Rochester location.',
    outcome:
      'Occupancy improved substantially through repositioning and active leasing; today it’s one of the two Hub Network locations.',
    features: [
      'Positioning and marketing strategy',
      'Improved availability presentation',
      'Active, technology-supported lease-up',
      'Integration into the Hub Network platform',
    ],
    permission: 'affiliated',
  },
];

export const workGroups: WorkGroup[] = ['brand-strategy', 'digital', 'real-estate'];
