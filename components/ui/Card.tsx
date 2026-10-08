import { cn } from '@/lib/cn';

export function Card({
  children,
  className,
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]',
        hover &&
          'transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
