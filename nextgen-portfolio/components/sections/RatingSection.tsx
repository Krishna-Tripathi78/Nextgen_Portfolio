"use client";

import { useState } from "react";
import { X, Star } from "lucide-react";

interface RatingSectionProps {
    isVisible: boolean;
    onClose: () => void;
}

export function RatingSection({ isVisible, onClose }: RatingSectionProps) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    if (!isVisible) return null;

    const handleSubmit = () => {
        if (rating > 0) {
            setSubmitted(true);
            setTimeout(() => {
                onClose();
            }, 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in slide-in-from-bottom-4 duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                {!submitted ? (
                    <>
                        <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                            Rate Your Experience
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            How would you rate this portfolio?
                        </p>

                        <div className="flex justify-center gap-2 mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className="p-2 transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`w-10 h-10 transition-colors ${star <= (hoveredRating || rating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-slate-300 dark:text-slate-600"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={rating === 0}
                            className="w-full py-3 px-6 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Submit Rating
                        </button>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="mb-4 text-6xl">🎉</div>
                        <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                            Thank You!
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Your feedback has been recorded.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
