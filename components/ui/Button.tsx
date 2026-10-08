import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'accent' | 'outline' | 'ghost' | 'on-dark';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  // Deep navy fill — the primary action.
  primary: 'bg-navy text-on-dark hover:bg-navy-soft',
  // Burnt-orange brand accent — the key conversion CTA.
  accent: 'bg-accent text-white hover:bg-accent-strong',
  outline: 'border border-border bg-surface text-ink hover:border-ink',
  ghost: 'text-ink hover:bg-surface-muted',
  // Light button for navy sections.
  'on-dark': 'bg-on-dark text-navy hover:bg-white',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-12 px-7 text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AsLink = CommonProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof CommonProps | 'href'
  >;
type AsButton = CommonProps & { href?: undefined } & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof CommonProps
  >;

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...rest
}: AsLink | AsButton) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href !== undefined) {
    const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    const isExternal = href.startsWith('http');
    return (
      <Link
        href={href}
        className={classes}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...anchorProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
