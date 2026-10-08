import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Check,
  RefreshCcw,
  TrendingUp,
  Calculator,
  MonitorSmartphone,
  ClipboardList,
  KeyRound,
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
  title: 'Asset Management & Repositioning — Rochester MN',
  description:
    'Active, operator-led asset management for commercial property owners: reposition underperforming real estate, improve occupancy and revenue, protect NOI, add technology, and strengthen tenant relationships. Owner-operated in Rochester, MN.',
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
    icon: RefreshCcw,
    title: 'Property Repositioning',
    bullets: ['Analyze underutilized spaces', 'Review layouts and tenant experience', 'Evaluate alternate uses', 'Develop improvement concepts'],
  },
  {
    icon: TrendingUp,
    title: 'Revenue & Occupancy',
    bullets: ['Analyze current rents and occupancy', 'Evaluate competitive positioning', 'Develop marketing strategies', 'Improve lead-generation systems', 'Identify lease-up opportunities'],
  },
  {
    icon: Calculator,
    title: 'Financial Performance',
    bullets: ['Analyze NOI', 'Review operating-expense categories', 'Evaluate vendor contracts', 'Develop annual budgets', 'Model capital improvements', 'Assess cash flow & refinancing scenarios'],
  },
  {
    icon: MonitorSmartphone,
    title: 'Technology',
    bullets: ['Property websites', 'Automated leasing inquiries', 'Tenant communication systems', 'Maintenance workflows', 'Dashboards and reporting'],
  },
  {
    icon: ClipboardList,
    title: 'Asset Management',
    bullets: ['Ongoing operational oversight', 'Performance monitoring', 'Business planning', 'Implementation coordination', 'Owner reporting'],
  },
  {
    icon: KeyRound,
    title: 'Property Management',
    bullets: ['Full property management or leasing services may be available through appropriately licensed arrangements, where applicable.'],
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
  { name: 'Project-based repositioning fee', text: 'A scoped project to put specific improvements in place.' },
  { name: 'Fixed monthly retainer', text: 'Ongoing oversight and reporting at a predictable rate.' },
  { name: 'Initial minimum retainer', text: 'A modest retainer during a stabilization period while the improvement plan is developed.' },
  { name: 'Performance- or revenue-based', text: 'Where legally permissible, a fee tied to results or a defined share of property revenue.' },
  { name: 'Custom ongoing engagement', text: 'A tailored asset-management arrangement for a specific portfolio or situation.' },
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
    a: 'Our core work is analysis, strategy, technology, and implementation coordination — not activities that require a real estate brokerage or property-management license. Full property management or leasing can be arranged through appropriately licensed arrangements where applicable. We’ll always be clear about which is which.',
  },
  {
    q: 'How is this priced?',
    a: 'Flexibly, to fit the property and the owner: a one-time assessment, a project-based repositioning fee, a fixed monthly retainer, a modest initial retainer during stabilization, a performance- or revenue-based arrangement where legally permissible, or a custom ongoing engagement. Any percentage-based fee is defined carefully — the revenue base, responsibilities, exclusions, and licensing — and agreed before we start. These are conceptual structures, not published rates.',
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
            'Asset Management & Repositioning',
            'Active, operator-led asset management: reposition underperforming commercial real estate, improve occupancy and revenue, protect NOI, add technology, and strengthen operations and tenant relationships.',
            '/asset-management',
          ),
          faqSchema(faqs),
        ]}
      />

      <PageHeader
        eyebrow="Asset Management & Repositioning"
        title="Your Property Needs More Than a Listing."
        intro="We help commercial property owners look beyond vacancy and identify what’s actually limiting a property’s performance — from positioning and tenant experience to operating costs, technology, and revenue opportunities. We’ve repositioned and operated our own buildings, so this isn’t theory."
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
          <SectionHeading eyebrow="How we help" title="Where we can make a difference" className="mb-10" />
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
              not a published promise or an automatic formula. Any percentage-based fee is defined
              carefully, including the revenue base, responsibilities, exclusions, and applicable
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
              Asset management &amp; repositioning is advisory, analysis, technology, and
              implementation-coordination work. It is not real estate brokerage, property management,
              legal, tax, or appraisal services, and it is not an investment recommendation.
              Activities requiring a real estate or property-management license are only provided
              through appropriately licensed arrangements where applicable, and any
              performance- or revenue-based fee is structured to comply with applicable law.
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
