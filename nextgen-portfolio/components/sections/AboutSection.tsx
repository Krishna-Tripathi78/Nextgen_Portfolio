export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">About Me</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground">
            About section content will be loaded from Sanity CMS.
          </p>
        </div>
      </div>
    </section>
  );
}