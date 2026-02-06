"use client";

import { RatingSection } from "@/components/sections/RatingSection";
import { usePortfolioCompletion } from "@/hooks/use-portfolio-completion";

export function RatingWrapper() {
  const { showRating, closeRating } = usePortfolioCompletion();

  return <RatingSection isVisible={showRating} onClose={closeRating} />;
}