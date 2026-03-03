"use client";

import {
  BotMessageSquare,
  Brain,
  SendHorizontal,
  UserCircle,
  XCircle,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function AITwinButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm Krishna's AI assistant. Ask me anything about his skills, projects, or experience!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const allSuggestions = [
    "What's Krishna's tech stack?",
    "Tell me about his skills",
    "Show me his projects",
    "What's his experience?",
    "How can I contact him?",
    "What technologies does he use?",
    "Tell me about his education",
    "What frameworks does he know?",
    "What's his background?",
    "Show me his certifications",
    "What programming languages?",
    "Tell me about his achievements",
  ];

  const handleInputChange = (value: string) => {
    setInput(value);

    if (value.length > 2) {
      const filtered = allSuggestions.filter((s) =>
        s.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(filtered.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage, timestamp: new Date() },
    ]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch("/api/ai-twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (data.reply) {
        // Simulate typing effect
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsTyping(false);

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply, timestamp: new Date() },
        ]);
      } else {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I couldn't process that. Please try again.",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (_error) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! Something went wrong. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "What's Krishna's tech stack?",
    "Show me his coolest projects",
    "Tell me about his experience",
    "How can I hire him?",
  ];

  return (
    <>
      {/* Impressive Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Open AI Assistant"
      >
        <div className="relative">
          {/* Animated gradient border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full opacity-75 group-hover:opacity-100 blur group-hover:blur-md transition-all duration-300 animate-pulse" />

          {/* Main button */}
          <div className="relative flex items-center gap-3 px-6 py-3.5 bg-slate-900 dark:bg-white rounded-full shadow-xl group-hover:shadow-2xl transition-all duration-300">
            <div className="relative">
              <BotMessageSquare className="w-5 h-5 text-white dark:text-slate-900" />
              <Zap className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="font-semibold text-sm text-white dark:text-slate-900 hidden sm:block">
              AI Assistant
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>
      </button>

      {/* Premium Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full sm:w-[480px] h-[100dvh] sm:h-[680px] bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-500 border border-slate-200/50 dark:border-slate-700/50">
            {/* Premium Header */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "32px 32px",
                  }}
                />
              </div>

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-lg">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white flex items-center gap-2">
                      Krishna's AI Twin
                      <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
                    </h3>
                    <p className="text-xs text-white/80 font-medium">
                      Online • Ready to help
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 hover:bg-white/20 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20"
                  aria-label="Close"
                >
                  <XCircle className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Messages Area with gradient background */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-950/50 dark:to-slate-900">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} animate-in slide-in-from-bottom-4 duration-500`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-blue-500 to-purple-600"
                        : "bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <UserCircle className="w-4 h-4 text-white" />
                    ) : (
                      <Brain className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                    )}
                  </div>

                  {/* Message bubble */}
                  <div className="flex-1 max-w-[75%]">
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-sm ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-tr-md"
                          : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-tl-md"
                      }`}
                    >
                      <div className="text-sm leading-relaxed whitespace-pre-line">
                        {msg.content.split("\n").map((line, i) => {
                          // Safe rendering without dangerouslySetInnerHTML
                          const parts = line.split(/(\*\*.*?\*\*|\*.*?\*|•)/g);
                          return (
                            <div key={i}>
                              {parts.map((part, j) => {
                                if (
                                  part.startsWith("**") &&
                                  part.endsWith("**")
                                ) {
                                  return (
                                    <strong key={j}>{part.slice(2, -2)}</strong>
                                  );
                                }
                                if (
                                  part.startsWith("*") &&
                                  part.endsWith("*") &&
                                  !part.startsWith("**")
                                ) {
                                  return <em key={j}>{part.slice(1, -1)}</em>;
                                }
                                if (part === "•") {
                                  return (
                                    <span
                                      key={j}
                                      className="inline-block w-1.5 h-1.5 bg-current rounded-full mx-2 align-middle"
                                    />
                                  );
                                }
                                return <span key={j}>{part}</span>;
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block px-1">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-slate-700 dark:text-slate-200 animate-pulse" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-md border border-slate-200 dark:border-slate-700">
                    {isTyping ? (
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.15s" }}
                          />
                          <div
                            className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.3s" }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 animate-pulse">
                          Typing...
                        </span>
                      </div>
                    ) : (
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.15s" }}
                        />
                        <div
                          className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.3s" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-6 pb-4 space-y-2 animate-in slide-in-from-bottom-4 duration-500">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Suggested questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(q)}
                      className="px-3 py-2 text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 shadow-sm hover:shadow"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Premium Input Area */}
            <div className="p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800">
              {/* Autocomplete Suggestions */}
              {suggestions.length > 0 && (
                <div className="mb-3 space-y-1 animate-in slide-in-from-bottom-2 duration-200">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInput(suggestion);
                        setSuggestions([]);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-xl transition-all duration-200 flex items-center gap-2 border border-purple-200 dark:border-purple-800 shadow-sm hover:shadow"
                    >
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span className="flex-1">{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                      setSuggestions([]);
                    }
                  }}
                  placeholder="Ask me anything about Krishna..."
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-sm shadow-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="px-5 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center min-w-[52px] font-medium shadow-md"
                  aria-label="Send message"
                >
                  <SendHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Footer hint */}
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 text-center">
                Trained on Krishna's portfolio
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
