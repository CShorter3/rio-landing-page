import Image from "next/image";
import Link from "next/link";

import { ReserveButton } from "@/components/reservation/ReserveButton";
import { Reveal } from "@/components/ui/Reveal";
import { tripData } from "@/lib/trip-data";

export function HeroSection() {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <Image
          unoptimized
          className="hero-image hero-image-desktop"
          src={tripData.assets.heroDesktop}
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 70vw, 1px"
        />
        <Image
          unoptimized
          className="hero-image hero-image-mobile"
          src={tripData.assets.heroMobile}
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 100vw, 1px"
        />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-content section-shell">
        <Reveal className="hero-copy">
          <p className="kicker kicker-light">{tripData.eyebrow}</p>
          <h1 id="hero-title">{tripData.headline}</h1>
          <p className="hero-intro">{tripData.introduction}</p>
          <div className="hero-actions">
            <ReserveButton
              className="button button-primary"
              ctaLocation="hero"
              analyticsEvent="hero_cta_clicked"
            >
              Choose your journey
            </ReserveButton>
            <Link className="button button-ghost-light" href="#itinerary">
              Explore the itinerary
            </Link>
          </div>
          <p className="hero-trustline">
            Choose 5 or 9 nights
            <span aria-hidden="true">·</span> Reserve from $295{" "}
            <span aria-hidden="true">·</span> Payment plans available
          </p>
        </Reveal>
      </div>

      <div className="hero-caption">
        <span>Brazil · 2026</span>
        <span>Travel · Culture · Connection</span>
      </div>
    </section>
  );
}

export function StickyMobileCTA() {
  return (
    <aside className="sticky-mobile-cta" aria-label="Quick reservation action">
      <div>
        <span>Brazil · Nov 2026</span>
        <strong>Reserve from $295</strong>
      </div>
      <ReserveButton
        className="button button-primary"
        ctaLocation="sticky_mobile"
        analyticsEvent="sticky_cta_clicked"
      >
        Choose
      </ReserveButton>
    </aside>
  );
}
