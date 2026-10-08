# Slingshot — Brand Guidelines (Advisory)

How Slingshot Advisory looks, sounds, and fits within the Slingshot family. Design tokens
live in `styles/globals.css` (`@theme`); this document explains intent and usage.

## 1. Brand architecture

**Slingshot** is the shared parent identity.

- **Slingshot Real Estate** — real estate ownership and operations.
- **Slingshot Advisory** — helps businesses and property owners through technology, financial
  analysis, commercial tenant support, and property repositioning.

Advisory and Real Estate should clearly read as **two branches of the same company**: the same
navy + burnt-orange palette, the same type system (Geist + Fraunces), the same cream surfaces
and restrained, premium feel. Advisory leans **slightly more modern and technology-forward** —
more navy, a cool steel-blue in data/graphics, cleaner software-style interactions — without
departing from the family.

## 2. Brand voice

Local, knowledgeable, helpful, direct, practical, and low-pressure.

- **Core message:** *Helping Rochester businesses grow, one business at a time.*
- **Supporting philosophy:** *We learned these skills building our own businesses. Now we’re
  making them available to others.*

**Writing principles:** natural, conversational language. Avoid corporate consulting clichés
("synergy," "revolutionizing," "best-in-class"), fabricated statistics, and hype. Say what a
thing is and what it costs. Prefer short, concrete sentences.

## 3. Color

Provisional/aligned to the verified Slingshot Real Estate palette. Accent is **burnt orange**
(the Slingshot mark) rather than a gold — it’s the strongest family tie.

| Token | Hex | Use |
| --- | --- | --- |
| `--color-bg` | `#faf8f3` | Warm cream page background |
| `--color-surface` | `#ffffff` | Cards, panels |
| `--color-surface-muted` | `#f1ede5` | Section banding |
| `--color-ink` / navy | `#16212e` | Primary text, dark hero/footer bands |
| `--color-ink-soft` | `#21303f` | Lifted navy panels |
| `--color-ink-muted` | `#5b6675` | Secondary text |
| `--color-ink-faint` | `#8a94a1` | Captions, minor metadata |
| `--color-accent` | `#c0532a` | Burnt-orange accent, key CTAs |
| `--color-accent-strong` | `#a5421e` | Hover / links on light |
| `--color-accent-soft` | `#f6e7db` | Soft fills, pills |
| `--color-steel` | `#8da9c4` | Steel-blue — technology/graphics accent |
| `--color-on-dark` / `-muted` | `#f4f1ea` / `#a7b1bd` | Text on navy |
| `--color-border` | `#e6e1d7` | Hairlines |

Never use the accent for long-form body text. Keep it for emphasis, the primary CTA, and small
highlights. Replace provisional values with exact brand tokens if/when they’re formalized.

## 4. Typography

- **Display / headings:** Fraunces (serif) — `--font-display`. Weight 600, tight tracking
  (-0.015em), balanced line breaks.
- **Body / UI:** Geist Sans — `--font-sans`. Base 17px (`html { font-size: 106.25% }`),
  line-height 1.6.
- **Mono:** Geist Mono — for the occasional figure/label.
- **Eyebrow:** `.text-eyebrow` — uppercase, 0.16em tracking, used only for short section labels.

## 5. Components

- **Buttons** (`components/ui/Button.tsx`): `rounded-md`, medium weight. `primary` = navy fill;
  `accent` = burnt-orange fill with white text (the one conversion CTA); `outline` and `ghost`
  for secondary actions; `on-dark` for navy sections. Sizes `sm`/`md`/`lg` (44–48px tall for
  important actions). Visible focus ring (`--color-accent`).
- **Cards:** `rounded-2xl`, 1px `--color-border`, soft `--shadow-card`; lift + `--shadow-card-hover`
  on interactive cards. Generous padding (p-6/p-7).
- **Radii:** sm `.375rem`, md `.625rem`, lg `.875rem`, 2xl `1.25rem`.
- **Shadows:** restrained; `--shadow-card`, `--shadow-card-hover`, `--shadow-hero`.
- **Spacing:** sections use `Section` spacing `sm`/`md`/`lg`; container gutter 20–32px; keep
  generous whitespace.
- **Animation:** subtle only — scroll fade-ups (`Reveal`), gentle hovers. Everything respects
  `prefers-reduced-motion`. No distracting movement.

## 6. Logo & iconography

- **Logo** (`components/layout/Logo.tsx`): a rising trajectory arc with a launch node (momentum /
  a smart move) plus the "Slingshot Advisory" wordmark and a small descriptor line.
- **Clear space:** keep at least the height of the mark’s box clear on all sides; don’t crowd it.
- **Tone variants:** default (navy mark on cream) and `on-dark` (translucent mark on navy).
- **Icons:** Lucide, consistent stroke, sized `h-4`/`h-5`/`h-6`. Icons support text — they never
  replace a label.

## 7. CTA style

- One primary burnt-orange CTA per view ("Request a Consultation", "Build My Website",
  "Let’s Talk About Your Property"). Secondary actions use outline/ghost.
- Low-pressure language. No dark patterns, no fake urgency.

## 8. Accessibility

- Maintain WCAG-AA contrast (muted/faint inks are tuned for this on cream/white).
- Visible keyboard focus everywhere; never suppress the focus ring.
- Tap targets ≥ 44px for primary actions; forms have real `<label>`s and error text.
- Content remains usable at 200% zoom; layouts have no horizontal scroll on mobile.
