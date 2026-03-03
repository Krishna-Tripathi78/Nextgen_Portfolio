"use client";

import { Rocket, Sparkles, Target, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [opacity, setOpacity] = useState(1);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [activeBadge, setActiveBadge] = useState(-1);

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2,
      })),
    [],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        if (next >= 25 && stage === 0) setStage(1);
        if (next >= 50 && stage === 1) setStage(2);
        if (next >= 75 && stage === 2) setStage(3);
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return next;
      });
    }, 30);

    // Badge lighting sequence
    const badgeTimers = [
      setTimeout(() => setActiveBadge(0), 800), // Lightning Fast
      setTimeout(() => setActiveBadge(1), 1600), // Pixel Perfect
      setTimeout(() => setActiveBadge(2), 2400), // Cutting Edge
      setTimeout(() => setActiveBadge(3), 3200), // Innovative
    ];

    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(onComplete, 500);
    }, 4000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
      badgeTimers.forEach(clearTimeout);
    };
  }, [onComplete, stage]);

  return (
    <div
      className="fixed inset-0 z-50 bg-white dark:bg-black flex items-center justify-center transition-opacity duration-500 overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(100, 100, 100, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 100, 100, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            animation: "gridMove 20s linear infinite",
          }}
        />
      </div>

      {/* Radial gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/8 dark:bg-orange-500/15 rounded-full blur-[100px]" />
      </div>

      {/* Floating particles */}
      {mounted &&
        particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-purple-400/30 dark:bg-purple-400/40 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 lg:gap-12 px-4 scale-[0.67] origin-center">
        {/* Top section - Welcome */}
        <div className="text-center space-y-3">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                WELCOME
              </span>
            </h1>
          </div>
          <p className="text-gray-600 dark:text-slate-400 text-base md:text-lg font-semibold tracking-wide">
            Crafting Digital Excellence
          </p>
        </div>

        {/* Center - 3D Logo with rings */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Rotating rings */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute inset-8 border-2 border-purple-500/30 dark:border-purple-500/30 rounded-full" />
          </div>
          <div
            className="absolute inset-0 animate-spin-reverse"
            style={{ animationDuration: "4s" }}
          >
            <div
              className="absolute inset-4 border-2 border-pink-500/30 dark:border-pink-500/30 rounded-full"
              style={{ borderStyle: "dashed" }}
            />
          </div>
          <div
            className="absolute inset-0 animate-spin-slow"
            style={{ animationDuration: "6s" }}
          >
            <div className="absolute inset-12 border border-orange-500/30 dark:border-orange-500/30 rounded-full" />
          </div>

          {/* Center logo */}
          <div className="relative animate-float">
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-xl">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-white/20 animate-shimmer"
                  style={{ transform: "translateX(-100%) rotate(45deg)" }}
                />
              </div>
              <span className="relative text-7xl font-black text-white z-10">
                K
              </span>
            </div>

            {/* Orbiting dots */}
            {[0, 120, 240].map((_angle, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-4 h-4 -ml-2 -mt-2"
                style={{
                  animation: `orbit 3s linear infinite`,
                  animationDelay: `${i * 1}s`,
                }}
              >
                <div
                  className={`w-4 h-4 rounded-full ${
                    i === 0
                      ? "bg-purple-500"
                      : i === 1
                        ? "bg-pink-500"
                        : "bg-orange-500"
                  } shadow-lg`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Progress section */}
        <div className="w-full max-w-md space-y-6">
          {/* Progress bar */}
          <div className="relative">
            <div className="h-1.5 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-shimmer" />
              </div>
            </div>
            <div className="flex justify-between mt-3 text-xs">
              <span className="text-gray-600 dark:text-slate-400 font-semibold">
                {
                  ["Initializing", "Loading Assets", "Preparing UI", "Ready"][
                    stage
                  ]
                }
              </span>
              <span className="text-gray-500 dark:text-slate-500 font-mono tabular-nums">
                {progress}%
              </span>
            </div>
          </div>

          {/* Status indicators */}
          <div className="flex justify-center gap-8">
            {["Initialize", "Load", "Prepare", "Complete"].map((label, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    stage > i
                      ? "bg-green-500 shadow-md shadow-green-500/30"
                      : stage === i
                        ? "bg-purple-500 animate-pulse shadow-md shadow-purple-500/30"
                        : "bg-gray-300 dark:bg-slate-700"
                  }`}
                />
                <span
                  className={`text-xs font-semibold transition-colors ${
                    stage >= i
                      ? "text-gray-700 dark:text-slate-300"
                      : "text-gray-400 dark:text-slate-600"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom badges with sequential lighting */}
        <div className="flex items-center gap-6">
          {[
            {
              icon: Zap,
              label: "LIGHTNING FAST",
              color: "from-cyan-500 to-blue-500",
            },
            {
              icon: Target,
              label: "PIXEL PERFECT",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: Rocket,
              label: "CUTTING EDGE",
              color: "from-pink-500 to-orange-500",
            },
            {
              icon: Sparkles,
              label: "INNOVATIVE",
              color: "from-teal-500 to-green-500",
            },
          ].map((badge, i) => {
            const isActive = activeBadge >= i;
            const isCurrent = activeBadge === i;
            const IconComponent = badge.icon;

            return (
              <div
                key={i}
                className={`flex flex-col items-center gap-2 transition-all duration-500 ${
                  isActive ? "opacity-100 scale-110" : "opacity-40 scale-100"
                }`}
              >
                <div
                  className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg transition-all duration-500 ${
                    isCurrent
                      ? "animate-pulse shadow-2xl"
                      : isActive
                        ? "shadow-xl"
                        : "shadow-md"
                  }`}
                >
                  {/* Glow effect for active badge */}
                  {isCurrent && (
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${badge.color} opacity-50 animate-ping`}
                    />
                  )}
                  {/* Shimmer effect for active badges */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-0 bg-white/30 animate-shimmer"
                        style={{ transform: "translateX(-100%) rotate(45deg)" }}
                      />
                    </div>
                  )}
                  <IconComponent className="relative w-6 h-6 text-white z-10" />
                </div>
                <span
                  className={`text-[9px] font-bold tracking-wider transition-all duration-500 ${
                    isActive
                      ? "text-gray-700 dark:text-slate-300"
                      : "text-gray-400 dark:text-slate-600"
                  }`}
                >
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
