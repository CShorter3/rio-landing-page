import Image from "next/image";

import { tripData } from "@/lib/trip-data";

const hostStages = [
  {
    title: "Before departure",
    copy: "Clear pre-trip guidance by email and/or text, arrival-planning support, important updates, and roommate-preference coordination—so you feel prepared, not overwhelmed.",
  },
  {
    title: "In Brazil",
    copy: "Calid is present from the first welcome to the final goodbye as founder-host and community steward, while local experiences are led by local hosts and operators.",
  },
  {
    title: "After we return",
    copy: "The group comes together once more for a post-trip reunion call—a chance to reconnect, revisit the journey, and carry its best parts forward.",
  },
];

export function HostSection() {
  return (
    <section className="host-section section-pad" aria-labelledby="host-title">
      <div className="section-shell host-shell">
        <div className="host-copy">
          <p className="kicker kicker-light">Meet the host</p>
          <h2 id="host-title">
            Built from 14 months of learning what makes a journey stay with you.
          </h2>
          {tripData.host.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="host-signoff">— {tripData.host.name}, {tripData.host.role}</p>
          <blockquote>{tripData.host.quote}</blockquote>
        </div>

        <figure className="host-gallery-wrap">
          <div className="host-gallery">
            <div className="host-photo host-photo-wide">
              <Image
                unoptimized
                src={tripData.assets.hostCommunity}
                alt="Calid with a community during his extended solo journey"
                fill
                sizes="(min-width: 900px) 43vw, 84vw"
              />
            </div>
            <div className="host-photo host-photo-tall">
              <Image
                unoptimized
                src={tripData.assets.hostOverlook}
                alt="Calid seated at a mountain overlook during his travels"
                fill
                sizes="(min-width: 900px) 21vw, 84vw"
              />
            </div>
            <div className="host-photo host-photo-tall">
              <Image
                unoptimized
                src={tripData.assets.hostConnection}
                alt="Calid seated with a travel connection during his journey"
                fill
                sizes="(min-width: 900px) 21vw, 84vw"
              />
            </div>
          </div>
          <figcaption>
            Calid during his 14-month solo journey across 17 countries in
            Africa and the Middle East.
          </figcaption>
        </figure>
      </div>

      <div className="section-shell host-stages-wrap">
        <div className="host-stages-heading">
          <p className="kicker kicker-light">On this journey</p>
          <h3>Hosted from before takeoff to after you return.</h3>
        </div>
        <div className="horizontal-shelf host-stages" tabIndex={0} aria-label="Host support stages">
          {hostStages.map((stage, index) => (
            <article key={stage.title}>
              <span>0{index + 1}</span>
              <h4>{stage.title}</h4>
              <p>{stage.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
