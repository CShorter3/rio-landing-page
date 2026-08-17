import Link from "next/link";

import { tripData } from "@/lib/trip-data";
import { Wordmark } from "./SiteHeader";

export function SiteFooter() {
  const hasContactEmail = !tripData.organizer.email.startsWith("TODO_");

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main section-shell">
        <div>
          <Wordmark light />
          <p>Travel · Culture · Connection · Transformation</p>
        </div>
        <div className="footer-contact">
          <span>Questions before booking?</span>
          {hasContactEmail ? (
            <a href={`mailto:${tripData.organizer.email}`}>
              {tripData.organizer.email}
            </a>
          ) : (
            <strong>Contact email coming before launch</strong>
          )}
        </div>
      </div>
      <div className="footer-base section-shell">
        <p>© 2026 Sofound Travel Group. All rights reserved.</p>
        <nav aria-label="Legal">
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/booking-policy">Booking policy</Link>
          <Link href="#contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
