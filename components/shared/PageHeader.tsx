import { Container } from '@/components/layout/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';

type CTA = { label: string; href: string };

/** Dark-navy hero used at the top of interior pages. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  primary?: CTA;
  secondary?: CTA;
}) {
  return (
    <header className="relative overflow-hidden bg-navy text-on-dark">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-on-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-on-dark) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 24%, transparent) 0%, transparent 70%)',
        }}
      />
      <Container className="relative py-16 sm:py-20">
        {eyebrow ? <Eyebrow tone="on-dark">{eyebrow}</Eyebrow> : null}
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {intro ? (
          <p className="measure mt-5 text-lg leading-relaxed text-on-dark-muted">{intro}</p>
        ) : null}
        {primary || secondary ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {primary ? (
              <Button href={primary.href} variant="accent" size="lg">
                {primary.label}
              </Button>
            ) : null}
            {secondary ? (
              <Button
                href={secondary.href}
                variant="outline"
                size="lg"
                className="border-white/25 bg-white/5 text-on-dark hover:border-on-dark"
              >
                {secondary.label}
              </Button>
            ) : null}
          </div>
        ) : null}
      </Container>
    </header>
  );
}
