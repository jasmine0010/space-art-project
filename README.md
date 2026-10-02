# Astronomy + art association website

A small, static Astro site for **[Organization Name TBD]**, a youth-led association starting in Los Angeles. The current design is a dark, cutesy sci-fi variation of Cosmic Sticker Club: floating vector art, asymmetric panels, and a few light surfaces. The website has five public content pages and a custom 404 page.

Keep the copy factual and brief. “Big universe. Bigger imaginations.” is the single motto on Home; avoid adding extra slogans or repeated promotional calls to action.

Typography uses DM Sans for the main headings, Atkinson Hyperlegible for body text, and one locally bundled Cormorant Garamond italic weight for selected display words. Keep italic accents to one word per selected heading and reserve the static glow for the Home motto. `AccentText.astro` decorates a matching word without moving copy out of its content file; when the word is absent, it renders the unchanged text.

## Run locally

Use Node.js 22.12+ (Node 24 LTS recommended) and npm.

```sh
npm ci
npm run dev
```

Open the local address printed in the terminal. To verify a release:

```sh
npm run check
npm run build
npm run preview
```

The production output is `dist/`. It contains static files; no database, backend, or form submission service is required. Fonts are bundled locally using Fontsource; visitors do not request fonts from Google.

## Playful interactions

Move the mouse across the space illustration to shift the scene and the planet’s gaze. Hover the branch cards for a slight tilt. Click the planet (or focus it and press Enter/Space) for a wobble and a brief star burst. These enhancements use a small local script in `src/scripts/interactions.ts`, with styles in `src/styles/interactions.css` and no animation library.

Reduced-motion preferences disable parallax, tilt, and animated reactions; the planet gives a static blush instead. Pointer movement effects are limited to a mouse with hover support. Effects reset on pointer leave, scrolling, and loss of window focus; repeated clicks replace the previous burst. Without JavaScript the content remains available and the planet button stays hidden.

## Edit content without changing layout

In GitHub, open the relevant file and choose **Edit**. Make changes on a branch, request review, and use a local or hosting preview before merging. JSON needs double quotes around text and commas between entries; Markdown paragraphs are plain text. The build validates required fields.

- `src/data/site.json`: organization name, mission, location label, navigation, branch cards, and future contact details. Keep the exact placeholder name until the real name is approved.
- `src/data/workshop.json`: workshop title, topic, audience, duration, and status notes. Home and Reach Out use the same record. The initial schema intentionally permits only `In preparation`; ask a developer to update the model and registration behavior when a workshop is confirmed.
- `src/content/pages/*.md`: page title, description used in search previews, introductory label, and introductory paragraphs. The Home headline has custom line breaks in `src/pages/index.astro`; its matching metadata title is in `home.md`.
- `src/styles/global.css`: shared colors, type, layouts, and responsive styles. Components and routes contain the remaining short interface labels and section copy.

Only publish facts that are confirmed. Keep the date/location uncertainty visible, do not imply a library partnership, and keep care kits “in development.” No nonprofit registration, tax-deductibility, completed outreach, or impact claims have been added.

## Add real artwork

The gallery is intentionally empty. The decorative vector illustrations used for the website are design assets, not a portfolio of student work.

1. Obtain permission to display the work and confirm the artist’s preferred public credit. Review captions for scientific accuracy.
2. Create `src/assets/art/` and put a sensibly sized source image there. Keep very large originals outside this repository.
3. Duplicate `src/content/art/example.md` with a descriptive filename. Leave the original template unpublished.
4. Fill in title, caption, credit, and meaningful alt text. Add an image reference such as `image: ../../assets/art/moon-study.jpg` in the frontmatter.
5. Set `approved: true` only when both the artwork and its public attribution are approved. Entries without an image remain hidden.
6. Optional: create `public/downloads/`, add an approved print file, and add `download: /downloads/moon-study.pdf` to its entry. Keep individual files under the host’s asset limit (Cloudflare Pages: 25 MiB).

The Create page arranges approved pieces in a zero-gravity scrapbook: a larger piece followed by two smaller pieces, with alternating photo, graph-paper, and torn-paper frames. Add optional `order: 1` (or another number) to control sequence; lower numbers appear first, the default is `0`, and matching numbers sort by entry filename. Existing entries need no changes.

Keep captions brief where possible. Captions up to 120 characters use locally bundled Caveat handwriting; longer descriptions use the readable body font. Public credits and download links always use the body font. Decorative illustrations are separate from student artwork, and the empty gallery stays an honest coming-soon note until approved images are added.

The gallery generates responsive WebP previews, reserves their dimensions, and lazy-loads images. Selecting a piece opens an accessible viewer; enlarged WebP images (up to 1920px wide) load only when selected. Close with Escape, browse with the Previous/Next buttons or arrow keys, and return to the selected piece when closing. Without JavaScript, image links open the enlarged image directly. Full printable files load only when their download link is selected. Check legibility and aim for preview images around 150 KB where practical; there are no fixed image-size promises.

Scrapbook styles and interaction code are isolated to Create. Mouse movement shifts only decorations; reduced-motion and touch visitors get a static composition. The shared site styles and other pages remain independent.

## Activate contact later

Currently there are no form fields, submissions, analytics, or sign-up storage. The placeholder explains that the form is coming soon.

In `src/data/site.json`, set `email` to a verified organizational address and/or `interestFormUrl` to an approved HTTPS form URL. The contact panel will then expose those links. Before enabling a form, decide who receives responses, use minimal fields, and supply appropriate privacy wording. Do not collect medical information or children’s personal information through a general-interest form. Confirm participation and photo-consent arrangements with the eventual host before opening workshop registration.

## Publish after review

No deployment or hosting account has been created. After release approval, connect this repository to Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 24
- Production branch: the branch approved by the project owner

Use branch previews for content review and the supplied subdomain until a domain is chosen. When a public domain is confirmed, add Astro’s `site` setting and canonical URLs. Domains and external form services may have separate costs. Font licenses are included in the installed `@fontsource` packages; preserve them when redistributing font files.

Before launch, review branding, artwork permissions, public contact ownership, and every unconfirmed program detail. Check keyboard navigation, narrow screens, text zoom, reduced motion, alt text, and production links. Publishing requires the owner’s release approval, as agreed in PLAN.md.
