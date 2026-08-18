import Image from "next/image";

import { tripData } from "@/lib/trip-data";

const hostFacts = [
  {
    value: "18+",
    label: "months traveling independently",
  },
  {
    value: "22",
    label: "countries experienced firsthand",
  },
  {
    value: "14 months",
    label: "backpacking across 17 African countries",
  },
];

export function HostSection() {
  return (
    <section
      className="host-section section-pad terrain"
      aria-labelledby="host-title"
    >
      <div className="section-shell host-shell">
        <header className="host-header">
          <p className="kicker kicker-light">Meet Calid</p>
          <h2 id="host-title">
            The best parts of travel are rarely the parts you can book.
          </h2>
        </header>

        <div className="host-story">
          <figure className="host-portrait">
            <div className="host-photo-frame">
              <Image
                unoptimized
                src={tripData.assets.hostConnection}
                alt="Calid, founder and host of Sofound, seated with a friend during his travels"
                fill
                sizes="(min-width: 900px) 38vw, 100vw"
              />
            </div>
            <figcaption>
              Calid during more than 18 months of independent travel.
            </figcaption>
          </figure>

          <div className="host-narrative">
            {tripData.host.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="host-signoff">
              <strong>{tripData.host.name}</strong>
              <span>{tripData.host.role}</span>
            </p>
          </div>
        </div>

        <dl className="host-proof" aria-label="Calid's travel experience">
          {hostFacts.map((fact) => (
            <div key={fact.value}>
              <dt>{fact.value}</dt>
              <dd>{fact.label}</dd>
            </div>
          ))}
        </dl>

        <div className="host-promise">
          <p className="kicker kicker-light">Founder-hosted · locally led</p>
          <blockquote>{tripData.host.quote}</blockquote>
        </div>
      </div>
    </section>
  );
}
