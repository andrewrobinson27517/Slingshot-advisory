import { ShieldCheck } from 'lucide-react';

/** A scoped disclosure / disclaimer box for service pages. */
export function Disclosure({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-surface-muted p-5 text-[0.9rem] leading-relaxed text-ink-muted">
      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ink-faint" />
      <p>{children}</p>
    </div>
  );
}
