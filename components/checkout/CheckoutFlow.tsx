'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Check, X, ArrowLeft, Lock, CalendarCheck, ShieldCheck } from 'lucide-react';
import { webPackages, getPackage, type WebPackageId } from '@/data/packages';
import { Field, Input, Textarea } from '@/components/forms/fields';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'submitting' | 'setup' | 'error';

export function CheckoutFlow({ initialPackage }: { initialPackage?: WebPackageId }) {
  const [pkgId, setPkgId] = useState<WebPackageId | null>(initialPackage ?? null);
  const [fields, setFields] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    existingWebsite: '',
    category: '',
    functionality: '',
    goal: '',
  });
  const [terms, setTerms] = useState(false);
  const [hp, setHp] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMsg, setServerMsg] = useState('');
  const startedAt = useRef(Date.now());

  const pkg = pkgId ? getPackage(pkgId) : undefined;

  function set(k: keyof typeof fields, v: string) {
    setFields((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pkg) return;
    const errs: Record<string, string> = {};
    if (fields.businessName.trim().length < 2) errs.businessName = 'Enter your business name.';
    if (fields.contactName.trim().length < 2) errs.contactName = 'Enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(fields.email.trim())) errs.email = 'Enter a valid email.';
    if (!terms) errs.terms = 'Please agree to the project terms to continue.';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus('submitting');
    setServerMsg('');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          packageId: pkg.id,
          ...fields,
          terms: true,
          company_website: hp,
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        window.location.href = data.url as string; // Stripe Checkout
        return;
      }
      if (res.status === 422 && data.fieldErrors) {
        setStatus('idle');
        setErrors(data.fieldErrors);
        setServerMsg('Please review the highlighted fields.');
      } else if (data.code === 'payment_not_configured') {
        setStatus('setup');
      } else {
        setStatus('error');
        setServerMsg(data.message || 'Something went wrong. Please try again or contact us.');
      }
    } catch {
      setStatus('error');
      setServerMsg('Network error. Please try again or contact us.');
    }
  }

  // ── Setup-required (payments not connected) — honest, no fake success ──
  if (status === 'setup') {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-[var(--shadow-card)]">
        <CalendarCheck className="mx-auto h-12 w-12 text-accent" />
        <h3 className="mt-4 text-2xl font-semibold text-ink">Your request is in</h3>
        <p className="measure mx-auto mt-2 text-ink-muted">
          Online payment isn’t connected yet, so we haven’t charged anything. We’ve saved your
          {pkg ? ` ${pkg.name}` : ''} request and will reach out to confirm the details and send a
          secure payment link — or you can book your strategy call now and we’ll handle payment
          on the call.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={`/get-started/schedule?pkg=${pkg?.id ?? ''}`} variant="accent">
            Book a Strategy Call
          </Button>
          <Button href="/contact?service=website" variant="outline">
            Contact Us
          </Button>
        </div>
      </div>
    );
  }

  // ── Step 1: choose a package ──
  if (!pkg) {
    return (
      <div className="grid gap-5 lg:grid-cols-2">
        {webPackages.map((p) => (
          <div
            key={p.id}
            className={cn(
              'flex flex-col rounded-2xl border bg-surface p-6 shadow-[var(--shadow-card)]',
              p.id === 'business-plus' ? 'border-accent/50 ring-1 ring-accent/30' : 'border-border',
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-ink">{p.name}</h3>
              {p.id === 'business-plus' ? <Badge tone="accent">Most popular</Badge> : null}
            </div>
            <p className="mt-2 font-display text-4xl font-semibold text-ink">{p.priceDisplay}</p>
            <p className="mt-1 text-sm text-ink-muted">{p.tagline}</p>
            <ul className="mt-4 flex-1 space-y-2 border-t border-border pt-4 text-[0.95rem] text-ink-muted">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" /> {f}
                </li>
              ))}
            </ul>
            <Button onClick={() => setPkgId(p.id)} variant={p.id === 'business-plus' ? 'accent' : 'primary'} className="mt-6 w-full">
              Choose {p.name}
            </Button>
          </div>
        ))}
      </div>
    );
  }

  // ── Step 2: business info + payment ──
  const balanceCents = pkg.totalCents - pkg.chargeNowCents;
  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <form onSubmit={onSubmit} noValidate>
        <button
          type="button"
          onClick={() => setPkgId(null)}
          className="mb-5 inline-flex items-center gap-1 text-sm font-medium text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Change package
        </button>

        <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
          <label>
            Company website
            <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Business name" htmlFor="businessName" required error={errors.businessName}>
            <Input id="businessName" value={fields.businessName} onChange={(e) => set('businessName', e.target.value)} />
          </Field>
          <Field label="Your name" htmlFor="contactName" required error={errors.contactName}>
            <Input id="contactName" value={fields.contactName} onChange={(e) => set('contactName', e.target.value)} autoComplete="name" />
          </Field>
          <Field label="Email" htmlFor="email" required error={errors.email}>
            <Input id="email" type="email" value={fields.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" />
          </Field>
          <Field label="Phone" htmlFor="phone">
            <Input id="phone" type="tel" value={fields.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" />
          </Field>
          <Field label="Existing website" htmlFor="existingWebsite">
            <Input id="existingWebsite" value={fields.existingWebsite} onChange={(e) => set('existingWebsite', e.target.value)} placeholder="https:// (optional)" />
          </Field>
          <Field label="Business category" htmlFor="category">
            <Input id="category" value={fields.category} onChange={(e) => set('category', e.target.value)} placeholder="e.g. clinic, contractor" />
          </Field>
          <Field label="Desired website functionality" htmlFor="functionality" full>
            <Textarea id="functionality" value={fields.functionality} onChange={(e) => set('functionality', e.target.value)} placeholder="Pages, forms, booking, etc." />
          </Field>
          <Field label="Main business goal" htmlFor="goal" full>
            <Textarea id="goal" value={fields.goal} onChange={(e) => set('goal', e.target.value)} placeholder="What should this website do for your business?" />
          </Field>
        </div>

        <label className="mt-6 flex items-start gap-3 text-sm text-ink-muted">
          <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-navy)]" />
          <span>
            I’ve read and agree to the{' '}
            <Link href="/terms#website-projects" className="font-medium text-accent-strong underline" target="_blank">
              project terms
            </Link>{' '}
            — scope, revisions, cancellation &amp; refund policy, ownership, and third-party costs.
          </span>
        </label>
        {errors.terms ? <p className="mt-1 text-xs font-medium text-error">{errors.terms}</p> : null}
        {serverMsg ? <p className="mt-4 text-sm font-medium text-error">{serverMsg}</p> : null}

        <Button type="submit" variant="accent" size="lg" disabled={status === 'submitting'} className="mt-6 w-full sm:w-auto">
          <Lock className="h-4 w-4" />
          {status === 'submitting' ? 'Starting checkout…' : 'Continue to Payment'}
        </Button>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-faint">
          <ShieldCheck className="h-3.5 w-3.5" /> Payment is processed securely by Stripe. We never store card details.
        </p>
      </form>

      {/* Order summary */}
      <aside>
        <div className="rounded-2xl border border-border bg-surface-muted p-6">
          <h3 className="font-semibold text-ink">Order summary</h3>
          <p className="mt-3 flex items-center justify-between text-ink">
            <span className="font-medium">{pkg.name}</span>
            <span className="font-display text-xl font-semibold">{pkg.priceDisplay}</span>
          </p>
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm text-ink-muted">
            <p className="flex items-center justify-between">
              <span>{pkg.chargeLabel}</span>
              <span className="font-semibold text-ink">${(pkg.chargeNowCents / 100).toFixed(0)}</span>
            </p>
            {balanceCents > 0 ? (
              <p className="flex items-center justify-between">
                <span>Balance (at final milestone)</span>
                <span>${(balanceCents / 100).toFixed(0)}</span>
              </p>
            ) : null}
          </div>
          {pkg.balanceNote ? <p className="mt-3 text-xs text-ink-faint">{pkg.balanceNote}</p> : null}
          <ul className="mt-4 space-y-1.5 border-t border-border pt-4 text-xs text-ink-muted">
            <li className="font-semibold text-ink">Not included:</li>
            {pkg.exclusions.map((x) => (
              <li key={x} className="flex gap-2">
                <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-faint" /> {x}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
