# Zero Gravity Photography — V4

A private outreach concept upgraded directly from `zero-gravity-photography-cinematic-v3-fixed.zip`.

## Run locally

Install Node.js 22 LTS or newer, unzip this folder, then open a terminal in the folder containing `package.json`:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No API keys or environment variables are needed.

## Production build and preview

```sh
npm run build
npm start
```

The build creates `out/`. The preview command uses `npx serve out`; approve its one-time package installation if prompted and use the address printed in the terminal. This is a static export, so `next start` is not applicable.

A ready-built `out/` is also included in this ZIP. Serve it over HTTP; do not open `index.html` with a file:// URL.

## Deploy to Netlify

- For manual deployment, drag the **out folder** into Netlify's manual deploy area.
- For repository deployment, use `npm run build` as the build command and `out` as the publish directory. `netlify.toml` is included.
- Deploy at the domain root. Subdirectory hosting requires adjusting the asset paths and rebuilding.
- Keep this as a private outreach preview. Configure host-level password/access protection if confidentiality is required: noindex is not access control.

No deployment was performed as part of this delivery.

## What changed in V4

- Cinematic logo bloom and split-curtain opening, with Skip and reduced-motion support.
- Three real portfolio hero frames, restrained crossfades, manual navigation and pause.
- Featured Stories redesigned as editorial album spreads, with touch scrolling, mouse dragging, keyboard arrows, precise responsive snapping, and a full-image lightbox.
- Dissolving tradition images, an animated destination postcard stack, and separate testimonial transitions.
- Larger labels and body copy, calmer typography, mobile-specific face framing, visible keyboard focus and a skip link.
- In-page native video dialog with Escape, focus trapping/restoration, playback controls and same-origin local sample footage.
- Booking validation and field retention across all three steps. The final button opens a prefilled WhatsApp conversation with the existing public business number; it does not automatically send anything.
- Locally bundled photographs, font files and sample video; no external media is needed at runtime.
- `noindex, nofollow` metadata, robots.txt, and a Netlify-compatible X-Robots-Tag header.

## Content and rights

Read `ASSET_CREDITS.md` for exact sources. Zero Gravity portfolio imagery and the supplied logo are included for this private concept only; public availability does not grant a reuse licence. Obtain permission before publishing commercially. Supporting stock imagery is not represented as Zero Gravity's work. Existing photo watermarks are retained.

Editorial story titles are conceptual, not invented couple names. Testimonial text is explicitly marked as sample copy. Film cards play labelled CC0 nature footage, not real wedding films. Replace `public/media/sample.mp4` with approved footage before a real launch. Destination cards indicate visual inspiration rather than verified shoot locations.

## Editing

- `components/ZeroGravityExperience.tsx`: sections, image assignments, film sources and interactions.
- `app/globals.css`: original V3 foundation followed by the V4 visual rules.
- `app/layout.tsx`: page metadata and noindex.
- `public/assets/`: local images and fonts.

The inherited Next.js 15 structure is preserved. `package-lock.json` pins the verified installation; a PostCSS override updates the inherited transitive dependency. Use `npm ci` for reproducible installs.

See `TEST_RESULTS.md` for the delivery checks and their limits.
