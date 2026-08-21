"use client";

import Image from "next/image";
import type { SyntheticEvent } from "react";

import { trackEvent } from "@/lib/analytics";
import { formatUsd, tripData } from "@/lib/trip-data";
import { ReserveButton } from "@/components/reservation/ReserveButton";

const labelClass = (label: string) =>
  `itinerary-chip itinerary-chip-${label.toLowerCase().replace(" ", "-")}`;

const compactDate = (date: string) => {
  const [weekday, month, day] = date.replace(",", "").split(/\s+/);
  return `${weekday.slice(0, 3).toUpperCase()} · ${month.slice(0, 3).toUpperCase()} ${day}`;
};

const rioDayImages = [
  {
    src: "/images/sofound-house/exterior.jpg",
    alt: "An art-filled courtyard at the Sofound House in Rio",
  },
  {
    src: "/images/sofound-hero-mobile.webp",
    alt: "A coastal overlook above Rio de Janeiro",
  },
  {
    src: "/images/sofound-house/bedroom.jpg",
    alt: "A warm shared space prepared for the Rio group",
  },
  {
    src: "/images/sofound-hero-desktop.webp",
    alt: "Brazilian coastline and open water",
  },
  {
    src: "/images/sofound-house/living.jpg",
    alt: "A sunlit pool and gathering space in Brazil",
  },
  {
    src: "/images/sofound-house/garden.jpg",
    alt: "A hosted meal being prepared for Sofound travelers",
  },
] as const;

export function ItinerarySection() {
  const handleToggle = (
    event: SyntheticEvent<HTMLDetailsElement>,
    day: number,
  ) => {
    if (!event.currentTarget.open) return;
    trackEvent("itinerary_day_opened", {
      tripName: tripData.title,
      itineraryDay: day,
    });
  };

  return (
    <section
      className="itinerary-section terrain tv-static section-pad"
      id="itinerary"
      aria-labelledby="itinerary-title"
    >
      <div className="section-shell itinerary-shell">
        <div
          className="journey-context"
          id="journey"
          aria-labelledby="journey-context-title"
        >
          <header className="journey-context-header">
            <p className="kicker kicker-light">Journey overview</p>
            <h2 id="journey-context-title">Choose your fit</h2>
            <p>
              Choose the complete Rio experience, or continue with our
              intimate Salvador extension.
            </p>
          </header>

          <div
            className="journey-route"
            aria-label="Journey timeline: Rio Core and optional Salvador extension"
          >
            <article className="journey-stop journey-stop-rio">
              <span className="journey-stop-marker" aria-hidden="true">01</span>
              <div className="journey-stop-copy">
                <p className="journey-context-label">Core Trip: Nights 1–5</p>
                <h3>Rio Core</h3>
                <figure className="journey-map journey-map-rio">
                  <Image
                    src="/images/journey-overview/rio-map.webp"
                    alt="Illustrated Rio route connecting Christ the Redeemer, Tijuca Forest, Centro and Pedra do Sal, Sugarloaf Mountain, Copacabana and Ipanema, and Morro Dois Irmãos"
                    width={742}
                    height={302}
                    sizes="(max-width: 767px) calc(100vw - 7rem), 42vw"
                    unoptimized
                  />
                </figure>
                <p className="journey-stop-summary">
                  Coastline, movement, music, local context, shared adventure,
                  and the nights that turn a new group into a real community.
                </p>
              </div>
            </article>

            <article
              className="journey-stop journey-stop-salvador"
              id="journey-salvador-overview"
            >
              <span className="journey-stop-marker" aria-hidden="true">02</span>
              <div className="journey-stop-copy">
                <p className="journey-context-label">
                  Optional Extended Trip: Nights 5–9
                </p>
                <h3>Continue north to Salvador, Bahia</h3>
                <figure className="journey-map journey-map-salvador">
                  <Image
                    src="/images/journey-overview/salvador-map.webp"
                    alt="Illustrated Salvador route connecting Pelourinho, Elevador Lacerda, Mercado Modelo, Farol da Barra, and Ilha dos Frades"
                    width={650}
                    height={265}
                    sizes="(max-width: 767px) calc(100vw - 7rem), 42vw"
                    unoptimized
                  />
                </figure>
                <p className="journey-stop-summary">
                  For travelers who want to stay longer, Bahia shifts the
                  journey into a slower, more intimate rhythm shaped by
                  Afro-Brazilian culture, regional food, local context, and
                  more room to exhale.
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className="itinerary-heading">
          <div>
            <p className="kicker kicker-light">Day by day</p>
            <h2 id="itinerary-title">The Rio flow.</h2>
          </div>
          <p>
            Every day is designed—from the before-sunrise Vidigal ascent to the
            formal farewell dinner.
          </p>
        </div>

        <div className="itinerary-legend" aria-label="Itinerary label legend">
          <span>Included</span>
          <span>Optional</span>
          <span>Free time</span>
        </div>

        <div className="itinerary-list">
          {tripData.itinerary.map((day, index) => (
            <details
              key={day.day}
              className="itinerary-day day-card"
              open={index === 0}
              onToggle={(event) => handleToggle(event, day.day)}
            >
              <summary className="day-header">
                <span className="day-label-wrap">
                  <span className="day-num">
                    Day {String(day.day).padStart(2, "0")} · {compactDate(day.date)}
                  </span>
                  <span className="day-name">{day.title}</span>
                </span>
                <span className="day-arrow" aria-hidden="true">↓</span>
              </summary>
              <div className="day-body">
                <div className="day-body-inner">
                  <div className="day-body-grid">
                    <div className="day-body-copy">
                      <p className="day-preview">{day.preview}</p>
                      <div className="timeline">
                        {day.timeline.map((item) => (
                          <div className="tl-item" key={`${item.time}-${item.text}`}>
                            <span className="tl-time">{item.time}</span>
                            <div className="tl-content">
                              <span className="tl-text">{item.text}</span>
                              {item.label ? (
                                <span className={labelClass(item.label)}>
                                  {item.label}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className="day-media"
                      role="img"
                      aria-label={rioDayImages[index].alt}
                      style={{ backgroundImage: `url(${rioDayImages[index].src})` }}
                    />
                  </div>
                  <div className="day-reserve-cta">
                    <div>
                      <span>Rio Core · Nov 12–17</span>
                      <strong>5 nights · {formatUsd(1995)} total</strong>
                    </div>
                    <ReserveButton
                      className="button button-primary"
                      journeyId="rio-core"
                      ctaLocation={`rio-day-${day.day}-reserve`}
                    >
                      Reserve Rio Core · $295
                    </ReserveButton>
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>

        <div className="itinerary-heading premium-extension-header">
          <div>
            <p className="kicker kicker-light">Optional continuation</p>
            <h2 id="premium-extension-title">The Salvador rhythm.</h2>
            <p className="premium-extension-copy">
              Complete Journey travelers fly from Rio to Salvador for four
              additional shared nights, one included massage, and a smaller,
              founder-hosted continuation.
            </p>
            <p className="premium-extension-assurance">
              Rio Core ends complete. Salvador begins only for travelers who
              choose the extension.
            </p>
          </div>
        </div>

        <section
          className="salvador-section"
          id="salvador"
          aria-labelledby="salvador-title"
        >
          <div className="salvador-terrain" aria-hidden="true" />
          <div className="salvador-shell">
            <header className="salvador-hero">
              <div>
                <p className="kicker kicker-light">
                  Four more nights · optional continuation
                </p>
                <h3 id="salvador-title">
                  Rio shows you the city. Salvador invites you inside.
                </h3>
              </div>
              <p>
                Salvador is for the smaller group ready to continue with more
                care, more access, and more time inside Bahia.
              </p>
            </header>

            <div
              className="salvador-days"
              aria-label="Salvador extension day by day"
            >
              <article className="salvador-day-row">
                <div
                  className="salvador-day-image salvador-day-image-arrival"
                  role="img"
                  aria-label="A colorful, intimate stay with a pool in Brazil"
                >
                  <span>Nov 17</span>
                  <h4>Land, let go, and be restored.</h4>
                </div>
                <div className="salvador-day-description">
                  <h4>Land, let go, and be restored.</h4>
                  <p>
                    The included flight brings the Complete Journey group from
                    Rio to Salvador. Settle in, recalibrate, and begin Bahia’s
                    slower rhythm with an included massage, sunset, and dinner.
                  </p>
                </div>
              </article>

              <article className="salvador-day-row">
                <div
                  className="salvador-day-image salvador-day-image-water"
                  role="img"
                  aria-label="Travelers overlooking tropical water at sunset"
                >
                  <span>Nov 18</span>
                  <h4>Follow the water.</h4>
                </div>
                <div className="salvador-day-description">
                  <h4>Follow the water.</h4>
                  <p>
                    Sail across the Bay of All Saints toward Ilha dos Frades for
                    swimming, music, fresh seafood, and an intentionally
                    unstructured day together.
                  </p>
                </div>
              </article>

              <article className="salvador-day-row">
                <div
                  className="salvador-day-image salvador-day-image-invitation"
                  role="img"
                  aria-label="A warm residential kitchen prepared for hosting"
                >
                  <span>Nov 19</span>
                  <h4>Salvador by invitation.</h4>
                </div>
                <div className="salvador-day-description">
                  <h4>Salvador by invitation.</h4>
                  <p>
                    Spend time with local creative and entrepreneurial hosts,
                    meet a youth football community, and share dinner inside a
                    Bahian home.
                  </p>
                </div>
              </article>

              <article className="salvador-day-row">
                <div
                  className="salvador-day-image salvador-day-image-consciousness"
                  role="img"
                  aria-label="An art-filled Brazilian interior gathering place"
                >
                  <span>Nov 20</span>
                  <h4>Be present for Black Consciousness Day.</h4>
                </div>
                <div className="salvador-day-description">
                  <h4>Be present for Black Consciousness Day.</h4>
                  <p>
                    The journey is timed for Brazil’s national day honoring
                    Black history, culture, and identity. Local programming will
                    be confirmed before departure.
                  </p>
                </div>
              </article>
            </div>

            <aside
              className="black-consciousness-highlight"
              aria-labelledby="consciousness-title"
            >
              <p>November 20 · Black Consciousness Day</p>
              <div>
                <strong aria-hidden="true">20</strong>
                <div>
                  <h3 id="consciousness-title">
                    Do not arrive after the moment has passed. Be there for it.
                  </h3>
                  <span>
                    The extension is timed so you are in Salvador for Brazil’s
                    national day honoring Black history, culture, and identity.
                  </span>
                </div>
              </div>
            </aside>

            <div className="complete-journey-cta">
              <div>
                <span>Complete Journey · Nov 12–21</span>
                <strong>
                  9 nights · {formatUsd(2995)} total · smaller continuation
                  group
                </strong>
              </div>
              <ReserveButton
                className="button button-primary"
                journeyId="complete-journey"
                ctaLocation="salvador-inline-reserve"
              >
                Continue to Salvador · $495
              </ReserveButton>
            </div>
          </div>
        </section>

        <p className="extension-disclaimer">
          Final experiences, timing, and local access may adapt to local
          conditions, partner availability, and confirmed programming.
        </p>
      </div>
    </section>
  );
}
