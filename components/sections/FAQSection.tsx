import { tripData } from "@/lib/trip-data";

export function FAQSection() {
  return (
    <section className="faq-section section-pad" id="faq" aria-labelledby="faq-title">
      <div className="section-shell faq-heading">
        <div>
          <p className="kicker">The questions between you and yes</p>
          <h2 id="faq-title">Know what you are saying yes to.</h2>
        </div>
        <p>
          The right trip should still make sense after the excitement settles.
          Start with the questions that matter most to your decision.
        </p>
      </div>

      <div className="section-shell">
        <div className="horizontal-shelf faq-shelf" tabIndex={0} aria-label="Frequently asked question groups">
          {tripData.faqGroups.map((group, groupIndex) => (
            <section className="faq-group" key={group.title} aria-labelledby={`faq-${group.title.replaceAll(" ", "-").toLowerCase()}`}>
              <h3 id={`faq-${group.title.replaceAll(" ", "-").toLowerCase()}`}>
                {group.title}
              </h3>
              <div>
                {group.items.map((item, itemIndex) => {
                  const questionNumber =
                    tripData.faqGroups
                      .slice(0, groupIndex)
                      .reduce((total, previousGroup) =>
                        total + previousGroup.items.length, 0) +
                    itemIndex +
                    1;
                  return (
                    <details key={item.question}>
                      <summary>
                        <span aria-hidden="true">{String(questionNumber).padStart(2, "0")}</span>
                        {item.question}
                        <b aria-hidden="true">+</b>
                      </summary>
                      <div className="faq-answer">
                        {item.answer.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </details>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
