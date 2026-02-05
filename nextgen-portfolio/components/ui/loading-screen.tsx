"use client";

import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0); // 0: welcome, 1: logo, 2: cards
  const [activeCard, setActiveCard] = useState(0);
  
  const cards = [
    { title: "Initializing", desc: "Setting up your experience" },
    { title: "Loading Assets", desc: "Preparing portfolio content" },
    { title: "Almost Ready", desc: "Finalizing everything" }
  ];

  useEffect(() => {
    // Welcome message phase
    const welcomeTimer = setTimeout(() => setPhase(1), 2000);
    
    // Logo phase
    const logoTimer = setTimeout(() => setPhase(2), 4000);
    
    // Cards phase
    const cardsTimer = setTimeout(() => {
      const cardInterval = setInterval(() => {
        setActiveCard(prev => {
          if (prev >= 2) {
            clearInterval(cardInterval);
            setTimeout(onComplete, 1500);
            return 2;
          }
          return prev + 1;
        });
      }, 1500);
    }, 4500);

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(logoTimer);
      clearTimeout(cardsTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-4">
      
      {/* Welcome Message */}
      {phase === 0 && (
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">Welcome</h1>
          <p className="text-muted-foreground">to my portfolio</p>
        </div>
      )}
      
      {/* Logo */}
      {phase === 1 && (
        <div className="text-center animate-fade-in">
          <div className="text-8xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent animate-pulse">
            K
          </div>
        </div>
      )}
      
      {/* Cards */}
      {phase === 2 && (
        <div className="flex gap-6 max-w-4xl w-full justify-center animate-fade-in">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`relative bg-card/50 backdrop-blur-xl rounded-2xl p-8 border transition-all duration-700 w-80 h-48 flex flex-col justify-center items-center text-center ${
                index <= activeCard 
                  ? 'border-yellow-400 shadow-2xl shadow-yellow-400/25 scale-105' 
                  : 'border-border opacity-50'
              }`}
            >
              {/* Animated Background */}
              {index <= activeCard && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-yellow-300/5 to-yellow-400/10 animate-pulse" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.1),transparent_70%)] animate-ping" />
                </div>
              )}
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {card.desc}
                </p>
                
                {/* Glow indicator */}
                {index <= activeCard && (
                  <div className="mt-4 flex justify-center space-x-1">
                    {[...Array(index + 1)].map((_, dotIndex) => (
                      <div 
                        key={dotIndex}
                        className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50" 
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}