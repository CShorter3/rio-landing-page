# Sofound Brazil — Rio & Bahia

Production-shaped landing page and booking prototype for Sofound's November 2026 Brazil journey. The implementation is mobile-first, server-rendered by default, strict TypeScript, Tailwind CSS v4, and Vinext/Next.js App Router for Sites deployment.

## Architecture

- `app/page.tsx` composes server-rendered landing-page sections.
- `lib/trip-data.ts` is the single source of truth for traveler-facing trip facts, prices, dates, inclusions, itinerary, host information, and policy summaries.
- `types/trip.ts` defines the content and package contract.
- `components/sections/` contains presentation-focused page sections.
- `components/reservation/` contains the client-only package selector, accessible booking drawer, persisted selection state, and checkout handoff.
- `lib/booking-adapter.ts` isolates the current mock/live checkout decision.
- `lib/analytics.ts` exposes provider-agnostic typed conversion events.
- `components/seo/TripJsonLd.tsx` renders only structured-data fields supported by confirmed content.

```text
app/
  fonts/
  legal/[document]/page.tsx
  reserve/[journeyId]/page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  analytics/SectionViewTracker.tsx
  layout/{SiteHeader,SiteFooter}.tsx
  reservation/{ReservationProvider,ReserveButton,CheckoutLink}.tsx
  sections/{HeroSection,JourneySections,ItinerarySection,InclusionsSection,
            HostSection,PricingSection,FAQSection,FinalCTA}.tsx
  seo/TripJsonLd.tsx
  ui/Reveal.tsx
lib/
  analytics.ts
  booking-adapter.ts
  trip-data.ts
types/trip.ts
```

## Assumptions

- The supplied landing-page strategy is authoritative when source files conflict.
- Rio Core is a complete five-night journey; Bahia is an optional, smaller continuation.
- The listed prices, deposits, installment counts, and installment amounts are confirmed, but exact installment dates are not.
- Availability is deliberately `tbd`; the interface makes no scarcity claim.
- No live payment, waitlist, legal, inventory, or analytics provider is connected in this prototype.
- All supplied photography is treated as approved for prototype use. Final usage rights remain an owner launch check.

## Setup

Prerequisites: Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Useful checks:

```bash
npm run lint
npm run build
npm test
```

## Environment variables

Copy `.env.example` to a local environment file and provide only approved values.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin for canonical, Open Graph, and JSON-LD URLs. |
| `NEXT_PUBLIC_SITE_ENV` | Set to `production` only when the public site is ready to be indexed. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public support/contact address. |
| `NEXT_PUBLIC_RIO_BOOKING_URL` | Temporary HTTPS handoff for Rio Core after the server-side checkout integration is approved. |
| `NEXT_PUBLIC_COMPLETE_BOOKING_URL` | Temporary HTTPS handoff for the Complete Journey. |

The two public booking URL variables are a typed prototype bridge, not the preferred final Stripe design. The launch implementation should create Checkout Sessions server-side and return short-lived session URLs.

## Editing content

Update confirmed traveler-facing facts in `lib/trip-data.ts`; do not duplicate prices, deposits, dates, capacity, or inclusion details inside section components. Presentation language unique to a section belongs in that section. New operational facts should first be added to the typed `TripData` contract, then rendered from the data object.

Hero and host images live in `public/images/`. The local font files in `app/fonts/` are loaded through `next/font/local` to avoid a render-blocking external font request.

## Payment integration

1. Replace the static URL bridge with a server-only endpoint that validates a `JourneyId` and current inventory.
2. Create the Stripe Checkout Session with secret credentials on the server; never expose secret keys client-side.
3. Put the confirmed package name, total, deposit, and non-sensitive internal journey ID in the server-created session.
4. Require acceptance of final booking, cancellation, refund, and payment-schedule terms before session creation.
5. Handle success, cancel, and webhook events idempotently. Mark a reservation confirmed only after the trusted payment event succeeds.
6. Collect separate ACH authorization for scheduled remaining installments and store the authorization trail securely.
7. Connect live capacity so sold-out state routes to a real waitlist endpoint and fires `waitlist_submitted` only after a successful response.

## Accessibility checklist

- One page-level `h1`, logical section headings, semantic landmarks, and a visible-on-focus skip link.
- Native buttons, links, radios, details/summary disclosure, and form grouping.
- 44px-or-larger primary touch targets and strong `:focus-visible` treatment.
- Dialog focus trap, initial focus, background scroll lock, close-on-Escape, backdrop close, and trigger-focus restoration.
- Text labels accompany all status colors and itinerary categories.
- Reduced-motion media queries remove nonessential transitions and smooth scrolling.
- Sticky mobile CTA reserves page-bottom space and is hidden outside mobile breakpoints.
- Local responsive imagery reserves layout space; decorative hero images use empty alt text.

## Analytics event map

| Event | Trigger |
| --- | --- |
| `hero_cta_clicked` | Hero package selector trigger. |
| `sticky_cta_clicked` | Mobile sticky trigger. |
| `itinerary_day_opened` | Itinerary disclosure opened. |
| `pricing_section_viewed` | Pricing section crosses the observer threshold. |
| `package_selected` | A journey is chosen in the drawer or from a preselected CTA. |
| `booking_drawer_opened` | Booking drawer opens. |
| `deposit_checkout_started` | Traveler follows an approved live checkout link. |
| `deposit_checkout_completed` | Reserved for a trusted success/webhook flow. |
| `waitlist_submitted` | Reserved for a successful waitlist API response. |

Events include the non-sensitive fields appropriate to their context: trip, package, price, deposit, CTA location, itinerary day, and viewport category. Never add payment credentials, passport data, health information, or private traveler details.

## Testing checklist

- Check responsive layout at 320, 375, 768, 1024, and 1440px.
- Navigate by keyboard only, including skip link, itinerary, FAQ, package radios, drawer close, and booking review.
- Verify focus is trapped in the drawer and restored to the invoking CTA after close.
- Verify package selection survives closing and reopening the drawer within the session.
- Confirm Rio and Complete Journey totals, deposits, remaining balances, and installment math.
- Confirm no live checkout appears without an approved HTTPS handoff.
- Test reduced motion, 200% zoom, dark-section contrast, and sticky-CTA clearance.
- Validate canonical/OG/JSON-LD after setting the production URL.
- Exercise success, cancel, webhook retry, sold-out, and waitlist paths once backends exist.

## Creative decisions and deviations

- The supplied warm palette is concentrated into cream, forest, espresso, and terracotta beats rather than showing every token at once.
- The hero borrows the coherence principle used by strong media products: the surrounding espresso field and gradient blend into the supplied artwork instead of framing it like a generic travel banner.
- Policy-heavy content is compressed into horizontally flowing shelves on larger screens and swipeable snap rows on smaller screens. This applies to booking confidence, host support, and grouped FAQs.
- The host images use an editorial mosaic on desktop and a lightweight horizontal image shelf on mobile instead of a JavaScript carousel.
- The itinerary and detailed inclusions use native progressive disclosure so essential summaries remain server-readable.
- No urgency badges, testimonials, partner logos, countdowns, or availability claims were added because none were confirmed.

## Pre-launch TODOs

- Add the approved production origin, contact email, final wordmark/favicon, and social links.
- Confirm and publish the exact Sofound House, bedroom, bed, and bathroom configuration.
- Connect live inventory, reservation status, and a real waitlist endpoint.
- Replace mock checkout with server-created Stripe sessions, idempotent webhooks, ACH authorization, and confirmation handling.
- Add exact installment dates, late-booking rules, and operational payment reminders.
- Obtain legal approval for booking terms, cancellation/refund policy, privacy policy, payment authorization, and traveler responsibility language.
- Confirm the full Bahia itinerary, local hosts/operators, venues, and any Black Consciousness Day programming before naming them publicly.
- Confirm the Arraial vessel/operator and any remaining schedule details.
- Choose and connect the analytics provider and consent/privacy behavior.
- Verify final image usage rights, responsive crops, and production asset compression.
- Switch `NEXT_PUBLIC_SITE_ENV` to `production` only after every legal, booking, inventory, and metadata dependency is complete.
