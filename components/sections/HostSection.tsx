import Image from "next/image";

import { tripData } from "@/lib/trip-data";

const hostFacts = [
  {
    value: "2",
    label: "years learning how pace, access, and spontaneity revolutizes a journey",
  },
  {
    value: "22",
    label: "countries that reinforced the value of local perspective",
  },
  {
    value: "14 months",
    label: "across 17 African countries, led by people as much as place",
  },
];

export function HostSection() {
  return (
    <section
      id="host"
      className="host-section section-pad terrain"
      aria-labelledby="host-title"
    >
      <div className="section-shell host-shell">
        <header className="host-header">
          <p className="kicker kicker-light">Meet the host</p>
          <h2 id="host-title">
            Beyond routine, there is a version of life you have not met yet.
          </h2>
        </header>

        <div className="host-editorial">
          <div className="host-narrative">
            {tripData.host.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="host-signoff">
              <strong>{tripData.host.name}</strong>
              <span>{tripData.host.role}</span>
            </p>
          </div>

          <aside className="host-evidence" aria-label="Calid's hosting philosophy">
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

            <div className="host-promise">
              <p className="kicker kicker-light">
                Founder-hosted · locally led
              </p>
              <blockquote>{tripData.host.quote}</blockquote>
            </div>

            <dl className="host-proof">
              {hostFacts.map((fact) => (
                <div key={fact.value}>
                  <dt>{fact.value}</dt>
                  <dd>{fact.label}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
