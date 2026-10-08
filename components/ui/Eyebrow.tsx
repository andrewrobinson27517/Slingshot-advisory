import { cn } from '@/lib/cn';

export function Eyebrow({
  children,
  className,
  tone = 'accent',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'accent' | 'steel' | 'on-dark';
}) {
  return (
    <p
      className={cn(
        'text-eyebrow',
        tone === 'accent' && 'text-accent-strong',
        tone === 'steel' && 'text-ink-faint',
        tone === 'on-dark' && 'text-accent',
        className,
      )}
    >
      {children}
    </p>
  );
}
