'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Send, Mail, FileText, ArrowLeft, Info } from 'lucide-react';
import { intakeConfigs, getIntakeConfig } from '@/data/intake';
import { site } from '@/data/site';
import type { ServiceKey } from '@/lib/validation';
import { cn } from '@/lib/cn';
import { Field, Input, Textarea, Select } from '@/components/forms/fields';
import { Button } from '@/components/ui/Button';

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'fallback';

export function IntakeForm({ initialService }: { initialService?: ServiceKey }) {
  const [service, setService] = useState<ServiceKey | null>(initialService ?? null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [details, setDetails] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState(''); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMsg, setServerMsg] = useState('');
  const startedAt = useRef(Date.now());

  const cfg = service ? getIntakeConfig(service) : undefined;

  const mailtoHref = useMemo(() => {
    if (!cfg) return `mailto:${site.contact.email}`;
    const lines = [
      `Service: ${cfg.label}`,
      `Name: ${name}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      company && `Business: ${company}`,
      '',
      ...cfg.fields.map((f) => `${f.label}: ${details[f.id] ?? ''}`),
    ].filter(Boolean);
    const subject = `Consultation request — ${cfg.label}`;
    return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  }, [cfg, name, email, phone, company, details]);

  function setDetail(id: string, value: string) {
    setDetails((d) => ({ ...d, [id]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cfg || !service) return;

    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) errs.email = 'Enter a valid email.';
    if (!consent) errs.consent = 'Please agree to be contacted about your request.';
    for (const f of cfg.fields) {
      if (f.required && !(details[f.id] ?? '').trim()) errs[f.id] = 'This field is required.';
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('submitting');
    setServerMsg('');
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          service,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim(),
          details,
          consent: true,
          company_website: hp,
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus('success');
      } else if (res.status === 429) {
        setStatus('error');
        setServerMsg('Too many requests. Please wait a minute and try again.');
      } else if (res.status === 422 && data.fieldErrors) {
        setStatus('idle');
        setErrors(data.fieldErrors);
        setServerMsg('Please review the highlighted fields.');
      } else if (data.code === 'not_configured') {
        setStatus('fallback');
      } else {
        setStatus('error');
        setServerMsg(data.message || 'Something went wrong submitting your request.');
      }
    } catch {
      setStatus('fallback');
    }
  }

  // ── Success ──
  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-[var(--shadow-card)]">
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
        <h3 className="mt-4 text-2xl font-bold text-ink">Request received</h3>
        <p className="measure mx-auto mt-2 text-ink-muted">
          Thanks{name ? `, ${name.split(' ')[0]}` : ''}. We’ve received your request and sent
          a confirmation to {email}. We’ll review the details and follow up with next steps —
          typically within one business day.
        </p>
      </div>
    );
  }

  // ── Step 1: choose a service ──
  if (!service) {
    return (
      <div>
        <p className="text-sm font-semibold text-ink">What can we help you with?</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {intakeConfigs.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => {
                setService(c.key);
                startedAt.current = Date.now();
              }}
              className="group rounded-xl border border-border bg-surface p-4 text-left transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[var(--shadow-card)]"
            >
              <span className="block font-semibold text-ink">{c.label}</span>
              <span className="mt-0.5 block text-sm text-ink-muted">{c.blurb}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Step 2: contact + conditional questions ──
  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-eyebrow text-accent-strong">{cfg?.label}</p>
          <p className="mt-0.5 text-sm text-ink-muted">{cfg?.blurb}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setService(null);
            setErrors({});
            setStatus('idle');
          }}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Change
        </button>
      </div>

      {cfg?.notice ? (
        <div className="mb-5 flex gap-2.5 rounded-xl border border-border bg-surface-muted p-4 text-sm text-ink-muted">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" />
          <span>{cfg.notice}</span>
        </div>
      ) : null}

      {/* Honeypot — visually hidden, off-screen; bots fill it, humans don't. */}
      <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label>
          Company website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" required error={errors.name}>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </Field>
        <Field label="Email" htmlFor="email" required error={errors.email}>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
        </Field>
        <Field label="Business name" htmlFor="company">
          <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
        </Field>

        {cfg?.fields.map((f) => (
          <Field key={f.id} label={f.label} htmlFor={f.id} required={f.required} hint={f.help} error={errors[f.id]} full={f.full || f.type === 'textarea'}>
            {f.type === 'textarea' ? (
              <Textarea id={f.id} value={details[f.id] ?? ''} placeholder={f.placeholder} onChange={(e) => setDetail(f.id, e.target.value)} />
            ) : f.type === 'select' ? (
              <Select id={f.id} value={details[f.id] ?? ''} onChange={(e) => setDetail(f.id, e.target.value)}>
                <option value="">Select…</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </Select>
            ) : (
              <Input
                id={f.id}
                type={f.type === 'url' ? 'url' : f.type === 'number' ? 'text' : f.type}
                inputMode={f.type === 'number' ? 'numeric' : undefined}
                value={details[f.id] ?? ''}
                placeholder={f.placeholder}
                onChange={(e) => setDetail(f.id, e.target.value)}
              />
            )}
          </Field>
        ))}
      </div>

      {/* Document checklist (no upload here — documents are requested securely after contact) */}
      {cfg?.documents && cfg.documents.length > 0 ? (
        <div className="mt-6 rounded-xl border border-border bg-surface-muted p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <FileText className="h-4 w-4 text-accent-strong" /> Documents we’ll typically need
          </p>
          <ul className="mt-2 space-y-1 text-sm text-ink-muted">
            {cfg.documents.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-ink-faint">
            No need to attach anything now — we’ll request these securely after your inquiry.
          </p>
        </div>
      ) : null}

      <label className="mt-6 flex items-start gap-3 text-sm text-ink-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-navy)]"
        />
        <span>
          I agree to be contacted about this request and have read the{' '}
          <Link href="/privacy" className="font-medium text-accent-strong underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {errors.consent ? <p className="mt-1 text-xs font-medium text-error">{errors.consent}</p> : null}

      {serverMsg ? <p className="mt-4 text-sm font-medium text-error">{serverMsg}</p> : null}

      {status === 'fallback' ? (
        <div className="mt-5 rounded-xl border border-border bg-surface-muted p-4 text-sm text-ink-muted">
          <p>
            Online submission isn’t connected yet. You can send your request by email instead —
            we’ve pre-filled it with your answers.
          </p>
          <Button href={mailtoHref} variant="primary" className="mt-3">
            <Mail className="h-4 w-4" /> Send by Email
          </Button>
        </div>
      ) : null}

      <div className="mt-6">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={status === 'submitting'}
          className={cn('w-full sm:w-auto', status === 'submitting' && 'opacity-70')}
        >
          <Send className="h-5 w-5" />
          {status === 'submitting' ? 'Sending…' : 'Submit Request'}
        </Button>
      </div>
    </form>
  );
}
