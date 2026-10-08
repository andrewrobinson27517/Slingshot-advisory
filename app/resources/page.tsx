import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { CTASection } from '@/components/shared/CTASection';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { articles } from '@/data/resources';

export const metadata: Metadata = {
  title: 'Resources & Insights',
  description:
    'Practical, owner-focused articles on commercial leases and CAM, real estate underwriting, and AI automation for small businesses — from Slingshot Advisory in Rochester, MN.',
  alternates: { canonical: '/resources' },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources & insights"
        title="Practical guides for business owners"
        intro="Clear, useful writing on the decisions we help with — written for business owners, not search engines."
      />

      <Section spacing="lg">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 2) * 0.06}>
                <Link
                  href={`/resources/${a.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <div className="flex items-center gap-3">
                    <Badge tone="accent">{a.category}</Badge>
                    <span className="inline-flex items-center gap-1 text-xs text-ink-faint">
                      <Clock className="h-3.5 w-3.5" /> {a.readMin} min read
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-bold leading-snug text-ink">{a.title}</h2>
                  <p className="mt-2 flex-1 text-[0.98rem] leading-relaxed text-ink-muted">
                    {a.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-accent-strong">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
