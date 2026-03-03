import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AITwinButton } from "@/components/ui/AITwinButton";
import { BackToTop } from "@/components/ui/back-to-top";
import { CommandPalette } from "@/components/ui/command-palette";
import { FloatingDock } from "@/components/ui/floating-dock";
import { LoadingWrapper } from "@/components/ui/loading-wrapper";
import { MagneticCursor } from "@/components/ui/magnetic-cursor";
import { ParticleField } from "@/components/ui/particle-field";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krishna Tripathi - Portfolio",
  description: "Full-stack developer and cloud enthusiast portfolio",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        >
          <ThemeProvider>
            <LoadingWrapper>
              <ScrollProgress />
              <MagneticCursor />
              <SpotlightCursor />
              <ParticleField />
              <CommandPalette />
              <ThemeToggle />
              <AITwinButton />
              <FloatingDock />
              <BackToTop />
              {children}
            </LoadingWrapper>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
