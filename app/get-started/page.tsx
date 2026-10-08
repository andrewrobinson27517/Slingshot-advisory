import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/PageHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { CheckoutFlow } from '@/components/checkout/CheckoutFlow';
import type { WebPackageId } from '@/data/packages';

export const metadata: Metadata = {
  title: 'Build Your Website',
  description:
    'Choose a Starter ($500) or Business Website+ ($750) package, tell us about your business, and get started. Built by Slingshot Advisory in Rochester, MN.',
  alternates: { canonical: '/get-started' },
};

export default async function GetStartedPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.package) ? sp.package[0] : sp.package;
  const initialPackage = raw === 'starter' || raw === 'business-plus' ? (raw as WebPackageId) : undefined;
  const canceled = sp.canceled === '1';

  return (
    <>
      <PageHeader
        eyebrow="Build your website"
        title="Let’s get your website started."
        intro="Pick a package, share a few details about your business, and pay securely. After payment you’ll book a strategy call and we’ll get to work."
      />

      <Section spacing="lg">
        <Container>
          {canceled ? (
            <div className="mb-6 rounded-xl border border-border bg-surface-muted p-4 text-sm text-ink-muted">
              Checkout was canceled — nothing was charged. You can pick up where you left off below.
            </div>
          ) : null}
          <CheckoutFlow initialPackage={initialPackage} />
        </Container>
      </Section>
    </>
  );
}
