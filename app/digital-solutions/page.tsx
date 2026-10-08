import type { Metadata } from 'next';
import { Check, ArrowRight, Sparkles, Workflow } from 'lucide-react';
import { getService } from '@/data/services';
import { webPackage, carePlan, carePlansNote, costLayers } from '@/data/packages';
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
import { serviceSchema, faqSchema } from '@/lib/schema';

const service = getService('digital-solutions')!;

export const metadata: Metadata = {
  title: 'Custom Business Websites — $750 — Rochester MN',
  description:
    'One custom business website for $750: conversion-focused design, lead capture, automated inquiry emails, AI chat assistants, and scheduling. Optional $35/mo care. Built by Slingshot Advisory in Rochester, MN.',
  alternates: { canonical: service.route },
};

export default function Page() {
  const ai = service.sections.find((s) => s.title === 'AI Assistants');
  const automation = service.sections.find((s) => s.title === 'Business Automation');
  const pkg = webPackage;

  return (
    <>
      <SchemaScript
        schema={[serviceSchema(service.title, service.hero.sub, service.route), faqSchema(service.faqs)]}
      />

      <PageHeader
        eyebrow="Digital Development & Automation"
        title="Your Business Is Different. Your Website Should Be Too."
        intro="We start by understanding your business, the challenges you’re facing, and how customers interact with you. Then we build a custom website designed to eliminate friction, generate inquiries, and simplify everyday operations — one flat price, no template."
        primary={{ label: 'Build My Website — $750', href: '/get-started' }}
        secondary={{ label: 'Discuss a Custom Project', href: '/contact?service=ai-automation' }}
      />

      {/* Why this offering exists — the Wix/Squarespace story */}
      <Section spacing="lg">
        <Container size="narrow">
          <SectionHeading eyebrow="Why we do this" title="We started where a lot of owners do." className="mb-6" />
          <Reveal>
            <div className="measure space-y-4 text-[1.08rem] leading-relaxed text-ink-muted">
              <p>
                Many business owners start with Wix or Squarespace. We did too. They’re a fine place
                to begin — but creating a website is only the beginning.
              </p>
              <p>
                As our businesses grew, we realized the real value was in connecting the website to
                everything around it: customer inquiries, availability, reservations, email
                workflows, and the other systems that actually run a business. So we learned to
                build custom solutions that address the real needs of each business.
              </p>
              <p>
                Could business owners learn to do this themselves? Absolutely. But most are busy
                operating their businesses, and navigating code, APIs, hosting, database
                connections, and automation tools becomes cumbersome fast.{' '}
                <span className="font-semibold text-ink">That’s where we can help.</span>
              </p>
              <p className="border-l-2 border-accent pl-5 font-display text-xl italic text-ink">
                We don’t start with a template. We start by understanding what your customers need.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* The single offer */}
      <Section id="packages" tone="muted" spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="One simple offer"
            title="Custom Business Website — $750"
            intro="No confusing tiers. One custom website, built around your business and your customers, for a flat one-time price with a clearly agreed scope."
            className="mb-10"
          />
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-accent/40 bg-surface p-7 shadow-[var(--shadow-card)] ring-1 ring-accent/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-ink">{pkg.name}</h3>
                  <Badge tone="accent">One-time</Badge>
                </div>
                <p className="mt-2 font-display text-5xl font-semibold text-ink">{pkg.priceDisplay}</p>
                <p className="mt-1 text-[0.95rem] text-ink-muted">{pkg.ideal}</p>
                <p className="mt-5 text-sm font-semibold text-ink">Services and potential features include:</p>
                <ul className="mt-3 grid flex-1 gap-2.5 sm:grid-cols-2 text-[0.95rem] text-ink-muted">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" /> {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-ink-faint">
                  These are examples of capabilities, not a promise that every advanced feature or
                  third-party integration is included for $750. The base price covers a custom website
                  with a clearly agreed scope; more complex integrations, databases, booking
                  infrastructure, or extensive development can be quoted separately.
                </p>
                <Button href="/get-started" variant="accent" size="lg" className="mt-6 w-full sm:w-auto">
                  {pkg.cta}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex h-full flex-col gap-5">
                <div className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
                  <h4 className="font-semibold text-ink">How it works</h4>
                  <ol className="mt-3 space-y-2 text-[0.92rem] text-ink-muted">
                    <li>1. Pay a $500 deposit, credited toward the $750 total.</li>
                    <li>2. Book a discovery / strategy call.</li>
                    <li>3. We learn your business and confirm the scope.</li>
                    <li>4. We build and launch your site.</li>
                    <li>5. $250 balance due at the agreed launch milestone.</li>
                  </ol>
                </div>
                <div className="rounded-2xl border border-dashed border-border bg-surface p-6 shadow-[var(--shadow-card)]">
                  <h4 className="font-semibold text-ink">Something more complex?</h4>
                  <p className="mt-2 text-[0.92rem] text-ink-muted">
                    Live inventory or availability, custom booking systems, databases, secure portals,
                    heavy AI usage, or complex external APIs are scoped and quoted separately.
                  </p>
                  <Button href="/contact?service=ai-automation" variant="outline" size="sm" className="mt-4">
                    Get a Custom Quote <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* AI + automation capabilities */}
      <Section spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="Beyond the website"
            title="Practical automation that actually helps"
            intro="Technology should solve a real problem, not create another system to manage. Where it earns its keep, we add:"
            className="mb-10"
          />
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

      {/* Care + transparent cost layers */}
      <Section tone="muted" spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="After launch"
            title="Transparent, affordable, and honest about costs"
            intro="We separate what you pay for so there are no surprises — a one-time build, optional care, real pass-through costs, and anything bigger quoted on its own."
            className="mb-10"
          />
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-semibold text-ink">{carePlan.name}</h3>
              <p className="mt-1 font-display text-4xl font-semibold text-ink">{carePlan.price}</p>
              <p className="mt-1 text-sm text-ink-muted">{carePlan.summary}</p>
              <ul className="mt-4 space-y-2 border-t border-border pt-4 text-[0.95rem] text-ink-muted">
                {carePlan.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {costLayers.map((l) => (
                <div key={l.title} className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
                  <h4 className="font-semibold text-ink">{l.title}</h4>
                  <p className="mt-1.5 text-[0.92rem] text-ink-muted">{l.text}</p>
                </div>
              ))}
            </div>
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
        intro="Start your custom $750 website today — or tell us about something more complex and we’ll scope it with you."
        cta={{ label: 'Build My Website — $750', href: '/get-started' }}
        secondary={{ label: 'Discuss a Custom Project', href: '/contact?service=ai-automation' }}
      />
    </>
  );
}
