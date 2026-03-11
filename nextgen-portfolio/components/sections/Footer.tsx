import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { Mail, Phone, MapPin, Heart, ArrowUpRight, Sparkles } from "lucide-react";

const PROFILE_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  name,
  email,
  phone,
  location,
  socialLinks
}`);

const socialLinks = [
  { key: "github", label: "GitHub" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "twitter", label: "Twitter" },
  { key: "website", label: "Website" },
  { key: "medium", label: "Medium" },
  { key: "youtube", label: "YouTube" },
];

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export async function Footer() {
  const { data: profile } = await sanityFetch({ query: PROFILE_QUERY });

  if (!profile) {
    return null;
  }

  return (
    <footer className="relative bg-gradient-to-b from-muted/30 via-background to-muted/50 border-t border-border overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Decorative top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="container mx-auto max-w-7xl px-6 py-20 relative z-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About Column - Enhanced */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                {profile.name}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full-stack developer passionate about creating innovative solutions and building exceptional digital experiences.
            </p>
            <div className="flex flex-col gap-3">
              {profile.email && (
                <Link
                  href={`mailto:${profile.email}`}
                  className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-purple-400 transition-all duration-300 p-2 rounded-lg hover:bg-purple-500/5"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="truncate flex-1">{profile.email}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              )}
              {profile.phone && (
                <Link
                  href={`tel:${profile.phone}`}
                  className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-purple-400 transition-all duration-300 p-2 rounded-lg hover:bg-purple-500/5"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>{profile.phone}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              )}
              {profile.location && (
                <div className="flex items-center gap-3 text-sm text-muted-foreground p-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links - Enhanced */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-sm text-muted-foreground hover:text-purple-400 transition-all duration-300 inline-flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-purple-500/5 w-full"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-all group-hover:scale-150" />
                    <span className="flex-1">{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links - Enhanced */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-orange-500" />
              Connect
            </h4>
            <ul className="space-y-3">
              {socialLinks.map(({ key, label }) => {
                const href = (profile.socialLinks as any)?.[key];
                if (!href) return null;
                return (
                  <li key={key}>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group text-sm text-muted-foreground hover:text-pink-400 transition-all duration-300 inline-flex items-center gap-3 p-2 -ml-2 rounded-lg hover:bg-pink-500/5 w-full"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 opacity-0 group-hover:opacity-100 transition-all group-hover:scale-150" />
                      <span className="flex-1">{label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CTA Column - Enhanced */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500" />
              Let's Work Together
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Have a project in mind? Let's create something amazing together.
            </p>
            <div className="space-y-3">
              <Link
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold text-sm shadow-lg hover:shadow-[0_8px_30px_rgba(168,85,247,0.5)] transition-all duration-300 transform hover:scale-105 overflow-hidden w-full"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  Get In Touch
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </Link>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Available for freelance work</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background px-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" style={{ animationDelay: "0.3s" }} />
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: "0.6s" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Enhanced */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{profile.name}</span>. All rights reserved.
            </p>
            <span className="hidden md:block text-border">•</span>
            <p className="flex items-center gap-2">
              Crafted with <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" /> and <span className="font-semibold">Next.js</span>
            </p>
          </div>
          
          {/* Back to Top Button */}
          <Link
            href="#hero"
            className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-purple-500/50 bg-card hover:bg-purple-500/5 transition-all duration-300 text-sm font-medium"
          >
            <span>Back to Top</span>
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
