import type { JourneyId } from "@/types/trip";

export type AnalyticsEventName =
  | "hero_cta_clicked"
  | "sticky_cta_clicked"
  | "itinerary_day_opened"
  | "pricing_section_viewed"
  | "package_selected"
  | "booking_drawer_opened"
  | "deposit_checkout_started"
  | "deposit_checkout_completed"
  | "waitlist_submitted";

export type ViewportCategory = "mobile" | "tablet" | "desktop" | "unknown";

export type AnalyticsPayload = {
  tripName: string;
  packageId?: JourneyId;
  packageName?: string;
  packagePrice?: number;
  depositAmount?: number;
  ctaLocation?: string;
  itineraryDay?: number;
  viewport: ViewportCategory;
};

declare global {
  interface Window {
    sofoundAnalytics?: {
      track: (name: AnalyticsEventName, payload: AnalyticsPayload) => void;
    };
  }
}

const viewportCategory = (): ViewportCategory => {
  if (typeof window === "undefined") return "unknown";
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1100) return "tablet";
  return "desktop";
};

export function trackEvent(
  name: AnalyticsEventName,
  payload: Omit<AnalyticsPayload, "viewport">,
) {
  if (typeof window === "undefined") return;

  const eventPayload: AnalyticsPayload = {
    ...payload,
    viewport: viewportCategory(),
  };

  window.sofoundAnalytics?.track(name, eventPayload);
  window.dispatchEvent(
    new CustomEvent("sofound:analytics", {
      detail: { name, payload: eventPayload },
    }),
  );
}
