import Link from "next/link";
import { notFound } from "next/navigation";

import { Wordmark } from "@/components/layout/SiteHeader";
import { CheckoutLink } from "@/components/reservation/CheckoutLink";
import { bookingAdapter } from "@/lib/booking-adapter";
import {
  formatUsd,
  journeyIds,
  tripData,
} from "@/lib/trip-data";
import type { JourneyId } from "@/types/trip";

export function generateStaticParams() {
  return journeyIds.map((journeyId) => ({ journeyId }));
}

const isJourneyId = (value: string): value is JourneyId =>
  journeyIds.includes(value as JourneyId);

export default async function BookingReviewPage({
  params,
}: {
  params: Promise<{ journeyId: string }>;
}) {
  const { journeyId } = await params;
  if (!isJourneyId(journeyId)) notFound();

  const journey = tripData.packages[journeyId];
  const handoff = bookingAdapter.getCheckoutHandoff(journeyId);
  const remaining = journey.total - journey.deposit;

  return (
    <main className="booking-review-page" id="main-content">
      <nav className="booking-review-nav" aria-label="Booking review navigation">
        <Link href="/" aria-label="Return to Sofound Brazil journey">
          <Wordmark light />
        </Link>
        <Link href="/#pricing">Back to journey options</Link>
      </nav>

      <div className="booking-review-shell">
        <section className="booking-review-intro">
          <p className="kicker kicker-light">Booking review · no payment yet</p>
          <h1>Review {journey.shortName}.</h1>
          <p>
            Confirm the journey, total, deposit, and payment structure before
            continuing to any payment provider.
          </p>
        </section>

        <div className="booking-review-grid">
          <section className="booking-review-card" aria-labelledby="review-summary">
            <p>{journey.nights} nights · {journey.dates}</p>
            <h2 id="review-summary">{journey.name}</h2>
            <dl>
              <div>
                <dt>Total trip price</dt>
                <dd>{formatUsd(journey.total)}</dd>
              </div>
              <div>
                <dt>Deposit due today</dt>
                <dd>{formatUsd(journey.deposit)}</dd>
              </div>
              <div>
                <dt>Remaining balance</dt>
                <dd>{formatUsd(remaining)}</dd>
              </div>
            </dl>
            <p className="review-formula">
              {journey.installmentCount} scheduled installments of{" "}
              {formatUsd(journey.installmentAmount)} follow the deposit, only
              after separate ACH authorization.
            </p>
          </section>

          <section className="booking-review-terms" aria-labelledby="review-next">
            <p className="kicker">Before you continue</p>
            <h2 id="review-next">Know what happens next.</h2>
            <ol>
              <li>Review the complete installment dates and booking terms.</li>
              <li>Authorize the payment method and schedule separately.</li>
              <li>Pay the required deposit through secure Stripe checkout.</li>
              <li>Receive confirmation only after the deposit succeeds.</li>
            </ol>
            <p>{tripData.policies.deposit}</p>
            <p>
              Flights to and from Brazil, travel insurance, and items not
              expressly included remain the traveler’s responsibility.
            </p>

            {handoff.mode === "live" ? (
              <CheckoutLink journey={journey} href={handoff.url} />
            ) : (
              <div className="mock-checkout" role="status">
                <strong>Checkout is intentionally disabled.</strong>
                <p>{handoff.message}</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
