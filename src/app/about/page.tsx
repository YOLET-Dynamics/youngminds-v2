export const metadata = {
  title: "About Us | YoungMinds ET",
  description:
    "Learn about our mission to provide quality education to underserved students in Ethiopia through sustainable initiatives and technological infrastructure.",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 max-w-7xl mx-auto mt-16 sm:mt-24 md:mt-32">
      <div className="w-full mb-12 sm:mb-16 md:mb-24">
        <div className="max-w-[85ch] mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 
                       bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent
                       tracking-tight leading-tight">
            Our Story
          </h2>
          <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground">
            <p className="leading-relaxed">
              Our mission is to provide underserved students with access to
              quality education through sustainable initiatives supported by
              technological infrastructure and innovative learning tools.
            </p>
            <p className="leading-relaxed">
              We believe that every child deserves the chance to learn and grow,
              regardless of their circumstances, and we are committed to bridging
              the gap in education by tapping into available tools and
              opportunities.
            </p>
            <p className="leading-relaxed">
              By fostering a sense of community and collaboration, we aim to level
              the playing field for underserved children. Through partnerships,
              innovative approaches, and shared resources, we strive to create an
              environment where all students can thrive and reach their full
              potential.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full text-center bg-gradient-to-br from-slate-900/5 to-slate-800/10 
                    rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg sm:shadow-xl 
                    mt-8 border border-slate-200/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 
                       bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent
                       tracking-tight leading-tight">
            Vision
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 md:mb-12 
                     max-w-3xl mx-auto leading-relaxed px-2">
            Our vision is to create a future where education unlocks limitless
            potential, empowering every child in Ethiopia and beyond to achieve
            a better quality of life without barriers.
          </p>
        </div>
      </div>
    </main>
  );
}
