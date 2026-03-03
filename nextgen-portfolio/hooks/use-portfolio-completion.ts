"use client";

import { useEffect, useState } from "react";

export function usePortfolioCompletion() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      // Consider portfolio "completed" when user scrolls 85% through
      if (scrollPercent >= 85 && !isCompleted) {
        setIsCompleted(true);

        // Show rating form after 2 seconds delay
        timeoutId = setTimeout(() => {
          const hasRated = localStorage.getItem("portfolio-rated");
          if (!hasRated) {
            setShowRating(true);
          }
        }, 2000);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isCompleted]);

  const closeRating = () => {
    setShowRating(false);
    localStorage.setItem("portfolio-rated", "true");
  };

  return { showRating, closeRating };
}
