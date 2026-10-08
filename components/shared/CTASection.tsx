import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from './SectionHeading';

type CTA = { label: string; href: string };

export function CTASection({
  eyebrow = 'Let’s talk',
  title = 'Have a Business Challenge? Let’s Talk.',
  intro = 'Whether you’re reviewing expenses, evaluating an investment, improving operations, or building a better digital presence, we’re here to help.',
  cta = { label: 'Start a Conversation', href: '/contact' },
  secondary,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  cta?: CTA;
  secondary?: CTA;
}) {
  return (
    <Section tone="navy" spacing="md">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_auto]">
          <SectionHeading tone="on-dark" eyebrow={eyebrow} title={title} intro={intro} />
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button href={cta.href} variant="accent" size="lg" className="w-full sm:w-auto">
              {cta.label}
            </Button>
            {secondary ? (
              <Button
                href={secondary.href}
                variant="outline"
                size="lg"
                className="w-full border-white/25 bg-white/5 text-on-dark hover:border-on-dark sm:w-auto"
              >
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
