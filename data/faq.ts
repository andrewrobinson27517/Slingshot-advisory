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
    a: 'We help business owners with four things: commercial tenant cost analysis (CAM reviews and lease-renewal analysis), modern websites and AI automation, real estate underwriting, and business & capital advisory. Our edge is real operating experience — we’ve owned, financed, and run businesses and commercial real estate.',
  },
  {
    q: 'How much does a CAM review cost?',
    a: 'CAM Expense Review starts at $395, the CAM & Occupancy Audit at $795, and Lease Renewal Financial Analysis at $695. Final pricing depends on the number of statements and lease complexity. You can request a CAM review from the Commercial Tenant Advisory page or the contact form.',
  },
  {
    q: 'How much does a website cost?',
    a: 'A Business Website starts at $1,995, Website + AI Assistant at $3,495, Workflow Automation at $995, and the ongoing Digital Care Plan at $199/month. Scope determines the final quote — we define deliverables and limits before starting.',
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
