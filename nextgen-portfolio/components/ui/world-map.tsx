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
    <div className="w-full aspect-[2/1] rounded-lg relative font-sans">
      {/* Stats Overlay */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-500/30 rounded-lg px-4 py-2"
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            5+
          </div>
          <div className="text-xs text-muted-foreground">Countries</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-cyan-500/30 rounded-lg px-4 py-2"
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            24/7
          </div>
          <div className="text-xs text-muted-foreground">Available</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-green-500/30 rounded-lg px-4 py-2"
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            100%
          </div>
          <div className="text-xs text-muted-foreground">Remote</div>
        </motion.div>
      </div>

      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
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
                strokeWidth="2"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.5 * i,
                  ease: "easeOut",
                }}
                style={{
                  filter: "drop-shadow(0 0 6px rgba(139, 92, 246, 0.6))",
                }}
              />
              {/* Animated Particle */}
              <motion.circle
                r="3"
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
                  filter: "drop-shadow(0 0 4px rgba(236, 72, 153, 0.8))",
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
                r="3"
                fill="url(#dot-gradient)"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.8))",
                }}
                className="pointer-events-auto cursor-pointer"
                onMouseEnter={() => setHoveredDot(i * 2)}
                onMouseLeave={() => setHoveredDot(null)}
              />
              {/* Pulsing ring */}
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="3"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  from="3"
                  to="12"
                  dur="2s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="2s"
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
                    <div className="bg-black/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded border border-purple-500/50 text-center">
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
                r="3"
                fill="url(#dot-gradient)"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))",
                }}
                className="pointer-events-auto cursor-pointer"
                onMouseEnter={() => setHoveredDot(i * 2 + 1)}
                onMouseLeave={() => setHoveredDot(null)}
              />
              {/* Pulsing ring */}
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="3"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  from="3"
                  to="12"
                  dur="2s"
                  begin="0.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="2s"
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
                    <div className="bg-black/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded border border-cyan-500/50 text-center">
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
