import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/PageHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { CheckoutFlow } from '@/components/checkout/CheckoutFlow';

export const metadata: Metadata = {
  title: 'Build Your Website — $750',
  description:
    'Start your custom $750 business website: tell us about your business and goals, review the scope, and pay the $500 deposit. Then we book a discovery call and build it. Slingshot Advisory, Rochester MN.',
  alternates: { canonical: '/get-started' },
};

export default async function GetStartedPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const canceled = sp.canceled === '1';

  return (
    <>
      <PageHeader
        eyebrow="Build your website — $750"
        title="Let’s get your website started."
        intro="Tell us about your business and what you want the site to do, review the starting scope, and pay the $500 deposit. Next you’ll book a discovery call — then we build and launch, with the $250 balance due at the agreed milestone."
      />

      <Section spacing="lg">
        <Container>
          {canceled ? (
            <div className="mb-6 rounded-xl border border-border bg-surface-muted p-4 text-sm text-ink-muted">
              Checkout was canceled — nothing was charged. You can pick up where you left off below.
            </div>
          ) : null}
          <CheckoutFlow />
        </Container>
      </Section>
    </>
  );
}
