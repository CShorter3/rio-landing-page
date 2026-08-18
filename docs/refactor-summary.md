# Sofound Brazil Landing Page — Refactor Summary

Date: August 18, 2026  
Target branch: `dev`  
Working branch: `agent/landing-page-conversion-refactor`

## Outcome

The landing page now follows a clearer deposit-decision narrative:

1. emotional promise and trip overview;
2. Sofound positioning and traveler fit;
3. Rio/Bahia distinction inside the itinerary context;
4. concrete itinerary and inclusions;
5. shared-home experience and confirmed accommodation boundaries;
6. package economics and deposit choices;
7. Calid's founder-hosted credibility;
8. categorized objection handling;
9. final package-specific deposit action.

The standalone “Two rhythms” interruption and the footer have been removed. The reference sections—Hero, What’s Included, Day-by-Day Itinerary, and Choose Your Journey—retain their established design logic while the weaker sections now use the same grid, typography, spacing, and divider discipline.

## Modified files

| File | Change |
|---|---|
| `app/page.tsx` | Reordered the page around the conversion narrative, removed the standalone Two Rhythms section, moved Meet Calid after pricing, and removed the footer. |
| `app/globals.css` | Reworked House, Host, FAQ, and integrated journey styles; removed footer/legacy rhythm styles; corrected focus, contrast, spacing, mobile target sizes, safe-area clearance, and 320px overflow. |
| `components/sections/JourneySections.tsx` | Removed `TwoRhythmsSection`; rebuilt the Sofound House as an editorial image/narrative composition with confirmed-versus-illustrative disclosure. |
| `components/sections/ItinerarySection.tsx` | Re-anchored the Rio/Bahia distinction above the itinerary and clarified Rio as complete and Bahia as optional. |
| `components/sections/InclusionsSection.tsx` | Replaced emoji decoration with restrained numbered editorial markers while preserving the reference grid and inclusion facts. |
| `components/sections/HostSection.tsx` | Rebuilt Meet Calid as narrative plus proof/quote columns and tied travel experience to the hosting philosophy. |
| `components/sections/FAQSection.tsx` | Replaced the horizontal category shelf with six left-aligned groups of native `details`/`summary` rows. |
| `components/layout/SiteFooter.tsx` | Deleted. No footer import, render, component, or footer-specific styles remain. |
| `lib/trip-data.ts` | Reorganized FAQ copy into decision-stage categories and clarified safety/support, lodging, cancellation, and Rio/Bahia boundaries without adding claims. |
| `tests/rendered-html.test.mjs` | Added structural regression coverage for footer removal, Two Rhythms integration, FAQ groups, package CTAs, and section order. |
| `docs/design-audit.md` | Documented the Phase 1 audit, token inventory, section ratings, Two Rhythms strategy, and P0/P1/P2 plan. |
| `docs/refactor-summary.md` | Records implementation, verification, and launch-owner confirmations. |

No external dependency was added.

## Structural and CRO changes

### Journey positioning

- Removed the standalone two-card Two Rhythms section.
- Integrated “Rio is complete. Bahia goes deeper.” into the itinerary opening, where visitors are ready to understand the trip structure.
- Preserved the essential message across itinerary, pricing, and the dedicated Rio-versus-Salvador FAQ group.
- Kept Rio Core positioned as a complete five-night journey and Salvador as a smaller, slower, optional continuation.

### Sofound House

- Replaced the equal-weight card stack with one dominant 16:10 image, two supporting 4:3 images, and a narrative column.
- Added the principles “Belong without performing,” “Gather, then make room,” and “Return somewhere restorative.”
- Separated confirmed Rio Core inclusions from illustrative property photography and pending final room configuration.
- Added a direct path to rooming FAQs without duplicating the full inclusions inventory.

### Meet Calid

- Moved founder credibility after package pricing so it answers “Why trust this host?” after the visitor understands the offer.
- Reframed 18+ months, 22 countries, and 14 months across 17 African countries as evidence for locally led, people-centered trip design rather than résumé statistics.
- Kept the section visually calm with a reading column and a separate portrait, quote, and proof column.

### FAQ

- Replaced horizontal browsing with a single vertical reading path.
- Added six explicit groups: Group Fit & Vibe; Safety & Local Support; Roommates & Lodging; Deposit & Payment Plans; Cancellation & Travel Prep; and Rio Core vs. Salvador Extension.
- Kept every answer left-aligned and implemented with native `details`/`summary` controls.
- Clarified support without promising safety, therapy, guarantees, or finalized details that do not yet exist.

### Conversion close

- Removed the footer so the final package-specific deposit CTAs are the page ending.
- Preserved Rio and Complete Journey package preselection at every primary decision point.
- Kept prototype-payment disclosure visible in the booking selector rather than implying that processing is live.

## Accessibility and mobile verification

- Added `--focus-ring: #ffd49a`. Contrast is 6.12:1 on forest, 8.66:1 on forest-deep, and 3.12:1 against the terracotta control surface.
- Added `--forest-text: #d5dbd3`, which is 6.02:1 on forest for final-CTA supporting copy.
- Verified a 3px visible keyboard outline on native FAQ summaries.
- Verified native FAQ toggling by keyboard with focus retained on the summary.
- Verified the reservation dialog moves focus to its close control, closes with Escape, traps Tab navigation, and restores focus to the exact triggering CTA.
- Raised header, primary button, summary, and sticky-CTA targets to at least 48px. Automated DOM inspection found zero sub-48px interactive targets at 320px, 375px, 768px, and 1024px.
- Preserved mobile sticky-CTA safe-area padding and added final-section clearance using `env(safe-area-inset-bottom)`.
- Removed the `320px` body minimum and adjusted the narrow House heading to eliminate horizontal overflow at the smallest test width.

### Responsive matrix

| Viewport | Result |
|---:|---|
| 320px | Single-column journey, House, Host, FAQ, and pricing; no horizontal overflow; 48px sticky action; final CTA clears sticky/safe-area space. |
| 375px | Single-column mobile composition; no horizontal overflow; native FAQ rows remain 76px high. |
| 768px | Two-column editorial/pricing layouts activate; mobile sticky CTA is absent; header reserve control is 48px high. |
| 1024px | Two-column House/Host, pricing, journey comparison, and category/content FAQ grid remain within the content shell. |
| 1440px | Full 1240px reference grid, balanced editorial columns, no horizontal overflow, and no footer after the final CTA. |

## Performance and implementation quality

- House and Host media use `next/image`, explicit aspect-ratio containers, and responsive `sizes` to reserve layout space and control CLS.
- Below-the-fold House and Host images remain lazy-loaded; the hero remains the prioritized media surface.
- Static FAQ data and host proof data remain module-level; no new client state or client boundary was introduced.
- Components use direct imports, semantic `section`/`header`/`aside`/`figure`/`dl`/`details` elements, and no new runtime package.
- The rendered-output regression test protects the conversion order and removal requirements.

## Automated and functional checks

| Check | Result |
|---|---|
| ESLint | Passed with zero errors. |
| TypeScript (`tsc --noEmit`) | Passed with zero errors. |
| Next.js 16 production build | Passed; all static and generated routes compiled. |
| Vinext/Sites production build | Passed. |
| Sites artifact validation | Passed; ESM Worker entry and hosting manifest are present. |
| Rendered HTML tests | 2 passed, 0 failed. |
| Browser console | No application warnings/errors; only browser-extension metadata messages were observed and excluded from app findings. |
| CTA package preselection | Rio pricing CTA opened the selector with `rio-core` selected. |
| Modal keyboard flow | Focus entry, Escape close, focus return, and Tab containment verified. |
| FAQ keyboard flow | Enter close/reopen and visible focus verified. |
| Responsive inspection | Completed at 320, 375, 768, 1024, and 1440px. |

## Owner confirmation before live deposit launch

These items were intentionally not invented or silently finalized:

1. **Booking destinations:** `NEXT_PUBLIC_RIO_BOOKING_URL` and `NEXT_PUBLIC_COMPLETE_BOOKING_URL` still need approved production handoff URLs.
2. **Final cancellation terms:** the public policy copy states that final terms are still being completed; legal/operational approval is required before launch.
3. **Sofound House:** confirm the exact property, bedroom/bed/bathroom configuration, and whether current photography can move from “illustrative” to “confirmed.”
4. **Salvador programming:** confirm cultural hosts, venues, nonprofit/youth-football programming, entrepreneur options, and the final Black Consciousness Day schedule before replacing development language.
5. **Inventory state:** confirm whether each package should remain available, move to limited inventory, or use a waitlist. The page does not create urgency without verified inventory.

## Acceptance-criteria status

- [x] Comprehensive design audit and refactor summary are present.
- [x] Footer component and rendered footer are removed.
- [x] FAQ is simple, mobile-first, left-aligned, categorized, and native-keyboard accessible.
- [x] Two Rhythms content is integrated without losing the Rio/Bahia distinction.
- [x] House and Host use grounded editorial layouts with deliberate whitespace.
- [x] Lint, TypeScript, Next.js build, Vinext build, artifact validation, and rendered tests pass.
- [x] Primary package CTAs open the preselected booking flow.
- [x] Accordion and modal keyboard flows work without a focus trap escape or stranded focus.
- [x] Mobile sticky action respects safe-area padding and final-action clearance.
