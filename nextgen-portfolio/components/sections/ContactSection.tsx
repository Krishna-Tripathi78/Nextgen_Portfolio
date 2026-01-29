export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 bg-gray-50 dark:bg-neutral-950 overflow-hidden">
      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-br from-sky-500/15 to-transparent dark:from-sky-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-gradient-to-tl from-blue-500/15 to-transparent dark:from-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Contact</h2>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-gray-600 dark:text-neutral-300">
            Contact.
          </p>
        </div>
      </div>
    </section>
  );
}