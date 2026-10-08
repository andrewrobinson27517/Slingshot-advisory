/**
 * Central site configuration — brand, contact, and navigation. Single source of
 * truth so a change to a tagline or email ripples everywhere.
 *
 * NOTE: contact details below are launch placeholders — confirm before go-live.
 */
export const site = {
  name: 'Slingshot Advisory',
  shortName: 'Slingshot',
  tagline: 'Smarter Business. Stronger Decisions.',
  supporting: 'Built by operators. Designed for business owners.',
  description:
    'Slingshot Advisory helps business owners in Rochester, Minnesota and beyond solve complex problems — commercial lease and CAM cost analysis, modern websites and AI automation, real estate underwriting, and business & capital advisory. Practical, owner-led, fixed-scope work.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://slingshotadvisory.com',

  contact: {
    email: 'hello@slingshotadvisory.com',
    phone: '507-533-5280',
    phoneHref: 'tel:+15075335280',
    location: 'Rochester, Minnesota',
    serviceArea: 'Rochester & Southeast Minnesota · Remote nationwide where permitted',
  },

  /** Related Slingshot companies & projects (the operating experience behind the firm). */
  family: {
    realEstate: 'https://slingshot-realestate.com',
    hubNetwork: 'https://thehubofficenetwork.com',
    rosesVillage: 'https://rosesvillagemn.com',
    ironwoodSquare: 'https://ironwoodsquare.netlify.app',
    bazookaArcade: 'https://bazookaarcade.com',
  },
} as const;

/** Top-level nav. "Services" is a dropdown of the four service pages. */
export const primaryNav = [
  { label: 'Services', href: '/#services', dropdown: 'services' as const },
  { label: 'Our Work', href: '/our-work' },
  { label: 'About', href: '/about' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerNav = [
  {
    heading: 'Services',
    links: [
      { label: 'Digital Development & Automation', href: '/digital-solutions' },
      { label: 'Commercial Real Estate & Tenant Advisory', href: '/tenant-advisory' },
      { label: 'Asset Management & Repositioning', href: '/asset-management' },
      { label: 'Brand & Business Strategy', href: '/brand-strategy' },
      { label: 'Real Estate Underwriting', href: '/investment-analysis' },
      { label: 'Business & Capital Advisory', href: '/business-advisory' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About & Founder', href: '/about' },
      { label: 'Our Work', href: '/our-work' },
      { label: 'Resources & Insights', href: '/resources' },
      { label: 'Build My Website', href: '/get-started' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Disclosures', href: '/terms' },
    ],
  },
] as const;
