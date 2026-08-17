"use client";

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
              </div>
            </details>
          ))}
        </div>

        {/*
          Legacy Bahia continuation panel intentionally retained in version history.
          Replaced below with the premium-extension itinerary structure.
        */}
        <section className="salvador-section" id="salvador" aria-labelledby="salvador-title">
          <div className="salvador-terrain" aria-hidden="true" />
          <div className="section-shell salvador-shell">
            {/* // "The premium extension" text should be a h2 heading. The text needs the same styling "The Rio flow"" */}
            <h2 className="itinerary-title">The premium extension</h2>
            <div className="experience-heading light-heading">
              <div>
                <p className="kicker kicker-light">Four more nights · up to 6 continuation travelers</p>
                <h3 id="salvador-title">Rio shows you the city. Salvador invites you inside.</h3>
              </div>
              <p>
                Salvador changes the rhythm. Rio’s outward energy gives way to a more intimate continuation shaped by Afro-Brazilian culture, regional food, local context, tropical coastline, and more room to exhale.
              </p>
            </div>

            <div className="salvador-days" aria-label="Salvador itinerary in development">
              <article>
                <span>Nov 17</span>
                <h3>Land, let go, and be restored.</h3>
                <p>The included flight brings the Complete Journey group from Rio to Salvador. Settle in, recalibrate, and begin the slower rhythm with your included massage.</p>
              </article>
              <article>
                <span>Nov 18</span>
                <h3>Follow the local context.</h3>
                <p>Developing programming is being shaped around Salvador and Bahia’s history, key neighborhoods, distinct regional flavors, music, and experiences informed by local people.</p>
              </article>
              <article>
                <span>Nov 19</span>
                <h3>Make room for the personal.</h3>
                <p>Optional small-business and community experiences are being explored based on availability and group interest. Final hosts and activities will be shared once confirmed.</p>
              </article>
              <article>
                <span>Nov 20</span>
                <h3>Be present for Black Consciousness Day.</h3>
                <p>The continuation coincides with Brazil’s nationally recognized day honoring Black history, culture, and identity. Meaningful local programming is being finalized.</p>
              </article>
            </div>

            <aside className="consciousness-callout" aria-labelledby="consciousness-title">
              <div className="callout-date" aria-hidden="true"><span>Nov</span><strong>20</strong></div>
              <div>
                <p>Black Consciousness Day · Dia da Consciência Negra</p>
                <h3 id="consciousness-title">The continuation is timed so you are present—not arriving after it is over.</h3>
                <span>November 20 is a nationally recognized day in Brazil honoring Black history, culture, and identity. Local programming will be confirmed before departure.</span>
              </div>
            </aside>

            <div className="inline-reserve dark-reserve">
              <div>
                <span>Complete Journey · Nov 12–21</span>
                <strong>9 nights · {formatUsd(2995)} total · up to 6 continuation travelers</strong>
              </div>
              <ReserveButton className="button button-primary" journeyId="complete-journey" ctaLocation="salvador-inline-reserve">
                Continue to Salvador · $495
              </ReserveButton>
            </div>
          </div>
        </section>

        <p className="itinerary-disclaimer">
          The sequence, timing, venues, and individual activities may adjust in
          response to weather, local conditions, and operator availability.
          Sofound will communicate material itinerary updates before departure.
        </p>
      </div>
    </section>
  );
}
