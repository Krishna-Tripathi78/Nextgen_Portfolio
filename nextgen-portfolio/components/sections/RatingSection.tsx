"use client";

import { useState, useEffect } from "react";
import { IconStar, IconX } from "@tabler/icons-react";

interface RatingFormProps {
  isVisible: boolean;
  onClose: () => void;
}

export function RatingSection({ isVisible, onClose }: RatingFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    
    // Simulate API call - replace with actual submission logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Auto close after 3 seconds
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setRating(0);
      setFeedback("");
    }, 3000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-zinc-900 border border-yellow-600/30 rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md relative mx-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-zinc-400 hover:text-white transition-colors p-1"
        >
          <IconX className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="text-center pr-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                Rate My Portfolio
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm">
                Your feedback helps me improve!
              </p>
            </div>

            <div className="flex justify-center space-x-1 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110 touch-manipulation"
                >
                  <IconStar
                    className={`w-6 h-6 sm:w-8 sm:h-8 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-zinc-600"
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Any feedback or suggestions? (optional)"
              className="w-full p-2 sm:p-3 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-400 resize-none h-16 sm:h-20 text-xs sm:text-sm"
            />

            <button
              type="submit"
              disabled={rating === 0 || isSubmitting}
              className="w-full py-2 sm:py-3 bg-yellow-600 hover:bg-yellow-500 disabled:bg-zinc-700 disabled:text-zinc-400 text-zinc-900 font-semibold rounded-md transition-colors text-sm sm:text-base"
            >
              {isSubmitting ? "Submitting..." : "Submit Rating"}
            </button>
          </form>
        ) : (
          <div className="text-center py-4 sm:py-8">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎉</div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
              Thank You!
            </h3>
            <p className="text-zinc-400 text-sm">
              Your feedback has been submitted successfully.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}