import { cn } from '@/lib/cn';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
  tone?: 'default' | 'muted' | 'navy';
  id?: string;
};

const spacingMap = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-20',
  lg: 'py-20 sm:py-28',
};

const toneMap = {
  default: '',
  muted: 'bg-surface-muted',
  navy: 'bg-navy text-on-dark',
};

/** Full-bleed vertical section with consistent spacing and tone. */
export function Section({
  children,
  className,
  spacing = 'lg',
  tone = 'default',
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn(spacingMap[spacing], toneMap[tone], className)}>
      {children}
    </section>
  );
}
