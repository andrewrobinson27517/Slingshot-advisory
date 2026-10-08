import type { Metadata } from 'next';
import { MessageCircle, FileText, Rocket } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ScheduleForm } from '@/components/checkout/ScheduleForm';

export const metadata: Metadata = {
  title: 'Book a Strategy Call',
  description:
    'Schedule a 30–60 minute discovery and development call with Slingshot Advisory to plan your website and gather what we need to begin.',
  robots: { index: false, follow: false },
};

const agenda = [
  { icon: MessageCircle, title: 'Understand your business', text: 'Your goals, customers, and what the site needs to do.' },
  { icon: FileText, title: 'Plan the site', text: 'Architecture, pages, and the features that matter most.' },
  { icon: Rocket, title: 'Gather what we need', text: 'Content, assets, and access so we can start building.' },
];

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const orderId = (Array.isArray(sp.order) ? sp.order[0] : sp.order) ?? undefined;

  return (
    <>
      <PageHeader
        eyebrow="Discovery call"
        title="Book your strategy call."
        intro="A 30–60 minute discovery and development call to understand your business, plan your website, and gather what we need to begin. Share a few times that work and we’ll confirm."
      />

      <Section spacing="lg">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-lg font-semibold text-ink">What we’ll cover</h2>
            <ul className="mt-5 space-y-5">
              {agenda.map((a) => (
                <li key={a.title} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-strong">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{a.title}</p>
                    <p className="text-[0.95rem] text-ink-muted">{a.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-ink-faint">
              We don’t use a live calendar yet — send your preferred times and we’ll confirm a
              specific slot by email.
            </p>
          </div>
          <ScheduleForm orderId={orderId} />
        </Container>
      </Section>
    </>
  );
}
