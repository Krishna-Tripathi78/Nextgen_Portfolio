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
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-5 order-2 lg:order-1">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              {profile.firstName}{" "}
              <span className="text-primary">{profile.lastName}</span>
            </h1>
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border hover:bg-accent transition-colors text-sm whitespace-nowrap"
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border hover:bg-accent transition-colors text-sm whitespace-nowrap"
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border hover:bg-accent transition-colors text-sm whitespace-nowrap"
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border hover:bg-accent transition-colors text-sm whitespace-nowrap"
                  >
                    <Globe className="w-4 h-4" />
                    Website
                  </Link>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-5 pt-3 text-sm text-muted-foreground">
              {profile.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.availability && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{profile.availability}</span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Image */}
          {profile.profileImage && (
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="w-[350px] h-[350px]">
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
