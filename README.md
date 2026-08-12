# Harish B — Portfolio

Personal portfolio built with Next.js 16 (App Router), Tailwind CSS v4 and
Framer Motion. White-first soft-morphism UI: raised white surfaces on a warm
grey canvas, inset wells, hairline bevels and restrained hover.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content

Everything the site renders comes from [`lib/data.ts`](lib/data.ts) — profile,
what you're building now, experience, education, projects, toolkit. Change it
there and every page updates.

## Images to add

| File | Used for |
| --- | --- |
| `public/my_photo.jpg` | Your photo in the hero (falls back to an `H` monogram) |
| `public/logos/aarogya.png` | Aarogya ID logo on the experience card |
| `public/logos/kalvium.png` | Kalvium logo on the education card |

Each one shows a lettered placeholder until the file exists, so nothing breaks
in the meantime. Different extension? Update the path in `lib/data.ts`.

## Structure

```
app/
  page.tsx           Home — hero, building now, experience, education, toolkit
  projects/page.tsx  Filterable project grid
  connect/page.tsx   Contact form + direct channels
  api/contact/       Resend handler for the contact form
  globals.css        Design tokens + .soft / .soft-sm / .soft-inset utilities
components/site/     Nav, footer, cards, marquee, avatar, logos, form
lib/data.ts          All site content
```

## Design system

Three surface utilities carry the whole look:

- `.soft` — raised card (inner highlight + wide ambient shadow)
- `.soft-sm` — same treatment for pills, chips and small controls
- `.soft-inset` — pressed well, used for tracks, tags and form fields

Plus `.lift` (3px hover rise), `.press` (active scale), `.hairline` (bevel
border) and `.reveal` (CSS-only entrance — no JS dependency, so content is
never stuck invisible).

## Environment

The contact form needs a [Resend](https://resend.com) key. Copy
`.env.example` to `.env.local`:

```
RESEND_API_KEY=re_xxx
CONTACT_FROM_EMAIL=you@yourdomain.com   # optional, defaults to onboarding@resend.dev
```

Without `RESEND_API_KEY` the form returns a clear error instead of crashing.
