import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Thank You',
  robots: { index: false, follow: false },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const order = (Array.isArray(sp.order) ? sp.order[0] : sp.order) ?? '';

  return (
    <Section spacing="lg">
      <Container size="narrow">
        <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-[var(--shadow-card)] sm:p-10">
          <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
          <h1 className="mt-5 text-3xl font-semibold text-ink">Thank you!</h1>
          {/* Payment is confirmed server-side by the Stripe webhook — we don't
              assert "paid" just because this page was reached. */}
          <p className="measure mx-auto mt-3 text-ink-muted">
            We’re finalizing your order and you’ll receive a confirmation email shortly. The next
            step is a short strategy call to plan your website — go ahead and book a time that
            works for you.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={`/get-started/schedule${order ? `?order=${order}` : ''}`} variant="accent" size="lg">
              Book Your Strategy Call
            </Button>
            <Button href="/" variant="outline" size="lg">
              Back to Home
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
