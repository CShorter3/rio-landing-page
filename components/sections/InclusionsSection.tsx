const inclusionHighlights = [
  {
    emoji: "🏠",
    title: "Sofound stays",
    description:
      "Shared Sofound House accommodations in Rio, plus one overnight in Arraial do Cabo.",
  },
  {
    emoji: "🍳",
    title: "Selected meals",
    description:
      "A private-chef brunch after Dois Irmãos and the group dinner on Little Africa day.",
  },
  {
    emoji: "🚐",
    title: "Official transport",
    description:
      "Scheduled airport pickup, group transportation, Arraial transfers, and Vidigal motos.",
  },
  {
    emoji: "🎯",
    title: "Curated experiences",
    description:
      "Little Africa, Tijuca and Christ, Dois Irmãos, plus the Arraial water and beach day.",
  },
  {
    emoji: "🌿",
    title: "Daily Gathers",
    description:
      "Intentional space for reflection, connection, and real conversation with the group.",
  },
  {
    emoji: "🧭",
    title: "Founder-hosted support",
    description:
      "Arrival guidance, roommate coordination, and steady support throughout the journey.",
  },
  {
    emoji: "🚁",
    title: "Trip preparation",
    description:
      "Pre-trip guidance helps you arrive clear, prepared, and ready to settle into Rio.",
  },
  {
    emoji: "🎁",
    title: "Sofound journal",
    description:
      "A travel journal with private writing space and guided prompts to carry the experience home.",
  },
] as const;

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
          <h2 id="included-title">Everything curated for you.</h2>
          <p className="section-intro">
            Your package covers the arranged Rio experience. Bring your
            passport, and plan separately for flights, free-time spending, and
            anything not named here.
          </p>
        </div>

        <div className="included-grid">
          {inclusionHighlights.map((item) => (
            <article className="included-item" key={item.title}>
              <span className="included-icon" aria-hidden="true">
                {item.emoji}
              </span>
              <h3 className="included-title">{item.title}</h3>
              <p className="included-desc">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
