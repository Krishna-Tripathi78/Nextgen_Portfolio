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
        <div className="flex flex-col h-full bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
            {/* Background orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 p-6 border-b border-border bg-card/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                        <span className="text-white text-lg font-bold">AI</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            AI Assistant
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            Ask me anything about Krishna
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"} animate-in slide-in-from-bottom-4 duration-300`}
                    >
                        {/* Avatar */}
                        <div
                            className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center shadow-md ${
                                message.role === "user"
                                    ? "bg-gradient-to-br from-purple-500 to-pink-500"
                                    : "bg-gradient-to-br from-muted to-muted-foreground/20"
                            }`}
                        >
                            <span className="text-white text-xs font-bold">
                                {message.role === "user" ? "U" : "AI"}
                            </span>
                        </div>

                        {/* Message bubble */}
                        <div className="flex-1 max-w-[80%]">
                            <div
                                className={`group relative px-4 py-3 rounded-2xl shadow-sm transition-all duration-300 ${
                                    message.role === "user"
                                        ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-tr-md"
                                        : "bg-card border border-border hover:border-purple-500/30 rounded-tl-md hover:shadow-md"
                                }`}
                            >
                                {message.role === "assistant" && (
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />
                                )}
                                <MessageContent
                                    content={message.content}
                                    isUser={message.role === "user"}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-3 animate-in slide-in-from-bottom-4 duration-300">
                        <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center shadow-md">
                            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                        </div>
                        <div className="bg-card border border-border rounded-2xl rounded-tl-md px-4 py-3">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="relative z-10 p-6 border-t border-border bg-card/50 backdrop-blur-sm">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        maxLength={500}
                        disabled={isLoading}
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 disabled:opacity-50 transition-all hover:border-purple-500/30"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-[0_4px_20px_rgba(168,85,247,0.4)] transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center min-w-[52px]"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                    {input.length}/500 characters
                </p>
            </form>
        </div>
    );
}
