export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] };

export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readMin: number;
  updated: string; // ISO
  relatedRoute?: string;
  relatedLabel?: string;
  body: Block[];
  seo: { title: string; description: string };
};

export const articles: Article[] = [
  {
    slug: 'how-to-review-your-annual-cam-reconciliation',
    title: 'How to Review Your Annual CAM Reconciliation',
    category: 'Commercial Leasing',
    excerpt:
      'Your CAM reconciliation is a bill you can — and should — check. Here’s a practical way to read it, what to compare it against, and the questions worth asking.',
    readMin: 6,
    updated: '2026-10-01',
    relatedRoute: '/tenant-advisory',
    relatedLabel: 'Commercial Tenant Advisory',
    body: [
      { type: 'p', text: 'Most commercial tenants pay monthly CAM estimates all year, then receive a reconciliation statement showing the landlord’s actual expenses and a true-up — a credit or (more often) a balance due. It’s easy to pay it and move on. But a CAM reconciliation is a bill, and like any bill, it can contain errors, unsupported increases, or charges your lease doesn’t actually allow.' },
      { type: 'p', text: 'You don’t need to be an accountant to review it. You need your lease, last year’s statement, and a methodical eye.' },
      { type: 'h2', text: 'Start with your lease, not the statement' },
      { type: 'p', text: 'The lease is the contract that governs what can be passed through to you and how. Before looking at a single number, find the operating-expense or CAM section and note:' },
      { type: 'ul', items: [
        'Which categories of expense are included — and which are excluded.',
        'How your pro-rata share is calculated (usually your square footage ÷ the building’s).',
        'Any caps on controllable expenses (e.g., “controllable CAM may not increase more than 5% per year”).',
        'Exclusions tenants commonly negotiate: capital improvements, management fees above a stated percentage, costs reimbursed by insurance, and leasing or marketing costs.',
      ] },
      { type: 'h2', text: 'Then read the statement line by line' },
      { type: 'ol', items: [
        'Confirm your pro-rata share percentage matches the lease and hasn’t quietly changed.',
        'Compare each major category to last year. Flag anything up more than ~10–15% for an explanation.',
        'Look for excluded categories that slipped in — capital items dressed up as repairs, for example.',
        'Check that any expense cap in your lease was actually applied.',
        'Verify the math: estimates paid vs. actual share vs. the true-up amount.',
      ] },
      { type: 'h2', text: 'Ask for documentation on anything unclear' },
      { type: 'p', text: 'You’re generally entitled to reasonable backup for the charges you’re paying. A short, specific email — “Can you provide the invoice detail behind the 22% increase in landscaping, and confirm the management fee matches Section 6.3 of our lease?” — is far more effective than a vague complaint. Keep it factual and documented.' },
      { type: 'h2', text: 'Know what a review can and can’t do' },
      { type: 'p', text: 'A careful review can surface errors, unsupported increases, and charges worth questioning — and prepare you for a productive conversation with your landlord. It is not legal advice, and it isn’t a guarantee of a refund. For interpretation of lease language, a licensed attorney is the right call. If you’d like a second set of eyes on a reconciliation, that’s exactly what our CAM review is for.' },
    ],
    seo: {
      title: 'How to Review Your Annual CAM Reconciliation',
      description:
        'A practical, step-by-step guide for commercial tenants on reviewing a CAM reconciliation statement — what to check against your lease and which questions to ask.',
    },
  },
  {
    slug: 'five-financial-considerations-before-renewing-a-commercial-lease',
    title: 'Five Financial Considerations Before Renewing a Commercial Lease',
    category: 'Commercial Leasing',
    excerpt:
      'A renewal is a multi-year financial decision, not a formality. Five things to model before you sign the next term.',
    readMin: 5,
    updated: '2026-10-01',
    relatedRoute: '/tenant-advisory',
    relatedLabel: 'Commercial Tenant Advisory',
    body: [
      { type: 'p', text: 'Renewing where you are is usually easier than moving — and sometimes it’s the right call. But “easier” and “best financial decision” aren’t the same thing. Before you sign, run the numbers on these five.' },
      { type: 'h2', text: '1. Total occupancy cost, not just base rent' },
      { type: 'p', text: 'Base rent is the number everyone quotes. Your real cost includes CAM, taxes, insurance pass-throughs, utilities, and any parking or signage fees. Compare renewals on total occupancy cost per square foot, per year — that’s the number that hits your P&L.' },
      { type: 'h2', text: '2. The escalation schedule over the full term' },
      { type: 'p', text: 'A modest-looking 3% annual escalation compounds. Model what you’ll actually pay in the final year of the term, not just year one, and total it across the whole term so you’re comparing apples to apples.' },
      { type: 'h2', text: '3. Concessions, and what they’re really worth' },
      { type: 'p', text: 'Free rent, a tenant-improvement allowance, or a lower rate in exchange for a longer term all have a dollar value. Spread them across the term to see the effective rate — a “free month” on a five-year deal is worth less than it sounds.' },
      { type: 'h2', text: '4. Term length and flexibility' },
      { type: 'p', text: 'A longer term can buy a better rate but reduces flexibility. Model a couple of term lengths side by side and weigh the rate savings against the value of being able to move, expand, or renegotiate sooner.' },
      { type: 'h2', text: '5. Your alternatives' },
      { type: 'p', text: 'You negotiate better when you know your options. Even a rough read on comparable space and relocation costs gives you a realistic anchor — and tells you whether the renewal in front of you is actually competitive.' },
      { type: 'p', text: 'None of this requires a broker to get started. A simple model that totals occupancy cost across scenarios will tell you most of what you need to know — and it’s the core of our lease renewal financial analysis.' },
    ],
    seo: {
      title: 'Five Financial Considerations Before Renewing a Commercial Lease',
      description:
        'Before renewing a commercial lease, model these five financial factors — total occupancy cost, escalations, concessions, term length, and alternatives.',
    },
  },
  {
    slug: 'understanding-noi-cap-rates-and-dscr',
    title: 'Understanding NOI, Cap Rates, and DSCR',
    category: 'Real Estate',
    excerpt:
      'Three numbers do most of the heavy lifting in commercial real estate analysis. Here’s what each one means and how they fit together.',
    readMin: 6,
    updated: '2026-10-01',
    relatedRoute: '/investment-analysis',
    relatedLabel: 'Real Estate Underwriting',
    body: [
      { type: 'p', text: 'You can go a long way in commercial real estate with three numbers: NOI, cap rate, and DSCR. They answer three different questions — how much does the property earn, what is it worth, and can it carry its debt — and together they frame most acquisition decisions.' },
      { type: 'h2', text: 'NOI — Net Operating Income' },
      { type: 'p', text: 'NOI is the property’s income after operating expenses but before debt service and income taxes. In plain terms: all the rent and other income the property collects, minus what it costs to run — taxes, insurance, maintenance, management, utilities you cover. It deliberately excludes your mortgage, because NOI describes the property, not your financing.' },
      { type: 'p', text: 'NOI = Effective Gross Income − Operating Expenses.' },
      { type: 'h2', text: 'Cap rate — the valuation shorthand' },
      { type: 'p', text: 'The capitalization rate connects NOI to value. Cap rate = NOI ÷ Value (or purchase price). Rearranged, Value = NOI ÷ Cap Rate. If a property produces $100,000 of NOI and similar properties trade at a 7% cap, that implies a value around $1.43 million. A lower cap rate means a higher price per dollar of income (and usually lower perceived risk); a higher cap rate means the opposite.' },
      { type: 'p', text: 'Cap rate is a useful shorthand, not an appraisal. It’s only as good as the NOI and the comparable cap rates behind it.' },
      { type: 'h2', text: 'DSCR — Debt Service Coverage Ratio' },
      { type: 'p', text: 'DSCR tells you whether the property’s income comfortably covers its loan payments. DSCR = NOI ÷ Annual Debt Service. A DSCR of 1.0 means NOI exactly covers the payments with nothing to spare; lenders typically want to see 1.20–1.35 or higher, meaning the property earns 20–35% more than it needs to pay the loan. Below 1.0, the property doesn’t cover its own debt.' },
      { type: 'h2', text: 'How they work together' },
      { type: 'ul', items: [
        'NOI sizes the earnings.',
        'Cap rate turns those earnings into an estimated value.',
        'DSCR tests whether a given financing structure is safe against those earnings.',
      ] },
      { type: 'p', text: 'Change any assumption — rents, expenses, interest rate, down payment — and all three move. That’s why underwriting is really about testing scenarios, not producing one “right” number. A good model makes its assumptions explicit and shows you the range. None of this is an appraisal or an investment recommendation — it’s a framework for making a more informed decision.' },
    ],
    seo: {
      title: 'Understanding NOI, Cap Rates, and DSCR in Commercial Real Estate',
      description:
        'A clear explanation of NOI, cap rate, and DSCR — what each number means, how to calculate it, and how they work together in commercial real estate analysis.',
    },
  },
  {
    slug: 'five-ways-small-businesses-can-benefit-from-ai-automation',
    title: 'Five Ways Small Businesses Can Benefit From AI Automation',
    category: 'Technology',
    excerpt:
      'AI automation isn’t about replacing people — it’s about removing the repetitive work that keeps owners from higher-value tasks. Five practical places to start.',
    readMin: 5,
    updated: '2026-10-01',
    relatedRoute: '/digital-solutions',
    relatedLabel: 'Websites & AI Solutions',
    body: [
      { type: 'p', text: 'For a small business, the value of AI automation is rarely a flashy new product. It’s the hour a day you get back when the repetitive, low-judgment work handles itself. Here are five practical places to start — each with a clear, bounded scope.' },
      { type: 'h2', text: '1. Answering the same questions, instantly' },
      { type: 'p', text: 'Hours, services, pricing, location, “do you take walk-ins” — the same handful of questions, over and over. A website assistant trained on your approved content answers them 24/7, and hands off to you when it can’t help. Done well, it reduces interruptions without pretending to be something it isn’t.' },
      { type: 'h2', text: '2. Capturing and sorting inquiries' },
      { type: 'p', text: 'An intake form that adapts to what the customer needs — and automatically categorizes, acknowledges, and routes each inquiry — means fewer leads lost in an inbox and faster, more consistent responses.' },
      { type: 'h2', text: '3. Acknowledgments and follow-ups that never get forgotten' },
      { type: 'p', text: 'A prompt “we received your request and here’s what happens next” email sets expectations and makes you look buttoned-up. Internal notifications make sure nothing slips. These are simple workflows with an outsized effect on how professional you feel to a customer.' },
      { type: 'h2', text: '4. Turning documents and data into drafts' },
      { type: 'p', text: 'Summarizing notes, drafting a first version of a proposal, or pulling the key figures out of a statement — AI is good at the first 80% of repetitive drafting, with a human reviewing before anything goes out. The point is a faster starting line, not an unreviewed finish.' },
      { type: 'h2', text: '5. Lightweight reporting' },
      { type: 'p', text: 'A small dashboard or a weekly summary of the numbers you actually watch keeps you informed without a bookkeeping project. Automation is best aimed at the metrics you’d otherwise check manually every week.' },
      { type: 'h2', text: 'Start small and scoped' },
      { type: 'p', text: 'The businesses that get value from automation don’t try to automate everything at once. They pick one repetitive, well-defined task, automate it cleanly, and move to the next. That’s exactly how we scope our automation work — one clear deliverable at a time, with defined limits.' },
    ],
    seo: {
      title: 'Five Ways Small Businesses Can Benefit From AI Automation',
      description:
        'Five practical, bounded ways small businesses can use AI automation — from website assistants and smart intake to acknowledgments, drafting, and lightweight reporting.',
    },
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
