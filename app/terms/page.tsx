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

            <h2>Not licensed professional advice</h2>
            <p>
              Slingshot Advisory is not a licensed real estate brokerage, law firm, CPA or
              accounting firm, mortgage originator or loan broker, or registered investment
              adviser. Nothing on this site or in our deliverables is legal, tax, accounting,
              appraisal, brokerage, or investment advice. We do not negotiate leases, place or
              negotiate financing, or provide services that require a license we do not hold.
              Where a situation calls for a licensed professional, we’ll tell you.
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
