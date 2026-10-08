import Link from 'next/link';
import { ArrowUpRight, Compass, Layers, Target, MessageCircle, FileText, Rocket } from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { ServiceCards } from '@/components/home/ServiceCards';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTASection } from '@/components/shared/CTASection';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { work } from '@/data/work';

const principles = [
  {
    icon: Compass,
    title: 'Operator-Led Perspective',
    text: 'Recommendations shaped by firsthand business ownership and operations — not theory from the sidelines.',
  },
  {
    icon: Layers,
    title: 'Financial & Technical Expertise',
    text: 'We connect financial analysis, practical workflows, and modern technology into solutions you can actually use.',
  },
  {
    icon: Target,
    title: 'Focused, Actionable Deliverables',
    text: 'Clear scopes, practical recommendations, and results you can put to work — no open-ended engagements.',
  },
];

const steps = [
  { icon: MessageCircle, title: 'Tell Us About Your Challenge', text: 'Share what you’re trying to solve through a short consultation request.' },
  { icon: FileText, title: 'Receive a Clear Project Scope', text: 'We define the work, deliverables, and a fixed-price package before anything starts.' },
  { icon: Rocket, title: 'Get Practical Solutions', text: 'We deliver the analysis, build, or improvements — and the next steps to act on them.' },
];

export default function HomePage() {
  const featured = work.find((w) => w.slug === 'seven-medicine');

  return (
    <>
      <Hero />

      {/* Trust */}
      <Section spacing="md">
        <Container>
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Why Slingshot"
              title="Real-World Experience. Practical Solutions."
              intro="Slingshot Advisory draws on firsthand experience owning, financing, operating, and improving real businesses and commercial real estate. We don’t hand you theory — we help you execute, because we’ve had to execute ourselves."
            />
          </Reveal>
        </Container>
      </Section>

      {/* Services */}
      <Section id="services" tone="muted" spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Four ways we help business owners"
            intro="Defined, practical services with fixed-price packages — pick the one that fits the decision in front of you."
            className="mb-10"
          />
          <ServiceCards />
        </Container>
      </Section>

      {/* Why / principles */}
      <Section spacing="lg">
        <Container>
          <SectionHeading align="center" eyebrow="Our difference" title="Why Slingshot?" className="mb-12" />
          <div className="grid gap-6 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-card)]">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-on-dark">
                    <p.icon className="h-6 w-6 text-accent" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured work */}
      {featured ? (
        <Section tone="muted" spacing="lg">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <Reveal>
                <SectionHeading
                  eyebrow="Featured work"
                  title="Websites that do real work"
                  intro={
                    <>
                      We designed and built the {featured.name} clinic website — clean,
                      responsive, and focused on helping new patients find information and get
                      in touch.
                    </>
                  }
                />
                <ul className="mt-6 space-y-2.5 text-[0.98rem] text-ink-muted">
                  {featured.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href="/our-work">See Our Work</Button>
                  {featured.url ? (
                    <Button href={featured.url} variant="outline">
                      Visit the live site <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  ) : null}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow-card)]">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-border" />
                    <span className="h-3 w-3 rounded-full bg-border" />
                    <span className="h-3 w-3 rounded-full bg-border" />
                  </div>
                  <div className="mt-5 space-y-3">
                    <div className="h-8 w-2/3 rounded-md bg-navy/90" />
                    <div className="h-3 w-full rounded bg-surface-muted" />
                    <div className="h-3 w-5/6 rounded bg-surface-muted" />
                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {[0, 1, 2].map((n) => (
                        <div key={n} className="rounded-lg border border-border p-3">
                          <div className="h-6 w-6 rounded bg-accent-soft" />
                          <div className="mt-2 h-2 w-full rounded bg-surface-muted" />
                          <div className="mt-1 h-2 w-2/3 rounded bg-surface-muted" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 h-9 w-40 rounded-lg bg-accent" />
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* How it works */}
      <Section spacing="lg">
        <Container>
          <SectionHeading align="center" eyebrow="How it works" title="A simple, defined process" className="mb-12" />
          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="relative h-full rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-card)]">
                  <span className="text-eyebrow text-ink-faint">Step {i + 1}</span>
                  <span className="mt-3 grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent-strong">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-ink-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link href="/contact" className="font-semibold text-accent-strong hover:underline">
              Start a conversation →
            </Link>
          </p>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
