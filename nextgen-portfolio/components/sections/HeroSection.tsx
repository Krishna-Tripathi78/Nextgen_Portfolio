import Link from "next/link";
import { defineQuery } from "next-sanity";
import { Mail, MapPin, CheckCircle2, Github, Linkedin, Twitter, Globe } from "lucide-react";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { ProfileImage } from "./ProfileImage";

const HERO_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  headline,
  headlineStaticText,
  headlineAnimatedWords,
  headlineAnimationDuration,
  shortBio,
  email,
  phone,
  location,
  availability,
  socialLinks,
  yearsOfExperience,
  profileImage
}`);

export async function HeroSection() {
  const { data: profile } = await sanityFetch({ query: HERO_QUERY });

  if (!profile) {
    return null;
  }

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center px-6 overflow-hidden bg-background"
    >
      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-[120px] animate-[float-up_8s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-pink-500/10 dark:bg-pink-500/15 rounded-full blur-[100px] animate-[float-up_10s_ease-in-out_infinite_2s]" />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-orange-500/8 dark:bg-orange-500/12 rounded-full blur-[90px] animate-[float-up_12s_ease-in-out_infinite_4s]" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-5 order-2 lg:order-1">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                {profile.firstName}{" "}
                <span className="gradient-heading">{profile.lastName}</span>
              </h1>
            </div>

            {profile.headlineStaticText &&
              profile.headlineAnimatedWords &&
              profile.headlineAnimatedWords.length > 0 ? (
              <LayoutTextFlip
                text={profile.headlineStaticText}
                words={profile.headlineAnimatedWords}
                duration={profile.headlineAnimationDuration || 3000}
                className="text-2xl text-muted-foreground font-medium"
              />
            ) : (
              <p className="text-2xl text-muted-foreground font-medium">
                {profile.headline}
              </p>
            )}

            <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
              {profile.shortBio}
            </p>

            {profile.socialLinks && (
              <div className="flex flex-wrap gap-3 pt-3">
                {profile.socialLinks.github && (
                  <Link
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-purple-500/30 hover:border-purple-500/70 hover:bg-purple-500/5 transition-all duration-300 text-sm whitespace-nowrap relative overflow-hidden"
                  >
                    <Github className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                    <span className="group-hover:text-purple-400 transition-colors">GitHub</span>
                  </Link>
                )}
                {profile.socialLinks.linkedin && (
                  <Link
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-pink-500/30 hover:border-pink-500/70 hover:bg-pink-500/5 transition-all duration-300 text-sm whitespace-nowrap"
                  >
                    <Linkedin className="w-4 h-4 group-hover:text-pink-400 transition-colors" />
                    <span className="group-hover:text-pink-400 transition-colors">LinkedIn</span>
                  </Link>
                )}
                {profile.socialLinks.twitter && (
                  <Link
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-sky-500/30 hover:border-sky-500/70 hover:bg-sky-500/5 transition-all duration-300 text-sm whitespace-nowrap"
                  >
                    <Twitter className="w-4 h-4 group-hover:text-sky-400 transition-colors" />
                    <span className="group-hover:text-sky-400 transition-colors">Twitter</span>
                  </Link>
                )}
                {profile.socialLinks.website && (
                  <Link
                    href={profile.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-orange-500/30 hover:border-orange-500/70 hover:bg-orange-500/5 transition-all duration-300 text-sm whitespace-nowrap"
                  >
                    <Globe className="w-4 h-4 group-hover:text-orange-400 transition-colors" />
                    <span className="group-hover:text-orange-400 transition-colors">Website</span>
                  </Link>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-5 pt-3 text-sm text-muted-foreground">
              {profile.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-pink-400 flex-shrink-0" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.availability && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                  <span className="text-green-400 text-xs font-medium">{profile.availability}</span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Image */}
          {profile.profileImage && (
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-[350px] h-[350px]">
                {/* Glow ring behind image */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-orange-500/20 blur-2xl scale-110 animate-[glow-pulse_4s_ease-in-out_infinite]" />
                <ProfileImage
                  imageUrl={urlFor(profile.profileImage)
                    .width(600)
                    .height(600)
                    .url()}
                  firstName={profile.firstName || ""}
                  lastName={profile.lastName || ""}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
