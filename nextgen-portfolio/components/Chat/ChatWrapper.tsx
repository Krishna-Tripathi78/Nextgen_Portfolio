"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { MessageContent } from "./MessageContent";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ChatWrapper() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hey! I'm Krishna's AI assistant. Ask me anything about his work, skills, or projects!",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/ai-twin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: data.reply },
                ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        content: "Sorry, I encountered an error. Please try again.",
                    },
                ]);
            }
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Sorry, I couldn't connect. Please try again.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                    AI Assistant
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Ask me anything about Krishna
                </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.role === "user"
                                ? "bg-blue-500 text-white"
                                : "bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-600 shadow-sm"
                                }`}
                        >
                            <MessageContent
                                content={message.content}
                                isUser={message.role === "user"}
                            />
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white dark:bg-slate-700 rounded-2xl px-4 py-2 border border-slate-200 dark:border-slate-600">
                            <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        maxLength={500}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 text-center">
                    {input.length}/500 characters
                </p>
            </form>
        </div>
    );
}
