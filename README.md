# BB's Mobile Welding — website

Single-page marketing site for Ben Bjornsen's mobile welding business,
serving Cedar Rapids, Iowa and a ~2-hour radius. Next.js 16 (App Router)
+ Tailwind CSS v4, built as a static export for Cloudflare Pages.

## Before you launch — placeholder data to replace

Everything below lives in one file: [`src/lib/site-config.ts`](src/lib/site-config.ts).
Nothing else needs to change.

| Field | Current placeholder | Replace with |
|---|---|---|
| `phoneDisplay` / `phoneHref` / `smsNumber` | `(319) 555-0142` | Ben's real number, in all three fields (keep them in sync) |
| `email` | `info@bbsmobilewelding.com` | Ben's real inbox |
| `hours` | Mon–Fri 7–6, Sat by appt | Ben's actual hours |
| `serviceAreaCities` | Rough list of ~25 eastern Iowa towns | Confirm/trim with Ben |
| `services` | Rough 7-item list | Confirm/trim with Ben |

Also swap `/logo.jpg` in `public/` for a higher-resolution or vector
version if one ever exists — the current one is the single 1500×1500
JPG provided, so it's also standing in as the favicon and OG image.

**Photos:** there's no jobsite photography yet, so the Gallery section
renders an honest "coming soon" placeholder grid instead of stock
images. Once Ben has real photos, drop them in `public/gallery/` and
swap the placeholder loop in `src/app/page.tsx` (`#gallery` section)
for an array of real images.

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build      # static export -> out/
npm run lint
```

## Deployment (Cloudflare Pages, not Vercel)

1. Push this repo to GitHub.
2. In Cloudflare Pages, connect the repo. Build command: `npm run build`.
   Output directory: `out`.
3. Cloudflare Pages auto-deploys on every push to `main`.
4. Point `bbsmobilewelding.com` (registered through Google) at Cloudflare
   by switching its nameservers to the ones Cloudflare assigns, then
   attach the domain to the Pages project.

No environment variables are required — the site has no backend.

## Notes on how it's built

- **Static export.** `next.config.ts` sets `output: "export"`, so there's
  no Node server at runtime — just HTML/CSS/JS Cloudflare Pages serves
  directly. `next/image` optimization is disabled (`unoptimized: true`)
  because the export has no image server; images still get explicit
  width/height to avoid layout shift.
- **One page.** Everything lives in `src/app/page.tsx` as anchor-linked
  sections (`#services`, `#service-area`, `#gallery`, `#about`,
  `#contact`). The nav in `src/lib/site-config.ts` (`navLinks`) scrolls
  to these anchors instead of routing to separate pages.
- **The "Text Photos" button** (`src/components/CtaButtons.tsx`,
  `SmsQuoteButton`) is Ben's signature feature, borrowed from True
  Repair Welding's site. It opens the phone's messaging app with a
  pre-filled quote-request template (defined in `smsQuoteTemplate` in
  `site-config.ts`) so a customer can just attach photos and send.
- **No contact form.** Static export has no backend to receive form
  submissions, so contact is SMS / call / mailto only. If a real form
  is wanted later, wire up a static-friendly service like Formspree or
  Web3Forms rather than trying to handle submissions server-side.
- **Color palette** is intentionally grayscale ("neutral steel") to
  match the one existing brand asset (the logo) as-is, rather than
  inventing an accent color. Tokens are defined in
  `src/app/globals.css` (`--color-ink`, `--color-steel`, `--color-mist`,
  etc.) — `mist` is specifically the lighter gray used for secondary
  text on dark sections (footer, contact band) to keep contrast
  accessible; `steel` is for secondary text on light sections.
- **No fabricated credentials.** The trust bar and copy avoid claiming
  certifications, years-in-business, or insurance status since none
  were provided. Add real ones to `TrustBar.tsx` when Ben has them to
  share.

## Project plan / history

See `.claude/plans/site-plan.md` and `.claude/plans/checkpoint-tracker.md`
for the original brief and build checkpoints.
