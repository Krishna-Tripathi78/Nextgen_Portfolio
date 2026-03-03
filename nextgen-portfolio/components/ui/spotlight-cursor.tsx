"use client";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeProvider";

export function SpotlightCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const isDark = theme === "dark";
  const gradient = isDark
    ? "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)"
    : "radial-gradient(circle, rgba(147,51,234,0.12) 0%, transparent 70%)";

  return (
    <div
      className="fixed pointer-events-none z-30 hidden md:block"
      style={{
        left: position.x,
        top: position.y,
        width: "600px",
        height: "600px",
        transform: "translate(-50%, -50%)",
        background: gradient,
        transition: "left 0.1s, top 0.1s",
      }}
    />
  );
}
