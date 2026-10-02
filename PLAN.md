# Website v1 plan — [Organization Name TBD]

Approved and implemented with the five-page structure. The latest design revision uses a dark sci-fi theme, cute floating space illustrations, asymmetric panels, and occasional light surfaces. Copy is brief and factual, with one motto: “Big universe. Bigger imaginations.” This revision supersedes the original light-theme recommendation below. The name, gallery, and contact form retain explicit placeholders. Publishing awaits release approval.

## Purpose and scope

Introduce a student-led astronomy, cosmology, and art association beginning in the Los Angeles area. Help students, families, and potential community hosts understand the mission, the first workshop being prepared, and how to get involved.

Suggested mission: “We’re a student-led group bringing astronomy and art together to make exploring the universe welcoming, creative, and shared.”

Use `[Organization Name TBD]` consistently until a name is chosen. Describe the organization as a youth-led association; do not claim nonprofit registration, 501(c)(3) status, tax deductibility, completed outreach, established partnerships, or measured impact. Omit chapter plans, fundraising, and internal development stages from public copy.

## 1. Stack and hosting

**Recommend Astro in static-output mode, plain CSS, and minimal JavaScript, hosted on Cloudflare Pages.** This suits a small informational site without a database or application backend. Astro supports Markdown and structured content files, letting students edit words independently of layout. [Astro content documentation](https://docs.astro.build/en/guides/content-collections/)

Cloudflare documents Astro deployment and offers a free Pages tier with 500 builds per month, ample for the proposed editing cadence. Start with its provided subdomain; a purchased domain is optional and separately budgeted. [Astro deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) · [Free-tier limits](https://developers.cloudflare.com/pages/platform/limits/)

**Alternative:** Keep Astro and use GitHub Pages if managing everything in GitHub is preferable. GitHub Free supports Pages from public repositories; choosing a private repository changes the plan requirements. This avoids changing the site stack but needs an appropriate build/deploy workflow. [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)

Editing workflow: students change Markdown or a small YAML file through GitHub’s web editor, preview the proposed update, then have a designated maintainer approve it. Include a short editing guide and validate required content fields. A browser-based CMS can be considered later if this workflow proves difficult; it is unnecessary for v1.

## 2. Sitemap and content

Recommend **five pages**, combining About and Learn while research content is small. Keep all three branch names visible on Home; Learn links directly to its section on About. No separate events calendar yet.

- **Home `/`:** Clear placeholder name; mission; “student-led, starting in Los Angeles”; three short branch introductions; first-workshop preview; “Explore the workshop” and “Get involved” links. No impact counters, testimonials, or partner logos.
- **About `/about/`:** Why astronomy and creativity belong together; community-minded mission; brief student-led introduction. **Learn `#learn`:** intent to explore astronomy/cosmology questions through small projects, without implying published research or existing findings. Add named members only with their permission.
- **Create `/create/`:** Explain the intention to share original space-inspired art and learning materials. Start with one intentional empty gallery state: “Our first collection is taking shape.” Mention only a few examples, such as illustrations, astrophotography, and activity pages. Approved real work can replace the placeholder with title, caption, artist credit, and alt text; no invented projects or misleading sample portfolio.
- **Reach Out `/reach-out/`:** Lead with **“First workshop — in preparation.”** Suggested copy: “We’re preparing a roughly 45-minute planets and exoplanets workshop for K–5 learners, combining a short lesson with a hands-on craft. Date and location are not confirmed.” A local library is the intended setting, not an announced partner. Keep registration unavailable. Beneath it, a one-sentence teaser: **“Care kits — in development. We’re exploring art-filled care kits for pediatric patients.”** No hospital names, delivery promises, medical benefits, or detailed kit inventory.
- **Get Involved `/get-involved/`:** Invite interest in art, workshop preparation, and potential hosting, without promising open roles or placements. Include a clearly labeled “Interest form coming soon” panel with no data entry, submit action, or simulated success. A verified organizational email can be added when supplied; never publish a fake address.

Reuse the same workshop content on Home and Reach Out so status cannot drift. Future donation support should require only another navigation item and content section; no visible donation placeholders or payment code in v1.

## 3. Visual directions

The [Stardance reference](https://stardance.hackclub.com/) was accessible and visually reviewed. Its friendly direct voice, space imagery, and playful decorative touches inform the energy only. Create an independent composition, artwork, and copy.

1. **Cosmic Sticker Club — recommended.** Deep ink `#17204A`, white `#FFFFFF`, electric blue `#3155E7`, sunshine `#FFE15A`, pink `#FF8AC6`. Fredoka for chunky headings; Atkinson Hyperlegible for body text. Mostly light reading surfaces, bold blue accents, original planet doodles, and a few sticker badges. Best balance of cutesy warmth and credibility.
2. **Midnight Sketchbook.** Midnight `#11172E`, white `#FFFFFF`, cyan `#69E2FF`, lilac `#C3AEFF`, orange `#FFB36B`. Balsamiq Sans headings; Source Sans 3 body. Dark backgrounds, sketchbook annotations, and glowing color accents; stronger astronomy atmosphere, with more careful treatment needed for colorful artwork.
3. **Space Art Lab.** White `#FFFFFF`, charcoal `#202135`, cobalt `#244EDB`, tangerine `#FF9C55`, lime `#D4F36B`. Lilita One headings; Nunito Sans body. Bold poster-like headings and tidy gallery framing; slightly more graphic and less whimsical.

Treat colors as candidate tokens, not permission to use every foreground/background pairing. Use dark text on bright pastel accents; validate final combinations. Self-host licensed font files with system fallbacks, limiting families and weights.

Desktop-first composition at roughly 1100–1200px content width, with responsive stacking and usable mobile navigation. Keep body text around 18px and reading lines moderate. Decorative stars and planets stay outside reading paths. Use brief sticker tilts on hover/focus and optional one-time scroll entrances; content remains visible without JavaScript. Disable decorative movement for reduced-motion preferences. No autoplay video or continuous parallax.

Accessibility acceptance: semantic headings and landmarks, skip link, keyboard navigation, visible focus, meaningful alt text and empty alt for decoration, no hover-only information, text contrast at least 4.5:1, large text and essential interface contrast at least 3:1, and usable reflow/zoom.

## 4. Components and proposed structure

Components: shared page layout, header/navigation, footer, branch card, workshop card, text status badge, gallery/card with empty state, and inactive interest panel. Decorative artwork is separate from informational imagery. No filters, lightbox, or carousel needed initially.

The following was the proposed structure. Implementation uses JSON instead of YAML for the small shared content files; fonts are bundled locally through Fontsource. Empty art/download directories can be added when real assets arrive.

```text
src/
  pages/                 # index, about, create, reach-out, get-involved
  layouts/BaseLayout.astro
  components/            # reusable pieces listed above
  content/pages/         # editable page copy in Markdown
  content/art/           # approved artwork entries in Markdown
  data/site.yaml         # name, navigation, contact/form URL (empty initially)
  data/workshop.yaml     # topic, audience, duration, status, unconfirmed details
  content.config.ts      # content validation
  assets/art/            # images processed during the build
  styles/global.css      # colors, typography, responsive and motion rules
public/
  fonts/                 # selected fonts and licenses
  downloads/             # approved print files, when available
README.md                # student editing and preview instructions
PLAN.md
astro.config.mjs
package.json
```

For gallery performance, generate responsive WebP/AVIF previews, reserve image dimensions, lazy-load below-fold images, and load full-resolution downloads only on request. Start with a small grid; target previews around 150 KB where visual quality allows. Avoid shipping print-resolution files as thumbnails.

## 5. Build milestones, after approval

1. Confirm this plan, visual direction, and initial copy/assets; retain clear placeholders where permitted.
2. Set up Astro and editable content; build the shared layout and Home for an early visual review.
3. Complete the remaining pages, workshop status handling, gallery empty state, and inactive contact panel.
4. Add approved art, responsive image processing, restrained motion, and mobile layouts.
5. Check keyboard use, contrast, reduced motion, zoom/reflow, image descriptions, links, mobile/desktop rendering, page metadata, and production build. Audit all copy for unsupported claims and confirm the placeholder form sends nothing.
6. Provide the editing guide and preview for final review; publish to the chosen host only after release approval. Connect a domain when ready.

## 6. Risks and decisions

- **Identity:** Name, domain, and logo remain open. Build with the explicit name placeholder and a temporary text wordmark; settle public branding before announcing the site.
- **Assets:** Confirm ownership, permission, attribution, and whether work is ready for publication. Label concept illustrations as such; never imply generated or stock art is student work. Check scientific captions for accuracy.
- **Workshop:** Date, venue, capacity, cost, supervision, and registration remain unconfirmed. Publish logistical details only once verified; keep “in preparation” until then.
- **Children and photos:** Agree with the eventual host on supervision and photo-consent wording before registration opens. Default to artwork-only imagery; exclude identifiable children without documented permission. Do not publish minors’ personal contact details or collect child/medical information through a future general-interest form.
- **Care kits:** Requirements and partnerships are unresolved. The teaser must remain “in development” until there is a confirmed, approved program.
- **Contact and stewardship:** Choose an organizational inbox owner, content reviewer, and account owner. Define minimum fields, privacy wording, and response responsibilities before activating any form. These are launch decisions, not reasons to invent details now.

## 7. Questions before building

1. Which visual direction do you prefer: Cosmic Sticker Club, Midnight Sketchbook, or Space Art Lab?
2. What original artwork is already available and approved for public display, if any?
3. Who should the initial involvement invitation target: student contributors, adult/community hosts, or both?

Implementation approved by the user. Proceed with the recommended five-page structure, Astro/Cloudflare approach, and Cosmic Sticker Club direction. The name and form remain explicit placeholders; the initial invitation welcomes both students and potential community hosts. Release approval is still required before publishing.
