import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/PageHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Terms & Disclosures',
  description: 'The nature of Slingshot Advisory’s services, important disclosures, and the terms of using this website.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Disclosures" intro="The nature of our services and the terms of using this site." />
      <Section spacing="lg">
        <Container size="narrow">
          <div className="measure space-y-4 leading-relaxed text-ink-muted [&_h2]:mt-9 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink">
            <p className="rounded-xl border border-border bg-surface-muted p-4 text-sm">
              These terms are a starting template to get the site launch-ready. Please have them
              reviewed by qualified counsel and tailored to your business before relying on them.
            </p>

            <h2>Nature of our services</h2>
            <p>
              Slingshot Advisory provides business analysis, preparation, digital development,
              and advisory services as described on this site. Our work is intended to inform
              your decisions and improve your operations.
            </p>

            <h2 id="website-projects">Website project terms</h2>
            <p>
              These terms apply to website packages purchased through this site (Starter Website
              and Business Website+).
            </p>
            <p>
              <strong>Scope.</strong> The Custom Business Website has a defined scope that we agree
              on together at the discovery / strategy call. Features beyond that agreed scope —
              including complex booking systems, databases, specialized APIs, and extensive AI
              functionality — are quoted separately before any additional work begins.
            </p>
            <p>
              <strong>Revisions.</strong> The project includes a reasonable round of revisions
              within the agreed scope. Additional revisions or changes beyond that scope are quoted
              separately.
            </p>
            <p>
              <strong>Payment, deposit &amp; balance.</strong> The Custom Business Website is $750
              total: a $500 deposit is collected to start (credited toward the total), with the
              remaining $250 due at the agreed launch milestone. Payments are processed securely by
              our payment provider; we do not store card details.
            </p>
            <p>
              <strong>Cancellation &amp; refunds.</strong> If you cancel before the discovery /
              strategy call, your deposit is refundable less any payment-processing fees already
              incurred. Once development has begun, fees for work completed to date are
              non-refundable; any unused, not-yet-started portion may be refunded at our discretion.
              The $250 balance is only due once the agreed launch milestone is reached.
            </p>
            <p>
              <strong>Ownership &amp; handoff.</strong> On full payment and launch, the finished
              website deliverables are yours. We hand off access and, where applicable, help you
              connect your own domain so you aren’t locked in to us as a vendor.
            </p>
            <p>
              <strong>Third-party costs.</strong> Hosting, domain registration, and any API, AI, or
              other third-party service usage are billed separately and are your responsibility
              where applicable. Optional ongoing website care ($35/month) is opt-in, with clear
              renewal and cancellation terms, and covers routine updates within reasonable limits —
              not unlimited changes.
            </p>

            <h2>Not licensed professional advice</h2>
            <p>
              Slingshot Advisory is not a licensed real estate brokerage, property-management
              company, law firm, CPA or accounting firm, mortgage originator or loan broker, or
              registered investment adviser. Nothing on this site or in our deliverables is legal,
              tax, accounting, appraisal, brokerage, or investment advice. We do not negotiate
              leases, represent tenants, procure tenants or space for compensation, manage property
              or collect rent on an owner’s behalf, place or negotiate financing, or provide any
              service that requires a license we do not hold. Where a situation calls for a licensed
              professional, we’ll tell you.
            </p>

            <h2>No guarantees</h2>
            <p>
              Our analysis and recommendations are based on the information available and
              reasonable assumptions, which we document. We do not guarantee specific financial
              outcomes, valuations, savings, approvals, or results.
            </p>

            <h2>Scope and pricing</h2>
            <p>
              Prices shown are starting prices. The final scope, deliverables, limits, and quote
              for any engagement are defined in a written proposal before work begins. Package
              inclusions and exclusions are described in that proposal and govern the engagement.
            </p>

            <h2>Intellectual property</h2>
            <p>
              The content of this website is the property of Slingshot Advisory. Deliverables and
              ownership for a given project are addressed in that project’s proposal or agreement.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, Slingshot Advisory is not liable for
              indirect, incidental, or consequential damages arising from use of this site or
              reliance on general information provided here. Engagement-specific terms are set out
              in each project agreement.
            </p>

            <h2>Governing law</h2>
            <p>These terms are governed by the laws of the State of Minnesota.</p>

            <h2>Contact</h2>
            <p>
              Questions? Email{' '}
              <a href={`mailto:${site.contact.email}`} className="font-medium text-accent-strong underline">
                {site.contact.email}
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
