# Slingshot Advisory

A production-quality marketing + lead-generation website for **Slingshot Advisory**, a
boutique business consulting and digital-solutions firm in Rochester, MN.

Built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4**, with a
conditional intake system, an integration-ready lead API, and a structured website
assistant. No fabricated metrics, testimonials, or credentials; licensing disclosures are
scoped to each service.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

Nothing needs to be configured to run or deploy the marketing site. Copy `.env.example` to
`.env.local` to enable email, lead storage, or an LLM-backed assistant (see below).

## Structure

```
app/
  page.tsx                 Home
  tenant-advisory/         Commercial Tenant Advisory
  digital-solutions/       Websites & AI Solutions
  investment-analysis/     Real Estate Underwriting
  business-advisory/       Business & Capital Advisory
  our-work/                Portfolio (permission-gated)
  about/  resources/[slug] About · Resources + articles
  contact/                 Intake form (reads ?service=)
  privacy/  terms/         Legal templates (review before launch)
  api/intake/route.ts      Lead API (validation, rate limit, email/webhook/dev-log)
  sitemap.ts robots.ts icon.tsx opengraph-image.tsx
components/                UI, layout, shared, home, forms, intake, assistant
data/                      site, services, intake, resources, work, faq (content source)
lib/                       cn, validation (zod), ratelimit, schema (JSON-LD)
styles/globals.css         Tailwind v4 design tokens
```

Content lives in `data/*.ts` — edit services, packages, intake questions, articles, and
FAQs there without touching markup. **Prices appear in both `data/services.ts` and
`data/faq.ts` (the assistant) — update both together.**

## Lead intake — how it behaves

The Contact form adapts its questions to the selected service (progressive disclosure) and
posts to `/api/intake`, which:

1. Rate-limits by IP and runs a honeypot + time-trap for spam.
2. Validates with zod (client **and** server), enforcing per-service required fields.
3. Processes the lead through whatever is configured, in this order:
   - **Resend email** (owner notification + client acknowledgment) if `RESEND_API_KEY` is set.
   - **Webhook** (`LEAD_WEBHOOK_URL`) for storage in your CRM/Supabase/etc.
   - **Dev file log** (`./.leads/leads.jsonl`) in development only, so you can test end to end.
4. Returns success **only** when a lead was actually sent or stored. With nothing configured
   in production it returns an honest “not connected” response, and the form then offers a
   **pre-filled email** fallback — it never shows a fake success.

Leads carry a status model (`New → Needs Information → Qualified → Proposal Sent → Won →
In Progress → Completed → Lost`) in the data you store; wire a private, authenticated admin
view to manage them (see “Not yet built” below).

## Website assistant

A bottom-right launcher (`components/assistant/Assistant.tsx`) answers from the curated
knowledge base in `data/faq.ts` (structured FAQ matching — no LLM needed) and always offers
a path to a human. To upgrade to an LLM-backed assistant, add a secure server route that
reads `ANTHROPIC_API_KEY` and constrains responses to the knowledge base — never expose the
key in the browser.

## Configuration (`.env.local`)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical/OG/sitemap base URL |
| `RESEND_API_KEY` | Enables acknowledgment + notification emails |
| `LEAD_FROM_EMAIL` / `LEAD_NOTIFY_EMAIL` | Verified sender / where leads go |
| `LEAD_WEBHOOK_URL` | Optional: post each lead to your CRM/storage |
| `ANTHROPIC_API_KEY` | Optional: LLM-backed assistant (server-side only) |

## Deploy

Netlify (`netlify.toml` included, with `@netlify/plugin-nextjs`) or Vercel. Set the env
vars above in the host. The API route runs on the Node.js runtime.

## Known placeholders to confirm before launch

- **Contact details** in `data/site.ts` (email/phone) are launch placeholders.
- **Legal pages** (`/privacy`, `/terms`) are templates — have counsel review.
- **Our Work:** the Seven Medicine project is shown as a client project. Confirm the client
  has approved public use of their name; `SHOW_CLIENT_PROJECTS` in `app/our-work/page.tsx`
  (and the `permission` flag in `data/work.ts`) gate this.

## Not yet built (integration-ready, documented)

These were specified and are scaffolded for but intentionally not faked without credentials:

- **Authenticated admin dashboard** for lead management (the lead schema + statuses exist).
- **Private, access-controlled document uploads** (the form collects text and shows a
  document checklist; uploads require object storage + signed URLs).
- **LLM-backed assistant** (structured FAQ ships today).
- **Automated tests** for intake validation/routing.

---

© Slingshot Advisory. An affiliate of Slingshot Real Estate.
