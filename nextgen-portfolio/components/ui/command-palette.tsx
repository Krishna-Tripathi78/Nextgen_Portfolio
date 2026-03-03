"use client";
import { Award, Briefcase, Home, Mail, Search, User } from "lucide-react";
import { useEffect, useState } from "react";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const commands = [
    { icon: Home, label: "Home", href: "#home", key: "h" },
    { icon: User, label: "About", href: "#about", key: "a" },
    { icon: Briefcase, label: "Projects", href: "#projects", key: "p" },
    { icon: Award, label: "Achievements", href: "#achievements", key: "c" },
    { icon: Mail, label: "Contact", href: "#contact", key: "m" },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-start justify-center pt-32"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-4 border-b dark:border-gray-800">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search commands..."
            className="flex-1 bg-transparent outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded">
            ESC
          </kbd>
        </div>
        <div className="max-h-96 overflow-y-auto p-2">
          {filtered.map((cmd) => (
            <a
              key={cmd.label}
              href={cmd.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <cmd.icon className="w-5 h-5 text-gray-400 group-hover:text-purple-500" />
              <span className="flex-1 text-sm">{cmd.label}</span>
              <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded opacity-0 group-hover:opacity-100">
                {cmd.key}
              </kbd>
            </a>
          ))}
        </div>
        <div className="p-3 border-t dark:border-gray-800 text-xs text-gray-500 flex items-center justify-center gap-2">
          Press{" "}
          <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            ⌘K
          </kbd>{" "}
          or{" "}
          <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            Ctrl+K
          </kbd>{" "}
          to toggle
        </div>
      </div>
    </div>
  );
}
