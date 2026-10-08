import type { Metadata } from 'next';
import { ArrowUpRight, Check } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { CTASection } from '@/components/shared/CTASection';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { work } from '@/data/work';

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Selected website and digital projects from Slingshot Advisory and its affiliated companies — built to communicate clearly, generate inquiries, and work well on every device.',
  alternates: { canonical: '/our-work' },
};

/**
 * Permission gate: set to false to hold client-named projects as unpublished
 * drafts until the client confirms public use of their name. Affiliated
 * (Slingshot-owned/managed) projects always display.
 */
const SHOW_CLIENT_PROJECTS = true;

export default function OurWorkPage() {
  const items = work.filter((w) => w.permission === 'affiliated' || SHOW_CLIENT_PROJECTS);

  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Websites and tools that do real work"
        intro="A selection of projects we’ve designed and built. We present our work by verifiable features — we don’t publish fabricated metrics or testimonials."
      />

      <Section spacing="lg">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {items.map((w, i) => (
              <Reveal key={w.slug} delay={(i % 2) * 0.06}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-card)]">
                  <div className="flex items-center justify-between gap-3">
                    <Badge tone="neutral">{w.category}</Badge>
                    <Badge tone={w.permission === 'affiliated' ? 'accent' : 'neutral'}>
                      {w.permission === 'affiliated' ? 'Affiliated' : 'Client project'}
                    </Badge>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-ink">{w.name}</h2>
                  <p className="mt-1 text-sm font-medium text-ink-faint">{w.role}</p>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-muted">{w.summary}</p>
                  <ul className="mt-5 flex-1 space-y-2 border-t border-border pt-5 text-[0.95rem] text-ink-muted">
                    {w.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {w.url ? (
                    <a
                      href={w.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-1.5 font-semibold text-accent-strong hover:underline"
                    >
                      Visit the live site <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 measure text-sm text-ink-faint">
            Want to see a case study relevant to your situation? We’re happy to walk through a
            representative project on a call. New case studies — including Slingshot-owned
            operating businesses — are added as they’re completed.
          </p>
        </Container>
      </Section>

      <CTASection title="Have a project in mind?" cta={{ label: 'Discuss Your Project', href: '/contact?service=website' }} />
    </>
  );
}
