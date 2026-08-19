import type { JourneyId, JourneyPackage, TripData } from "@/types/trip";

const rioBookingUrl =
  process.env.NEXT_PUBLIC_RIO_BOOKING_URL ?? "TODO_RIO_BOOKING_URL";
const completeBookingUrl =
  process.env.NEXT_PUBLIC_COMPLETE_BOOKING_URL ??
  "TODO_COMPLETE_BOOKING_URL";

const packages: Record<JourneyId, JourneyPackage> = {
  "rio-core": {
    id: "rio-core",
    name: "Rio Core",
    shortName: "Rio Core",
    dates: "November 12–17, 2026",
    startDate: "2026-11-12",
    endDate: "2026-11-17",
    nights: 5,
    total: 1995,
    deposit: 295,
    installmentCount: 4,
    installmentAmount: 425,
    capacity: "Up to 12 travelers",
    positioning:
      "The complete five-night Sofound experience: coastline, nature, locally rooted culture, shared meals, optional nightlife, reflection, and an overnight escape to Arraial do Cabo.",
    includedSummary: [
      "Five nights of shared accommodation",
      "Official itinerary transportation",
      "Confirmed Rio and Arraial experiences",
      "Selected meals and founder-hosted support",
    ],
    bookingUrl: rioBookingUrl,
  },
  "complete-journey": {
    id: "complete-journey",
    name: "The Complete Journey: Rio + Bahia",
    shortName: "Complete Journey",
    dates: "November 12–21, 2026",
    startDate: "2026-11-12",
    endDate: "2026-11-21",
    nights: 9,
    total: 2995,
    deposit: 495,
    installmentCount: 5,
    installmentAmount: 500,
    capacity: "Up to 6 travelers continue to Bahia",
    positioning:
      "Everything in Rio Core, followed by four additional nights in Salvador, an included Rio-to-Salvador flight, one included massage, and a more intimate continuation.",
    includedSummary: [
      "Everything included in Rio Core",
      "Included flight from Rio to Salvador",
      "Four shared nights in Salvador",
      "One massage and a smaller founder-hosted group",
    ],
    bookingUrl: completeBookingUrl,
  },
};

export const journeyIds = Object.keys(packages) as JourneyId[];
export const journeyList = journeyIds.map((id) => packages[id]);

export const formatUsd = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const exclusionCopy = {
  flights: "Flights to or from Brazil",
  meals: "Meals not expressly listed as included",
  freeTimeTransport:
    "Transportation during free time or outside the official group itinerary",
  missedTransfer:
    "A replacement ride if the scheduled arrival transfer is missed",
  nightlife: "Nightlife admission, drinks, and personal purchases",
  travelerDocuments:
    "Travel insurance and passport, visa, or other personal travel-document costs",
  unlistedActivities: "Any activity fee not expressly listed above",
};

const exclusions = Object.values(exclusionCopy);

const planningSummary = [
  {
    label: "International flights",
    status: "Not included",
    description: exclusionCopy.flights,
  },
  {
    label: "Other meals",
    status: "Not included",
    description: exclusionCopy.meals,
  },
  {
    label: "Free-time transportation",
    status: "Not included",
    description: exclusionCopy.freeTimeTransport,
  },
  {
    label: "Nightlife + personal choices",
    status: "Not included",
    description: exclusionCopy.nightlife,
  },
];

export const tripData: TripData = {
  title: "Sofound Brazil Journey",
  location: "Rio de Janeiro + Salvador, Brazil",
  eyebrow: "Rio de Janeiro · November 12–17, 2026",
  headline: "When was the last time you felt completely alive?",
  introduction:
    "Most people don’t need another vacation—they need an experience that reminds them how big the world is, how meaningful genuine connection can be, and who they’re capable of becoming.",
  dateRange: {
    start: "2026-11-12",
    end: "2026-11-21",
    display: "November 12–21, 2026",
  },
  // TODO: Replace with live inventory from the booking system before launch.
  bookingStatus: "tbd",
  packages,
  itinerary: [
    {
      day: 1,
      date: "Thursday, November 12",
      title: "Arrival & welcome",
      preview: "Settle into the Sofound House, meet the group, and share a first Rio sunset.",
      timeline: [
        { time: "7–10am", text: "Recommended arrival window" },
        {
          time: "12pm",
          text: "Complimentary group airport transfer",
          label: "Included",
        },
        {
          time: "Afternoon",
          text: "Settle into the Sofound House and meet the group",
        },
        {
          time: "Sunset",
          text: "Arpoador welcome at the water’s edge",
          label: "Included",
        },
        { time: "Evening", text: "Dinner and a soft landing into Rio" },
      ],
    },
    {
      day: 2,
      date: "Friday, November 13",
      title: "First light to late night",
      preview: "Dois Irmãos, Leblon, a private-chef brunch, Little Africa, and an optional night out.",
      timeline: [
        {
          time: "Before sunrise",
          text: "Vidigal motorcycle transfers and guided Dois Irmãos hike",
          label: "Included",
        },
        {
          time: "Morning",
          text: "Leblon Beach followed by a private-chef brunch",
          label: "Included",
        },
        {
          time: "Afternoon",
          text: "Reset at the house, then a locally led Little Africa experience",
          label: "Included",
        },
        { time: "Evening", text: "Group dinner", label: "Included" },
        {
          time: "Late",
          text: "Music and dancing in Rio",
          label: "Optional",
        },
      ],
    },
    {
      day: 3,
      date: "Saturday, November 14",
      title: "Choose your morning",
      preview: "A restorative or cultural morning, then Tijuca, Christ the Redeemer, and optional nightlife.",
      timeline: [
        {
          time: "Morning",
          text: "Choose a restorative morning at the house or a locally led neighborhood experience",
        },
        {
          time: "Afternoon",
          text: "Tijuca, forest and waterfalls, then Christ the Redeemer",
          label: "Included",
        },
        {
          time: "Evening",
          text: "A second night of music and celebration",
          label: "Optional",
        },
        {
          time: "Return",
          text: "Choose between two escorted return-time options",
        },
      ],
    },
    {
      day: 4,
      date: "Sunday, November 15",
      title: "Trade the city for the coast",
      preview: "An overnight escape to Arraial do Cabo for water, beaches, and open-air connection.",
      timeline: [
        {
          time: "Morning",
          text: "Group departure from Rio to Arraial do Cabo",
          label: "Included",
        },
        {
          time: "Daytime",
          text: "Water, swimming, beach landings, music, and open-air connection",
          label: "Included",
        },
        {
          time: "Evening",
          text: "Dinner and a slower coastal night near the sea",
        },
        {
          time: "Overnight",
          text: "Shared stay in Arraial do Cabo",
          label: "Included",
        },
      ],
    },
    {
      day: 5,
      date: "Monday, November 16",
      title: "Return, reset + celebrate",
      preview: "A slow coastal morning, free time in Rio, and the final Crossroads Gather.",
      timeline: [
        {
          time: "Morning",
          text: "Breakfast, swimming, journaling, or sleep by the coast",
        },
        {
          time: "Midday",
          text: "Group return to Rio",
          label: "Included",
        },
        {
          time: "Afternoon",
          text: "Beach, exploring, shopping, or rest",
          label: "Free time",
        },
        {
          time: "Evening",
          text: "Formal farewell dinner and the final Crossroads Gather",
        },
      ],
    },
    {
      day: 6,
      date: "Tuesday, November 17",
      title: "Return home—or continue deeper",
      preview: "Rio Core travelers depart while the smaller Complete Journey group flies to Salvador.",
      timeline: [
        {
          time: "Departure",
          text: "Scheduled Rio airport transfer for Rio Core travelers",
          label: "Included",
        },
        {
          time: "Travel day",
          text: "Rio-to-Salvador flight for Complete Journey travelers",
          label: "Included",
        },
        {
          time: "On arrival",
          text: "Settle into Salvador as the group becomes smaller and the pace becomes slower",
        },
      ],
    },
  ],
  inclusionSummary: [
    {
      icon: "home",
      title: "Shared stays",
      description:
        "Five nights across the Sofound House in Rio and an overnight in Arraial do Cabo.",
    },
    {
      icon: "route",
      title: "Official trip transport",
      description:
        "Scheduled group transportation for the official Rio itinerary, including airport and Arraial transfers.",
    },
    {
      icon: "sun",
      title: "Signature experiences",
      description:
        "Dois Irmãos, Little Africa, Tijuca and Christ the Redeemer, plus the Arraial water and beach day.",
    },
    {
      icon: "meal",
      title: "Selected meals",
      description:
        "A private-chef brunch and the group dinner on the Little Africa day.",
    },
    {
      icon: "host",
      title: "Founder-hosted support",
      description:
        "Preparation, arrival guidance, daily support, roommate coordination, and a post-trip reunion.",
    },
    {
      icon: "journal",
      title: "Reflection + connection",
      description:
        "Daily Gathers and a Sofound journal for private writing and guided prompts.",
    },
  ],
  inclusionGroups: [
    {
      scope: "rio-core",
      title: "Five nights of shared accommodation",
      items: [
        "Shared Sofound House accommodations in Rio",
        "One shared overnight stay in Arraial do Cabo",
        "Roommate-preference coordination before departure",
      ],
    },
    {
      scope: "rio-core",
      title: "Scheduled group transportation",
      items: [
        "One complimentary airport pickup departing at noon on November 12",
        "Group transportation for the official itinerary",
        "Round-trip transportation between Rio and Arraial do Cabo",
        "Vidigal motorcycle transfers for the Dois Irmãos experience",
        "Two escorted return-time options from each optional nightlife outing",
        "Scheduled airport transfer on November 17",
      ],
    },
    {
      scope: "rio-core",
      title: "Included experiences + meals",
      items: [
        "Locally led Little Africa cultural and heritage experience",
        "Tijuca and Christ the Redeemer experience",
        "Arraial do Cabo water and beach experience",
        "Dois Irmãos sunrise hike experience, including Vidigal motorcycle transfers",
        "Private-chef brunch following the Dois Irmãos morning",
        "Group dinner on the Little Africa day",
      ],
    },
    {
      scope: "rio-core",
      title: "The Sofound experience",
      items: [
        "Founder-hosted support throughout the journey",
        "Daily Gathers for connection and reflection",
        "A Sofound journal with space for free writing and guided prompts",
        "Pre-trip preparation and arrival guidance",
        "Post-trip reunion call",
      ],
    },
    {
      scope: "complete-journey",
      title: "Complete Journey also includes",
      items: [
        "Flight from Rio de Janeiro to Salvador",
        "Four additional nights of shared accommodation in Salvador",
        "One included massage during the Bahia stay",
        "A smaller continuation group of up to six travelers",
      ],
    },
  ],
  exclusions,
  planningSummary,
  host: {
    name: "Calid",
    role: "Founder and your host, Sofound Travel Group",
    journeyLength: "More than 18 months traveling independently",
    journeyReach: "22 countries, including 17 African countries",
    quote:
      "I’ll host the journey. Local people will lead you into the place.",
    paragraphs: [
      "I’ve spent more than 2 years traveling independently through 22 countries—including 14 months backpacking across 17 African countries.",
      "The landscapes mattered. The freedom mattered. But the most fulfilling moments usually came down to people and access: the invitation I could not have booked, the stranger who became a guide, the meal that became a lesson, and the version of myself I met far from routine.",
      "I created Sofound to preserve the freedom of independent travel while making more room for what can be difficult to find alone: a community that has your back, the confidence to try what once felt out of reach, cultural access shaped by local people, room to exhale, and space to reflect. This Brazil journey brings that idea to life through locally led experiences, shared adventure, and thoughtful support—with me present from preparation through return.",
    ],
  },
  organizer: {
    name: "Sofound Travel Group",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "TODO_CONTACT_EMAIL",
  },
  policies: {
    deposit:
      "Deposits are nonrefundable and applied toward the selected trip total.",
    payment:
      "The deposit is paid by card through Stripe. Remaining scheduled installments are automatic ACH bank withdrawals only after separate authorization.",
    cancellation:
      "Complete payment deadlines, cancellation terms, and any available credit provisions must be reviewed before payment. Final public terms are a pre-launch TODO.",
    insurance:
      "Travel insurance is not included in the trip price and should be planned for separately.",
    travelerResponsibility:
      "Travelers are responsible for valid passports and any visa or entry requirements that apply to them.",
    itineraryChanges:
      "Timing, order, venues, and individual activities may adjust because of weather, local conditions, safety, or operator availability. Sofound will communicate material updates before departure.",
  },
  faqGroups: [
    {
      title: "Group Fit & Vibe",
      items: [
        {
          question: "Can I join if I am traveling solo?",
          answer: [
            "Yes. Sofound is designed for both solo travelers and people arriving with a friend or partner. The shared experience begins before departure through preparation, roommate coordination, and group communication.",
          ],
        },
        {
          question: "How active is the journey?",
          answer: [
            "This is a social and active itinerary with early mornings, walking, a sunrise hike, nature experiences, time on the water, and late-night options. Recovery time is built into the flow, and one morning offers a choice between a restorative track and a culture track.",
            "Travelers should review the itinerary carefully and communicate relevant accessibility or mobility needs before booking.",
          ],
        },
        {
          question: "Do I have to participate in nightlife?",
          answer: [
            "No. Both planned Rio nightlife outings are optional. Travelers who join will have two escorted return-time options. Nightlife admission, drinks, and personal purchases are not included.",
          ],
        },
        {
          question: "What are the Daily Gathers?",
          answer: [
            "Daily Gathers are part of the core Sofound experience. At some point each day, the group comes together to check in, journal, reflect, or reconnect.",
            "You will never be required to read from your journal or share something personal. Private writing and personal sharing are always optional.",
          ],
        },
      ],
    },
    {
      title: "Safety & Local Support",
      items: [
        {
          question: "What support is available during the journey?",
          answer: [
            "Calid hosts the journey from preparation through return. The official itinerary includes scheduled group transportation, locally led experiences where listed, and two escorted return-time options for each optional nightlife outing.",
            "Sofound will share pre-trip guidance and material itinerary updates, but travelers remain responsible for personal decisions, documents, insurance, and transportation outside the official itinerary.",
          ],
        },
        {
          question: "Can you support dietary or accessibility needs?",
          answer: [
            "Tell us about dietary, mobility, or accessibility needs before booking. We’ll review them against the accommodations and itinerary and explain what can reasonably be supported before you commit.",
          ],
        },
        {
          question: "Can the itinerary change?",
          answer: [
            "Yes. Timing, order, venues, and individual activities may adjust because of weather, local conditions, safety, or operator availability. Sofound will communicate material updates before departure.",
          ],
        },
      ],
    },
    {
      title: "Roommates & Lodging",
      items: [
        {
          question: "How does rooming work?",
          answer: [
            "If you are traveling with a friend or partner, tell us during booking and we will prioritize placing you together.",
            "For solo travelers, Calid coordinates preferences using the information travelers provide, including gender preference, quiet or social room style, and cleanliness and tidiness habits.",
            "Preferences support more thoughtful placements but do not guarantee a particular roommate, private room, bed type, bathroom arrangement, or exact room configuration.",
          ],
        },
        {
          question: "What is confirmed about the Sofound House?",
          answer: [
            "Rio Core includes shared Sofound House accommodation in Rio and roommate-preference coordination before departure.",
            "The final property, bedroom, bed, and bathroom configuration will be shared once confirmed. House photography on this page is illustrative until those details are finalized.",
          ],
        },
      ],
    },
    {
      title: "Deposit & Payment Plans",
      items: [
        {
          question: "Are payment plans available?",
          answer: [
            "Yes. Rio Core requires a $295 deposit followed by four $425 installments. The Complete Journey requires a $495 deposit followed by five $500 installments.",
            "The deposit is paid by card through Stripe. Remaining scheduled installments are automatic ACH bank withdrawals only after your separate authorization. Deposits are nonrefundable, and the complete payment schedule and booking terms will be shown before payment.",
          ],
        },
        {
          question: "How does the reservation process work?",
          answer: [
            "Choose Rio Core or the Complete Journey in the reservation window, then continue to the booking-review step. Before paying, you’ll see the selected journey, total trip price, deposit, complete installment schedule, booking terms, and payment authorization details.",
            "Your reservation is complete only after the required deposit has been successfully paid through Stripe.",
          ],
        },
        {
          question: "What does the deposit cover?",
          answer: [
            "Your deposit secures your place and is applied toward your total trip cost. Your remaining balance and payment timing are reviewed before checkout.",
          ],
        },
      ],
    },
    {
      title: "Cancellation & Travel Prep",
      items: [
        {
          question: "What is the cancellation policy?",
          answer: [
            "Deposits are nonrefundable and applied toward the selected trip total.",
            "Complete payment deadlines, cancellation terms, and any available credit provisions are still being finalized and must be presented for review before payment. Do not complete a booking until you have reviewed and accepted the final terms.",
          ],
        },
        {
          question: "Are flights included?",
          answer: [
            "Flights to and from Brazil are not included.",
            "For Complete Journey travelers, the flight from Rio de Janeiro to Salvador is included.",
          ],
        },
        {
          question: "What happens if I miss the arrival transfer?",
          answer: [
            "The complimentary group airport transfer departs at noon on November 12. Travelers who miss it will need to arrange and pay for their own transportation to the Sofound House.",
          ],
        },
        {
          question: "What travel documents will I need?",
          answer: [
            "Travelers are responsible for valid passports and any visa or entry requirements that apply to them. Sofound will share general planning guidance, but travelers should verify current requirements before departure.",
          ],
        },
        {
          question: "How will I prepare for the trip?",
          answer: [
            "Calid will provide clear pre-trip and arrival guidance by email and/or text, along with roommate-preference coordination and important trip updates.",
          ],
        },
      ],
    },
    {
      title: "Rio Core vs. Salvador Extension",
      items: [
        {
          question: "Is Rio Core a complete trip on its own?",
          answer: [
            "Yes. Rio Core is the complete five-night Sofound journey, with shared accommodation, official itinerary transportation, confirmed Rio and Arraial experiences, selected meals, Daily Gathers, and founder-hosted support.",
            "You do not need to continue to Salvador to receive the core Sofound experience.",
          ],
        },
        {
          question: "What is confirmed about the Bahia continuation?",
          answer: [
            "The Complete Journey includes everything in Rio Core, the flight from Rio to Salvador, four additional nights of shared accommodation, one included massage, founder-hosted support, and a continuation group of up to six travelers.",
            "The cultural program is still being developed with local context in mind. Exact activities, hosts, venues, and any Black Consciousness Day programming will be shared once confirmed.",
          ],
        },
        {
          question: "How should I choose between the two journeys?",
          answer: [
            "Choose Rio Core if you want the complete five-night experience of culture, coastline, nature, shared meals, optional nightlife, and community.",
            "Choose the Complete Journey only if you also want four slower, more intimate nights in Salvador with a smaller continuation group. Rio gives you the momentum; Bahia gives you the depth.",
          ],
        },
      ],
    },
  ],
  assets: {
    heroDesktop: "/images/sofound-hero-desktop.webp",
    heroMobile: "/images/sofound-hero-mobile.webp",
    hostOverlook: "/images/calid-overlook.webp",
    hostConnection: "/images/calid-connection.webp",
    hostCommunity: "/images/calid-community.webp",
  },
};
