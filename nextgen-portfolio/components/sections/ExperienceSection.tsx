import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

const EXPERIENCE_QUERY =
  defineQuery(`*[_type == "experience"] | order(startDate desc){
  company,
  position,
  employmentType,
  location,
  startDate,
  endDate,
  current,
  description,
  responsibilities,
  achievements,
  technologies[]->{name, category},
  companyLogo,
  companyWebsite
}`);

export async function ExperienceSection() {
  const { data: experiences } = await sanityFetch({ query: EXPERIENCE_QUERY });

  if (!experiences || experiences.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section id="experience" className="py-20 px-6 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-heading">
            Work Experience
          </h2>
          <p className="text-xl text-muted-foreground">
            My professional journey
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp: any, expIdx: number) => (
            <div
              key={`${exp.company}-${exp.position}-${exp.startDate}`}
              className="relative pl-8 pb-8 last:pb-0"
            >
              {/* Gradient timeline line */}
              <div className="absolute left-0 top-4 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-pink-500/50 to-transparent last:hidden" />

              {/* Glowing timeline dot */}
              <div
                className="absolute left-[-7px] top-3 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-background"
                style={{ animation: "timeline-glow 3s ease-in-out infinite", animationDelay: `${expIdx * 0.5}s` }}
              />

              <div className="@container/card group relative bg-card border border-border hover:border-purple-500/30 rounded-xl p-4 @md/card:p-6 hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] transition-all duration-300 overflow-hidden">
                {/* Top gradient accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.04),transparent_60%)]" />

                <div className="flex flex-col @md/card:flex-row @md/card:items-start gap-4 mb-4">
                  {exp.companyLogo && (
                    <div className="relative w-12 h-12 @md/card:w-16 @md/card:h-16 rounded-xl overflow-hidden border border-purple-500/20 shrink-0 group-hover:border-purple-500/40 transition-colors">
                      <Image
                        src={urlFor(exp.companyLogo).width(64).height(64).url()}
                        alt={`${exp.company} company logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl @md/card:text-2xl font-semibold line-clamp-2 group-hover:text-purple-400 transition-colors">
                      {exp.position}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <p className="text-base @md/card:text-lg font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent truncate">
                        {exp.company}
                      </p>
                      {exp.employmentType && (
                        <>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-xs @md/card:text-sm text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
                            {exp.employmentType}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs @md/card:text-sm text-muted-foreground">
                      <span>
                        {exp.startDate && formatDate(exp.startDate)} –{" "}
                        {exp.current
                          ? <span className="text-green-400 font-medium">Present</span>
                          : exp.endDate
                            ? formatDate(exp.endDate)
                            : "N/A"}
                      </span>
                      {exp.location && (
                        <>
                          <span>•</span>
                          <span className="truncate">{exp.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {exp.description && (
                  <div className="text-muted-foreground mb-4 text-sm @md/card:text-base">
                    <PortableText value={exp.description} />
                  </div>
                )}

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm @md/card:text-base flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 inline-block" />
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-1 text-muted-foreground text-xs @md/card:text-sm">
                      {exp.responsibilities.map((resp: any, idx: number) => (
                        <li key={`${exp.company}-resp-${idx}`} className="flex items-start gap-2">
                          <span className="text-purple-400 mt-0.5 flex-shrink-0">▸</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm @md/card:text-base flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 inline-block" />
                      Achievements
                    </h4>
                    <ul className="space-y-1 text-muted-foreground text-xs @md/card:text-sm">
                      {exp.achievements.map((achievement: any, idx: number) => (
                        <li key={`${exp.company}-achievement-${idx}`} className="flex items-start gap-2">
                          <span className="text-pink-400 mt-0.5 flex-shrink-0">✦</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 @md/card:gap-2 mt-4 pt-4 border-t border-border/50">
                    {exp.technologies.map((tech: any, techIdx: number) => {
                      const techData =
                        tech && typeof tech === "object" && "name" in tech
                          ? tech
                          : null;
                      return techData?.name ? (
                        <span
                          key={`${exp.company}-tech-${techIdx}`}
                          className="px-2 py-0.5 @md/card:px-3 @md/card:py-1 text-xs rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 border border-purple-500/20 font-medium"
                        >
                          {techData.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}