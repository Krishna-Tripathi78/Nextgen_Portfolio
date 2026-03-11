"use client";

import DottedMap from "dotted-map";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useRef, useState } from "react";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export default function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  const { theme } = useTheme();

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#00000040",
    shape: "circle",
    backgroundColor: "transparent",
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full aspect-[2/1] rounded-xl relative font-sans overflow-hidden group">
      {/* Enhanced background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.1),transparent_70%)]" />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
      
      {/* Enhanced Stats Overlay */}
      <div className="absolute top-6 left-6 z-10 space-y-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="group/stat relative bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-xl border border-purple-500/40 rounded-xl px-5 py-3 shadow-lg hover:shadow-[0_8px_30px_rgba(168,85,247,0.3)] transition-all duration-300 hover:scale-105"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-400 opacity-70 group-hover/stat:opacity-100 transition-opacity" />
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
            5+
          </div>
          <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Countries
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="group/stat relative bg-gradient-to-r from-cyan-500/30 to-blue-500/30 backdrop-blur-xl border border-cyan-500/40 rounded-xl px-5 py-3 shadow-lg hover:shadow-[0_8px_30px_rgba(6,182,212,0.3)] transition-all duration-300 hover:scale-105"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-400 opacity-70 group-hover/stat:opacity-100 transition-opacity" />
          <div className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
            24/7
          </div>
          <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
            Available
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="group/stat relative bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-xl border border-green-500/40 rounded-xl px-5 py-3 shadow-lg hover:shadow-[0_8px_30px_rgba(34,197,94,0.3)] transition-all duration-300 hover:scale-105"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green-400 to-emerald-400 opacity-70 group-hover/stat:opacity-100 transition-opacity" />
          <div className="text-3xl font-bold bg-gradient-to-r from-green-300 via-emerald-300 to-green-400 bg-clip-text text-transparent">
            100%
          </div>
          <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
            Remote
          </div>
        </motion.div>
      </div>

      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#gradient-line-${i})"
                strokeWidth="2.5"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5 * i,
                  ease: "easeOut",
                }}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.8))",
                }}
              />
              {/* Animated Particle */}
              <motion.circle
                r="4"
                fill="url(#particle-gradient)"
                initial={{ opacity: 0 }}
                animate={{
                  offsetDistance: ["0%", "100%"],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: 0.5 * i + 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  offsetPath: `path('${createCurvedPath(startPoint, endPoint)}')`,
                  filter: "drop-shadow(0 0 6px rgba(236, 72, 153, 1))",
                }}
              />
            </g>
          );
        })}

        <defs>
          {/* Gradient lines for each path */}
          {dots.map((_, i) => (
            <linearGradient
              key={`gradient-${i}`}
              id={`gradient-line-${i}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
            </linearGradient>
          ))}
          {/* Particle gradient */}
          <radialGradient id="particle-gradient">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
          </radialGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              {/* Main dot with glow */}
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="4"
                fill="url(#dot-gradient)"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 1))",
                }}
                className="pointer-events-auto cursor-pointer transition-all hover:r-6"
                onMouseEnter={() => setHoveredDot(i * 2)}
                onMouseLeave={() => setHoveredDot(null)}
              />
              {/* Pulsing ring */}
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="4"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2.5"
                opacity="0.8"
              >
                <animate
                  attributeName="r"
                  from="4"
                  to="16"
                  dur="2.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.8"
                  to="0"
                  dur="2.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Permanent Label with Glow */}
              {dot.start.label && i === 0 && (
                <g>
                  <text
                    x={projectPoint(dot.start.lat, dot.start.lng).x}
                    y={projectPoint(dot.start.lat, dot.start.lng).y - 15}
                    textAnchor="middle"
                    className="text-xs font-bold fill-purple-300"
                    style={{
                      filter: "drop-shadow(0 0 3px rgba(139, 92, 246, 0.6))",
                      paintOrder: "stroke fill",
                      stroke: "rgba(0, 0, 0, 0.8)",
                      strokeWidth: "2px",
                    }}
                  >
                    {dot.start.label}
                  </text>
                </g>
              )}
              {/* Hover Tooltip */}
              {hoveredDot === i * 2 && dot.start.label && (
                <g>
                  <foreignObject
                    x={projectPoint(dot.start.lat, dot.start.lng).x - 50}
                    y={projectPoint(dot.start.lat, dot.start.lng).y - 40}
                    width="100"
                    height="30"
                  >
                    <div className="bg-gradient-to-r from-purple-900/95 to-pink-900/95 backdrop-blur-xl text-white text-xs px-3 py-2 rounded-lg border border-purple-400/50 text-center shadow-lg font-medium">
                      {dot.start.label}
                    </div>
                  </foreignObject>
                </g>
              )}
            </g>
            <g key={`end-${i}`}>
              {/* Main dot with glow */}
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="4"
                fill="url(#dot-gradient)"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(6, 182, 212, 1))",
                }}
                className="pointer-events-auto cursor-pointer transition-all hover:r-6"
                onMouseEnter={() => setHoveredDot(i * 2 + 1)}
                onMouseLeave={() => setHoveredDot(null)}
              />
              {/* Pulsing ring */}
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="4"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                opacity="0.8"
              >
                <animate
                  attributeName="r"
                  from="4"
                  to="16"
                  dur="2.5s"
                  begin="0.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.8"
                  to="0"
                  dur="2.5s"
                  begin="0.5s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Permanent Label with Glow */}
              {dot.end.label && (
                <g>
                  <text
                    x={projectPoint(dot.end.lat, dot.end.lng).x}
                    y={projectPoint(dot.end.lat, dot.end.lng).y - 15}
                    textAnchor="middle"
                    className="text-xs font-bold fill-cyan-300"
                    style={{
                      filter: "drop-shadow(0 0 3px rgba(6, 182, 212, 0.6))",
                      paintOrder: "stroke fill",
                      stroke: "rgba(0, 0, 0, 0.8)",
                      strokeWidth: "2px",
                    }}
                  >
                    {dot.end.label}
                  </text>
                </g>
              )}
              {/* Hover Tooltip */}
              {hoveredDot === i * 2 + 1 && dot.end.label && (
                <g>
                  <foreignObject
                    x={projectPoint(dot.end.lat, dot.end.lng).x - 50}
                    y={projectPoint(dot.end.lat, dot.end.lng).y - 40}
                    width="100"
                    height="30"
                  >
                    <div className="bg-gradient-to-r from-cyan-900/95 to-blue-900/95 backdrop-blur-xl text-white text-xs px-3 py-2 rounded-lg border border-cyan-400/50 text-center shadow-lg font-medium">
                      {dot.end.label}
                    </div>
                  </foreignObject>
                </g>
              )}
            </g>
          </g>
        ))}

        <defs>
          <radialGradient id="dot-gradient">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
