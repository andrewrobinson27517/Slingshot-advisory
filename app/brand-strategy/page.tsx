import type { Metadata } from 'next';
import Image from 'next/image';
import { Check, ArrowUpRight, Palette, Workflow, Users, Cpu, LineChart } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTASection } from '@/components/shared/CTASection';
import { SchemaScript } from '@/components/shared/SchemaScript';
import { Reveal } from '@/components/ui/Reveal';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { work } from '@/data/work';
import { serviceSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Brand & Business Strategy — Rochester MN',
  description:
    'Sometimes the problem isn’t the website — it’s the brand, concept, or operating model. Slingshot Advisory helps Rochester businesses rethink positioning, customer experience, operations, and revenue strategy.',
  alternates: { canonical: '/brand-strategy' },
};

const capabilities = [
  'Business branding and positioning',
  'Rebranding strategy',
  'Brand architecture and naming',
  'Customer experience design',
  'Business concept development',
  'Marketing and conversion strategy',
  'Operational consolidation',
  'Shared systems and workflow design',
  'Technology implementation',
  'Business repositioning',
  'Revenue and operating-model evaluation',
];

const examples = [
  { icon: Palette, title: 'Brand Repositioning', text: 'Evaluate whether the current identity reflects what the business offers and who it serves.' },
  { icon: Workflow, title: 'Operational Strategy', text: 'Identify overlapping processes, unnecessary expenses, and opportunities to centralize systems.' },
  { icon: Users, title: 'Customer Experience', text: 'Make it easier for customers to understand services, interact with the business, and take action.' },
  { icon: Cpu, title: 'Technology & Automation', text: 'Implement practical tools that support the operating model rather than adding complexity.' },
  { icon: LineChart, title: 'Revenue Strategy', text: 'Evaluate how offerings, pricing, positioning, and service delivery influence performance.' },
];

const hub = work.find((w) => w.slug === 'hub-network');

export default function BrandStrategyPage() {
  return (
    <>
      <SchemaScript
        schema={[
          serviceSchema(
            'Brand & Business Strategy',
            'Branding, repositioning, customer experience, operational consolidation, and revenue-model strategy for small and multi-location businesses.',
            '/brand-strategy',
          ),
        ]}
      />

      <PageHeader
        eyebrow="Brand & Business Strategy"
        title="Sometimes the Best Solution Starts With Rethinking the Business."
        intro="A business may have a great service but an unclear brand. A property may be well located but poorly positioned. Two locations may run separate systems when one shared platform would work better. We help owners look at the bigger picture — how the brand, technology, physical environment, customer experience, and operating model work together."
        primary={{ label: 'Discuss Your Business Strategy', href: '/contact?service=brand-strategy' }}
      />

      {/* Not always the website */}
      <Section spacing="lg">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <SectionHeading eyebrow="More than a logo" title="Sometimes the problem isn’t the website." />
            <div className="measure mt-5 space-y-4 text-[1.05rem] leading-relaxed text-ink-muted">
              <p>
                We do more than build websites or analyze real estate. We help businesses rethink how
                they position themselves, connect with customers, structure operations, and
                communicate their value.
              </p>
              <p>
                Sometimes the brand, business concept, service offering, or customer experience needs
                to be reconsidered. The objective isn’t simply to make a business look better — it’s
                to help it work better.
              </p>
              <p className="border-l-2 border-accent pl-5 font-display text-xl italic text-ink">
                We don’t build a brand around what looks impressive. We build it around how the
                business serves its market.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-surface-muted p-6">
              <p className="text-sm font-semibold text-ink">Capabilities include</p>
              <ul className="mt-4 grid gap-2.5 text-[0.95rem] text-ink-muted">
                {capabilities.map((c) => (
                  <li key={c} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Example areas */}
      <Section tone="muted" spacing="lg">
        <Container>
          <SectionHeading eyebrow="How it shows up" title="Five ways we help businesses rethink" className="mb-10" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((e, i) => (
              <Reveal key={e.title} delay={(i % 3) * 0.05}>
                <Card className="h-full">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-on-dark">
                    <e.icon className="h-5 w-5 text-accent" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{e.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{e.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Hub Network case study */}
      {hub ? (
        <Section spacing="lg">
          <Container>
            <SectionHeading
              eyebrow="Case study"
              title="The Hub Network — a brand built around a better operating model"
              intro="Our clearest example of brand and business strategy: not a design project, but an operational and business decision that the brand was built to support."
              className="mb-10"
            />
            <div className="grid items-stretch gap-6 lg:grid-cols-2">
              <Reveal>
                <div className="grid h-full grid-cols-2 gap-1 overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
                  {hub.images.map((img) => (
                    <Image
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      width={1200}
                      height={800}
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="h-full w-full object-cover"
                    />
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-card)]">
                  <div className="flex flex-wrap gap-2">
                    {hub.capabilities.map((c) => (
                      <Badge key={c} tone="neutral">{c}</Badge>
                    ))}
                  </div>
                  <dl className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-ink-muted">
                    <div>
                      <dt className="font-semibold text-ink">The original challenge</dt>
                      <dd>{hub.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink">The strategy</dt>
                      <dd>{hub.solution}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink">The larger lesson</dt>
                      <dd>
                        Sometimes improving a business means rethinking the business itself. A new
                        website won’t solve every problem — the most valuable decision can be to
                        reposition the offering, simplify operations, or establish a different brand
                        identity.
                      </dd>
                    </div>
                  </dl>
                  {hub.url ? (
                    <a
                      href={hub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 font-semibold text-accent-strong hover:underline"
                    >
                      Visit The Hub Network <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>
      ) : null}

      <CTASection
        eyebrow="Let’s talk"
        title="Not sure whether it’s the brand, the business, or the website?"
        intro="That’s a good conversation to have. Tell us what feels off and we’ll help you figure out where the real opportunity is — and whether we’re the right fit to help."
        cta={{ label: 'Discuss Your Business Strategy', href: '/contact?service=brand-strategy' }}
        secondary={{ label: 'See Our Work', href: '/our-work' }}
      />
    </>
  );
}
