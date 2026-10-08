import { cn } from '@/lib/cn';

type Tone = 'accent' | 'neutral' | 'navy' | 'on-dark';

const tones: Record<Tone, string> = {
  accent: 'bg-accent-soft text-accent-strong',
  neutral: 'bg-surface-muted text-ink-muted',
  navy: 'bg-navy text-on-dark',
  'on-dark': 'bg-white/10 text-on-dark',
};

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
