import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

const ABOUT_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  fullBio,
  yearsOfExperience,
  stats,
  email,
  phone,
  location
}`);

export async function AboutSection() {
  const { data: profile } = await sanityFetch({ query: ABOUT_QUERY });

  if (!profile) {
    return null;
  }

  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-heading">About Me</h2>
          <p className="text-xl text-muted-foreground">Get to know me better</p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {profile.fullBio && (
            <PortableText
              value={profile.fullBio}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-2xl font-semibold mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="relative border-l-4 border-transparent pl-4 italic my-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-full before:bg-gradient-to-b before:from-purple-500 before:to-pink-500">
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                  link: ({ children, value }) => {
                    const href = value?.href || "";
                    const isExternal = href.startsWith("http");
                    return (
                      <Link
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="text-purple-500 hover:text-pink-500 transition-colors hover:underline"
                      >
                        {children}
                      </Link>
                    );
                  },
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
                      {children}
                    </ol>
                  ),
                },
              }}
            />
          )}
        </div>

        {/* Stats from CMS */}
        {profile.stats && profile.stats.length > 0 && (
          <div className="@container mt-12 pt-12 border-t border-purple-500/10">
            <div className="grid grid-cols-2 @lg:grid-cols-4 gap-6">
              {profile.stats.map((stat: any, idx: number) => (
                <div
                  key={`${stat.label}-${idx}`}
                  className="group relative @container/stat text-center p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-pink-500/5 hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-300 glow-border"
                  style={{ ["--i" as string]: idx }}
                >
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="text-3xl @md/stat:text-4xl font-bold mb-2 gradient-heading">
                    {stat.value}
                  </div>
                  <div className="text-xs @md/stat:text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}