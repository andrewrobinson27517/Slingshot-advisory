import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTASection } from '@/components/shared/CTASection';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { work, workGroups, groupLabels, groupIntros, type WorkItem } from '@/data/work';

export const metadata: Metadata = {
  title: 'Our Work — Brand, Digital & Real Estate Projects',
  description:
    'Selected projects from Slingshot Advisory and its affiliated businesses — brand and operating strategy (The Hub Network), custom websites (Rose’s Village, Bazooka Arcade, Seven Medicine, Ironwood Square), and real estate repositioning (The Hub on 3rd, Rochester Executive Suites).',
  alternates: { canonical: '/our-work' },
};

/** Hold client-named projects as drafts until the client confirms public use. */
const SHOW_CLIENT_PROJECTS = true;

function ProjectBody({ w }: { w: WorkItem }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {w.capabilities.map((c) => (
          <Badge key={c} tone="neutral">
            {c}
          </Badge>
        ))}
      </div>
      <h3 className="mt-3 text-2xl font-bold text-ink">{w.name}</h3>
      <p className="mt-1 text-[0.95rem] font-medium text-accent-strong">{w.tagline}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-faint">
        {w.role} · {w.affiliation}
      </p>
      <dl className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-ink-muted">
        <div>
          <dt className="font-semibold text-ink">The problem</dt>
          <dd>{w.problem}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">What we did</dt>
          <dd>{w.solution}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">The outcome</dt>
          <dd>{w.outcome}</dd>
        </div>
      </dl>
      {w.url ? (
        <a
          href={w.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 font-semibold text-accent-strong hover:underline"
        >
          Visit the live site <ArrowUpRight className="h-4 w-4" />
        </a>
      ) : null}
    </>
  );
}

function ImageStack({ w, className }: { w: WorkItem; className?: string }) {
  if (w.images.length === 0) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-navy to-navy-soft p-8 ${className ?? ''}`}
      >
        <span className="font-display text-2xl font-semibold text-on-dark">{w.name}</span>
      </div>
    );
  }
  return (
    <div className={`grid gap-1 ${w.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} ${className ?? ''}`}>
      {w.images.map((img) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          width={1200}
          height={800}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      ))}
    </div>
  );
}

export default function OurWorkPage() {
  const items = work.filter((w) => w.permission === 'affiliated' || SHOW_CLIENT_PROJECTS);

  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Different problems. Different solutions."
        intro="These projects weren’t built from the same template — each one solved a different problem for a different business. We present our work by verifiable features and real business facts; we don’t publish fabricated metrics or testimonials."
      />

      {workGroups.map((group, gi) => {
        const groupItems = items.filter((w) => w.group === group);
        if (groupItems.length === 0) return null;
        return (
          <Section key={group} tone={gi % 2 === 1 ? 'muted' : 'default'} spacing="lg">
            <Container>
              <SectionHeading
                eyebrow={groupLabels[group]}
                title={groupLabels[group]}
                intro={groupIntros[group]}
                className="mb-10"
              />
              <div className="grid gap-6 lg:grid-cols-2">
                {groupItems.map((w, i) => {
                  // Feature the first brand-strategy item across the full width.
                  const featured = group === 'brand-strategy' && i === 0;
                  return (
                    <Reveal
                      key={w.slug}
                      delay={(i % 2) * 0.06}
                      className={featured ? 'lg:col-span-2' : undefined}
                    >
                      <article
                        className={`flex h-full overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)] ${
                          featured ? 'flex-col lg:flex-row' : 'flex-col'
                        }`}
                      >
                        <ImageStack
                          w={w}
                          className={
                            featured
                              ? 'aspect-[16/10] lg:aspect-auto lg:w-1/2 lg:min-h-[22rem]'
                              : 'aspect-[16/9]'
                          }
                        />
                        <div className={`flex flex-1 flex-col p-7 ${featured ? 'lg:w-1/2' : ''}`}>
                          <ProjectBody w={w} />
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </Container>
          </Section>
        );
      })}

      <CTASection
        title="Have a problem worth solving?"
        intro="Whether it’s a website, a brand that no longer fits, or a property that isn’t performing, tell us what you’re trying to figure out."
        cta={{ label: 'Start a Conversation', href: '/contact' }}
        secondary={{ label: 'Build My Website — $750', href: '/get-started' }}
      />
    </>
  );
}
