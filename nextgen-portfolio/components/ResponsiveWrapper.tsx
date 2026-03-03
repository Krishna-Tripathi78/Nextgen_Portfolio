"use client";

import { useIsMobile } from "@/hooks/use-mobile";

interface ResponsiveWrapperProps {
  children: React.ReactNode;
}

export function ResponsiveWrapper({ children }: ResponsiveWrapperProps) {
  const isMobile = useIsMobile();
  const zoom = isMobile ? 1 : 0.67;

  return (
    <div className="min-h-screen" style={{ zoom }}>
      {children}
    </div>
  );
}
