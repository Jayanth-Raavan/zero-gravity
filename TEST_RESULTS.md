# V4 validation

Validated 27 September 2026 against the static production export.

- `npm run build`: production compilation, TypeScript validation and static export pass.
- `npm run typecheck`: pass.
- `npm audit --omit=dev`: zero known vulnerabilities at delivery.
- Chromium / Microsoft Edge desktop automation: hero pause and manual advance; story arrows, last-slide alignment, keyboard navigation, mouse dragging and lightbox; Escape dismissal; locally served video loading and actual playback; video removal on close; postcard navigation.
- Booking: empty-step validation; date, city and coverage retained through the final step. WhatsApp URL intercepted in the test, with no message sent and no real handoff opened.
- Responsive layouts: 1440, 1024, 768, 390 and 320 CSS-pixel widths. Visible images load, and no document-level horizontal overflow after the narrow-screen studio fix.
- Mobile: menu-to-weddings navigation and final story alignment pass at 390px.
- Reduced motion: intro suppressed; animation overrides enabled.
- Noindex metadata verified. `robots.txt` and `_headers` included in the export.
- Desktop hero, Featured Stories, films and booking, plus mobile hero, visually reviewed.
- ZIP contents and CRC integrity checked after packaging.

Limits: automated browser checks use desktop Chromium with resized viewports, not physical iOS/Android devices or Safari. This is a private concept with sample video/testimonials, not a production booking backend. No deployment or outbound message was performed. Host-level headers take effect on a compatible host such as Netlify, not Python's local preview server.
