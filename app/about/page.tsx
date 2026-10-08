import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTASection } from '@/components/shared/CTASection';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'About Slingshot Advisory',
  description:
    'Slingshot Advisory is an owner-operated business consulting and digital solutions firm in Rochester, MN — an extension of the operating experience built through Slingshot Real Estate.',
  alternates: { canonical: '/about' },
};

const experience = [
  'Commercial real estate acquisition and management',
  'Business operations and financial analysis',
  'Commercial office leasing and occupancy-cost management',
  'Commercial real estate underwriting',
  'Financial modeling and lender-package preparation',
  'Website development and AI-powered business tools',
  'Business process automation and workflow optimization',
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Slingshot"
        title="Built by operators. Designed for business owners."
        intro="Slingshot Advisory is an extension of the expertise developed through Slingshot Real Estate and its related businesses — real operating experience, put to work for other business owners."
      />

      <Section spacing="lg">
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div className="measure space-y-5 text-[1.05rem] leading-relaxed text-ink-muted">
              <p>
                Most consulting advice comes from people who have read about running a business.
                Ours comes from doing it. We’ve acquired and managed commercial real estate,
                controlled operating expenses, prepared lender packages, built websites and
                automation, and made the financial decisions that come with owning and operating
                real companies.
              </p>
              <p>
                That’s the difference. We don’t simply hand businesses theoretical
                recommendations. We understand what it takes to operate, control expenses,
                implement systems, and make financial decisions — because we’ve had to.
              </p>
              <p>
                Slingshot Advisory is deliberately boutique and owner-operated. We take on
                defined, practical work with clear scopes and fixed-price packages, so you know
                exactly what you’re getting and what it costs.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-surface-muted p-6">
              <h2 className="font-bold text-ink">Our experience</h2>
              <ul className="mt-4 space-y-2.5 text-[0.98rem] text-ink-muted">
                {experience.map((e) => (
                  <li key={e} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="muted" spacing="md">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="How we work"
            title="Practical, transparent, and focused"
            intro="We position our work clearly: Slingshot Advisory provides analysis, preparation, and digital solutions. We are not a licensed brokerage, law firm, CPA firm, mortgage originator, or registered investment adviser, and we point you to the right licensed professional when that’s what a situation calls for."
            className="mx-auto"
          />
        </Container>
      </Section>

      <CTASection
        title="Let’s put that experience to work."
        intro={`Based in ${site.contact.location}, serving Rochester and Southeast Minnesota — and remote clients nationwide where permitted.`}
      />
    </>
  );
}
