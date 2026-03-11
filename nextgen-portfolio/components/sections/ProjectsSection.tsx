import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { ExternalLink, Github } from "lucide-react";

const PROJECTS_QUERY =
  defineQuery(`*[_type == "project" && featured == true] | order(order asc)[0...6]{
  title,
  slug,
  tagline,
  category,
  liveUrl,
  githubUrl,
  coverImage,
  technologies[]->{name, category, color}
}`);

export async function ProjectsSection() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="py-20 px-6 relative overflow-hidden bg-muted/30">
      {/* Background orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-heading">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground">Some of my best work</p>
        </div>

        <div className="@container">
          <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <div
                key={project.slug?.current}
                className="@container/card group relative bg-card border border-border hover:border-purple-500/30 rounded-xl overflow-hidden hover:shadow-[0_8px_40px_rgba(168,85,247,0.15)] transition-all duration-500 glow-border"
              >
                {/* Project Image */}
                {project.coverImage && (
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <Image
                      src={urlFor(project.coverImage)
                        .width(600)
                        .height(400)
                        .url()}
                      alt={project.title || "Project image"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient overlay replacing blur */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent group-hover:from-background/30 transition-all duration-500" />
                    {/* Category badge floating on image */}
                    {project.category && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
                          {project.category}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Project Content */}
                <div className="p-4 @md/card:p-6 space-y-3 @md/card:space-y-4">
                  {/* If no image, show category here */}
                  {!project.coverImage && project.category && (
                    <span className="text-xs px-2 py-0.5 @md/card:py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 border border-purple-500/20">
                      {project.category}
                    </span>
                  )}

                  <div>
                    <h3 className="text-lg @md/card:text-xl font-semibold mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
                      {project.title || "Untitled Project"}
                    </h3>
                    <p className="text-muted-foreground text-xs @md/card:text-sm line-clamp-2">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 @md/card:gap-2">
                      {project.technologies.slice(0, 4).map((tech: any, idx: number) => {
                        const techData =
                          tech && typeof tech === "object" && "name" in tech
                            ? tech
                            : null;
                        return techData?.name ? (
                          <span
                            key={`${project.slug?.current}-tech-${idx}`}
                            className="text-xs px-2 py-0.5 @md/card:py-1 rounded-md bg-muted hover:bg-purple-500/10 hover:text-purple-400 transition-colors"
                          >
                            {techData.name}
                          </span>
                        ) : null;
                      })}
                      {project.technologies.length > 4 && (
                        <span className="text-xs px-2 py-0.5 @md/card:py-1 rounded-md bg-muted text-muted-foreground">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col @xs/card:flex-row gap-2 @xs/card:gap-3 pt-2">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 @md/card:px-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-md hover:shadow-[0_4px_15px_rgba(168,85,247,0.4)] transition-all duration-300 text-xs @md/card:text-sm font-medium"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-3 py-2 @md/card:px-4 rounded-lg border border-purple-500/30 hover:border-purple-500/70 hover:bg-purple-500/5 transition-all duration-300 text-xs @md/card:text-sm text-center"
                      >
                        <Github className="w-3.5 h-3.5" />
                        GitHub
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
