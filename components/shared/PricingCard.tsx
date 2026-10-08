import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { Pkg } from '@/data/services';
import type { ServiceKey } from '@/lib/validation';

export function PricingCard({
  pkg,
  service,
}: {
  pkg: Pkg;
  service: ServiceKey;
}) {
  return (
    <div
      className={cn(
        'flex h-full flex-col rounded-2xl border bg-surface p-6 shadow-[var(--shadow-card)]',
        pkg.featured ? 'border-accent/50 ring-1 ring-accent/30' : 'border-border',
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-bold text-ink">{pkg.name}</h3>
        {pkg.featured ? <Badge tone="accent">Most popular</Badge> : null}
      </div>
      <p className="mt-3 flex items-baseline gap-1.5">
        <span className="font-display text-3xl font-bold text-ink">{pkg.price}</span>
        {pkg.cadence ? (
          <span className="text-sm font-medium text-ink-faint">{pkg.cadence}</span>
        ) : null}
      </p>
      <p className="mt-2 text-[0.95rem] text-ink-muted">{pkg.summary}</p>
      <ul className="mt-5 flex-1 space-y-2.5 border-t border-border pt-5 text-[0.95rem] text-ink-muted">
        {pkg.features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" />
            {f}
          </li>
        ))}
      </ul>
      <Button
        href={`/contact?service=${service}`}
        variant={pkg.featured ? 'accent' : 'outline'}
        className="mt-6 w-full"
      >
        Get Started
      </Button>
    </div>
  );
}
