"use client";

import { useEffect, useState } from "react";

export function usePortfolioCompletion() {
    const [showRating, setShowRating] = useState(false);

    useEffect(() => {
        // Check if user has already rated
        const hasRated = localStorage.getItem("portfolio-rated");
        if (hasRated) return;

        // Track scroll progress
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (window.scrollY / scrollHeight) * 100;

            // Show rating when user scrolls 80% of the page
            if (scrollProgress > 80 && !hasRated) {
                setShowRating(true);
                // Remove listener after showing once
                window.removeEventListener("scroll", handleScroll);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeRating = () => {
        setShowRating(false);
        localStorage.setItem("portfolio-rated", "true");
    };

    return { showRating, closeRating };
}
