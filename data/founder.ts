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

  email: 'andrew@slingshot-realestate.com',
} as const;
