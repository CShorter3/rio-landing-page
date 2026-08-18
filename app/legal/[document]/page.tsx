import Link from "next/link";
import { notFound } from "next/navigation";

import { Wordmark } from "@/components/layout/SiteHeader";

const documents = {
  terms: {
    title: "Terms",
    note: "Final website and trip terms have not yet been supplied or legally approved.",
  },
  privacy: {
    title: "Privacy",
    note: "The final privacy notice must be added after analytics, waitlist, and payment providers are confirmed.",
  },
  "booking-policy": {
    title: "Booking policy",
    note: "Final cancellation terms, payment dates, credit provisions, and late-booking rules must be legally reviewed before deposits open.",
  },
} as const;

type DocumentKey = keyof typeof documents;

export function generateStaticParams() {
  return Object.keys(documents).map((document) => ({ document }));
}

export default async function LegalDocumentPage({
  params,
}: {
  params: Promise<{ document: string }>;
}) {
  const { document } = await params;
  if (!(document in documents)) notFound();
  const content = documents[document as DocumentKey];

  return (
    <main className="legal-page" id="main-content">
      <nav className="booking-review-nav" aria-label="Legal page navigation">
        <Link href="/" aria-label="Return to Sofound Brazil journey">
          <Wordmark light />
        </Link>
        <Link href="/">Return to the journey</Link>
      </nav>
      <section className="legal-shell">
        <p className="kicker kicker-light">Pre-launch document</p>
        <h1>{content.title}</h1>
        <p>{content.note}</p>
        <div className="legal-notice">
          <strong>No deposit can be processed in this prototype.</strong>
          <p>
            This working page prevents a broken footer link while keeping the
            missing legal content explicit. Replace it with approved copy before
            setting the site environment to production.
          </p>
        </div>
      </section>
    </main>
  );
}
