export type JourneyId = "rio-core" | "complete-journey";

export type BookingStatus =
  | "accepting-reservations"
  | "waitlist"
  | "closed"
  | "tbd";

export type ItineraryLabel = "Included" | "Optional" | "Free time";

export type ItineraryTimelineItem = {
  time: string;
  text: string;
  label?: ItineraryLabel;
};

export type ItineraryDay = {
  day: number;
  date: string;
  title: string;
  preview: string;
  timeline: ItineraryTimelineItem[];
};

export type JourneyPackage = {
  id: JourneyId;
  name: string;
  shortName: string;
  dates: string;
  startDate: string;
  endDate: string;
  nights: number;
  total: number;
  deposit: number;
  installmentCount: number;
  installmentAmount: number;
  capacity: string;
  positioning: string;
  includedSummary: string[];
  bookingUrl: string;
};

export type InclusionGroup = {
  scope: "rio-core" | "complete-journey";
  title: string;
  items: string[];
};

export type PlanningItem = {
  label: string;
  status: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string[];
};

export type FaqGroup = {
  title: string;
  items: FaqItem[];
};

export type TripData = {
  title: string;
  location: string;
  eyebrow: string;
  headline: string;
  introduction: string;
  dateRange: { start: string; end: string; display: string };
  bookingStatus: BookingStatus;
  packages: Record<JourneyId, JourneyPackage>;
  itinerary: ItineraryDay[];
  inclusionSummary: Array<{
    icon: "home" | "route" | "sun" | "meal" | "host" | "journal";
    title: string;
    description: string;
  }>;
  inclusionGroups: InclusionGroup[];
  exclusions: string[];
  planningSummary: PlanningItem[];
  host: {
    name: string;
    role: string;
    journeyLength: string;
    journeyReach: string;
    quote: string;
    paragraphs: string[];
  };
  organizer: { name: string; email: string };
  policies: {
    deposit: string;
    payment: string;
    cancellation: string;
    insurance: string;
    travelerResponsibility: string;
    itineraryChanges: string;
  };
  faqGroups: FaqGroup[];
  assets: {
    heroDesktop: string;
    heroMobile: string;
    hostOverlook: string;
    hostConnection: string;
    hostCommunity: string;
  };
};
