"use client";

import { useEffect, useState } from "react";

interface Achievement {
  title: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
}

export function AchievementPopup({ achievement }: { achievement: Achievement }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-card border rounded-lg p-6 max-w-md mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
        
        <div className="mb-2 text-sm text-primary font-semibold">🎉 Latest Achievement</div>
        <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{achievement.issuer} • {new Date(achievement.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        <p className="text-sm mb-4">{achievement.description}</p>
        
        <div className="flex gap-2">
          {achievement.url && (
            <a
              href={achievement.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
            >
              Learn More
            </a>
          )}
          <button
            onClick={() => setShow(false)}
            className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-accent"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
