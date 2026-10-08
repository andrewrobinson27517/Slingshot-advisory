import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from './SectionHeading';

export function CTASection({
  eyebrow = 'Let’s talk',
  title = 'Have a Business Challenge? Let’s Talk.',
  intro = 'Whether you’re reviewing expenses, evaluating an investment, improving operations, or building a better digital presence, we’re here to help.',
  cta = { label: 'Start a Conversation', href: '/contact' },
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <Section tone="navy" spacing="md">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_auto]">
          <SectionHeading tone="on-dark" eyebrow={eyebrow} title={title} intro={intro} />
          <Button href={cta.href} variant="accent" size="lg" className="w-full sm:w-auto">
            {cta.label}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
