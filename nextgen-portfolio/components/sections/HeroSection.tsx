import Link from "next/link";
import { defineQuery } from "next-sanity";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { ProfileImage } from "@/components/ui/profile-image";
import { Github, Linkedin, Twitter, Globe, Mail, MapPin, CheckCircle } from "lucide-react";

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
      className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden bg-white dark:bg-black/[0.96]"
    >
      {/* Background Ripple Effect */}
      <BackgroundRippleEffect rows={8} cols={27} cellSize={56} />

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="@container">
          <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-8 @lg:gap-12 items-center">
            {/* Text Content */}
            <div className="@container/hero space-y-4 @md/hero:space-y-6">
              <h1 className="text-4xl @md/hero:text-5xl @lg/hero:text-7xl font-bold tracking-tight animate-fade-in">
                <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-neutral-200 dark:to-white bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">{profile.firstName}</span>{" "}
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">{profile.lastName}</span>
              </h1>
              {profile.headlineStaticText &&
              profile.headlineAnimatedWords &&
              profile.headlineAnimatedWords.length > 0 ? (
                <LayoutTextFlip
                  text={profile.headlineStaticText}
                  words={profile.headlineAnimatedWords}
                  duration={profile.headlineAnimationDuration || 3000}
                  className="text-xl @md/hero:text-2xl @lg/hero:text-3xl text-gray-700 dark:text-neutral-200 font-medium"
                />
              ) : (
                <p className="text-xl @md/hero:text-2xl @lg/hero:text-3xl text-gray-700 dark:text-neutral-200 font-medium">
                  {profile.headline}
                </p>
              )}
              <p className="text-base @md/hero:text-lg text-gray-600 dark:text-neutral-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {profile.shortBio}
              </p>

              {profile.socialLinks && (
                <div className="flex flex-nowrap gap-3 @md/hero:gap-4 pt-4 ">
                  {profile.socialLinks.github && (
                    <Link
                      href={profile.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg border border-cyan-600/50 bg-cyan-500/20 hover:bg-cyan-500/30 hover:border-cyan-500 transition-all text-sm @md/hero:text-base text-cyan-700 dark:text-cyan-100 dark:border-cyan-500/30 dark:bg-cyan-500/10"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </Link>
                  )}
                  {profile.socialLinks.linkedin && (
                    <Link
                      href={profile.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg border border-blue-600/50 bg-blue-500/20 hover:bg-blue-500/30 hover:border-blue-500 transition-all text-sm @md/hero:text-base text-blue-700 dark:text-blue-100 dark:border-blue-500/30 dark:bg-blue-500/10"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </Link>
                  )}
                  {profile.socialLinks.twitter && (
                    <Link
                      href={profile.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg border border-sky-600/50 bg-sky-500/20 hover:bg-sky-500/30 hover:border-sky-500 transition-all text-sm @md/hero:text-base text-sky-700 dark:text-sky-100 dark:border-sky-500/30 dark:bg-sky-500/10"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Link>
                  )}
                  {profile.socialLinks.website && (
                    <Link
                      href={profile.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg border border-teal-600/50 bg-teal-500/20 hover:bg-teal-500/30 hover:border-teal-500 transition-all text-sm @md/hero:text-base text-teal-700 dark:text-teal-100 dark:border-teal-500/30 dark:bg-teal-500/10"
                    >
                      <Globe className="w-4 h-4" />
                      Website
                    </Link>
                  )}
                </div>
              )}

              <div className="flex flex-nowrap gap-x-6 pt-4 text-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                {profile.email && (
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                    <span className="whitespace-nowrap">{profile.email}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform">
                    <MapPin className="w-4 h-4" />
                    <span className="whitespace-nowrap">{profile.location}</span>
                  </div>
                )}
                {profile.availability && (
                  <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:scale-110 transition-transform">
                    <CheckCircle className="w-4 h-4" />
                    <span className="whitespace-nowrap">{profile.availability}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Image */}
            {profile.profileImage && (
              <div className="flex justify-center translate-x-[2cm]">
                <div className="w-[120%]">
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
      </div>
    </section>
  );
}