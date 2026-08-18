import { tripData } from "@/lib/trip-data";

const faqId = (title: string) =>
  `faq-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;

export function FAQSection() {
  return (
    <section className="faq-section section-pad" id="faq" aria-labelledby="faq-title">
      <div className="section-shell faq-shell">
        <header className="faq-heading">
          <div>
            <p className="kicker kicker-light">Before you reserve</p>
            <h2 id="faq-title">Know what you are saying yes to.</h2>
          </div>
          <p>
            Clear answers for the decisions that matter most—from group fit and
            rooming to deposits, preparation, and the optional Bahia
            continuation.
          </p>
        </header>

        <div className="faq-categories">
          {tripData.faqGroups.map((group, groupIndex) => {
            const groupId = faqId(group.title);
            return (
              <section
                className="faq-category"
                key={group.title}
                aria-labelledby={groupId}
              >
                <header className="faq-category-header">
                  <span aria-hidden="true">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                  <h3 id={groupId}>{group.title}</h3>
                </header>
                <div className="faq-rows">
                  {group.items.map((item) => (
                    <details key={item.question}>
                      <summary>
                        <span className="faq-question">{item.question}</span>
                        <span className="faq-icon" aria-hidden="true">
                          +
                        </span>
                      </summary>
                      <div className="faq-answer">
                        {item.answer.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
