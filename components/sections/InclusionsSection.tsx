import { tripData } from "@/lib/trip-data";

const inclusionIconPaths: Record<string, React.ReactNode> = {
  home: <path d="M3 11.5 12 4l9 7.5M5.5 10v10h13V10M9 20v-6h6v6" />,
  route: <path d="M5 5h8a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h10M5 2v6M2 5h6M19 14v6M16 17h6" />,
  sun: <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />,
  meal: <path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M16 3v18M16 3c3 2 4 6 0 10" />,
  host: <path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17 11l2 2 4-5" />,
  journal: <path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H20v17H7.5A2.5 2.5 0 0 0 5 21.5v-17ZM5 4.5v17M9 7h7M9 11h7" />,
};

const completeAdditionGroups = tripData.inclusionGroups.filter(
  (group) => group.scope === "complete-journey",
);
const rioCoreGroups = tripData.inclusionGroups.filter(
  (group) => group.scope === "rio-core",
);

function InclusionIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {inclusionIconPaths[name]}
      </g>
    </svg>
  );
}

export function InclusionsSection() {
  return (
    <section
      className="inclusions-section section-pad"
      id="included"
      aria-labelledby="included-title"
    >
      <div className="section-shell">
        <div className="inclusions-heading">
          <p className="kicker">What’s included</p>
          <h2 id="included-title">What’s included in Rio Core.</h2>
          <p className="section-intro">
            The items below are included in the Rio Core trip price. Anything
            not expressly listed should be planned for separately.
          </p>
        </div>

        <div className="included-grid">
          {tripData.inclusionSummary.map((item) => (
            <article className="included-item" key={item.title}>
              <span className="included-icon">
                <InclusionIcon name={item.icon} />
              </span>
              <h3 className="included-title">{item.title}</h3>
              <p className="included-desc">{item.description}</p>
            </article>
          ))}
        </div>

        <details className="included-detail-drawer">
          <summary>
            Review every inclusion and exclusion
            <span aria-hidden="true">+</span>
          </summary>
          <div className="included-detail-columns">
            <div className="included-detail-column included-detail-rio">
              <h3>Rio Core details</h3>
              {rioCoreGroups.map((group) => (
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
            <div className="included-detail-column">
              <h3>Complete Journey adds</h3>
              {completeAdditionGroups.map((group) => (
                <ul key={group.title}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ))}
            </div>
            <div className="included-detail-column not-included">
              <h3>Plan separately</h3>
              <ul>
                {tripData.exclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
