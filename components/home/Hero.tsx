import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

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

      <Container className="relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <Eyebrow tone="on-dark" className="animate-fade-up delay-1 inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-accent" /> Rochester, Minnesota
          </Eyebrow>
          <h1 className="animate-fade-up delay-2 mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Built From Experience. Here to Help You Grow.
          </h1>
          <p className="animate-fade-up delay-3 measure mt-5 text-lg leading-relaxed text-on-dark-muted">
            We help businesses and property owners solve practical challenges — from building
            websites that generate customers and automating everyday operations, to reviewing
            commercial lease expenses and improving real estate performance.
          </p>
          <div className="animate-fade-up delay-4 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/get-started" variant="accent" size="lg">
              Build My Website — From $500
            </Button>
            <Button
              href="/contact?service=property"
              variant="outline"
              size="lg"
              className="border-white/25 bg-white/5 text-on-dark hover:border-on-dark"
            >
              Discuss My Property
            </Button>
          </div>
          <Link
            href="/about"
            className="animate-fade-up delay-5 mt-5 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-accent hover:text-white"
          >
            Learn why we started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="animate-fade-up delay-3 relative">
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[var(--shadow-hero)]">
            <Image
              src="/photos/ironwood.jpg"
              alt="Ironwood Square — a Slingshot-connected office property in downtown Rochester"
              width={1200}
              height={800}
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="aspect-[3/2] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-white/10 bg-navy-soft/90 px-4 py-3 backdrop-blur-sm sm:block">
            <p className="text-sm font-semibold text-on-dark">Real property. Real operations.</p>
            <p className="text-xs text-on-dark-muted">The experience behind the advice.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
