"use client";

import { useEffect, useState, useMemo } from "react";
import DottedMap from "dotted-map";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Globe, Users, Maximize2 } from "lucide-react";

interface VisitorLocation {
  country: string;
  city: string;
  count: number;
  lat: number;
  lng: number;
}

interface LiveVisitorMapProps {
  locations: VisitorLocation[];
}

export function LiveVisitorMap({ locations }: LiveVisitorMapProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Home location: New Delhi, India
  const home = { lat: 28.6139, lng: 77.209, label: "Home" };

  useEffect(() => {
    setMounted(true);
  }, []);

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const mapSvg = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: theme === "dark" ? "#FFFFFF20" : "#00000020",
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, [theme]);

  if (!mounted) return null;

  const homePoint = projectPoint(home.lat, home.lng);

  return (
    <div className="relative w-full bg-card/50 border border-border rounded-2xl overflow-hidden backdrop-blur-sm group">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
            <Globe className="w-5 h-5 text-purple-500 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Global Reach</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
              Live Visitor Tracking
            </p>
          </div>
        </div>
        <div className="px-4 py-2 bg-background/50 backdrop-blur-md rounded-lg border border-border flex items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span>{locations.length} Locations</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="w-full aspect-[2/1] relative p-4">
        {/* Background Map SVG */}
        <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
           <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(mapSvg)}`}
            className="w-full h-full object-contain select-none pointer-events-none"
            alt="world map base"
          />
        </div>

        {/* Dynamic Overlay */}
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full relative z-10 select-none pointer-events-none"
        >
          <defs>
            <radialGradient id="visitor-gradient">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection Lines from Home */}
          <AnimatePresence>
            {locations.map((loc, i) => {
              const visitorPoint = projectPoint(loc.lat, loc.lng);
              const midX = (homePoint.x + visitorPoint.x) / 2;
              const midY = Math.min(homePoint.y, visitorPoint.y) - 30;
              const path = `M ${homePoint.x} ${homePoint.y} Q ${midX} ${midY} ${visitorPoint.x} ${visitorPoint.y}`;

              return (
                <motion.path
                  key={`path-${loc.country}-${loc.city}-${i}`}
                  d={path}
                  fill="none"
                  stroke="url(#visitor-gradient)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 2, delay: i * 0.1, ease: "easeInOut" }}
                />
              );
            })}
          </AnimatePresence>

          {/* Home Pointer */}
          <g filter="url(#glow)">
            <circle
              cx={homePoint.x}
              cy={homePoint.y}
              r="4"
              fill="#8b5cf6"
              className="animate-pulse"
            />
            <circle
              cx={homePoint.x}
              cy={homePoint.y}
              r="4"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="1"
            >
              <animate
                attributeName="r"
                from="4"
                to="12"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="1"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Visitor Dots */}
          <AnimatePresence>
            {locations.map((loc, i) => {
              const p = projectPoint(loc.lat, loc.lng);
              return (
                <g key={`visitor-${loc.country}-${loc.city}-${i}`} filter="url(#glow)">
                  <motion.circle
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    cx={p.x}
                    cy={p.y}
                    r="3.5"
                    fill="#ec4899"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="3"
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="1"
                  >
                    <animate
                      attributeName="r"
                      from="3"
                      to="14"
                      dur="3s"
                      begin={`${i * 0.2}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.8"
                      to="0"
                      dur="3s"
                      begin={`${i * 0.2}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}
          </AnimatePresence>
        </svg>
      </div>

      {/* Footer Info */}
      <div className="px-6 pb-6 pt-0 flex flex-wrap gap-4 items-center justify-between text-xs text-muted-foreground">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
            <span>Home Base (IN)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
            <span>Live Visitor</span>
          </div>
        </div>
        <div className="italic">
          *Dots represent approximate locations based on IPv4 data
        </div>
      </div>

      {/* Background Decorative Gradient */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/20 transition-all duration-700" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-pink-500/20 transition-all duration-700" />
    </div>
  );
}
