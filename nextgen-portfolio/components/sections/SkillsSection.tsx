export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-20 bg-gray-50 dark:bg-neutral-950 overflow-hidden">
      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-96 bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-transparent blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-full h-96 bg-gradient-to-l from-teal-500/20 via-blue-500/10 to-transparent blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Skills</h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-600 dark:text-neutral-300">
            Skills section content will be loaded from Sanity CMS.
          </p>
        </div>
      </div>
    </section>
  );
}