import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/child-rm-bg.jpg"
          alt="Children in Ethiopia"
          fill
          priority
          className="object-cover object-center w-full h-full brightness-[0.7]"
          sizes="100vw"
          quality={100}
        />
      </div>

      <div className="relative z-10 container px-4 md:px-6 mx-auto">
        <div className="max-w-[800px] mx-auto text-center space-y-6 md:space-y-8">
          <div className="inline-flex px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-sm font-medium text-white tracking-wide">
              EMPOWERING ETHIOPIA'S STUDENTS
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">
            Unlocking Potential,{" "}
            <span className="text-primary/90 block mt-2">
              One Student at a Time
            </span>
          </h1>

          <p className="text-base md:text-lg text-white/80 max-w-[600px] mx-auto leading-relaxed">
            Empowering students in need across Ethiopia with education and
            opportunities, creating lasting change and brighter futures.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[160px] h-11 bg-primary hover:bg-primary/90 text-white rounded-lg 
                         transition-all duration-200 shadow-lg hover:shadow-primary/25"
              asChild
            >
              <Link href="#donate">Donate Now</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[160px] h-11 border-white/20 bg-white/10 hover:bg-white/20 
                         text-white rounded-lg backdrop-blur-sm transition-all duration-200"
              asChild
            >
              <Link href="#about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/10 pointer-events-none" />
    </section>
  );
}
