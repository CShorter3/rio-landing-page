import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";
import { ReserveButton } from "@/components/reservation/ReserveButton";
import { formatUsd, journeyList, tripData } from "@/lib/trip-data";

const completeAdditionGroups = tripData.inclusionGroups.filter(
  (group) => group.scope === "complete-journey",
);
const rioCoreInclusionGroups = tripData.inclusionGroups.filter(
  (group) => group.scope === "rio-core",
);

export function PricingSection() {
  return (
    <section
      className="pricing-section terrain tv-static section-pad"
      id="pricing"
      aria-labelledby="pricing-title"
    >
      <SectionViewTracker eventName="pricing_section_viewed" />
      <div className="section-shell">
        <div className="pricing-heading">
          <div>
            <p className="kicker kicker-light">Choose how deep you want to go</p>
            <h2 id="pricing-title">One Brazil journey. Two ways to live it.</h2>
          </div>
          <p>
            Your deposit is part of the total—not an extra fee. Rio Core is the
            complete trip; Bahia is the smaller, slower continuation.
          </p>
        </div>

        <div className="price-grid">
          {journeyList.map((journey) => {
            const remaining = journey.total - journey.deposit;
            const isComplete = journey.id === "complete-journey";
            return (
              <article
                className={`price-card ${isComplete ? "featured" : ""}`}
                key={journey.id}
              >
                {isComplete ? (
                  <span className="featured-badge">Rio + Bahia · 9 nights</span>
                ) : null}
                <p className="price-label">
                  {journey.shortName} · {journey.nights} nights
                </p>
                <h3>{journey.name}</h3>
                <p className="price-positioning">{journey.positioning}</p>
                <p className="price-date">{journey.dates}</p>
                <div className="price-lockup">
                  <strong className="price">{formatUsd(journey.total)}</strong>
                  <span className="per-person">Per person</span>
                </div>
                <p className="payment-line">
                  {formatUsd(journey.deposit)} nonrefundable deposit today +{" "}
                  {journey.installmentCount} × {formatUsd(journey.installmentAmount)}
                </p>
                <p className="payment-balance">
                  {formatUsd(remaining)} remaining balance · deposit by card,
                  scheduled installments by ACH after separate authorization
                </p>
                <ul className="price-inclusions">
                  {journey.includedSummary.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ReserveButton
                  className="button button-primary"
                  journeyId={journey.id}
                  ctaLocation={`pricing_${journey.id}`}
                >
                  Reserve {journey.shortName} · {formatUsd(journey.deposit)}
                </ReserveButton>
                <small className="price-capacity">{journey.capacity}</small>
              </article>
            );
          })}
        </div>

        <div className="planning-heading">
          <p className="kicker kicker-light">Plan separately</p>
          <p>
            These categories are outside the confirmed trip price. No estimates
            are shown because traveler choices and fares vary.
          </p>
        </div>
        <div className="planning-costs" aria-label="Costs to plan separately">
          {tripData.planningSummary.map((item) => (
            <div className="planning-cost-item" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.status}</strong>
              <small>{item.description}</small>
            </div>
          ))}
        </div>

        <div className="package-inclusions-heading">
          <p className="kicker kicker-light">Confirm your package</p>
          <h3>Open only what you need to compare.</h3>
        </div>
        <div className="package-inclusion-grid">
          <details open>
            <summary>
              Rio Core includes
              <span aria-hidden="true">+</span>
            </summary>
            <div className="package-detail-body">
              {rioCoreInclusionGroups.map((group) => (
                <div key={group.title}>
                  <h4>{group.title}</h4>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
          <details>
            <summary>
              Complete Journey adds
              <span aria-hidden="true">+</span>
            </summary>
            <div className="package-detail-body package-detail-body-single">
              {completeAdditionGroups.map((group) => (
                <div key={group.title}>
                  <h4>{group.title}</h4>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </div>

        <p className="pricing-disclosure">
          Deposits are applied toward the trip total. Shared accommodation is
          included. Flights to and from Brazil are not.
        </p>
        <blockquote className="pricing-quote">
          Rio gives you the momentum. Bahia gives you the depth.
        </blockquote>
      </div>
    </section>
  );
}

const confidenceItems = [
  {
    label: "01 · Reserve your place",
    title: "$295 Rio · $495 Complete",
    copy: "Your nonrefundable deposit is applied toward the selected trip total and reserves your place once payment succeeds.",
  },
  {
    label: "02 · Use a payment plan",
    title: "Card deposit. Authorized ACH after.",
    copy: "Rio follows with four $425 installments. The Complete Journey follows with five $500 installments, only after separate ACH authorization.",
  },
  {
    label: "03 · Know what you’re booking",
    title: "No hidden hunt for the details.",
    copy: "Before payment, you’ll review the selected journey, total, deposit, complete schedule, booking terms, and payment authorization.",
  },
  {
    label: "04 · Travel with support",
    title: "Prepared before takeoff.",
    copy: "Calid provides preparation and arrival guidance, coordinates roommate preferences, and remains present as founder-host throughout the journey.",
  },
];

export function BookWithConfidence() {
  return (
    <section
      className="confidence-section section-pad"
      id="booking-confidence"
      aria-labelledby="confidence-title"
    >
      <div className="section-shell">
        <div className="confidence-heading">
          <p className="kicker">Book with confidence</p>
          <h2 id="confidence-title">A clear path from deposit to departure.</h2>
          <p>
            Four concise steps show what you pay, what you review, and how
            you are supported from reservation through departure.
          </p>
        </div>

        <div
          className="horizontal-shelf confidence-shelf"
          tabIndex={0}
          aria-label="Booking confidence steps"
        >
          {confidenceItems.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="confidence-action">
          <ReserveButton
            className="button button-primary"
            ctaLocation="booking_confidence"
          >
            Reserve your place
          </ReserveButton>
          <p>
            Before payment, you’ll see the total trip price, deposit,
            installment schedule, and full booking terms.
          </p>
        </div>
      </div>
    </section>
  );
}
