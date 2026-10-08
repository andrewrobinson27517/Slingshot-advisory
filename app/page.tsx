import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Building } from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTASection } from '@/components/shared/CTASection';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { founder } from '@/data/founder';
import { caseStudies } from '@/data/caseStudies';
import { divisions } from '@/data/services';
import { webPackage } from '@/data/packages';
import { work } from '@/data/work';

const websiteFeatures = [
  'Customer inquiry forms',
  'Booking & availability requests',
  'Automated email responses',
  'Office or property availability',
  'Lead qualification',
  'AI-assisted visitor support',
  'CRM integrations',
  'Customer follow-up workflows',
];

const realEstateHelp = [
  'Lease cost analysis',
  'CAM reconciliation reviews',
  'Renewal financial modeling',
  'Real estate underwriting',
  'Property positioning',
  'Marketing & positioning concepts',
  'Operating expense reviews',
  'NOI analysis',
  'Property performance assessment',
];

export default function HomePage() {
  const projects = ['roses-village', 'bazooka-arcade', 'seven-medicine']
    .map((s) => work.find((w) => w.slug === s))
    .filter(Boolean);

  return (
    <>
      <Hero />

      {/* 2 — Why Slingshot Advisory exists (founder) */}
      <Section spacing="lg">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
              <Image
                src={founder.photo.src}
                alt={founder.photo.alt}
                width={founder.photo.width}
                height={founder.photo.height}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold text-ink">{founder.name}</p>
              <p className="text-[0.95rem] text-ink-muted">{founder.title}</p>
              <p className="text-[0.9rem] text-ink-faint">{founder.also}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="Why we started"
              title="We Built It for Ourselves. Now We’re Helping Others."
            />
            <div className="measure mt-5 space-y-4 text-[1.05rem] leading-relaxed text-ink-muted">
              {founder.story.slice(0, 3).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <blockquote className="mt-6 border-l-2 border-accent pl-5 font-display text-xl italic leading-relaxed text-ink">
              “{founder.principle.statement}” We listen to the market, find the friction, and build a
              practical solution — whether that’s a website, a brand, or a better-run property.
            </blockquote>
            <Button href="/about" variant="outline" className="mt-6">
              Read the full story <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* 3 — Three ways we help */}
      <Section id="services" tone="muted" spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="How we help"
            title="Three Ways We Help"
            intro="Practical, fairly priced help in the areas we know firsthand — because we’ve done the work ourselves."
            className="mb-10"
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {divisions.map((d, i) => (
              <Reveal key={d.key} delay={i * 0.06}>
                <Link
                  href={d.route}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-on-dark">
                    <d.icon className="h-6 w-6 text-accent" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-ink">{d.title}</h3>
                  <p className="mt-2 flex-1 text-[0.98rem] leading-relaxed text-ink-muted">{d.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-accent-strong">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Brand & strategy — the capability woven through the others */}
          <Reveal>
            <Link
              href="/brand-strategy"
              className="group mt-5 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)] transition-all hover:border-accent/40 hover:shadow-[var(--shadow-card-hover)] sm:flex-row sm:items-center"
            >
              <div>
                <p className="text-eyebrow text-accent-strong">And sometimes it’s bigger than one of those</p>
                <h3 className="mt-1 text-xl font-semibold text-ink">
                  Brand &amp; Business Strategy
                </h3>
                <p className="measure mt-1 text-[0.98rem] text-ink-muted">
                  Sometimes the problem isn’t the website — it’s the brand, the concept, or how the
                  business is run. We help owners rethink positioning, customer experience, and
                  operations so the whole thing works better.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-accent-strong">
                Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        </Container>
      </Section>

      {/* 4 — Real results (case studies) */}
      <Section spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="Real results"
            title="The Experience Behind the Advice."
            intro="These are real Slingshot-owned properties we’ve repositioned and operated ourselves. The advice we give others comes from doing this work with our own money on the line."
            className="mb-10"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {caseStudies.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 2) * 0.06}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)]">
                  <div className="relative">
                    <Image
                      src={c.image.src}
                      alt={c.image.alt}
                      width={1200}
                      height={800}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="aspect-[16/9] w-full object-cover"
                    />
                    {c.metric ? (
                      <div className="absolute bottom-3 left-3 rounded-lg bg-navy/85 px-3 py-2 backdrop-blur-sm">
                        <p className="font-display text-2xl font-semibold leading-none text-on-dark">
                          {c.metric.value}
                        </p>
                        <p className="text-xs text-on-dark-muted">{c.metric.label}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2">
                      <Badge tone="accent">{c.category}</Badge>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-ink">{c.name}</h3>
                    <dl className="mt-3 space-y-2 text-[0.95rem] text-ink-muted">
                      <div>
                        <dt className="font-semibold text-ink">Challenge</dt>
                        <dd>{c.challenge}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-ink">What we did</dt>
                        <dd>{c.action}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-ink">Result</dt>
                        <dd>{c.result}</dd>
                      </div>
                    </dl>
                    <p className="mt-auto border-t border-border pt-3 text-[0.9rem] italic text-ink-faint">
                      {c.lesson}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 measure text-sm text-ink-faint">
            Figures shown are owner-reported and approximate, and reflect multiple contributing
            factors. They’re examples of the work, not guarantees of future results.
          </p>
        </Container>
      </Section>

      {/* 5 — Websites that work */}
      <Section tone="muted" spacing="lg">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="Websites that work"
                title="Your Website Should Be Working for Your Business."
                intro="There’s a big difference between an online brochure and a website that actually brings in customers. We build the second kind — with the practical features that turn visitors into inquiries."
              />
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {websiteFeatures.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[0.95rem] text-ink-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/get-started" variant="accent">Build My Website</Button>
                <Button href="/digital-solutions" variant="outline">See pricing & details</Button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-3">
                {projects.map((p) =>
                  p ? (
                    <a
                      key={p.slug}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-accent/40"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-ink">{p.name}</p>
                        <p className="truncate text-[0.95rem] text-ink-muted">{p.tagline}</p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-ink-faint transition-colors group-hover:text-accent" />
                    </a>
                  ) : null,
                )}
                <p className="text-xs text-ink-faint">Live sites we’ve designed and built. Visit them to see the work.</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 6 — Transparent pricing */}
      <Section spacing="lg">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Transparent pricing"
            title="One custom website. One honest price."
            intro="No inflated agency quotes and no confusing tiers — a custom website for a flat $750, with anything more complex scoped and quoted on its own."
            className="mb-10"
          />
          <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
            <div className="flex flex-col rounded-2xl border border-accent/40 bg-surface p-7 shadow-[var(--shadow-card)] ring-1 ring-accent/20">
              <p className="text-eyebrow text-accent-strong">{webPackage.name}</p>
              <p className="mt-2 font-display text-5xl font-semibold text-ink">{webPackage.priceDisplay}</p>
              <p className="mt-1 flex-1 text-sm text-ink-muted">
                {webPackage.tagline} $500 up front, $250 at launch.
              </p>
              <Button href="/get-started" variant="accent" className="mt-5 w-full">
                {webPackage.cta}
              </Button>
            </div>
            <div className="flex flex-col rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-card)]">
              <p className="text-eyebrow text-accent-strong">Custom Digital Solutions</p>
              <p className="mt-2 font-display text-5xl font-semibold text-ink">Quoted</p>
              <p className="mt-1 flex-1 text-sm text-ink-muted">
                AI assistants, booking systems, databases, and larger integrations.
              </p>
              <Button href="/contact?service=ai-automation" variant="outline" className="mt-5 w-full">
                Get a Quote
              </Button>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-ink-faint">
            Optional ongoing website care is $35/month (routine updates within limits). Hosting,
            domains, and any API/AI/third-party costs are billed as actual pass-through cost.
          </p>
        </Container>
      </Section>

      {/* 7 — Commercial real estate */}
      <Section tone="muted" spacing="lg">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
                <Image
                  src="/photos/rochester-exec-suites.jpg"
                  alt="Rochester Executive Suites — a Slingshot-owned office property"
                  width={1200}
                  height={800}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionHeading
                eyebrow="Commercial real estate"
                title="Better Spaces. Better Operations. Stronger Performance."
                intro="We’ve sat on both sides of the table — as a landlord and as a tenant. That perspective helps owners and tenants make clearer, better-informed decisions."
              />
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {realEstateHelp.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[0.95rem] text-ink-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/contact?service=property" variant="accent">Discuss My Property</Button>
                <Button href="/tenant-advisory" variant="outline">Lease &amp; cost analysis</Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 8 — Local commitment */}
      <Section tone="navy" spacing="md">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10">
                <Building className="h-6 w-6 text-accent" />
              </span>
              <h2 className="mt-5 text-3xl font-semibold text-on-dark sm:text-4xl">
                Rooted in Rochester. Focused on Your Business.
              </h2>
              <p className="measure mt-4 text-[1.05rem] leading-relaxed text-on-dark-muted">
                We live, work, and invest here. Our clients are local businesses, tenants,
                landlords, entrepreneurs, and property owners — people we see around town. Helping
                Rochester businesses grow, one business at a time, isn’t a slogan; it’s the plan.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[var(--shadow-hero)]">
              <Image
                src="/photos/rochester-local.jpg"
                alt="Downtown Rochester, Minnesota"
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 9 — Friendly CTA */}
      <CTASection
        eyebrow="Let’s talk"
        title="Have Something You’re Trying to Figure Out?"
        intro="Whether it’s a website, a complicated lease, or a property that isn’t performing the way you’d hoped, we’re happy to have a conversation. If we can help, we’ll explain how. If there’s a better solution, we’ll point you in the right direction."
        cta={{ label: 'Build My Website', href: '/get-started' }}
        secondary={{ label: 'Discuss a Challenge', href: '/contact' }}
      />
    </>
  );
}
