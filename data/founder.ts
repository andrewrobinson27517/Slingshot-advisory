/**
 * Founder content for Slingshot Advisory — Andrew Robinson. First-person,
 * conversational. Photo and bio adapted from the (authorized) Slingshot Real
 * Estate assets. No fabricated credentials or team.
 */
export const founder = {
  name: 'Andrew Robinson',
  title: 'Founder, Slingshot Advisory',
  also: 'Founder & Principal, Slingshot Real Estate',
  location: 'Rochester, Minnesota',
  photo: {
    src: '/photos/founder.jpg',
    alt: 'Andrew Robinson, founder of Slingshot Advisory and Slingshot Real Estate',
    width: 1200,
    height: 1500,
  },

  /** "Why I started" — told in the founder's voice. */
  story: [
    'I didn’t set out to start an advisory company. I set out to build businesses — and I kept running into the same practical problems every other owner runs into.',
    'My first websites were built on Squarespace and Wix. They were a fine place to start, but I outgrew them. I needed more flexibility, real automation, and features those tools couldn’t give me. So I learned to build custom-coded websites, work with APIs, automate the back-and-forth of customer communication, wire up booking and availability, and design pages that actually turn visitors into customers.',
    'Along the way, my real estate businesses taught me a different set of skills — acquiring and repositioning property, improving occupancy, developing and marketing commercial office concepts, and getting honest about the numbers: tenant economics, operating expenses, CAM reconciliations, underwriting, NOI, and lender-ready financial models.',
    'Here’s what I figured out: most business owners don’t need another expensive, decorative website or a consultant reading them theory. They need practical technology and clear thinking that makes the business easier to run and helps it make money. A lot of owners could learn this themselves — they just don’t have the time or the desire to wade through code, APIs, hosting, and automation.',
    'I happen to enjoy solving exactly those problems, and I’ve gotten efficient at it. People started asking for help — so I made it a service. That’s Slingshot Advisory. We’re starting right here in Rochester, one business at a time.',
  ],

  /** The progression that led to the business (section 2 of the brief). */
  progression: [
    'Started a business with limited resources.',
    'Learned to build websites and business systems.',
    'Hit the limits of basic website builders for real business needs.',
    'Built custom technology and automation to simplify operations.',
    'Acquired and improved commercial properties.',
    'Learned to navigate complex financial and operating decisions.',
    'Realized other entrepreneurs need these same capabilities.',
  ],

  quote: {
    body: 'I learned these skills out of necessity while building my own businesses. Now I’m helping others benefit from the same experience.',
    attribution: 'Andrew Robinson',
  },

  /**
   * Breadth of professional experience behind the firm. IMPORTANT: this reflects
   * the founder's professional background — not assets the company manages, and
   * not institutional advisory engagements the company has performed.
   */
  experience: {
    heading: 'Experience Across Industries. Focused on Practical Solutions.',
    body: [
      'Our background spans work with boutique real estate operators and clients managing hundreds of millions of dollars in assets, across sectors including life sciences, industrial, office, multifamily, and hospitality.',
      'That experience, combined with building and operating our own businesses, shapes how we approach each challenge. A small business doesn’t need the overhead of an institutional organization to benefit from thoughtful strategy, financial discipline, modern technology, and strong operations — our goal is to bring those principles together in a practical, accessible way.',
    ],
    assetClasses: [
      'Life sciences',
      'Industrial',
      'Commercial office',
      'Multifamily residential',
      'Short-term & furnished rentals',
      'Coworking & flexible office',
      'Real estate ownership & operations',
    ],
    note: 'This experience reflects the founder’s professional background. Slingshot Advisory itself does not manage hundreds of millions of dollars in assets and does not claim institutional clients or advisory engagements it has not performed.',
  },

  /** The operating principle at the center of how we work. */
  principle: {
    statement: 'You don’t create the market. You respond to it.',
    body: [
      'Successful businesses don’t usually need to invent demand — they need to pay attention. Markets constantly communicate what customers need, what frustrates them, and what prevents a transaction from happening.',
      'We listen to the market, identify the friction, and build a practical solution that responds to what’s already there. Sometimes that’s repositioning a property. Sometimes it’s changing how a business talks to customers. And sometimes it’s as simple as putting an ATM where people need cash.',
    ],
  },

  /** Listen · Identify · Solve · Measure — applies across every service line. */
  framework: [
    { step: 'Listen to the Market', text: 'Understand customer behavior, business needs, operational challenges, and existing demand.' },
    { step: 'Identify the Friction', text: 'Find what’s preventing a business or property from performing — pricing, access, technology, positioning, experience, or structure.' },
    { step: 'Build a Practical Solution', text: 'Develop a financially sensible response that fits the real problem. The right answer isn’t always the most expensive or sophisticated one.' },
    { step: 'Measure and Adapt', text: 'Track adoption, cost, revenue, occupancy, or whatever matters — and keep adjusting to real feedback.' },
  ],

  /** Short examples of one consistent philosophy across the portfolio. */
  marketExamples: [
    { name: 'The Hub Network', text: 'Recognized demand for flexible professional office space and built a unified brand and operating platform supported by centralized technology.' },
    { name: "Rose's Village", text: 'Responded to demand for furnished accommodations with a branded hospitality offering and a customer-focused digital experience.' },
    { name: 'Commercial repositioning', text: 'Rather than assume the existing layout or leasing strategy is right, evaluate what businesses actually need and adapt the offering.' },
    { name: 'Website development', text: 'Rather than force clients into a template, find where their customers hit friction and build technology that addresses it.' },
    { name: 'The Rochester Farmers Market', text: 'Spotted a simple payment-access problem and introduced a practical solution — an ATM.' },
  ],

  /** The Farmers Market ATM story — grounded, local, honest about measurement. */
  farmersMarket: {
    eyebrow: 'A Rochester story',
    title: 'Sometimes the Best Business Solution Is the Simplest One.',
    image: { src: '/photos/farmers-market.jpg', alt: 'The Rochester Farmers Market in Rochester, Minnesota' },
    paragraphs: [
      'While visiting the Rochester Farmers Market, I noticed a recurring problem: customers were running out of cash while shopping, and some vendors were limited by electronic-payment setups. People who wanted to buy sometimes had to leave the market to find cash — friction between willing buyers and local producers.',
      'It wasn’t a lack of demand. People wanted to buy; the payment process was getting in the way. So instead of trying to change how the farmers operated or how customers behaved, I looked for a practical fix. Working with the Rochester Farmers Market, we introduced an ATM that made cash more accessible — so customers could complete purchases without leaving the market.',
      'Over the following year, ATM usage and cash access grew. The demand was already there; the infrastructure simply wasn’t meeting it. We didn’t need to create a new market — we needed to respond to what the market was telling us.',
    ],
    note: 'ATM usage is owner-reported and qualitative; we don’t claim a specific increase in overall market sales or liquidity.',
  },

  email: 'andrew@slingshot-realestate.com',
} as const;
