import type { Metadata } from 'next';
import Image from 'next/image';
import { Check, RefreshCcw, TrendingUp, Calculator, MonitorSmartphone, ClipboardList, KeyRound } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { FaqAccordion } from '@/components/shared/FaqAccordion';
import { Disclosure } from '@/components/shared/Disclosure';
import { CTASection } from '@/components/shared/CTASection';
import { SchemaScript } from '@/components/shared/SchemaScript';
import { Reveal } from '@/components/ui/Reveal';
import { Card } from '@/components/ui/Card';
import { serviceSchema, faqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Asset Management & Repositioning — Rochester MN',
  description:
    'Help for commercial property owners: reposition underperforming real estate, improve occupancy and revenue, analyze NOI and operating expenses, add practical technology, and strengthen ongoing operations. Owner-operated in Rochester, MN.',
  alternates: { canonical: '/asset-management' },
};

const areas = [
  {
    icon: RefreshCcw,
    title: 'Property Repositioning',
    bullets: [
      'Analyze underutilized spaces',
      'Review layouts and tenant experience',
      'Evaluate alternate uses',
      'Develop improvement concepts',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Revenue & Occupancy',
    bullets: [
      'Analyze current rents and occupancy',
      'Evaluate competitive positioning',
      'Develop marketing strategies',
      'Improve lead-generation systems',
      'Identify lease-up opportunities',
    ],
  },
  {
    icon: Calculator,
    title: 'Financial Performance',
    bullets: [
      'Analyze NOI',
      'Review operating-expense categories',
      'Evaluate vendor contracts',
      'Develop annual budgets',
      'Model capital improvements',
      'Assess cash flow & refinancing scenarios',
    ],
  },
  {
    icon: MonitorSmartphone,
    title: 'Technology',
    bullets: [
      'Property websites',
      'Automated leasing inquiries',
      'Tenant communication systems',
      'Maintenance workflows',
      'Dashboards and reporting',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Asset Management',
    bullets: [
      'Ongoing operational oversight',
      'Performance monitoring',
      'Business planning',
      'Implementation coordination',
      'Owner reporting',
    ],
  },
  {
    icon: KeyRound,
    title: 'Property Management',
    bullets: [
      'Full property management or leasing services may be available through appropriately licensed arrangements, where applicable.',
    ],
  },
];

const pricing = [
  { name: 'One-time assessment', text: 'A focused review of a property with clear findings and recommendations.' },
  { name: 'Project-based implementation', text: 'A scoped project to put specific improvements in place.' },
  { name: 'Fixed monthly fee', text: 'Ongoing oversight and reporting at a predictable rate.' },
  { name: 'Negotiated percentage', text: 'For deeper engagements, a share of property revenue — scoped per property.' },
];

const faqs = [
  {
    q: 'What does “repositioning” actually mean?',
    a: 'Repositioning is changing how a property is used, presented, or operated so it performs better — for example, converting underused office into a furnished private-office concept, improving the tenant experience, or sharpening how availability is marketed. It’s about getting more value out of the space you already own.',
  },
  {
    q: 'What is NOI, and why do you focus on it?',
    a: 'NOI (Net Operating Income) is a property’s income after operating expenses but before financing and income taxes. It’s the clearest measure of how the property itself is performing — and small, durable improvements to income or expenses can meaningfully change value. We look at both sides: growing revenue and tightening costs.',
  },
  {
    q: 'Do you manage my property or lease it for me?',
    a: 'Our core work is analysis, strategy, technology, and implementation coordination — not activities that require a real estate brokerage or property-management license. Full property management or leasing can be arranged through appropriately licensed arrangements where applicable. We’ll always be clear about which is which.',
  },
  {
    q: 'How is this priced?',
    a: 'Depending on scope: a one-time assessment, a project-based implementation, a fixed monthly fee, or a negotiated percentage of property revenue for deeper engagements. Any percentage is a scoping concept, not a published rate — we agree on terms before we start.',
  },
];

export default function AssetManagementPage() {
  return (
    <>
      <SchemaScript
        schema={[
          serviceSchema(
            'Asset Management & Repositioning',
            'Reposition underperforming commercial real estate, improve occupancy and revenue, analyze NOI and operating expenses, add technology, and strengthen operations.',
            '/asset-management',
          ),
          faqSchema(faqs),
        ]}
      />

      <PageHeader
        eyebrow="Asset Management & Repositioning"
        title="Make Your Property Perform Better."
        intro="If you own commercial real estate that isn’t performing the way you hoped, we can help you figure out why — and do something about it. We’ve repositioned and operated our own properties, so this isn’t theory."
        primary={{ label: 'Discuss My Property', href: '/contact?service=property' }}
      />

      {/* Problem / why it matters */}
      <Section spacing="lg">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="The problem we solve"
              title="Underperforming space is a solvable problem."
            />
            <div className="measure mt-5 space-y-4 text-[1.05rem] leading-relaxed text-ink-muted">
              <p>
                A lot of commercial property quietly underperforms — a few vacant suites, rents
                that trail the market, expenses that have crept up, or a tenant experience that
                makes space hard to lease. Owners often know something’s off but don’t have the
                time to dig in.
              </p>
              <p>
                That’s exactly the work we do on our own buildings: look hard at the numbers and
                the experience, find the opportunities, and put practical improvements in place —
                from repositioning and marketing to technology and tighter operations.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
              <Image
                src="/photos/hub-on-3rd.jpg"
                alt="The Hub on 3rd — a Slingshot office property repositioned into a private-office community"
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Service areas */}
      <Section tone="muted" spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="How we help"
            title="Where we can make a difference"
            className="mb-10"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 0.05}>
                <Card className="h-full">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent-strong">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{a.title}</h3>
                  <ul className="mt-3 space-y-2 text-[0.95rem] text-ink-muted">
                    {a.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" /> {b}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Example + what you receive */}
      <Section spacing="lg">
        <Container className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="A realistic example" title="From underused to fully occupied" />
            <p className="measure mt-5 text-[1.05rem] leading-relaxed text-ink-muted">
              We took a set of underutilized office condominiums and repositioned them into The Hub
              on 3rd — a furnished private-office community with a real brand, a website, and a
              simple leasing-inquiry workflow. The result was a fully occupied concept. The same
              playbook — concept, presentation, technology, and follow-through — applies to a lot of
              underperforming space.
            </p>
            <p className="mt-3 text-sm text-ink-faint">
              Example from a Slingshot-owned property; results reflect multiple factors and aren’t a
              guarantee.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-surface-muted p-6">
              <h3 className="font-semibold text-ink">What you receive</h3>
              <ul className="mt-4 space-y-2.5 text-[0.95rem] text-ink-muted">
                {[
                  'A clear-eyed assessment of the property’s performance',
                  'Specific, prioritized opportunities to improve it',
                  'Financial analysis (occupancy, NOI, expenses, scenarios) where relevant',
                  'A practical plan — and help putting it in place',
                  'Straight talk about what’s worth doing and what isn’t',
                ].map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" /> {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Pricing approach */}
      <Section tone="muted" spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="How engagements work"
            title="Flexible, scoped to your property"
            intro="We structure the work to fit the situation — and agree on terms before we start."
            className="mb-10"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pricing.map((p) => (
              <div key={p.name} className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
                <h3 className="font-semibold text-ink">{p.name}</h3>
                <p className="mt-2 text-[0.95rem] text-ink-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ + disclosure */}
      <Section spacing="lg">
        <Container size="narrow">
          <SectionHeading align="center" eyebrow="FAQ" title="Common questions" className="mb-8" />
          <FaqAccordion items={faqs} />
          <div className="mt-8">
            <Disclosure>
              Asset management &amp; repositioning is advisory, analysis, technology, and
              implementation-coordination work. It is not real estate brokerage, property
              management, legal, tax, or appraisal services, and it is not an investment
              recommendation. Activities requiring a real estate or property-management license are
              only provided through appropriately licensed arrangements where applicable.
            </Disclosure>
          </div>
        </Container>
      </Section>

      <CTASection
        title="Think your property could do better?"
        intro="Tell us about it. We’ll give you an honest read on the opportunities — and whether we’re the right fit to help."
        cta={{ label: 'Discuss My Property', href: '/contact?service=property' }}
      />
    </>
  );
}
