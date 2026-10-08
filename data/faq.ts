import { site } from './site';

export type FaqItem = { q: string; a: string };

/**
 * Curated knowledge base for the website assistant (structured FAQ mode) and the
 * Contact page. Keep answers factual — no invented pricing, credentials, or
 * guarantees. Prices mirror data/services.ts; update both together.
 */
export const faqs: FaqItem[] = [
  {
    q: 'What does Slingshot Advisory do?',
    a: 'We help Rochester businesses in three main ways: digital development and automation (custom websites, AI assistants, and workflow automation), commercial lease and occupancy cost analysis plus business and financial advisory (CAM reviews, lease analysis, underwriting), and commercial property performance and repositioning for property owners (analysis and strategy). We also help businesses rethink their brand, positioning, and operating model. Our edge is real operating experience — we’ve owned, financed, branded, and run businesses and commercial real estate ourselves. Our current services are advisory, analytical, and technology work, not licensed brokerage or property management.',
  },
  {
    q: 'Do you provide brokerage, leasing, or property management?',
    a: 'Not currently. Slingshot Advisory provides analysis, strategy, financial modeling, and technology — not real estate brokerage, tenant representation, leasing, or third-party property management, which require appropriate licensing in Minnesota. We don’t negotiate leases, procure space for compensation, place tenants, or manage property on an owner’s behalf. If you need those services we’ll talk through whether an appropriately licensed provider is the right fit; we don’t accept engagements we aren’t authorized to perform.',
  },
  {
    q: 'How much does a CAM review cost?',
    a: 'CAM Expense Review starts at $395, the CAM & Occupancy Audit at $795, and Lease Renewal Financial Analysis at $695. Final pricing depends on the number of statements and lease complexity. You can request a CAM review from the Commercial Tenant Advisory page or the contact form.',
  },
  {
    q: 'How much does a website cost?',
    a: 'One custom business website is $750 — a flat, one-time price for a clearly agreed scope. You pay $500 up front (credited to the total) and the $250 balance at the agreed launch milestone. Optional ongoing care is $35/month. Hosting, domains, and any API/AI/third-party usage are billed as actual cost, and more complex work (booking infrastructure, databases, large integrations, extensive AI) is quoted separately.',
  },
  {
    q: 'How much does real estate underwriting cost?',
    a: 'A Property Investment Snapshot is $395, Comprehensive Property Underwriting is $995, and Portfolio Financial Analysis starts at $1,495. You receive a working model, documented assumptions, scenarios, and a written executive summary.',
  },
  {
    q: 'How much does business advisory cost?',
    a: 'A Business Strategy Session is $250, the Lender Readiness Package starts at $995, and an Operations Improvement Project starts at $1,495.',
  },
  {
    q: 'Do you negotiate leases or place financing for me?',
    a: 'No. We provide financial analysis and preparation so you can make informed decisions and have well-prepared conversations. We are not a licensed brokerage, law firm, CPA firm, mortgage originator, or registered investment adviser, and we don’t negotiate leases or place financing on your behalf.',
  },
  {
    q: 'Where are you located and who do you work with?',
    a: `We’re based in ${site.contact.location} and serve Rochester and Southeast Minnesota, plus remote clients nationwide where the service and applicable rules permit.`,
  },
  {
    q: 'How do I get started?',
    a: 'Tell us about your challenge through the consultation form. You’ll get a clear project scope, and then practical deliverables. There’s no obligation to start a project from an initial conversation.',
  },
  {
    q: 'How do I reach a person?',
    a: `Use the consultation form on the Contact page, or email ${site.contact.email}. We’ll follow up to confirm scope before any project begins.`,
  },
];
