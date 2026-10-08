'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Check, X, ArrowLeft, ArrowRight, Lock, CalendarCheck, ShieldCheck } from 'lucide-react';
import { webPackage } from '@/data/packages';
import { Field, Input, Textarea } from '@/components/forms/fields';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'submitting' | 'setup' | 'error';
type Step = 'details' | 'review';

const pkg = webPackage;

export function CheckoutFlow() {
  const [step, setStep] = useState<Step>('details');
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

  const balanceCents = pkg.totalCents - pkg.chargeNowCents;

  function set(k: keyof typeof fields, v: string) {
    setFields((f) => ({ ...f, [k]: v }));
  }

  function validateDetails() {
    const errs: Record<string, string> = {};
    if (fields.businessName.trim().length < 2) errs.businessName = 'Enter your business name.';
    if (fields.contactName.trim().length < 2) errs.contactName = 'Enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(fields.email.trim())) errs.email = 'Enter a valid email.';
    if (fields.goal.trim().length < 4) errs.goal = 'Tell us what you want the website to do.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function goToReview(e: React.FormEvent) {
    e.preventDefault();
    if (validateDetails()) {
      setStep('review');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  async function onPay(e: React.FormEvent) {
    e.preventDefault();
    if (!terms) {
      setErrors({ terms: 'Please agree to the project terms to continue.' });
      return;
    }
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
        setServerMsg('Please review your details.');
        setStep('details');
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
          request and will reach out to confirm the details and send a secure link for the $500
          deposit — or you can book your discovery call now and we’ll handle payment on the call.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/get-started/schedule" variant="accent">
            Book a Discovery Call
          </Button>
          <Button href="/contact?service=website" variant="outline">
            Contact Us
          </Button>
        </div>
      </div>
    );
  }

  // ── Progress indicator ──
  const steps: { id: Step; label: string }[] = [
    { id: 'details', label: 'Your business' },
    { id: 'review', label: 'Review & deposit' },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div>
        {/* Steps */}
        <ol className="mb-7 flex items-center gap-3 text-sm">
          {steps.map((s, i) => {
            const active = s.id === step;
            const done = step === 'review' && s.id === 'details';
            return (
              <li key={s.id} className="flex items-center gap-3">
                <span
                  className={cn(
                    'inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold',
                    active ? 'bg-accent text-white' : done ? 'bg-navy text-white' : 'bg-surface-muted text-ink-faint',
                  )}
                >
                  {done ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span className={cn('font-medium', active ? 'text-ink' : 'text-ink-faint')}>{s.label}</span>
                {i < steps.length - 1 ? <span className="h-px w-6 bg-border" /> : null}
              </li>
            );
          })}
        </ol>

        {/* Honeypot */}
        <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
          <label>
            Company website
            <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
          </label>
        </div>

        {step === 'details' ? (
          <form onSubmit={goToReview} noValidate>
            <h3 className="text-xl font-semibold text-ink">Tell us about your business</h3>
            <p className="mt-1 text-[0.95rem] text-ink-muted">
              A few details so we come to your discovery call already understanding your business and goals.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
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
              <Field label="What does your business do?" htmlFor="category" full>
                <Input id="category" value={fields.category} onChange={(e) => set('category', e.target.value)} placeholder="e.g. family dental clinic, HVAC contractor, boutique retailer" />
              </Field>
              <Field label="Existing website" htmlFor="existingWebsite" full>
                <Input id="existingWebsite" value={fields.existingWebsite} onChange={(e) => set('existingWebsite', e.target.value)} placeholder="https:// (leave blank if none)" />
              </Field>
              <Field label="What do you want the website to do for your business?" htmlFor="goal" full required error={errors.goal}>
                <Textarea id="goal" value={fields.goal} onChange={(e) => set('goal', e.target.value)} placeholder="Your main goal — more inquiries, online booking, fewer phone calls, looking credible, etc." />
              </Field>
              <Field label="Where do customers get stuck today? Any features you have in mind?" htmlFor="functionality" full>
                <Textarea id="functionality" value={fields.functionality} onChange={(e) => set('functionality', e.target.value)} placeholder="Friction points, requests you hear a lot, forms, scheduling, a chat assistant, etc." />
              </Field>
            </div>
            {serverMsg ? <p className="mt-4 text-sm font-medium text-error">{serverMsg}</p> : null}
            <Button type="submit" variant="accent" size="lg" className="mt-6 w-full sm:w-auto">
              Review Scope &amp; Deposit <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        ) : (
          <form onSubmit={onPay} noValidate>
            <button
              type="button"
              onClick={() => setStep('details')}
              className="mb-5 inline-flex items-center gap-1 text-sm font-medium text-ink-muted hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" /> Edit my details
            </button>

            <h3 className="text-xl font-semibold text-ink">Review the starting scope</h3>
            <p className="mt-1 text-[0.95rem] text-ink-muted">
              The $750 base covers a custom website with a clearly agreed scope. We confirm the exact
              scope together on the discovery call — anything more complex is quoted separately and
              never charged without your go-ahead.
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
              <p className="text-sm font-semibold text-ink">What the base project can include</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-[0.92rem] text-ink-muted">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" /> {f}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm font-semibold text-ink">Quoted separately / billed as actual cost</p>
              <ul className="mt-3 space-y-1.5 text-[0.92rem] text-ink-muted">
                {pkg.exclusions.map((x) => (
                  <li key={x} className="flex gap-2">
                    <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-faint" /> {x}
                  </li>
                ))}
              </ul>
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
              {status === 'submitting' ? 'Starting checkout…' : 'Pay $500 Deposit & Continue'}
            </Button>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-faint">
              <ShieldCheck className="h-3.5 w-3.5" /> Payment is processed securely by Stripe. We never store card details.
            </p>
          </form>
        )}
      </div>

      {/* Order summary */}
      <aside>
        <div className="sticky top-24 rounded-2xl border border-border bg-surface-muted p-6">
          <h3 className="font-semibold text-ink">Order summary</h3>
          <p className="mt-3 flex items-center justify-between text-ink">
            <span className="font-medium">{pkg.name}</span>
            <span className="font-display text-xl font-semibold">{pkg.priceDisplay}</span>
          </p>
          <p className="mt-1 text-sm text-ink-muted">{pkg.tagline}</p>
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm text-ink-muted">
            <p className="flex items-center justify-between">
              <span>Due today ({pkg.chargeLabel})</span>
              <span className="font-semibold text-ink">${(pkg.chargeNowCents / 100).toFixed(0)}</span>
            </p>
            {balanceCents > 0 ? (
              <p className="flex items-center justify-between">
                <span>Balance at launch milestone</span>
                <span>${(balanceCents / 100).toFixed(0)}</span>
              </p>
            ) : null}
          </div>
          <ol className="mt-4 space-y-1.5 border-t border-border pt-4 text-xs text-ink-muted">
            <li className="font-semibold text-ink">How it works:</li>
            <li>1. Pay the $500 deposit.</li>
            <li>2. Book a discovery / strategy call.</li>
            <li>3. We confirm scope and build the site.</li>
            <li>4. $250 balance due at the agreed launch milestone.</li>
            <li>5. Optional $35/mo care (plus any pass-through costs).</li>
          </ol>
        </div>
      </aside>
    </div>
  );
}
