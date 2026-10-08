import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

/** Abstract strategy/analytics motif — rising bars, a trajectory arc, and nodes. */
function HeroGraphic() {
  return (
    <svg viewBox="0 0 420 340" className="h-auto w-full" fill="none" aria-hidden>
      <defs>
        <linearGradient id="sa-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="var(--color-steel)" stopOpacity="0.25" />
          <stop offset="1" stopColor="var(--color-steel)" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="sa-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* panel */}
      <rect x="20" y="20" width="380" height="300" rx="16" fill="#ffffff" fillOpacity="0.04" stroke="var(--color-on-dark)" strokeOpacity="0.12" />

      {/* gridlines */}
      {[80, 140, 200, 260].map((y) => (
        <line key={y} x1="48" y1={y} x2="372" y2={y} stroke="var(--color-on-dark)" strokeOpacity="0.07" />
      ))}

      {/* rising bars */}
      {[
        { x: 70, h: 60 },
        { x: 122, h: 95 },
        { x: 174, h: 130 },
        { x: 226, h: 120 },
        { x: 278, h: 170 },
        { x: 330, h: 205 },
      ].map((b) => (
        <rect key={b.x} x={b.x} y={286 - b.h} width="30" height={b.h} rx="5" fill="url(#sa-bar)" />
      ))}

      {/* trajectory arc */}
      <path
        d="M60 250 C 150 230, 210 150, 352 70"
        stroke="url(#sa-glow)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* nodes */}
      <g className="animate-float">
        <circle cx="60" cy="250" r="5" fill="var(--color-accent)" />
        <circle cx="352" cy="70" r="7" fill="var(--color-accent)" />
        <circle cx="352" cy="70" r="13" fill="var(--color-accent)" fillOpacity="0.18" />
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-on-dark">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-on-dark) 1px, transparent 1px), linear-gradient(90deg, var(--color-on-dark) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-steel) 28%, transparent) 0%, transparent 70%)',
        }}
      />

      <Container className="relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <Eyebrow tone="on-dark" className="animate-fade-up delay-1">
            Business Advisory &amp; Digital Solutions
          </Eyebrow>
          <h1 className="animate-fade-up delay-2 mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Make Smarter Moves for Your Business.
          </h1>
          <p className="animate-fade-up delay-3 measure mt-5 text-lg leading-relaxed text-on-dark-muted">
            From commercial lease expenses and real estate investment analysis to modern
            websites and AI-powered automation, Slingshot Advisory helps business owners
            solve complex problems, improve operations, and make more informed decisions.
          </p>
          <div className="animate-fade-up delay-4 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/#services" variant="accent" size="lg">
              Explore Our Services
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white/25 bg-white/5 text-on-dark hover:border-on-dark"
            >
              Request a Consultation
            </Button>
          </div>
        </div>

        <div className="animate-fade-up delay-3 relative">
          <HeroGraphic />
        </div>
      </Container>
    </section>
  );
}
