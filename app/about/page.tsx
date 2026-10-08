import type { Metadata } from 'next';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTASection } from '@/components/shared/CTASection';
import { Reveal } from '@/components/ui/Reveal';
import { founder } from '@/data/founder';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'About & Founder — Andrew Robinson',
  description:
    'Slingshot Advisory is owner-operated by Andrew Robinson, a Rochester entrepreneur and commercial real estate owner. The story of why he started it — and the experience behind the advice.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About & founder"
        title="Why I Started Slingshot Advisory"
        intro="Slingshot Advisory isn’t a faceless consulting company. It’s owner-operated by one Rochester entrepreneur — built from the experience of actually doing this work."
      />

      {/* Founder */}
      <Section spacing="lg">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
              <Image
                src={founder.photo.src}
                alt={founder.photo.alt}
                width={founder.photo.width}
                height={founder.photo.height}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="mt-5 rounded-2xl border border-border bg-surface-muted p-5">
              <p className="text-lg font-semibold text-ink">{founder.name}</p>
              <p className="text-[0.95rem] text-ink-muted">{founder.title}</p>
              <p className="text-[0.95rem] text-ink-muted">{founder.also}</p>
              <p className="mt-2 text-[0.9rem] text-ink-faint">{founder.location}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="measure space-y-4 text-[1.08rem] leading-relaxed text-ink-muted">
              {founder.story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <blockquote className="mt-7 border-l-2 border-accent pl-5 font-display text-xl italic leading-relaxed text-ink">
              “{founder.quote.body}”
              <footer className="mt-2 font-sans text-sm font-semibold not-italic text-ink-muted">
                — {founder.quote.attribution}
              </footer>
            </blockquote>
          </Reveal>
        </Container>
      </Section>

      {/* The progression */}
      <Section tone="muted" spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="How we got here"
            title="The path that led to Slingshot Advisory"
            intro="Each step taught a skill other business owners now benefit from."
            className="mb-10"
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {founder.progression.map((step, i) => (
              <Reveal key={step} delay={(i % 3) * 0.05}>
                <li className="flex h-full gap-4 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <p className="text-[0.98rem] text-ink">{step}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Philosophy */}
      <Section spacing="md">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Our philosophy"
            title="Helping Rochester businesses grow, one business at a time."
            intro="We’re not trying to sell anyone services they don’t need. The goal is to help you make better decisions, reduce unnecessary overhead, and find solutions that actually work. If we’re not the right fit, we’ll tell you — and point you somewhere better."
            className="mx-auto"
          />
        </Container>
      </Section>

      <CTASection
        title="Want to talk it through?"
        intro={`Based in ${site.contact.location}. If you’ve got a website, a lease, or a property you’re trying to figure out, let’s have a conversation.`}
        cta={{ label: 'Start a Conversation', href: '/contact' }}
        secondary={{ label: 'Build My Website', href: '/get-started' }}
      />
    </>
  );
}
