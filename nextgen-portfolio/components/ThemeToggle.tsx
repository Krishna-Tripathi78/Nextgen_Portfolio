"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 group"
      aria-label="Toggle theme"
    >
      <div className="relative">
        {/* Animated gradient border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-60 group-hover:opacity-100 blur-sm group-hover:blur transition-all duration-300" />
        
        {/* Main button */}
        <div className="relative px-4 py-2.5 bg-white dark:bg-slate-900 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-slate-200 dark:border-slate-700">
          {theme === "dark" ? (
            <>
              <Sun className="w-4 h-4 text-amber-500 group-hover:rotate-90 transition-transform duration-500" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600 group-hover:-rotate-12 transition-transform duration-500" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Dark</span>
            </>
          )}
        </div>
      </div>
    </button>
  );
}