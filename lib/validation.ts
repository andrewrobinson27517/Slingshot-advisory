import { z } from 'zod';

/** Service categories that the intake form can route to. */
export const serviceKeys = [
  'cam-review',
  'lease-renewal',
  'website',
  'ai-automation',
  'underwriting',
  'business-advisory',
] as const;

export type ServiceKey = (typeof serviceKeys)[number];

/**
 * Intake payload. Base contact fields are strongly validated; the conditional,
 * service-specific answers arrive in `details` (a map of fieldId → value) and
 * are length-bounded here, with per-service required fields enforced in the API
 * route using the field definitions in data/intake.ts.
 */
export const intakeSchema = z.object({
  service: z.enum(serviceKeys),
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  email: z.string().trim().toLowerCase().email('Enter a valid email.').max(200),
  phone: z.string().trim().max(40).optional().default(''),
  company: z.string().trim().max(160).optional().default(''),
  details: z.record(z.string().max(6000)).default({}),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please agree to be contacted about your request.' }),
  }),
  // ── Anti-spam (not shown to users) ──
  // Honeypot: a hidden field bots tend to fill; must stay empty.
  company_website: z.string().max(0).optional().default(''),
  // Time-trap: ms between form render and submit; submissions < ~1.5s are suspect.
  elapsedMs: z.number().int().nonnegative().optional(),
});

export type IntakeInput = z.infer<typeof intakeSchema>;
