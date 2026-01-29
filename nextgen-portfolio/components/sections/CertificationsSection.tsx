export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative py-20 bg-gray-50 dark:bg-neutral-950 overflow-hidden">
      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-full h-96 bg-gradient-to-l from-amber-500/15 via-yellow-500/10 to-transparent dark:from-amber-500/20 dark:via-yellow-500/15 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-0 w-full h-96 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent dark:from-orange-500/20 dark:via-amber-500/15 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Certifications</h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-600 dark:text-neutral-300">
            Certifications.
          </p>
        </div>
      </div>
    </section>
  );
}