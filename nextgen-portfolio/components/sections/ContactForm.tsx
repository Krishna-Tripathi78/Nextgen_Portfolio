"use client";

import { useState, useTransition } from "react";
import { submitContactForm } from "@/app/actions/submit-contact-form";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    startTransition(async () => {
      const result = await submitContactForm(formData);

      if (result.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        // Reset the form
        (e.target as HTMLFormElement).reset();
        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus({ type: null, message: "" });
        }, 5000);
      } else {
        setStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
      }
    });
  };

  return (
    <div className="@container/form group relative bg-card border border-border hover:border-purple-500/30 rounded-xl p-6 hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] transition-all duration-300 overflow-hidden">
      {/* Top gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Shimmer on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.04),transparent_60%)]" />
      
      <div className="relative z-10">
        <h3 className="text-2xl font-semibold mb-6 group-hover:text-purple-400 transition-colors">
          Send a Message
        </h3>

      {status.type && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm relative z-10 ${status.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-500/20"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-500/20"
            }`}
        >
          {status.message}
        </div>
      )}

      <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-base hover:border-purple-500/30"
            placeholder="Your name"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-base hover:border-purple-500/30"
            placeholder="your.email@example.com"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium mb-2"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-base hover:border-purple-500/30"
            placeholder="What's this about?"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 resize-none transition-all text-base hover:border-purple-500/30"
            placeholder="Tell me about your project..."
            required
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-[0_4px_20px_rgba(168,85,247,0.4)] transform hover:scale-[1.02]"
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
      </div>
    </div>
  );
}