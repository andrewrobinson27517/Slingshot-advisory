import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * Slingshot Advisory wordmark. The mark is a rising trajectory arc with a launch
 * node — suggesting momentum and a smart move — rendered in CSS/SVG so it scales
 * crisply and adapts to light/dark via currentColor.
 */
export function Logo({
  className,
  tone = 'default',
}: {
  className?: string;
  tone?: 'default' | 'on-dark';
}) {
  return (
    <Link
      href="/"
      aria-label="Slingshot Advisory — home"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <span
        className={cn(
          'grid h-9 w-9 shrink-0 place-items-center rounded-lg',
          tone === 'on-dark' ? 'bg-white/10' : 'bg-navy',
        )}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path
            d="M4 19C7 19 9 15 12 11c2.4-3.2 4.6-5 7-5"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="19" cy="6" r="2.1" fill="var(--color-accent)" />
          <circle cx="4" cy="19" r="1.5" fill={tone === 'on-dark' ? 'var(--color-on-dark)' : '#ffffff'} />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-lg font-bold tracking-tight',
            tone === 'on-dark' ? 'text-on-dark' : 'text-ink',
          )}
        >
          Slingshot Advisory
        </span>
        <span
          className={cn(
            'mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em]',
            tone === 'on-dark' ? 'text-on-dark-muted' : 'text-ink-faint',
          )}
        >
          Business &amp; Digital Solutions
        </span>
      </span>
    </Link>
  );
}
