import { ReserveButton } from "@/components/reservation/ReserveButton";

export function FinalCTA() {
  return (
    <section className="final-cta terrain tv-static section-pad" aria-labelledby="final-title">
      <div className="section-shell final-cta-shell">
        <p className="kicker kicker-light">Founder-hosted Brazil journey · November 2026</p>
        <h2 id="final-title">Your next chapter does not have to begin someday.</h2>
        <p>
          Brazil is waiting—with coastline, music, history, food, movement, and
          the kind of shared experiences that remind you how alive the world can
          feel.
        </p>
        <p className="final-decision-line">
          November 12–21, 2026 · Reserve from $295 · Payment plans available
        </p>
        <div className="final-actions">
          <ReserveButton
            className="button button-primary"
            journeyId="rio-core"
            ctaLocation="final_rio"
          >
            Reserve Rio Core
          </ReserveButton>
          <ReserveButton
            className="button button-ghost-light"
            journeyId="complete-journey"
            ctaLocation="final_complete"
          >
            Reserve the Complete Journey
          </ReserveButton>
        </div>
      </div>
    </section>
  );
}
