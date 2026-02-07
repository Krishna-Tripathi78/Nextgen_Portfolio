"use client";
import { useRef, useEffect } from "react";
import { useTheme } from "../ThemeProvider";

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Check if device has touch support (mobile)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.1;
      cursorY += dy * 0.1;
      
      const dotDx = mouseX - dotX;
      const dotDy = mouseY - dotY;
      dotX += dotDx * 0.3;
      dotY += dotDy * 0.3;

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
      
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const isDark = theme === "dark";

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`fixed top-0 left-0 w-8 h-8 border-2 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block ${
          isDark ? "border-purple-500/50" : "border-purple-600/60"
        }`} 
      />
      <div 
        ref={cursorDotRef} 
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block ${
          isDark ? "bg-pink-500" : "bg-purple-600"
        }`} 
      />
    </>
  );
}
