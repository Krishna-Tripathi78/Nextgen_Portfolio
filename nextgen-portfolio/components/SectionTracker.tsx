"use client";

import { useEffect, useRef } from "react";
import { useAnalytics } from "@/hooks/use-analytics";

interface SectionTrackerProps {
  sectionId: string;
  children: React.ReactNode;
}

export function SectionTracker({ sectionId, children }: SectionTrackerProps) {
  const { trackSection } = useAnalytics();
  const hasTracked = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            trackSection(sectionId);
            hasTracked.current = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionId, trackSection]);

  return <div ref={sectionRef}>{children}</div>;
}
