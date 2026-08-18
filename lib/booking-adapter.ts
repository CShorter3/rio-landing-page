import { tripData } from "@/lib/trip-data";
import type { JourneyId } from "@/types/trip";

export type CheckoutHandoff =
  | { mode: "live"; url: string }
  | { mode: "mock"; message: string };

export interface BookingAdapter {
  getCheckoutHandoff(journeyId: JourneyId): CheckoutHandoff;
}

const isLiveUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
};

export const bookingAdapter: BookingAdapter = {
  getCheckoutHandoff(journeyId) {
    const bookingUrl = tripData.packages[journeyId].bookingUrl;

    if (isLiveUrl(bookingUrl)) {
      return { mode: "live", url: bookingUrl };
    }

    return {
      mode: "mock",
      message:
        "Prototype only: connect the approved server-created Stripe Checkout Session before accepting deposits.",
    };
  },
};
