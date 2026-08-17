"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

import { trackEvent } from "@/lib/analytics";
import { formatUsd, journeyList, tripData } from "@/lib/trip-data";
import type { JourneyId } from "@/types/trip";

type ReservationContextValue = {
  openReservation: (journeyId?: JourneyId) => void;
  closeReservation: () => void;
};

const ReservationContext = createContext<ReservationContextValue | null>(null);

const subscribeToHydration = () => () => {};

const focusableSelector = [
  "button:not([disabled])",
  "input:not([disabled])",
  "a[href]",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function ReservationProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isMounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJourneyId, setSelectedJourneyId] =
    useState<JourneyId | null>(() => {
      if (typeof window === "undefined") return null;
      const storedJourneyId = window.sessionStorage.getItem(
        "sofound:selected-journey",
      );
      return storedJourneyId === "rio-core" ||
        storedJourneyId === "complete-journey"
        ? storedJourneyId
        : null;
    });
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  const closeReservation = useCallback(() => setIsOpen(false), []);

  const selectJourney = useCallback((journeyId: JourneyId) => {
    setSelectedJourneyId(journeyId);
    window.sessionStorage.setItem("sofound:selected-journey", journeyId);
    const journey = tripData.packages[journeyId];
    trackEvent("package_selected", {
      tripName: tripData.title,
      packageId: journeyId,
      packageName: journey.name,
      packagePrice: journey.total,
      depositAmount: journey.deposit,
    });
  }, []);

  const openReservation = useCallback(
    (journeyId?: JourneyId) => {
      triggerRef.current = document.activeElement as HTMLElement | null;
      setIsOpen(true);

      trackEvent("booking_drawer_opened", {
        tripName: tripData.title,
        packageId: journeyId,
        packageName: journeyId
          ? tripData.packages[journeyId].name
          : undefined,
        ctaLocation: triggerRef.current?.dataset.ctaLocation,
      });

      if (journeyId) selectJourney(journeyId);
    },
    [selectJourney],
  );

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = dialogRef.current;
    window.requestAnimationFrame(() =>
      dialog?.querySelector<HTMLElement>("[data-modal-close]")?.focus(),
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeReservation();
        return;
      }

      if (event.key !== "Tab" || !dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [closeReservation, isOpen]);

  const contextValue = useMemo(
    () => ({ openReservation, closeReservation }),
    [closeReservation, openReservation],
  );

  const selectedJourney = selectedJourneyId
    ? tripData.packages[selectedJourneyId]
    : null;

  const continueToReview = () => {
    if (!selectedJourneyId) return;
    setIsOpen(false);
    router.push(`/reserve/${selectedJourneyId}`);
  };

  const handleBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeReservation();
  };

  const modal =
    isMounted && isOpen
      ? createPortal(
          <div className="booking-backdrop" onMouseDown={handleBackdrop}>
            <section
              ref={dialogRef}
              className="booking-drawer terrain"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
            >
              <button
                type="button"
                className="booking-close"
                aria-label="Close journey selector"
                data-modal-close
                onClick={closeReservation}
              >
                <span aria-hidden="true">×</span>
              </button>

              <div className="booking-heading">
                <p className="kicker">Choose your Brazil story</p>
                <h2 id={titleId}>Reserve your Brazil journey.</h2>
                <p id={descriptionId}>
                  Choose a journey, then review the total, deposit, payment
                  plan, and booking terms before any payment begins.
                </p>
              </div>

              <fieldset className="package-options">
                <legend className="sr-only">Select one journey</legend>
                {journeyList.map((journey) => {
                  const selected = journey.id === selectedJourneyId;
                  return (
                    <label
                      className={`package-option ${selected ? "is-selected" : ""}`}
                      key={journey.id}
                    >
                      <input
                        type="radio"
                        name="journey"
                        value={journey.id}
                        checked={selected}
                        onChange={() => selectJourney(journey.id)}
                      />
                      <span className="radio-mark" aria-hidden="true" />
                      <span className="package-option-copy">
                        <span className="package-option-label">
                          {journey.shortName} · {journey.nights} nights
                        </span>
                        <strong>{formatUsd(journey.deposit)} deposit</strong>
                        <span>
                          {formatUsd(journey.total)} total · {journey.dates}
                        </span>
                        <span>
                          {journey.installmentCount} ×{" "}
                          {formatUsd(journey.installmentAmount)} after deposit
                        </span>
                      </span>
                    </label>
                  );
                })}
              </fieldset>

              <button
                type="button"
                className="button button-primary booking-action"
                disabled={!selectedJourneyId}
                onClick={continueToReview}
              >
                <span>
                  {selectedJourney
                    ? `Review ${selectedJourney.shortName} booking · ${formatUsd(selectedJourney.deposit)}`
                    : "Select a journey"}
                </span>
                <small>Continue to booking review</small>
              </button>

              <div className="booking-reassurance">
                <p>
                  Your deposit is applied toward the trip total. Card and bank
                  details are never entered in this window.
                </p>
                <p>
                  <strong>Prototype note:</strong> payment processing remains
                  disabled until the approved server-side Stripe handoff and
                  final booking terms are connected.
                </p>
              </div>
            </section>
          </div>,
          document.body,
        )
      : null;

  return (
    <ReservationContext.Provider value={contextValue}>
      {children}
      {modal}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within ReservationProvider");
  }
  return context;
}
