export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-20 bg-gray-50 dark:bg-neutral-900 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Experience</h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-muted-foreground">
            Experience section .
          </p>
        </div>
      </div>
    </section>
  );
}