export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-20 bg-white dark:bg-neutral-900 overflow-hidden">
      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-500/15 to-transparent dark:from-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-red-500/15 to-transparent dark:from-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Experience</h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-600 dark:text-neutral-300">
            Experience section content will be loaded from Sanity CMS.
          </p>
        </div>
      </div>
    </section>
  );
}