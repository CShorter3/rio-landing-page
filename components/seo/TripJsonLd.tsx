import { journeyList, tripData } from "@/lib/trip-data";

const isHttpsUrl = (value: string) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

export function TripJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const primaryImage = siteUrl
    ? new URL(tripData.assets.heroDesktop, siteUrl).toString()
    : undefined;

  const offers = journeyList.map((journey) => ({
    "@type": "Offer",
    name: journey.name,
    price: journey.total,
    priceCurrency: "USD",
    ...(isHttpsUrl(journey.bookingUrl) ? { url: journey.bookingUrl } : {}),
  }));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        name: tripData.title,
        description: tripData.introduction,
        touristType: "Small-group travelers",
        itinerary: tripData.location,
        provider: {
          "@type": "Organization",
          name: tripData.organizer.name,
        },
        ...(primaryImage ? { image: primaryImage } : {}),
      },
      {
        "@type": "Event",
        name: tripData.title,
        startDate: tripData.dateRange.start,
        endDate: tripData.dateRange.end,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: tripData.location,
          address: { "@type": "PostalAddress", addressCountry: "BR" },
        },
        organizer: {
          "@type": "Organization",
          name: tripData.organizer.name,
        },
        offers,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
