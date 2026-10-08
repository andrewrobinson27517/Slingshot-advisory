import type { Metadata } from 'next';
import { Check, ArrowRight, Sparkles, Workflow } from 'lucide-react';
import { getService } from '@/data/services';
import { webPackages, carePlans, carePlansNote } from '@/data/packages';
import { PageHeader } from '@/components/shared/PageHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { FaqAccordion } from '@/components/shared/FaqAccordion';
import { Disclosure } from '@/components/shared/Disclosure';
import { CTASection } from '@/components/shared/CTASection';
import { SchemaScript } from '@/components/shared/SchemaScript';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { serviceSchema, faqSchema } from '@/lib/schema';

const service = getService('digital-solutions')!;

export const metadata: Metadata = {
  title: service.seo.title,
  description: service.seo.description,
  alternates: { canonical: service.route },
};

export default function Page() {
  const ai = service.sections.find((s) => s.title === 'AI Assistants');
  const automation = service.sections.find((s) => s.title === 'Business Automation');

  return (
    <>
      <SchemaScript
        schema={[serviceSchema(service.title, service.hero.sub, service.route), faqSchema(service.faqs)]}
      />

      <PageHeader
        eyebrow="Website Development"
        title={service.hero.headline}
        intro={service.hero.sub}
        primary={{ label: 'Build My Website — $500', href: '/get-started?package=starter' }}
        secondary={{ label: 'Business Website+ — $750', href: '/get-started?package=business-plus' }}
      />

      {/* Founder framing */}
      <Section spacing="md">
        <Container size="narrow">
          <Reveal>
            <p className="measure text-[1.1rem] leading-relaxed text-ink-muted">
              The founder started where a lot of owners do — building on Squarespace and Wix —
              then learned to implement custom-coded websites, APIs, integrations, automation, and
              lead-generation systems. Plenty of business owners could learn these tools too; they
              just don’t have the time or the appetite to maintain integrations and backend
              workflows. <span className="font-semibold text-ink">We make that part easy.</span>
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Packages — direct purchase */}
      <Section id="packages" tone="muted" spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="Pick a package"
            title="Straightforward pricing. Real results."
            intro="These aren’t inflated agency brochure sites — they’re customized websites built to turn visitors into inquiries, appointments, and customers. Buy directly and get started today."
            className="mb-10"
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {webPackages.map((p) => (
              <Reveal key={p.id}>
                <div
                  className={cn(
                    'flex h-full flex-col rounded-2xl border bg-surface p-6 shadow-[var(--shadow-card)]',
                    p.id === 'business-plus' ? 'border-accent/50 ring-1 ring-accent/30' : 'border-border',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-ink">{p.name}</h3>
                    {p.id === 'business-plus' ? <Badge tone="accent">Most popular</Badge> : null}
                  </div>
                  <p className="mt-2 font-display text-4xl font-semibold text-ink">{p.priceDisplay}</p>
                  <p className="mt-1 text-[0.95rem] text-ink-muted">{p.tagline}</p>
                  <p className="mt-1 text-sm text-ink-faint">{p.ideal}</p>
                  <ul className="mt-5 flex-1 space-y-2.5 border-t border-border pt-5 text-[0.95rem] text-ink-muted">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" /> {f}
                      </li>
                    ))}
                  </ul>
                  {p.balanceNote ? (
                    <p className="mt-4 text-xs text-ink-faint">{p.balanceNote}</p>
                  ) : null}
                  <Button
                    href={`/get-started?package=${p.id}`}
                    variant={p.id === 'business-plus' ? 'accent' : 'primary'}
                    className="mt-6 w-full"
                  >
                    {p.cta}
                  </Button>
                </div>
              </Reveal>
            ))}

            {/* Custom automation — quote */}
            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-dashed border-border bg-surface p-6 shadow-[var(--shadow-card)] lg:col-span-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-ink">Custom Automation</h3>
                  <p className="mt-2 measure text-[0.95rem] text-ink-muted">
                    For more complex businesses — live inventory or availability, custom booking
                    systems, AI chat assistants, CRM integrations, multiple automated workflows,
                    secure customer portals, or complex external API connections.
                  </p>
                </div>
                <Button href="/contact?service=ai-automation" variant="outline" className="mt-4 shrink-0 lg:mt-0">
                  Get a Custom Quote <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>

          <p className="mt-6 measure text-sm text-ink-faint">
            Complex booking systems, advanced databases, specialized APIs, and extensive AI
            functionality require separate quotes. Any extras beyond a package’s defined scope are
            quoted separately — no surprises.
          </p>
        </Container>
      </Section>

      {/* AI + automation capabilities */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {[
              { icon: Sparkles, sec: ai },
              { icon: Workflow, sec: automation },
            ].map(({ icon: Icon, sec }) =>
              sec ? (
                <Reveal key={sec.title}>
                  <div className="h-full rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-card)]">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-on-dark">
                      <Icon className="h-5 w-5 text-accent" />
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-ink">{sec.title}</h3>
                    <ul className="mt-4 space-y-2 text-[0.95rem] text-ink-muted">
                      {sec.bullets?.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" /> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ) : null,
            )}
          </div>
        </Container>
      </Section>

      {/* Care plans */}
      <Section tone="muted" spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="Ongoing website care"
            title="Affordable support after launch"
            intro="Optional plans that keep your site healthy — without an agency retainer. Opt in only if you want it."
            className="mb-10"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:max-w-3xl">
            {carePlans.map((plan) => (
              <div key={plan.name} className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
                <h3 className="text-lg font-semibold text-ink">{plan.name}</h3>
                <p className="mt-1 font-display text-3xl font-semibold text-ink">{plan.price}</p>
                <p className="mt-1 text-sm text-ink-muted">{plan.summary}</p>
                <ul className="mt-4 space-y-2 border-t border-border pt-4 text-[0.95rem] text-ink-muted">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 measure text-sm text-ink-faint">{carePlansNote}</p>
        </Container>
      </Section>

      {/* FAQ + disclosure */}
      <Section spacing="lg">
        <Container size="narrow">
          <SectionHeading align="center" eyebrow="FAQ" title="Common questions" className="mb-8" />
          <FaqAccordion items={service.faqs} />
          <div className="mt-8">
            <Disclosure>{service.disclaimer}</Disclosure>
          </div>
        </Container>
      </Section>

      <CTASection
        title="Ready for a website that works for you?"
        intro="Pick a package and get started in minutes — or ask us about something more custom."
        cta={{ label: 'Build My Website', href: '/get-started' }}
      />
    </>
  );
}
