import Link from "next/link";
import { defineQuery } from "next-sanity";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe } from "lucide-react";
import WorldMapDemo from "@/components/world-map-demo";
import { sanityFetch } from "@/sanity/lib/live";
import { ContactForm } from "./ContactForm";

const PROFILE_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  email,
  phone,
  location,
  socialLinks
}`);

const contactIconMap = [
  { key: "email", Icon: Mail, color: "from-purple-500 to-violet-600", label: "Email", hrefPrefix: "mailto:" },
  { key: "phone", Icon: Phone, color: "from-pink-500 to-rose-600", label: "Phone", hrefPrefix: "tel:" },
  { key: "location", Icon: MapPin, color: "from-orange-500 to-amber-600", label: "Location", hrefPrefix: null },
];

const socialLinks = [
  { key: "github",   label: "GitHub",    color: "border-purple-500/30 hover:border-purple-500/70 hover:bg-purple-500/5 hover:text-purple-400" },
  { key: "linkedin", label: "LinkedIn",   color: "border-blue-500/30 hover:border-blue-500/70 hover:bg-blue-500/5 hover:text-blue-400" },
  { key: "twitter",  label: "Twitter",    color: "border-sky-500/30 hover:border-sky-500/70 hover:bg-sky-500/5 hover:text-sky-400" },
  { key: "website",  label: "Website",    color: "border-orange-500/30 hover:border-orange-500/70 hover:bg-orange-500/5 hover:text-orange-400" },
  { key: "medium",   label: "Medium",     color: "border-green-500/30 hover:border-green-500/70 hover:bg-green-500/5 hover:text-green-400" },
  { key: "youtube",  label: "YouTube",    color: "border-red-500/30 hover:border-red-500/70 hover:bg-red-500/5 hover:text-red-400" },
];

export async function ContactSection() {
  const { data: profile } = await sanityFetch({ query: PROFILE_QUERY });

  if (!profile) {
    return null;
  }

  const contactValues: Record<string, string | null> = {
    email: profile.email ?? null,
    phone: profile.phone ?? null,
    location: profile.location ?? null,
  };

  return (
    <section id="contact" className="py-20 px-6 pb-40 relative overflow-hidden bg-muted/30">
      {/* Background orbs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

      <WorldMapDemo />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-heading">Get In Touch</h2>
          <p className="text-xl text-muted-foreground">
            Let’s collaborate on building innovative solutions.
          </p>
        </div>

        <div className="@container">
          <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactIconMap.map(({ key, Icon, color, label, hrefPrefix }) => {
                  const value = contactValues[key];
                  if (!value) return null;
                  const content = (
                    <div className="group relative bg-card border border-border hover:border-purple-500/30 rounded-xl p-5 hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] transition-all duration-300 overflow-hidden">
                      {/* Top gradient accent bar */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* Shimmer on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.04),transparent_60%)]" />
                      
                      <div className="relative flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-[0_4px_20px_rgba(168,85,247,0.3)] transition-shadow duration-300`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold mb-1 text-base group-hover:text-purple-400 transition-colors">{label}</h4>
                          <p className="text-muted-foreground group-hover:text-foreground transition-colors text-sm break-all">
                            {value}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                  return hrefPrefix ? (
                    <Link key={key} href={`${hrefPrefix}${value}`}>{content}</Link>
                  ) : (
                    <div key={key}>{content}</div>
                  );
                })}
              </div>

              {profile.socialLinks && (
                <div className="pt-6">
                  <h4 className="font-semibold mb-4 text-sm @md/info:text-base">Follow Me</h4>
                  <div className="flex flex-wrap gap-2 @md/info:gap-3">
                    {socialLinks.map(({ key, label, color }) => {
                      const href = (profile.socialLinks as any)?.[key];
                      if (!href) return null;
                      return (
                        <Link
                          key={key}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-3 py-1.5 @md/info:px-4 @md/info:py-2 rounded-full border text-xs @md/info:text-sm font-medium transition-all duration-300 ${color}`}
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}