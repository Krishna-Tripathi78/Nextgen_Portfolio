"use client";

import { useEffect, useState } from "react";

export function MouseTrail() {
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>(
    [],
  );

  useEffect(() => {
    let id = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const newTrail = { x: e.clientX, y: e.clientY, id: id++ };
      setTrails((prev) => [...prev.slice(-8), newTrail]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{
            left: trail.x,
            top: trail.y,
            opacity: ((index + 1) / trails.length) * 0.5,
            transform: `scale(${(index + 1) / trails.length})`,
            transition: "all 0.3s ease-out",
          }}
        />
      ))}
    </div>
  );
}
