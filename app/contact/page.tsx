import type { Metadata } from 'next';
import { Mail, MapPin, Phone, CalendarClock } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { IntakeForm } from '@/components/intake/IntakeForm';
import { site } from '@/data/site';
import { serviceKeys, type ServiceKey } from '@/lib/validation';

export const metadata: Metadata = {
  title: 'Request a Consultation',
  description:
    'Tell us about your business challenge and get a clear project scope. Commercial tenant advisory, websites & AI, real estate underwriting, and business advisory — Rochester, MN.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.service) ? sp.service[0] : sp.service;
  const initialService = (serviceKeys as readonly string[]).includes(raw ?? '')
    ? (raw as ServiceKey)
    : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Request a consultation"
        title="Tell us about your challenge."
        intro="Share a few details and you’ll get a clear project scope — no obligation, and no pressure. We typically respond within one business day."
      />

      <Section spacing="lg">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          {/* Details */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-bold text-ink">Get in touch</h2>
              <div className="mt-4 space-y-4 text-[0.95rem]">
                <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 font-medium text-ink hover:text-accent-strong">
                  <Mail className="h-5 w-5 text-accent-strong" /> {site.contact.email}
                </a>
                <a href={site.contact.phoneHref} className="flex items-center gap-3 font-medium text-ink hover:text-accent-strong">
                  <Phone className="h-5 w-5 text-accent-strong" /> {site.contact.phone}
                </a>
                <p className="flex items-start gap-3 text-ink-muted">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong" /> {site.contact.location}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface-muted p-6">
              <p className="flex items-center gap-2 font-bold text-ink">
                <CalendarClock className="h-5 w-5 text-accent-strong" /> Prefer to schedule a call?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Include your availability in the form and we’ll propose a time. Appointments are
                confirmed by email — there’s no obligation to start a project from an initial
                conversation.
              </p>
            </div>

            <p className="measure text-xs leading-relaxed text-ink-faint">
              Please don’t send sensitive documents (financials, leases) in this form. If a
              project needs them, we’ll request them through a secure, access-controlled channel.
            </p>
          </div>

          {/* Intake */}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">
            <IntakeForm initialService={initialService} />
          </div>
        </Container>
      </Section>
    </>
  );
}
