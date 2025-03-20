export const metadata = {
  title: "About Us | YoungMinds ET",
  description:
    "Learn about our mission to provide quality education to underserved students in Ethiopia through sustainable initiatives and technological infrastructure.",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 max-w-7xl mx-auto mt-32">
      <div className="w-full mb-24">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Our Story
        </h2>
        <div className="space-y-6 text-lg text-muted-foreground">
          <p>
            Our mission is to provide underserved students with access to
            quality education through sustainable initiatives supported by
            technological infrastructure and innovative learning tools.
          </p>
          <p>
            We believe that every child deserves the chance to learn and grow,
            regardless of their circumstances, and we are committed to bridging
            the gap in education by tapping into available tools and
            opportunities.
          </p>
          <p>
            By fostering a sense of community and collaboration, we aim to level
            the playing field for underserved children. Through partnerships,
            innovative approaches, and shared resources, we strive to create an
            environment where all students can thrive and reach their full
            potential.
          </p>
        </div>
      </div>

      <div className="w-full text-center bg-gradient-to-br from-slate-900/5 to-slate-800/10 rounded-3xl p-12 shadow-xl mt-8 border border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Vision
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Our vision is to create a future where education unlocks limitless
            potential, empowering every child in Ethiopia and beyond to achieve
            a better quality of life without barriers.
          </p>
        </div>
      </div>
    </main>
  );
}
