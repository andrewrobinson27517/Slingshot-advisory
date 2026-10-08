'use client';

import { useMemo, useRef, useState } from 'react';
import { CalendarCheck, Send, Mail } from 'lucide-react';
import { site } from '@/data/site';
import { Field, Input, Textarea } from '@/components/forms/fields';
import { Button } from '@/components/ui/Button';

type Status = 'idle' | 'submitting' | 'success' | 'fallback' | 'error';

export function ScheduleForm({ orderId }: { orderId?: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTimes, setPreferredTimes] = useState('');
  const [notes, setNotes] = useState('');
  const [hp, setHp] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMsg, setServerMsg] = useState('');
  const startedAt = useRef(Date.now());

  const mailtoHref = useMemo(() => {
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      orderId && `Order: ${orderId}`,
      '',
      `Preferred times:`,
      preferredTimes,
      notes && `\nNotes: ${notes}`,
    ]
      .filter(Boolean)
      .join('\n');
    return `mailto:${site.contact.email}?subject=${encodeURIComponent('Strategy call request')}&body=${encodeURIComponent(body)}`;
  }, [name, email, phone, orderId, preferredTimes, notes]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) errs.email = 'Enter a valid email.';
    if (preferredTimes.trim().length < 3) errs.preferredTimes = 'Share a few times that work.';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus('submitting');
    setServerMsg('');
    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          orderId: orderId ?? '',
          preferredTimes: preferredTimes.trim(),
          notes: notes.trim(),
          company_website: hp,
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) setStatus('success');
      else if (res.status === 422 && data.fieldErrors) {
        setStatus('idle');
        setErrors(data.fieldErrors);
      } else if (data.code === 'not_configured') setStatus('fallback');
      else {
        setStatus('error');
        setServerMsg(data.message || 'Something went wrong.');
      }
    } catch {
      setStatus('fallback');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-[var(--shadow-card)]">
        <CalendarCheck className="mx-auto h-12 w-12 text-success" />
        <h3 className="mt-4 text-2xl font-semibold text-ink">Request received</h3>
        <p className="measure mx-auto mt-2 text-ink-muted">
          Thanks{name ? `, ${name.split(' ')[0]}` : ''}. We’ll confirm a specific time by email
          shortly — consider this <strong>pending confirmation</strong> until you hear back.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">
      <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label>
          Company website
          <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="s-name" required error={errors.name}>
          <Input id="s-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </Field>
        <Field label="Email" htmlFor="s-email" required error={errors.email}>
          <Input id="s-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </Field>
        <Field label="Phone" htmlFor="s-phone">
          <Input id="s-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
        </Field>
        <Field label="Preferred times" htmlFor="s-times" required error={errors.preferredTimes} full hint="A few options help us confirm fast — e.g. “Tue/Thu mornings, or after 3pm Fri.”">
          <Textarea id="s-times" value={preferredTimes} onChange={(e) => setPreferredTimes(e.target.value)} />
        </Field>
        <Field label="Anything else?" htmlFor="s-notes" full>
          <Textarea id="s-notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional context for the call." />
        </Field>
      </div>

      {serverMsg ? <p className="mt-4 text-sm font-medium text-error">{serverMsg}</p> : null}
      {status === 'fallback' ? (
        <div className="mt-5 rounded-xl border border-border bg-surface-muted p-4 text-sm text-ink-muted">
          <p>Scheduling isn’t connected yet — send your preferred times by email and we’ll confirm.</p>
          <Button href={mailtoHref} variant="primary" className="mt-3">
            <Mail className="h-4 w-4" /> Email My Times
          </Button>
        </div>
      ) : null}

      <Button type="submit" variant="accent" size="lg" disabled={status === 'submitting'} className="mt-6 w-full sm:w-auto">
        <Send className="h-5 w-5" /> {status === 'submitting' ? 'Sending…' : 'Request My Call'}
      </Button>
    </form>
  );
}
