"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  variant?:
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "zoom"
    | "blur";
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  variant = "fade-up",
  className = "",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const variants = {
    "fade-up": {
      hidden: { opacity: 0, transform: "translateY(60px)" },
      visible: { opacity: 1, transform: "translateY(0)" },
    },
    "fade-down": {
      hidden: { opacity: 0, transform: "translateY(-60px)" },
      visible: { opacity: 1, transform: "translateY(0)" },
    },
    "fade-left": {
      hidden: { opacity: 0, transform: "translateX(60px)" },
      visible: { opacity: 1, transform: "translateX(0)" },
    },
    "fade-right": {
      hidden: { opacity: 0, transform: "translateX(-60px)" },
      visible: { opacity: 1, transform: "translateX(0)" },
    },
    zoom: {
      hidden: { opacity: 0, transform: "scale(0.8)" },
      visible: { opacity: 1, transform: "scale(1)" },
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
  };

  const style = isVisible
    ? variants[variant].visible
    : variants[variant].hidden;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
