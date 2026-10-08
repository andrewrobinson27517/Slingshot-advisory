'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { primaryNav } from '@/data/site';
import { navServices } from '@/data/services';
import { cn } from '@/lib/cn';
import { Logo } from './Logo';
import { Button } from '@/components/ui/Button';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-300',
        scrolled ? 'border-border bg-bg/90 backdrop-blur-md' : 'border-transparent bg-bg',
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              className="inline-flex items-center gap-1 rounded-md px-3.5 py-2 text-[0.95rem] font-medium text-ink-muted transition-colors hover:text-ink"
            >
              Services
              <ChevronDown className={cn('h-4 w-4 transition-transform', servicesOpen && 'rotate-180')} />
            </button>
            {servicesOpen ? (
              <div className="absolute left-0 top-full w-[22rem] pt-2">
                <div className="overflow-hidden rounded-xl border border-border bg-surface p-2 shadow-[var(--shadow-card-hover)]">
                  {navServices.map((n) => (
                    <Link
                      key={n.key}
                      href={n.route}
                      className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-muted"
                    >
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-accent-soft text-accent-strong">
                        <n.icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-ink">{n.title}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-ink-muted">
                          {n.summary}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {primaryNav
            .filter((i) => !('dropdown' in i && i.dropdown))
            .map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-md px-3.5 py-2 text-[0.95rem] font-medium transition-colors',
                    active ? 'text-ink' : 'text-ink-muted hover:text-ink',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/contact" variant="accent" size="sm" className="hidden sm:inline-flex">
            Request a Consultation
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="border-t border-border bg-surface lg:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col px-5 py-3 sm:px-6" aria-label="Mobile">
            <p className="px-3 pb-1 pt-2 text-eyebrow text-ink-faint">Services</p>
            {navServices.map((n) => (
              <Link
                key={n.key}
                href={n.route}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-ink hover:bg-surface-muted"
              >
                <n.icon className="h-5 w-5 text-accent-strong" />
                <span className="text-[1.02rem] font-medium">{n.title}</span>
              </Link>
            ))}
            <div className="my-2 border-t border-border" />
            {primaryNav
              .filter((i) => !('dropdown' in i && i.dropdown))
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-[1.05rem] font-medium text-ink hover:bg-surface-muted"
                >
                  {item.label}
                </Link>
              ))}
            <Button href="/contact" variant="accent" className="mt-3">
              Request a Consultation
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
