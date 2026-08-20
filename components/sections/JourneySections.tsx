import Link from "next/link";
import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { formatUsd, journeyList } from "@/lib/trip-data";

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
          <p className="kicker">What is happening</p>
          <h2 id="why-title">Sofound Rio 2026</h2>
          <p className="section-lede">
            This is your invitation to experience yourself—and the wider
            world—differently.
          </p>
          <p>
            Beyond Brazil's electric nights, cinematic views, scenic beaches, and
            celebrated food, there is a depth no checklist can capture: neighborhoods
            with their own pulse, histories carried through music, local perspectives that
            change how a place feels, and conversations that stay with you after you leave.
          </p>
          <p>
            Sofound creates the structure, context, and community to help you carry that
            depth into whatever you are building at home-a career, a business, or a new
            chapter, Return with clearer perspective, renewed energy, and more room to
            move toward what comes next.
          </p>
          {/* <p>
            Through Brazil’s vibrant nightlife, unforgettable views, scenic
            beaches, local food, culture, and shared experiences, this curated
            journey creates space to step outside routine, reconnect with what
            matters, and make room for your next chapter to emerge.
          </p> */}
          {/* <p>
            Sofound exists because meaningful travel should not force you to
            choose between freedom and support, celebration and reflection, or
            adventure and rest.
          </p> */}
          {/* <p>
            We create small-group journeys with intentional structure, locally
            rooted experiences, and enough room for real life to happen between
            the planned moments.
          </p> */}
        </Reveal>

        <Reveal className="fit-panel" delay={0.08}>
          <p className="kicker">Who all is going</p>
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

export function SofoundHouseSection() {
  return (
    <section id="house" className="house-section section-pad" aria-labelledby="house-title">
      <div className="section-shell">
        <div className="house-heading">
          <div>
            <p className="kicker">The Sofound House</p>
            <h2 id="house-title">More than accommodation. A home base for the journey.</h2>
          </div>
          <p>
            Shared living is part of the experience: a place to land, reset,
            and become familiar before the next day begins.
          </p>
        </div>

        <div className="house-editorial">
          <div className="house-media">
            <figure className="house-media-feature">
              <Image
                src="/images/sofound-house/exterior.jpg"
                alt="Glass-roofed courtyard with stained-glass windows in a Rio home"
                fill
                unoptimized
                sizes="(max-width: 767px) 100vw, 55vw"
              />
            </figure>
            <figure className="house-media-support">
              <Image
                src="/images/sofound-house/living.jpg"
                alt="Warm living room arranged for shared gathering"
                fill
                unoptimized
                sizes="(max-width: 767px) 50vw, 27vw"
              />
            </figure>
            <figure className="house-media-support">
              <Image
                src="/images/sofound-house/bedroom.jpg"
                alt="Bedroom with natural light and simple furnishings"
                fill
                unoptimized
                sizes="(max-width: 767px) 50vw, 27vw"
              />
            </figure>
          </div>

          <div className="house-story">
            <p className="house-story-intro">
              The house is where a group of travelers begins to feel like a
              community—without turning every quiet moment into a group
              activity.
            </p>

            <div className="house-values">
              <article>
                <span aria-hidden="true">01</span>
                <div>
                  <h3>Belong without performing</h3>
                  <p>
                    Come solo, with a friend, or with a partner. Calid
                    coordinates roommate preferences before departure so the
                    shared experience starts with more context and care.
                  </p>
                </div>
              </article>
              <article>
                <span aria-hidden="true">02</span>
                <div>
                  <h3>Gather, then make room</h3>
                  <p>
                    Daily Gathers create a shared rhythm for checking in,
                    journaling, or reconnecting. Personal writing and personal
                    sharing always remain optional.
                  </p>
                </div>
              </article>
              <article>
                <span aria-hidden="true">03</span>
                <div>
                  <h3>Return somewhere restorative</h3>
                  <p>
                    Between Rio’s early mornings and late-night options, the
                    house gives the group a familiar place to rest, reset, and
                    let the unplanned moments happen.
                  </p>
                </div>
              </article>
            </div>

            <div className="house-confirmation" aria-labelledby="house-confirmed-title">
              <p className="kicker kicker-light" id="house-confirmed-title">
                Confirmed in Rio Core
              </p>
              <ul>
                <li>Shared Sofound House accommodation in Rio</li>
                <li>Roommate-preference coordination before departure</li>
                <li>Daily Gathers and a Sofound journal</li>
              </ul>
              <p className="house-disclosure">
                Property photography is illustrative until the final home,
                bedroom, bed, and bathroom configuration is confirmed.
                Preferences are prioritized but cannot guarantee a particular
                roommate or room type.
              </p>
              <Link href="#faq">Read the rooming and lodging FAQs</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
