import { IconExternalLink, IconStar, IconTrophy } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

const ACHIEVEMENTS_QUERY =
  defineQuery(`*[_type == "achievement"] | order(date desc){
  title,
  type,
  issuer,
  date,
  description,
  image,
  url,
  featured,
  order
}`);

export async function AchievementsSection() {
  const { data: achievements } = await sanityFetch({
    query: ACHIEVEMENTS_QUERY,
  });

  if (!achievements || achievements.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const getTypeColor = (type: string | null | undefined) => {
    if (!type) return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    const colors: Record<string, string> = {
      award:        "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      hackathon:    "bg-purple-500/10 text-purple-400 border-purple-500/20",
      publication:  "bg-blue-500/10 text-blue-400 border-blue-500/20",
      speaking:     "bg-green-500/10 text-green-400 border-green-500/20",
      "open-source":"bg-orange-500/10 text-orange-400 border-orange-500/20",
      milestone:    "bg-pink-500/10 text-pink-400 border-pink-500/20",
      recognition:  "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      other:        "bg-gray-500/10 text-gray-400 border-gray-500/20",
    };
    return colors[type] || colors.other;
  };

  const getTypeLabel = (type: string | null | undefined) => {
    if (!type) return "Achievement";
    const labels: Record<string, string> = {
      award: "Award", hackathon: "Hackathon Win", publication: "Publication",
      speaking: "Speaking", "open-source": "Open Source",
      milestone: "Milestone", recognition: "Recognition", other: "Other",
    };
    return labels[type] || "Achievement";
  };

  const featured = achievements.filter((a: any) => a.featured);
  const regular = achievements.filter((a: any) => !a.featured);

  return (
    <section id="achievements" className="py-20 px-6 relative overflow-hidden bg-muted/30">
      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 dark:bg-yellow-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-heading">
            Achievements & Awards
          </h2>
          <p className="text-xl text-muted-foreground">
            Milestones and recognitions
          </p>
        </div>

        {/* Featured Achievements */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <IconStar className="w-4 h-4 text-white fill-white" />
              </span>
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Featured Achievements
              </span>
            </h3>
            <div className="@container">
              <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-6">
                {featured.map((achievement: any) => (
                  <div
                    key={`${achievement.title}-${achievement.date}`}
                    className="@container/card group relative bg-card border border-yellow-500/20 hover:border-yellow-500/50 rounded-xl p-6 hover:shadow-[0_8px_40px_rgba(234,179,8,0.15)] transition-all duration-300 overflow-hidden glow-border shimmer-overlay"
                  >
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 opacity-70 group-hover:opacity-100 transition-opacity" />

                    {achievement.image && (
                      <div className="relative w-full h-32 @md/card:h-48 mb-4 rounded-xl overflow-hidden">
                        <Image
                          src={urlFor(achievement.image).width(400).height(200).url()}
                          alt={achievement.title || "Achievement"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                      </div>
                    )}

                    <div className="flex flex-col @xs/card:flex-row @xs/card:items-center gap-2 mb-3">
                      {achievement.type && (
                        <span className={`px-2.5 py-1 text-xs rounded-full font-semibold border ${getTypeColor(achievement.type)}`}>
                          {getTypeLabel(achievement.type)}
                        </span>
                      )}
                      {achievement.date && (
                        <span className="text-xs @md/card:text-sm text-muted-foreground">
                          {formatDate(achievement.date)}
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg @md/card:text-xl font-semibold mb-2 group-hover:text-yellow-400 transition-colors">
                      {achievement.title}
                    </h4>
                    {achievement.issuer && (
                      <p className="font-medium mb-3 text-sm @md/card:text-base truncate bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        {achievement.issuer}
                      </p>
                    )}
                    {achievement.description && (
                      <p className="text-muted-foreground mb-4 text-sm @md/card:text-base line-clamp-3">
                        {achievement.description}
                      </p>
                    )}
                    {achievement.url && (
                      <Link
                        href={achievement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs @md/card:text-sm text-yellow-400 hover:text-yellow-300 hover:underline font-medium transition-colors"
                      >
                        Learn More
                        <IconExternalLink className="w-3.5 h-3.5 @md/card:w-4 @md/card:h-4" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Regular Achievements */}
        {regular.length > 0 && (
          <div>
            {featured.length > 0 && (
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <IconTrophy className="w-4 h-4 text-white" />
                </span>
                All Achievements
              </h3>
            )}
            <div className="@container">
              <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-6">
                {regular.map((achievement: any) => (
                  <div
                    key={`${achievement.title}-${achievement.date}`}
                    className="@container/card group relative bg-card border border-border hover:border-purple-500/30 rounded-xl p-6 hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] transition-all duration-300 flex flex-col overflow-hidden glow-border"
                  >
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-80 transition-opacity" />

                    {achievement.image && (
                      <div className="relative w-full h-24 @md/card:h-32 mb-4 rounded-xl overflow-hidden">
                        <Image
                          src={urlFor(achievement.image).width(300).height(128).url()}
                          alt={achievement.title || "Achievement"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        {achievement.type && (
                          <span className={`px-2 py-0.5 @md/card:py-1 text-xs rounded-full font-semibold border ${getTypeColor(achievement.type)}`}>
                            {getTypeLabel(achievement.type)}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base @md/card:text-lg font-semibold mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                        {achievement.title}
                      </h4>
                      {achievement.issuer && (
                        <p className="font-medium mb-2 text-xs @md/card:text-sm truncate bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {achievement.issuer}
                        </p>
                      )}
                      {achievement.date && (
                        <p className="text-xs @md/card:text-sm text-muted-foreground mb-3">
                          {formatDate(achievement.date)}
                        </p>
                      )}
                      {achievement.description && (
                        <p className="text-xs @md/card:text-sm text-muted-foreground line-clamp-3">
                          {achievement.description}
                        </p>
                      )}
                    </div>

                    {achievement.url && (
                      <Link
                        href={achievement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs @md/card:text-sm text-purple-400 hover:text-pink-400 hover:underline mt-4 pt-4 border-t border-border/50 font-medium transition-colors"
                      >
                        Learn More
                        <IconExternalLink className="w-3.5 h-3.5 @md/card:w-4 @md/card:h-4" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}