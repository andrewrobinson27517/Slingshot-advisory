import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/PageHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Slingshot Advisory collects, uses, and protects the information you share.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" intro="How we handle the information you share with us." />
      <Section spacing="lg">
        <Container size="narrow">
          <div className="measure space-y-4 leading-relaxed text-ink-muted [&_h2]:mt-9 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink">
            <p className="rounded-xl border border-border bg-surface-muted p-4 text-sm">
              This policy is a starting template provided to get the site launch-ready. Please
              have it reviewed by qualified counsel and tailored to your actual data practices
              before relying on it.
            </p>

            <h2>Information we collect</h2>
            <p>
              When you submit the consultation form, we collect the information you provide —
              such as your name, email, phone, business name, and the details of your request.
              We also collect basic technical information (like IP address) to protect the form
              from spam and abuse.
            </p>

            <h2>How we use it</h2>
            <p>
              We use your information to respond to your inquiry, prepare a scope, and
              communicate with you about the services you asked about. We do not sell your
              personal information.
            </p>

            <h2>Sensitive documents</h2>
            <p>
              Please don’t submit sensitive financial or lease documents through the website
              form. When a project requires them, we request them through a secure,
              access-controlled channel — not through public links — and we do not share them
              with third-party AI services without appropriate disclosure and your authorization.
            </p>

            <h2>Service providers</h2>
            <p>
              We may use reputable third-party services to operate the site and communicate with
              you — for example, an email delivery provider to send acknowledgments and
              notifications. These providers process information only as needed to provide their
              service.
            </p>

            <h2>Cookies & analytics</h2>
            <p>
              We aim to keep tracking privacy-conscious and limited to understanding how the site
              is used (for example, which services generate inquiries). We do not collect the
              contents of sensitive documents in analytics.
            </p>

            <h2>Your choices</h2>
            <p>
              You can request access to, correction of, or deletion of the personal information
              you’ve shared by emailing us. We’ll respond within a reasonable timeframe.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy? Email{' '}
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
