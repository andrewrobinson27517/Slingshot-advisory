import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import { Reveal } from '@/components/ui/Reveal';

export function ServiceCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {services.map((s, i) => (
        <Reveal key={s.slug} delay={(i % 2) * 0.06}>
          <Link
            href={s.route}
            className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-card-hover)]"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent-strong transition-colors group-hover:bg-navy group-hover:text-on-dark">
              <s.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-ink">{s.title}</h3>
            <p className="mt-2 flex-1 text-[0.98rem] leading-relaxed text-ink-muted">
              {s.cardSummary}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-accent-strong">
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
