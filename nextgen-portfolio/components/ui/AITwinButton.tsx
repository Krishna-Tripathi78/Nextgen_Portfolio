"use client";

import { Bot, Sparkles, X } from "lucide-react";
import { useState } from "react";

export function AITwinButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-24 z-50 p-4 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 shadow-lg group animate-pulse-slow"
        aria-label="Chat with AI Twin"
      >
        <div className="relative">
          <Bot className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
          <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-ping" />
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl h-[600px] m-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">AI Twin Chat</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="text-center py-12">
                <Bot className="w-16 h-16 mx-auto mb-4 text-indigo-500" />
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Coming Soon!</h3>
                <p className="text-gray-600 dark:text-gray-400">AI Twin chat feature is under development. Stay tuned!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
