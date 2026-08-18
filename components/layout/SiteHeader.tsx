import Link from "next/link";

import { ReserveButton } from "@/components/reservation/ReserveButton";

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className={`wordmark ${light ? "wordmark-light" : ""}`}>
      S<span className="wordmark-mark">O</span>FOUND
      <small>Travel Group</small>
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="#top" aria-label="Sofound Travel Group home">
        <Wordmark light />
      </Link>
      <nav aria-label="Primary navigation" className="site-nav">
        <Link href="#journey">Journey</Link>
        <Link href="#itinerary">Itinerary</Link>
        <Link href="#pricing">Pricing</Link>
        <Link href="#faq">FAQ</Link>
      </nav>
      <ReserveButton
        className="header-reserve"
        ctaLocation="header"
        aria-label="Choose your Sofound Brazil journey"
      >
        Choose your journey
      </ReserveButton>
    </header>
  );
}
