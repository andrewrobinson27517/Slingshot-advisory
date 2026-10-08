import { Check } from 'lucide-react';
import type { Service } from '@/data/services';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { PageHeader } from './PageHeader';
import { SectionHeading } from './SectionHeading';
import { PricingCard } from './PricingCard';
import { Disclosure } from './Disclosure';
import { FaqAccordion } from './FaqAccordion';
import { CTASection } from './CTASection';
import { SchemaScript } from './SchemaScript';
import { Reveal } from '@/components/ui/Reveal';
import { serviceSchema, faqSchema } from '@/lib/schema';

export function ServicePage({ service }: { service: Service }) {
  const contactHref = `/contact?service=${service.primaryCta.service}`;
  const secondaryHref = service.secondaryCta
    ? `/contact?service=${service.secondaryCta.service}`
    : undefined;

  return (
    <>
      <SchemaScript
        schema={[
          serviceSchema(service.title, service.hero.sub, service.route),
          faqSchema(service.faqs),
        ]}
      />

      <PageHeader
        eyebrow={service.hero.eyebrow}
        title={service.hero.headline}
        intro={service.hero.sub}
        primary={{ label: service.primaryCta.label, href: contactHref }}
        secondary={
          service.secondaryCta && secondaryHref
            ? { label: service.secondaryCta.label, href: secondaryHref }
            : undefined
        }
      />

      {/* What we do */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-12">
            {service.sections.map((sec) => (
              <Reveal key={sec.title}>
                <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
                  <h2 className="text-2xl font-bold text-ink">{sec.title}</h2>
                  <div>
                    {sec.intro ? (
                      <p className="measure text-[1.05rem] leading-relaxed text-ink-muted">
                        {sec.intro}
                      </p>
                    ) : null}
                    {sec.bullets ? (
                      <ul className={`grid gap-2.5 sm:grid-cols-2 ${sec.intro ? 'mt-5' : ''}`}>
                        {sec.bullets.map((b) => (
                          <li key={b} className="flex gap-2.5 text-[0.98rem] text-ink-muted">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Pricing */}
      <Section tone="muted" spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="Packages"
            title="Clear scopes, fixed starting prices"
            intro={
              service.packagesNote ??
              'Starting prices below. Final scope and quote depend on the specifics of your situation.'
            }
            className="mb-10"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {service.packages.map((pkg) => (
              <PricingCard key={pkg.name} pkg={pkg} service={service.primaryCta.service} />
            ))}
          </div>
          {service.documents && service.documents.length > 0 ? (
            <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-bold text-ink">Documents typically needed</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-[0.95rem] text-ink-muted">
                {service.documents.map((d) => (
                  <li key={d} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </Section>

      {/* FAQ */}
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
        title="Ready to get started?"
        intro={service.hero.sub}
        cta={{ label: service.primaryCta.label, href: contactHref }}
      />
    </>
  );
}
