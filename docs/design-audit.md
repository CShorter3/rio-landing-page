# Sofound Brazil Landing Page — Design Audit and Refactor Plan

Date: August 18, 2026  
Source baseline: GitHub `dev` at `3925e75c83e22c22c9d36c08e4a3be6119dfea52`  
Working branch: `agent/landing-page-conversion-refactor`

## Executive assessment

The current page already has a distinctive visual point of view, unusually clear package economics, and a credible itinerary. Its largest opportunity is not a new aesthetic; it is editorial discipline. The page repeats the Rio-versus-Bahia distinction, delays pricing until after host credibility, asks FAQ users to browse horizontally, and weakens the final booking moment with an unrelated footer. The refactor should reduce cognitive load while preserving the tactile black, forest, cream, terracotta, serif, and documentary-image language that makes Sofound feel specific.

## 1. Website purpose and conversion barriers

- **Primary traveler:** a growth-oriented, culturally curious young adult who may be traveling solo and wants energy, restoration, local context, and a built-in community without surrendering the freedom of independent travel.
- **Primary conversion:** choose Rio Core or the Complete Journey, review the exact total/deposit/payment structure, and continue into the deposit flow. The strongest triggers are itinerary specificity, transparent inclusions, founder presence, shared-house belonging, and a clear distinction between the complete Rio trip and the optional Bahia continuation.
- **Primary trust barrier:** the page must prove that Sofound is neither a generic tour nor a vague self-development retreat. Credibility comes from confirmed logistics, concrete itinerary details, honest disclosures, Calid's travel philosophy, and explicit boundaries around what remains in development.
- **Current decision friction:** the standalone “Two rhythms” section repeats ideas later covered by the itinerary and pricing sections, placing a long comparison before visitors have seen the experience itself.
- **Current confidence friction:** the Sofound House copy simultaneously labels the displayed property “confirmed” and says the final property/configuration is pending. That contradiction is more damaging than a candid “illustrative until confirmed” label.

## 2. Current design-system tokens

### Color

| Token | Value | Current role | Audit note |
|---|---:|---|---|
| `--terracotta` | `#c65923` | Primary CTA, labels, accents | Strong brand cue; 4.68:1 on black and 4.53:1 on black-soft, but unsuitable as normal text on forest surfaces. |
| `--orange` | `#e06b2d` | Focus ring and secondary accent | Visible on black, but only 2.55:1 on forest; replace the global focus color with a dedicated high-contrast token. |
| `--peach` | `#eda56a` | Premium/highlight text | Strong on black and forest-deep; only 4.12:1 on forest, so reserve it for large text there or use a lighter accessible equivalent. |
| `--off-white` | `#fff8ec` | Primary text | Excellent contrast on all existing dark surfaces and central to the nostalgic editorial tone. |
| `--forest` | `#3e523b` | Final CTA and immersive surfaces | Grounded and ownable; muted text placed on it needs contrast correction. |
| `--forest-deep` | `#2c3a2b` | House, FAQ, host | Effective tonal bridge between forest and black. |
| `--black` / `--black-soft` | `#070605` / `#0e0b09` | Main canvas and dark transitions | Creates the premium documentary base without feeling generic when paired with texture and cream. |
| `--dusty-green` | `#b2bab1` | Secondary copy | Passes on black and forest-deep; fails normal-text AA on `--forest` at 4.26:1. |
| `--sand` | `#98918b` | Captions and tertiary copy | Passes on black, but fails on both forest surfaces. Use only on black or replace with an accessible muted tone. |

### Typography

- Display: locally hosted Cormorant weights 400/600/700 through `next/font/local`; oversized, compressed headings create the nostalgic editorial voice.
- Body/UI: locally hosted Manrope weights 400/600/700; the geometric clarity supplies the “grounded tech-y” counterpoint.
- Base body: `1rem / 1.65`; section lede uses Cormorant with a responsive `1.65rem–2.45rem` scale.
- Global `h2`: `clamp(3rem, 6.4vw, 6.7rem)`; global `h3`: `clamp(2rem, 3.6vw, 3.8rem)`.
- Kicker: `0.72rem`, 700 weight, `0.19em` tracking, uppercase. Effective as a navigation cue, but must not carry essential meaning alone.

### Spacing and containers

- Page gutter: `clamp(1.25rem, 4vw, 4.5rem)`; mobile override `1.2rem`.
- Section spacing: `clamp(5.25rem, 9vw, 9rem)`; mobile override `5.4rem`.
- Main content shell: `1240px` maximum with responsive gutters.
- Existing sections use strong outer whitespace, but several interior compositions overuse bordered cards, turning every message into equal-weight inventory.

### Calls to action

- Primary button: terracotta pill, uppercase Manrope, minimum height `3.25rem`; hover lifts by 2px.
- Ghost button: cream border over translucent black; used appropriately for secondary choices.
- Mobile sticky CTA already accounts for `env(safe-area-inset-bottom)`, but its current button height is `2.8rem` and therefore misses the requested 48px touch target.
- Reservation buttons open a focus-managed package selector, preselecting a package where supplied; the review route then hands off to the configured booking URL.

### Texture and image language

- `terrain` provides sparse contour-like radial lines; `tv-static` adds documentary grain and scanline texture.
- Texture is most effective as a transition layer. Repeating it across too many consecutive sections risks visual fatigue and can reduce legibility.
- `next/image` is used for hero, host, and house media. Hero dimensions are stable through `fill`; below-fold house/host images naturally lazy-load. The day-by-day section currently uses CSS background images and therefore lacks the same responsive-image and intrinsic-loading controls.

## 3. Section-by-section critique

| Section | Rating | UI/UX/CRO diagnosis | Refactor decision |
|---|---|---|---|
| Header | Needs refinement | Clear navigation and persistent conversion action. On small screens the header CTA is 42.4px high; at 380px it disappears, leaving only the sticky CTA. | Preserve structure; raise touch targets to at least 48px and verify focus visibility. |
| Hero | Strong | Immediately communicates emotion, destination, two durations, deposit entry point, and itinerary path. Strong image/serif contrast and dual CTA hierarchy. | Preserve core design. Correct small-screen touch targets and keep trustline legible. |
| Why Sofound exists / traveler fit | Needs refinement | Strong ethos and qualification, but a bordered “fit panel” starts the repeated-box rhythm and copy is longer than needed before visitors see the trip. | Keep the two-column editorial contrast, tighten the prose, and reduce panel heaviness through dividers rather than a freestanding card. |
| Two rhythms. One complete journey. | Needs relocation/removal | Important positioning, but a 680px-minimum two-card comparison duplicates itinerary and pricing content and stalls forward motion before concrete proof. | Remove it as a standalone section. Integrate a concise Rio/Bahia contrast into the itinerary intro and retain package facts in pricing. |
| Sofound House | Needs refactor | The belonging content is valuable and existing imagery is strong. Three equal text cards, a three-cell gallery, and a separate dark note create layered boxes. The “confirmed property” caption conflicts with the pending-property disclosure. | Rebuild as a calm editorial composition: one dominant image, two supporting images, narrative column, a border-only confirmed-inclusion list, and an explicit illustrative-image/final-configuration disclosure. |
| Rio / Salvador itinerary | Strong | This is the strongest proof section: concrete days, labels, package-specific CTAs, and a visibly different Salvador continuation. Native details are accessible and mobile-friendly. | Preserve day structure. Add the journey contrast at the top, remove repeated extension framing, maintain the clear “Rio is complete; Salvador is optional” assurance, and keep content-in-development labels candid. |
| What’s included | Strong | Fast scanning, concrete language, and clear separation from exclusions in pricing. The 4×2 card grid is intentionally allowed to stand out, but emoji icons weaken the premium tactile system and eight equal boxes create density. | Preserve the reference grid and information. Replace emoji with restrained typographic markers; standardize heights, contrast, and mobile stacking without making surrounding sections equally card-heavy. |
| Meet Calid | Needs refinement | The new section is calmer and credible, with a useful image, narrative, proof strip, and quote. Its current placement before pricing asks founder trust to do work before the visitor has understood the offer economics. The proof facts read slightly like a résumé. | Move after pricing. Recompose into narrative plus proof/quote columns and connect each proof point to the hosted philosophy rather than presenting isolated statistics. |
| Choose your journey / pricing | Strong | Exact totals, deposits, installments, capacity, inclusions, exclusions, and estimated separate spending make this the clearest conversion section. Package-preselected CTAs reduce choice friction. | Preserve the reference grid. Tighten duplicated Rio/Bahia copy and confirm every CTA opens the correct preselected flow. |
| FAQ | Needs refactor | Native details are a good base, but the horizontal shelf hides categories, creates a second navigation model, adds `tabIndex=0` to a non-semantic scroller, and is cumbersome on mobile. Existing four groups do not match decision-stage concerns. | Replace with a single left-aligned column of six clearly labeled categories and simple divider rows. Keep native `details/summary`, 48px targets, visible focus, and no horizontal scrolling. |
| Final CTA | Needs refinement | Strong emotional close and direct package choices. The following footer disperses attention immediately after the highest-intent moment. Muted copy on `--forest` does not meet AA for normal text. | Make this the final page element, correct contrast, preserve both package CTAs, and ensure sticky CTA does not cover the last actions. |
| Footer | Needs relocation/removal | Legal/contact links are useful in a mature launch system, but the user has explicitly removed this surface for now and it currently dilutes the deposit close. | Remove the import, rendered component, component file, and footer-specific CSS. Legal routes remain available directly and in the booking review where applicable. |
| Reservation selector and booking review | Needs refinement | Focus return, Escape handling, and package preselection are solid. The selector openly discloses that payment is disabled until Stripe URLs and terms are approved; this is honest but blocks a true live deposit conversion if environment values remain TODO. | Preserve interaction architecture, verify focus trap and route transitions, and flag booking URLs/final terms as owner-confirmation launch blockers rather than inventing values. |

## 4. “Two rhythms” content strategy

The standalone section will be removed from the component tree and its essential information will be redistributed without loss:

1. **Itinerary opening:** introduce a border-only “one journey, two rhythms” editorial split. The Rio side states that Rio Core is the complete five-night trip and describes coastline, culture, nightlife, shared energy, and Arraial. The Bahia side states that Salvador is an optional smaller continuation with a slower rhythm and deeper Afro-Brazilian context.
2. **Salvador itinerary transition:** retain the confirmed extension facts—Rio-to-Salvador flight, four shared nights, one massage, up to six travelers—and clearly mark exact cultural programming as in development.
3. **Pricing:** retain exact dates, totals, deposits, installment schedules, and the closing line “Rio gives you the momentum. Bahia gives you the depth.” This is the correct place for package comparison.
4. **FAQ:** add a dedicated “Rio Core vs. Salvador Extension” group answering whether Rio is complete, what the extension includes, and what is still being finalized.

This removes one major scroll interruption while reinforcing the same distinction at the three points where a visitor naturally asks: “What happens?”, “What does it cost?”, and “Which option is right for me?”

## 5. Prioritized refactor plan

### P0 — Conversion, trust, accessibility, and broken-flow risk

- Remove the Footer from the page, delete its component, and remove orphaned footer CSS.
- Reorganize FAQ content into six decision-oriented groups with left-aligned native accordions and no horizontal shelf.
- Resolve the Sofound House confirmation contradiction. Label shared accommodation and roommate coordination as confirmed package inclusions; label property imagery/configuration as illustrative or pending unless the owner supplies confirmation.
- Move Meet Calid after pricing so the page progresses from experience → inclusions → offer economics → founder credibility → objections → final action.
- Ensure all CTA/button/summary targets are at least 48×48px, including header and sticky-mobile actions.
- Add a dedicated focus-ring token with at least 3:1 contrast against black, forest, forest-deep, and terracotta controls.
- Correct normal-text contrast on `--forest`, especially the final CTA body copy and small decision text.
- Verify each package CTA opens the reservation selector with the correct package preselected and routes to the correct booking-review page.
- Preserve explicit disclosure for unfinished booking URLs, final terms, and Salvador cultural programming; do not imply a live guarantee or confirmed partner.

### P1 — Layout, visual system, and mobile clarity

- Remove the standalone Two Rhythms component and integrate its value into itinerary, pricing, and FAQ.
- Refactor Sofound House into a responsive editorial image composition with explicit aspect ratios and `next/image` sizing.
- Refactor Meet Calid into a narrative column and a calmer proof/quote column; tie proof to hosting philosophy.
- Replace FAQ cards with a single reading column, category labels, crisp dividers, and consistent open-state indicators.
- Standardize interior content widths: approximately 760px for reading copy, 960px for section headings, and 1240px for major grids.
- Keep cards concentrated in the inclusions and itinerary/pricing decision surfaces. Use whitespace, rules, and typography elsewhere.
- Preserve mobile sticky safe-area spacing and add end-of-page clearance so it never obscures final actions.
- Use below-fold lazy loading and explicit media aspect ratios to control CLS; keep hero images prioritized.

### P2 — Polish, motion, and visual refinement

- Reduce texture opacity in long reading sections and reserve stronger grain for itinerary/pricing transitions.
- Normalize caption treatments and image color grading across house and host photography.
- Add restrained hover/focus transitions only where they clarify interactivity; honor `prefers-reduced-motion`.
- Consider converting itinerary CSS background images to `next/image` in a later isolated pass so art direction can be verified independently without destabilizing the reference section.
- Once live booking configuration and final property details are approved, replace prototype disclosures and illustrative labels with verified production language.

## Definition of done for this refactor

- The page reads as one continuous decision narrative with no standalone Two Rhythms interruption.
- Footer is absent from imports, JSX, source components, and styles.
- FAQ is fully left-aligned, categorized, keyboard-operable, and mobile-native.
- House and Salvador language distinguishes confirmed facts from illustrative or developing details.
- Meet Calid follows pricing and proves the Sofound philosophy without résumé-like visual weight.
- Text, focus indicators, and touch targets meet the requested WCAG 2.2 AA and mobile criteria.
- Lint, both production builds, rendered-output tests, and artifact validation pass before the pull request is opened.
