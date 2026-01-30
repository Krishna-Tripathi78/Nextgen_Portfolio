export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 bg-gray-50 dark:bg-neutral-900 overflow-hidden">
      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">About Me</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground">
            About section.
          </p>
        </div>
      </div>
    </section>
  );
}