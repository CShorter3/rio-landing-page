import Link from "next/link";
import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { formatUsd, journeyList, tripData } from "@/lib/trip-data";

export function JourneyAtAGlance() {
  return (
    <section className="glance-section terrain" aria-labelledby="glance-title">
      <div className="section-shell glance-shell">
        <Reveal className="glance-heading">
          <p className="kicker kicker-light">Brazil · November 2026</p>
          <h2 id="glance-title">One journey. Two ways to experience it.</h2>
          <p>
            Rio is the complete core trip. Bahia is the smaller, slower
            continuation for travelers who want to go deeper.
          </p>
        </Reveal>

        <div className="glance-options">
          {journeyList.map((journey, index) => (
            <article className="glance-option" key={journey.id}>
              <div className="glance-index" aria-hidden="true">
                0{index + 1}
              </div>
              <div>
                <p className="glance-label">{journey.name}</p>
                <p className="glance-dates">{journey.dates}</p>
                <strong className="glance-price">
                  {formatUsd(journey.total)}
                </strong>
                <span>
                  {formatUsd(journey.deposit)} deposit · {journey.nights} nights
                </span>
                <p>{journey.positioning}</p>
                <small>{journey.capacity}</small>
              </div>
            </article>
          ))}
        </div>

        <div className="glance-disclosure">
          <span>Shared accommodations</span>
          <span>Founder-hosted</span>
          <span>Payment plans available</span>
          <p>
            Deposits are nonrefundable and applied toward the trip total.
            Flights to and from Brazil are not included.
          </p>
        </div>
      </div>
    </section>
  );
}

const journeyFit = [
  "Want culture, community, nature, and nightlife—not a rushed tourist checklist.",
  "Are open to meeting new people and participating in a shared group experience.",
  "Want a hosted international trip without planning every logistical detail alone.",
  "Feel ready to step outside routine and return with more energy and perspective.",
  "Value rest, celebration, curiosity, and real conversation in the same experience.",
];

export function WhySofoundExists() {
  return (
    <section className="why-section section-pad" aria-labelledby="why-title">
      <div className="section-shell why-grid">
        <Reveal className="why-story">
          <p className="kicker">Why Sofound exists</p>
          <h2 id="why-title">Travel should feel bigger than a checklist.</h2>
          <p className="section-lede">
            This is your invitation to experience yourself—and the wider
            world—differently.
          </p>
          <p>
            Through Brazil’s vibrant nightlife, unforgettable views, scenic
            beaches, local food, culture, and shared experiences, this curated
            journey creates space to step outside routine, reconnect with what
            matters, and make room for your next chapter to emerge.
          </p>
          <p>
            Sofound exists because meaningful travel should not force you to
            choose between freedom and support, celebration and reflection, or
            adventure and rest.
          </p>
          <p>
            We create small-group journeys with intentional structure, locally
            rooted experiences, and enough room for real life to happen between
            the planned moments.
          </p>
        </Reveal>

        <Reveal className="fit-panel" delay={0.08}>
          <p className="kicker">Who this journey is for</p>
          <h3>You’ll feel at home here if you…</h3>
          <ul className="fit-list">
            {journeyFit.map((item, index) => (
              <li key={item}>
                <span aria-hidden="true">0{index + 1}</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="fit-note">
            Come solo, with a friend, or with a partner—the experience is
            designed to help the group connect naturally.
          </p>
          <p className="fit-qualifier">
            This is not a silent retreat or a party-only vacation. It is a
            social, active, culturally rooted group journey with room for both
            energy and reflection.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function TwoRhythmsSection() {
  const rio = tripData.packages["rio-core"];
  const complete = tripData.packages["complete-journey"];

  return (
    <section
      className="rhythms-section terrain tv-static section-pad"
      id="journey"
      aria-labelledby="rhythms-title"
    >
      <div className="section-shell">
        <Reveal className="rhythms-heading">
          <p className="kicker kicker-light">Two rhythms. One complete journey.</p>
          <h2 id="rhythms-title">Rio brings the energy. Bahia brings you closer.</h2>
        </Reveal>

        <div className="rhythms-grid">
          <article className="rhythm rhythm-rio">
            <p className="rhythm-label">Rio wakes you up</p>
            <h3>Rio Core is the trip.</h3>
            <p>
              The journey begins in Rio: a city of coastline, movement, music,
              and shared energy. Spend time on the water, along the beaches, and
              in the landscapes that shape the city—then move beyond the
              postcard through locally led food, culture, and heritage
              experiences.
            </p>
            <p>
              When evening arrives, Rio opens up in a different way: live music,
              nightlife, and the kind of spontaneous shared moments that turn a
              new group into a real community.
            </p>
            <div className="rhythm-facts">
              <strong>{rio.dates}</strong>
              <span>
                {formatUsd(rio.total)} total · {formatUsd(rio.deposit)} deposit
              </span>
            </div>
          </article>

          <article className="rhythm rhythm-bahia">
            <p className="rhythm-label">Salvador, Bahia takes you deeper</p>
            <h3>For a smaller group, Bahia is the upgrade.</h3>
            <p>
              Rio’s outward energy gives way to a more intimate continuation
              shaped by Afro-Brazilian culture, regional food, local context,
              tropical coastline, and more room to exhale.
            </p>
            <p>
              The confirmed package includes the flight from Rio to Salvador,
              four nights of shared accommodation, one included massage, and a
              founder-hosted continuation for up to six travelers.
            </p>
            <p className="development-note">
              <strong>Itinerary in development:</strong> exact cultural
              activities, hosts, venues, and Black Consciousness Day programming
              will be shared once confirmed.
            </p>
            <div className="rhythm-facts">
              <strong>{complete.dates}</strong>
              <span>
                {formatUsd(complete.total)} total ·{" "}
                {formatUsd(complete.deposit)} deposit
              </span>
            </div>
          </article>
        </div>

        <blockquote className="rhythms-quote">
          Rio gives you the momentum. Bahia gives you the depth.
        </blockquote>
      </div>
    </section>
  );
}

export function SofoundHouseSection() {
  return (
    <section className="house-section section-pad" aria-labelledby="house-title">
      <div className="section-shell">
        <div className="house-heading">
          <div>
            <p className="kicker">The Sofound House</p>
            <h2 id="house-title">More than accommodation. A home base for the journey.</h2>
          </div>
          <p>
            The Sofound House brings the group together in a boutique,
            shared-home atmosphere—where mornings begin and the unplanned
            moments become part of the trip.
          </p>
        </div>

        <div className="house-grid">
          <article>
            <span aria-hidden="true">01</span>
            <h3>Living together</h3>
            <p>
              Before departure, Calid will coordinate roommate preferences
              using requests from friends and couples, gender preferences,
              quiet or social room styles, and cleanliness and tidiness habits.
            </p>
          </article>
          <article>
            <span aria-hidden="true">02</span>
            <h3>The Daily Gather</h3>
            <p>
              At some point each day, we come together to check in, reflect,
              journal, or simply reconnect—giving the journey a shared rhythm
              without asking everyone to process it the same way.
            </p>
          </article>
          <article>
            <span aria-hidden="true">03</span>
            <h3>The reflection space</h3>
            <p>
              A dedicated space for journaling, decompressing, guided prompts,
              and taking a quiet moment. Every traveler receives a Sofound
              journal; sharing from it is always optional.
            </p>
          </article>
        </div>

        <div className="house-gallery" aria-label="The confirmed Sofound House in Copacabana">
          <figure className="house-gallery-feature">
            <Image
              src="/images/sofound-house/exterior.jpg"
              alt="Glass-roofed courtyard with stained-glass windows at the Sofound House"
              fill
              unoptimized
              sizes="(max-width: 760px) 100vw, 58vw"
            />
          </figure>
          <figure>
            <Image
              src="/images/sofound-house/living.jpg"
              alt="Living room inside the Sofound House"
              fill
              unoptimized
              sizes="(max-width: 760px) 50vw, 21vw"
            />
          </figure>
          <figure>
            <Image
              src="/images/sofound-house/pool.jpg"
              alt="Pool area at the Sofound House"
              fill
              unoptimized
              sizes="(max-width: 760px) 50vw, 21vw"
            />
          </figure>
          <p className="house-gallery-caption">
            The confirmed Copacabana home base for the Rio portion of the journey.
          </p>
        </div>

        <div className="rooming-note">
          <strong>Transparent rooming note</strong>
          <p>
            Exact bedroom, bed, and bathroom arrangements depend on the final
            property. Preferences are thoughtfully coordinated and prioritized,
            but not guaranteed. Final property and room-configuration details
            will be shared once confirmed.
          </p>
          <Link href="#faq">Read rooming FAQs</Link>
        </div>
      </div>
    </section>
  );
}
