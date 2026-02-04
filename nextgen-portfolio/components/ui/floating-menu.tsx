"use client";
import { useState } from "react";
import { Home, Briefcase, Award, Mail, Menu, X } from "lucide-react";
import Link from "next/link";

export function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: Briefcase, label: "Projects", href: "#projects" },
    { icon: Award, label: "Achievements", href: "#achievements" },
    { icon: Mail, label: "Contact", href: "#contact" },
  ];

  return (
    <div className="fixed bottom-24 right-8 z-40">
      <div className={`flex flex-col-reverse gap-3 mb-3 transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        {menuItems.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="group relative flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300"
            style={{ transitionDelay: isOpen ? `${i * 50}ms` : "0ms" }}
          >
            <item.icon className="w-5 h-5" />
            <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
  );
}
