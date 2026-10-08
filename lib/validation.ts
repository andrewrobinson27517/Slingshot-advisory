import { z } from 'zod';

/** Service categories that the intake form can route to. */
export const serviceKeys = [
  'cam-review',
  'lease-renewal',
  'website',
  'ai-automation',
  'brand-strategy',
  'underwriting',
  'business-advisory',
  'property',
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

/** Direct website-purchase order (single custom package + business info). */
export const orderSchema = z.object({
  packageId: z.literal('custom'),
  businessName: z.string().trim().min(2, 'Enter your business name.').max(160),
  contactName: z.string().trim().min(2, 'Enter your name.').max(120),
  email: z.string().trim().toLowerCase().email('Enter a valid email.').max(200),
  phone: z.string().trim().max(40).optional().default(''),
  existingWebsite: z.string().trim().max(300).optional().default(''),
  category: z.string().trim().max(160).optional().default(''),
  functionality: z.string().trim().max(4000).optional().default(''),
  goal: z.string().trim().max(2000).optional().default(''),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'Please agree to the project terms to continue.' }),
  }),
  company_website: z.string().max(0).optional().default(''), // honeypot
  elapsedMs: z.number().int().nonnegative().optional(),
});

export type OrderInput = z.infer<typeof orderSchema>;

/** Strategy-call scheduling request (no live calendar — collected as preferred times). */
export const scheduleSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.').max(120),
  email: z.string().trim().toLowerCase().email('Enter a valid email.').max(200),
  phone: z.string().trim().max(40).optional().default(''),
  orderId: z.string().trim().max(60).optional().default(''),
  preferredTimes: z.string().trim().min(3, 'Share a few times that work.').max(2000),
  notes: z.string().trim().max(3000).optional().default(''),
  company_website: z.string().max(0).optional().default(''), // honeypot
  elapsedMs: z.number().int().nonnegative().optional(),
});

export type ScheduleInput = z.infer<typeof scheduleSchema>;
