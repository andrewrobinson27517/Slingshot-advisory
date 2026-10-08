import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Check,
  RefreshCcw,
  TrendingUp,
  Calculator,
  MonitorSmartphone,
  ClipboardList,
  Eye,
  Search,
  Hammer,
  Gauge,
  Users,
  MapPin,
} from 'lucide-react';
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
import { Badge } from '@/components/ui/Badge';
import { caseStudies } from '@/data/caseStudies';
import { serviceSchema, faqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Commercial Property Performance & Repositioning — Rochester MN',
  description:
    'Operator-led analysis and strategy for commercial property owners: assess financial and operational performance, find the friction, and evaluate practical ways to improve occupancy, operating expenses, tenant experience, and long-term value. Analysis and strategy — not brokerage or property management. Rochester, MN.',
  alternates: { canonical: '/asset-management' },
};

const whyUnderperforms = [
  'Outdated or ineffective layouts',
  'Pricing that doesn’t match tenant demand',
  'Inflexible lease structures',
  'A weak digital presence',
  'Slow inquiry response',
  'Limited amenities',
  'A weak tenant experience',
  'Operating expenses that are too high',
  'A property concept that no longer fits the market',
];

const areas = [
  {
    icon: Gauge,
    title: 'Property Performance Assessment',
    bullets: [
      'Financial statement analysis',
      'NOI evaluation',
      'Occupancy trend review',
      'Operating expense comparisons',
      'Revenue opportunity assessment',
      'Property positioning analysis',
    ],
  },
  {
    icon: RefreshCcw,
    title: 'Repositioning Strategy',
    bullets: [
      'Space utilization concepts',
      'Customer & tenant experience assessment',
      'Market positioning',
      'Brand development',
      'Amenity strategy',
      'Digital presence & inquiry-workflow analysis',
      'Capital-improvement scenarios',
    ],
  },
  {
    icon: Calculator,
    title: 'Financial Analysis',
    bullets: [
      'Cash-flow forecasting',
      'DSCR analysis',
      'Refinancing scenario modeling',
      'Expense-reduction opportunities',
      'Revenue sensitivity analysis',
    ],
  },
  {
    icon: MonitorSmartphone,
    title: 'Technology & Operations Consulting',
    bullets: [
      'Property websites',
      'Inquiry automation',
      'Customer communication workflows',
      'Reporting dashboards',
      'Administrative process improvements',
    ],
  },
];

const process = [
  { icon: Search, title: 'Understand the property', text: 'Review financials, occupancy, rental rates, expenses, physical layout, current marketing, and tenant experience.' },
  { icon: Eye, title: 'Identify the friction', text: 'Determine why prospects may not be converting, why tenants may be leaving, and whether the space meets current market needs.' },
  { icon: Hammer, title: 'Build an improvement strategy', text: 'Consider layout, pricing, capital improvements, marketing, amenities, and customer experience.' },
  { icon: ClipboardList, title: 'Execute within authorized scope', text: 'Support improvements, technology, operating processes, and owner decisions — using properly licensed professionals where brokerage, leasing, or management activities require them.' },
  { icon: Gauge, title: 'Measure performance', text: 'Track occupancy, revenue, expenses, NOI, inquiry activity, and tenant retention — and keep adjusting.' },
];

const noi = {
  revenue: ['Occupancy improvements', 'Rent and pricing analysis', 'Space utilization', 'Tenant retention', 'Additional income opportunities'],
  expense: ['Vendor expense reviews', 'Utility and operating-cost analysis', 'Budget preparation', 'Expense benchmarking', 'Technology and administrative efficiency'],
  strategy: ['NOI analysis', 'Debt-service coverage', 'Refinance scenarios', 'Capital-expenditure planning', 'Operating forecasts'],
};

const pricing = [
  { name: 'One-time property assessment', text: 'A focused review of a property with clear findings and recommendations.' },
  { name: 'Project-based repositioning strategy', text: 'A scoped strategy project — concept, financial analysis, and a practical plan.' },
  { name: 'Fixed monthly retainer', text: 'Ongoing analysis, planning, and reporting at a predictable rate.' },
  { name: 'Initial minimum retainer', text: 'A modest retainer during a stabilization period while the improvement plan is developed.' },
  { name: 'Custom ongoing engagement', text: 'A tailored advisory arrangement for a specific property or portfolio.' },
];

const faqs = [
  {
    q: 'What does “repositioning” actually mean?',
    a: 'Repositioning is changing how a property is used, presented, or operated so it performs better — for example, converting underused office into a furnished private-office concept, improving the tenant experience, or sharpening how availability is marketed. It’s about getting more value out of the space you already own.',
  },
  {
    q: 'What is NOI, and why do you focus on it?',
    a: 'NOI (Net Operating Income) is a property’s income after operating expenses but before financing and income taxes. It’s the clearest measure of how the property itself is performing — and small, durable improvements to income or expenses can meaningfully change value and your options at refinance or sale. We look at both sides: growing revenue and tightening costs.',
  },
  {
    q: 'How are you different from my broker?',
    a: 'We’re not a substitute for a good broker, and a broker may be marketing your property well. The difference is perspective: we approach real estate as active owners and operators. A broker markets the property as it is; we help you decide whether the underlying offering — layout, pricing, lease structure, amenities, technology, concept — should change so it performs better.',
  },
  {
    q: 'Do you manage my property or lease it for me?',
    a: 'No. This service is analysis, strategy, financial planning, marketing concepts, and technology — not property management, leasing, or brokerage, which require appropriate licensing. We’re currently validating demand for those services; if you need them, tell us and we’ll discuss whether an appropriately licensed provider is the right fit. We don’t accept management or brokerage engagements we aren’t authorized to perform.',
  },
  {
    q: 'How is this priced?',
    a: 'Flexibly, to fit the property and the owner: a one-time assessment, a project-based repositioning strategy, a fixed monthly retainer, a modest initial retainer during stabilization, or a custom ongoing advisory engagement. Any performance- or revenue-linked arrangement would be structured with legal and licensing review before it’s offered. These are conceptual structures, not published rates, and we agree on terms before we start.',
  },
];

const propertyCases = ['hub-on-3rd', 'rochester-executive-suites', 'furnished-stays']
  .map((s) => caseStudies.find((c) => c.slug === s))
  .filter((c): c is NonNullable<typeof c> => Boolean(c));

export default function AssetManagementPage() {
  return (
    <>
      <SchemaScript
        schema={[
          serviceSchema(
            'Commercial Property Performance & Repositioning',
            'Operator-led analysis and strategy for commercial property owners: assess financial and operational performance, identify friction, and evaluate practical ways to improve occupancy, expenses, tenant experience, and value. Analysis and strategy, not brokerage or property management.',
            '/asset-management',
          ),
          faqSchema(faqs),
        ]}
      />

      <PageHeader
        eyebrow="Commercial Property Performance & Repositioning"
        title="Your Property May Have More Potential Than Its Current Performance Suggests."
        intro="We help commercial property owners better understand their property’s financial and operational performance, identify sources of friction, and evaluate practical opportunities to improve occupancy, operating expenses, tenant experience, and long-term value. Our initial work focuses on analysis, business strategy, financial planning, marketing concepts, and technology — not brokerage or property management."
        primary={{ label: 'Discuss My Property', href: '/contact?service=property' }}
      />

      {/* Problem */}
      <Section spacing="lg">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="The problem we solve" title="A vacant building rarely just needs more marketing." />
            <div className="measure mt-5 space-y-4 text-[1.05rem] leading-relaxed text-ink-muted">
              <p>
                Commercial owners sometimes assume a vacant building simply needs more advertising or
                more broker attention. But leasing problems are often more complicated than that.
              </p>
              <p>A property may underperform because of:</p>
            </div>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {whyUnderperforms.map((f) => (
                <li key={f} className="flex gap-2.5 text-[0.95rem] text-ink-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" /> {f}
                </li>
              ))}
            </ul>
            <p className="measure mt-5 text-[1.05rem] leading-relaxed text-ink-muted">
              A broker may market a property successfully, but the underlying offering may still need
              to change. That’s the work we do — on our own buildings and for other owners.
            </p>
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

      {/* Active vs passive ownership */}
      <Section tone="navy" spacing="lg">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              tone="on-dark"
              eyebrow="Active vs passive ownership"
              title="Passive Ownership Isn’t Always Passive Success."
            />
            <div className="measure mt-5 space-y-4 text-[1.05rem] leading-relaxed text-on-dark-muted">
              <p>
                Some investors want limited day-to-day involvement in their real estate. That’s
                completely understandable. But commercial performance often benefits from an operator
                who’s paying attention — to the property, the tenants, the market, the expenses, and
                the opportunities.
              </p>
              <p>
                Our approach is hands-on. We look for friction and work to remove it. Sometimes
                improving occupancy means redesigning spaces, introducing amenities, changing the
                operating concept, adjusting technology, or investing capital. The objective isn’t
                simply to fill a vacancy — it’s to create a property that better serves the
                businesses occupying it.
              </p>
              <p className="text-[0.95rem] leading-relaxed text-on-dark-muted">
                Through this service we provide strategic assessment and recommendations — the
                perspective of people who have actually owned and operated commercial property — not
                brokerage representation.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10">
              <MapPin className="h-6 w-6 text-accent" />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-on-dark">
              A local operator, for an out-of-state owner
            </h3>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-on-dark-muted">
              If you own Rochester property from out of state, a local operator can be a real
              advantage — not a guarantee of outperforming institutional management, but a difference
              in direct involvement, responsiveness, and accountability.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-[0.9rem] text-on-dark-muted">
              {[
                'Local market familiarity',
                'Direct awareness of tenant needs',
                'In-person property visits',
                'Understanding of competing offerings',
                'Faster problem identification',
                'Local professional relationships',
                'Coordinated improvement strategies',
                'Consistent owner communication',
              ].map((x) => (
                <li key={x} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {x}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Service areas */}
      <Section spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="How we help"
            title="Services we focus on"
            intro="Our initial work is analysis, strategy, financial planning, marketing concepts, and technology."
            className="mb-10"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {areas.map((a, i) => (
              <Reveal key={a.title} delay={(i % 2) * 0.05}>
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

          {/* What this service is NOT — licensing clarity */}
          <div className="mt-6 rounded-2xl border border-border bg-surface-muted p-6">
            <h3 className="font-semibold text-ink">What this service is — and isn’t</h3>
            <p className="measure mt-2 text-[0.95rem] leading-relaxed text-ink-muted">
              This is strategic assessment and recommendations. It is <strong>not</strong> brokerage
              representation, and it does not include placing tenants, negotiating leases, collecting
              rent for others, managing tenants on an owner’s behalf, or supervising third-party
              properties. If your situation needs full-service property management or brokerage, we’ll
              talk through whether an appropriately licensed provider is needed — we don’t accept those
              engagements unless and until we’re authorized to.
            </p>
          </div>
        </Container>
      </Section>

      {/* Our process */}
      <Section tone="muted" spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="Our approach"
            title="How we approach lease-up and repositioning"
            intro="A practical sequence we’ve run on our own properties — and adapt to yours."
            className="mb-10"
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((p, i) => (
              <Reveal key={p.title} delay={(i % 5) * 0.04}>
                <li className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                    <p.icon className="h-5 w-5 text-accent-strong" />
                  </div>
                  <h3 className="mt-4 font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-muted">{p.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* NOI */}
      <Section spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="Financial performance"
            title="Protect Your NOI. Strengthen Your Options."
            intro="A property’s Net Operating Income matters most when you’re refinancing, evaluating a sale, or protecting operating cash flow — especially amid higher borrowing costs, rising expenses, insurance and tax pressure, vacancy, and capital-improvement decisions. Before assuming a property should be sold, it’s often worth improving its financial position."
            className="mb-10"
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              { title: 'Revenue opportunities', items: noi.revenue, icon: TrendingUp },
              { title: 'Expense opportunities', items: noi.expense, icon: Calculator },
              { title: 'Financial strategy', items: noi.strategy, icon: Gauge },
            ].map((col) => (
              <Reveal key={col.title}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-on-dark">
                    <col.icon className="h-5 w-5 text-accent" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{col.title}</h3>
                  <ul className="mt-3 space-y-2 text-[0.95rem] text-ink-muted">
                    {col.items.map((x) => (
                      <li key={x} className="flex gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" /> {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 measure text-sm text-ink-faint">
            We focus on thoughtful analysis followed by practical action. We don’t promise refinancing
            outcomes, valuation increases, or guaranteed NOI growth.
          </p>
        </Container>
      </Section>

      {/* Repositioning case studies */}
      <Section tone="muted" spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="Real repositioning experience"
            title="We’ve done this with our own buildings"
            intro="Real examples from Slingshot-owned and operated properties — layout, technology, marketing, lease structures, tenant relationships, and new operating concepts."
            className="mb-10"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {propertyCases.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 0.05}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)]">
                  <div className="relative">
                    <Image
                      src={c.image.src}
                      alt={c.image.alt}
                      width={1200}
                      height={800}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="aspect-[16/10] w-full object-cover"
                    />
                    {c.metric ? (
                      <div className="absolute bottom-3 left-3 rounded-lg bg-navy/85 px-3 py-2 backdrop-blur-sm">
                        <p className="font-display text-2xl font-semibold leading-none text-on-dark">{c.metric.value}</p>
                        <p className="text-xs text-on-dark-muted">{c.metric.label}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <Badge tone="accent">{c.category}</Badge>
                    <h3 className="mt-3 text-lg font-semibold text-ink">{c.name}</h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-muted">{c.action}</p>
                    <p className="mt-auto border-t border-border pt-3 text-[0.9rem] italic text-ink-faint">{c.result}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 measure text-sm text-ink-faint">
            Figures are owner-reported and approximate, reflect multiple contributing factors, and are
            examples — not guarantees. They describe Slingshot-owned or affiliated properties.
          </p>
        </Container>
      </Section>

      {/* Tenant relationships */}
      <Section spacing="lg">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal delay={0.1} className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
              <Image
                src="/photos/hub-lounge.jpg"
                alt="A member lounge — the tenant experience inside a Slingshot property"
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent-strong">
              <Users className="h-6 w-6" />
            </span>
            <SectionHeading className="mt-5" eyebrow="Tenants & retention" title="Real Estate Is Still a Relationship Business." />
            <p className="measure mt-5 text-[1.05rem] leading-relaxed text-ink-muted">
              Tenants value responsive communication, a landlord who listens, practical lease
              arrangements, well-maintained spaces, a positive environment, and clear expectations.
              Technology should improve those experiences, not replace the human relationship.
            </p>
            <p className="measure mt-3 text-[1.05rem] leading-relaxed text-ink-muted">
              Continuity, trust, and tenant satisfaction meaningfully influence long-term retention —
              and retention is part of a property’s long-term operational value.
            </p>
          </div>
        </Container>
      </Section>

      {/* Fees */}
      <Section tone="muted" spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="How engagements work"
            title="Flexible fees, scoped to your property"
            intro="Every property and owner is different — a fully occupied building needs a different engagement than one that’s half empty. We don’t want fees to stop owners from getting help when a property needs it most, so we structure the work to fit."
            className="mb-10"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pricing.map((p) => (
              <div key={p.name} className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
                <h3 className="font-semibold text-ink">{p.name}</h3>
                <p className="mt-2 text-[0.95rem] text-ink-muted">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
            <p className="text-sm font-semibold text-ink">A conceptual example</p>
            <p className="measure mt-2 text-[0.95rem] leading-relaxed text-ink-muted">
              An office owner with significant vacancy might prefer a modest initial retainer while we
              develop the improvement plan. As occupancy and revenue improve, the arrangement could
              transition to another agreed structure. This is an illustration of how fees can flex —
              not a published promise or an automatic formula. Any performance- or revenue-linked
              arrangement would be evaluated and structured with legal and licensing review before
              it’s offered — including the revenue base, responsibilities, exclusions, and applicable
              licensing requirements.
            </p>
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
              Commercial Property Performance &amp; Repositioning is advisory, analysis, strategy, and
              technology work. It is not real estate brokerage, tenant representation, property
              management, leasing, legal, tax, or appraisal services, and it is not an investment
              recommendation. We do not currently provide — or accept engagements for — activities
              that require a real estate or property-management license; where those are needed, they
              would only be provided through appropriately licensed arrangements. Any performance- or
              revenue-linked fee would be structured to comply with applicable Minnesota law.
            </Disclosure>
          </div>
        </Container>
      </Section>

      <CTASection
        title="Think your property could do better?"
        intro="Tell us about it. We’ll give you an honest read on the opportunities — and whether we’re the right fit to help."
        cta={{ label: 'Discuss My Property', href: '/contact?service=property' }}
        secondary={{ label: 'See Our Work', href: '/our-work' }}
      />
    </>
  );
}
