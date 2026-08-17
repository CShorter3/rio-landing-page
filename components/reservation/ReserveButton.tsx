"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";
import { tripData } from "@/lib/trip-data";
import type { JourneyId } from "@/types/trip";
import { useReservation } from "./ReservationProvider";

type ReserveButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> & {
  children: ReactNode;
  journeyId?: JourneyId;
  ctaLocation: string;
  analyticsEvent?: Extract<
    AnalyticsEventName,
    "hero_cta_clicked" | "sticky_cta_clicked"
  >;
};

export function ReserveButton({
  children,
  journeyId,
  ctaLocation,
  analyticsEvent,
  type = "button",
  ...buttonProps
}: ReserveButtonProps) {
  const { openReservation } = useReservation();

  return (
    <button
      {...buttonProps}
      type={type}
      data-cta-location={ctaLocation}
      onClick={() => {
        if (analyticsEvent) {
          const journey = journeyId
            ? tripData.packages[journeyId]
            : undefined;
          trackEvent(analyticsEvent, {
            tripName: tripData.title,
            packageId: journeyId,
            packageName: journey?.name,
            packagePrice: journey?.total,
            depositAmount: journey?.deposit,
            ctaLocation,
          });
        }
        openReservation(journeyId);
      }}
    >
      {children}
    </button>
  );
}
