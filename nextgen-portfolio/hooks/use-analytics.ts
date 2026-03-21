"use client";

import { useEffect, useRef } from "react";

export function useAnalytics() {
  const hasTrackedVisit = useRef(false);

  useEffect(() => {
    if (!hasTrackedVisit.current) {
      trackVisit();
      trackLocation();
      hasTrackedVisit.current = true;
    }
  }, []);

  const trackVisit = async () => {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "visit" }),
      });
    } catch (error) {
      console.error("Failed to track visit:", error);
    }
  };

  const trackSection = async (section: string) => {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "section", section }),
      });
    } catch (error) {
      console.error("Failed to track section:", error);
    }
  };

  const trackLocation = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "location",
          location: {
            country: data.country_name,
            city: data.city,
            lat: data.latitude,
            lng: data.longitude,
          },
        }),
      });
    } catch (error) {
      console.error("Failed to track location:", error);
    }
  };

  return { trackSection };
}
