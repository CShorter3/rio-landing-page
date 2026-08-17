"use client";

import { useEffect, useRef } from "react";

import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";
import { tripData } from "@/lib/trip-data";

export function SectionViewTracker({
  eventName,
}: {
  eventName: AnalyticsEventName;
}) {
  const markerRef = useRef<HTMLSpanElement | null>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker || firedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || firedRef.current) return;
        firedRef.current = true;
        trackEvent(eventName, { tripName: tripData.title });
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(marker);
    return () => observer.disconnect();
  }, [eventName]);

  return <span ref={markerRef} aria-hidden="true" className="view-marker" />;
}
