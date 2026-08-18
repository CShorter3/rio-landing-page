"use client";

import type { JourneyPackage } from "@/types/trip";
import { trackEvent } from "@/lib/analytics";
import { tripData } from "@/lib/trip-data";

export function CheckoutLink({
  journey,
  href,
}: {
  journey: JourneyPackage;
  href: string;
}) {
  return (
    <a
      className="button button-primary booking-review-cta"
      href={href}
      onClick={() =>
        trackEvent("deposit_checkout_started", {
          tripName: tripData.title,
          packageId: journey.id,
          packageName: journey.name,
          packagePrice: journey.total,
          depositAmount: journey.deposit,
          ctaLocation: "booking_review",
        })
      }
    >
      Continue to secure Stripe checkout
    </a>
  );
}
