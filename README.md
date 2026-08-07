# BB's Mobile Welding — website

Single-page marketing site for Ben Bjornsen's mobile welding business,
serving Cedar Rapids, Iowa and a ~2-hour radius. Next.js 16 (App Router)
+ Tailwind CSS v4, built as a static export for Cloudflare Pages.

## Before you launch — placeholder data to replace

Everything below lives in one file: [`src/lib/site-config.ts`](src/lib/site-config.ts).
Nothing else needs to change.

| Field | Status | Notes |
|---|---|---|
| `phoneDisplay` / `phoneHref` / `smsNumber` | ✅ Real | (319) 573-7507 |
| `email` | ✅ Real | benbj@bbsmobilewelding.com |
| `facebookUrl` | ✅ Real | linked in footer + JSON-LD `sameAs` |
| `hours` | ⏳ Placeholder | Mon–Fri 7–6, Sat by appt — confirm with Ben |
| `serviceAreaCities` | ⏳ Placeholder | Rough list of ~25 eastern Iowa towns — confirm/trim with Ben |
| `services` | ⏳ Placeholder | Rough 7-item list — confirm/trim with Ben |

Also swap `/logo.jpg` in `public/` for a higher-resolution or vector
version if one ever exists — the current one is the single 1500×1500
JPG provided, so it's also standing in as the favicon and OG image.

**Photos:** the Gallery section is a swipeable carousel with a
click-to-expand lightbox (`src/components/Gallery.tsx`), showing 7 real
jobsite photos. To add more, drop the image in `public/gallery/` and
add an entry (`src`, `width`, `height`, `alt`) to `galleryPhotos` in
`src/lib/site-config.ts` — width/height should be the file's actual
pixel dimensions (avoids layout shift).

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build      # static export -> out/
npm run lint
```

## Deployment (Cloudflare Workers static assets, not Vercel)

Cloudflare's newer git-connected project flow creates a **Workers**
project (not classic Pages), which builds and deploys via Wrangler.
This repo is set up for that: [`wrangler.jsonc`](wrangler.jsonc)
declares an assets-only Worker (no server code) pointing at `out/`.

1. Push this repo to GitHub.
2. In the Cloudflare dashboard, connect the repo as a Workers project.
   In **Settings → Build**, set:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   Do **not** use the "Next.js" framework preset — that defaults to
   `opennextjs-cloudflare build`, which builds a full SSR Worker. This
   site is a static export and doesn't need that adapter.
3. Cloudflare auto-deploys on every push to `main`.
4. Point `bbsmobilewelding.com` (registered through Google) at Cloudflare
   by switching its nameservers to the ones Cloudflare assigns, then
   attach the domain to the Worker (Settings → Domains & Routes).

No environment variables or bindings are required — the site has no
backend. Verify the config anytime with `npm run build && npx wrangler
deploy --dry-run`.

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
