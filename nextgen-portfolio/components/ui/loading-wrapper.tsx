"use client";

import { useState } from "react";
import { LoadingScreen } from "./loading-screen";

export function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return <>{children}</>;
}