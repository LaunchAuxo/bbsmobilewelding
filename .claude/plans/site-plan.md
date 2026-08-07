# Site Plan — BB's Mobile Welding

## Business context
- **Name:** BB's Mobile Welding
- **Owner/operator:** Ben Bjornsen (one-man shop)
- **Location:** Cedar Rapids, Iowa
- **Service area:** Mobile/on-site welding within ~2 hours of Cedar Rapids; customers can also bring work to him (drop-off/shop-side repair)
- **Business stage:** Newish business, real work history, no digital presence yet
- **Audience:** Homeowners, farmers/ag operations, small contractors, fleet/trailer owners in eastern Iowa who need a welder to come to them, or a reliable independent shop
- **Domain:** bbsmobilewelding.com (already owned)
- **Brand asset:** One logo file (`brand-assets/ben_1.jpg`), no photography yet

## Placeholder data (client to replace before launch)
| Field | Placeholder | Notes |
|---|---|---|
| Phone | (319) 555-0142 | Cedar Rapids area code, clearly fake exchange (555) |
| Email | info@bbsmobilewelding.com | Matches owned domain; needs to actually be set up |
| Photos | None yet | Gallery/hero built to work with icon/pattern treatment until real jobsite photos exist |
| Certifications/insurance | Not stated | Trust bar will use generic honest claims only (mobile service, in-shop option, free quotes) — no fabricated credentials |

## Color direction (confirmed)
**Neutral steel** — black / white / grayscale only, no accent color. Matches the logo as-is and the True Repair Welding reference. Typography and whitespace carry the design instead of color.

## Reference patterns being borrowed
- **True Repair Welding:** SMS-prefilled quote button (primary CTA), fixed-tone trust messaging, before/after treatment, clean single-column flow
- **Major Welding:** service-capability grouping (project types / material types / processes), certifications row
- **American Mobile Welding:** service-area/county list, mobile-truck imagery slot, industrial/residential/ag segmentation

## Rough service list (placeholder, client will refine)
- Mobile on-site welding & repair
- Farm & agricultural equipment repair
- Trailer repair & fabrication
- Structural steel & custom fabrication
- Fencing & gate repair
- Equipment & machinery repair
- Steel, aluminum & stainless welding

## Site map (revised — single landing page)
One page (`/`), anchor-linked sections, nav scrolls to each:
1. **Hero** — mobile + in-shop dual value prop, SMS quote CTA
2. **Trust bar** — honest owner-operated claims
3. **How it works** — 3-step text-photos flow
4. **#services** — full list, each with a short honest description
5. **Mobile vs. shop** — dual value prop explainer
6. **#service-area** — Cedar Rapids + 2-hour radius, list of nearby cities
7. **#gallery** — placeholder-ready grid (empty state, not fake stock photos)
8. **#about** — Ben's story, one-man/direct-with-the-owner positioning
9. **#contact** — SMS quote button (template below), phone, email
10. Footer

## SMS quote button (from True Repair Welding, adapted)
`sms:+13195550142?body=` + URL-encoded:
```
Hi, I'd like a quote for a welding repair.

Please include:
- Wide photo
- Close-up photo
- Extra photos if helpful

Brief description:

Repair location:
- In-shop
- Mobile welding (address):

Your name:
```
Used as the primary CTA button site-wide ("Text Photos. Fast Quote." style), matching Ben's stated favorite feature.

## Tech stack
- Next.js 16 (App Router), TypeScript
- Tailwind CSS v4
- Static export (`output: 'export'`) — no server runtime needed, so no Cloudflare edge adapter required
- next/image set to `unoptimized: true` (static export can't use the Next.js image optimizer; plain `<Image>` still gets width/height + lazy loading)
- JSON-LD `LocalBusiness`/`ProfessionalService` schema, sitemap.xml, robots.txt, metadata per page

## Deployment (client's process, not the skill default)
1. **GitHub:** push the project to a new repo (public or private per Ben's preference)
2. **Cloudflare Workers (static assets):** connecting a repo through Cloudflare's current dashboard creates a Workers project, not classic Pages. Build command `npm run build`, deploy command `npx wrangler deploy`. `wrangler.jsonc` declares an assets-only Worker pointing at `out/` (no server code, no bindings). The "Next.js" framework preset must NOT be used — it defaults to the `opennextjs-cloudflare` SSR adapter, which this static-export build doesn't need and which broke the first deploy attempt.
3. **Domain:** `bbsmobilewelding.com` is registered through Google; DNS will be switched to Cloudflare nameservers, then the domain attached to the Worker.
4. No Vercel involved anywhere in this build.

## Build sequence
1. Scaffold Next.js + Tailwind v4, drop in logo
2. Design system: grayscale palette, type scale, spacing, button/card primitives
3. Components: navbar, hero, SMS CTA button, service cards, trust bar, footer, contact form
4. Pages: Home, Services, About, Service Area, Gallery, Contact
5. Real copy pass — no AI-fluff, matches how a straight-talking Iowa tradesman would describe his own work
6. Accessibility + performance pass
7. SEO: metadata per page, LocalBusiness JSON-LD, sitemap, robots.txt, OG tags
8. Handoff: README with where to swap phone/email/photos, deploy notes for Vercel + bbsmobilewelding.com
