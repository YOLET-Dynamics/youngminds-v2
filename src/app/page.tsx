import Hero from "@/components/ui/Hero";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, HeartHandshake } from "lucide-react";

const impact = [
  {
    amount: "$10",
    title: "School supplies",
    desc: "Provides essential school supplies to a student in need.",
    icon: BookOpen,
  },
  {
    amount: "$25",
    title: "Textbooks & materials",
    desc: "Equips students with textbooks and the materials they need to learn.",
    icon: GraduationCap,
  },
  {
    amount: "$50",
    title: "Comprehensive support",
    desc: "Helps fund ongoing educational support for multiple students.",
    icon: HeartHandshake,
  },
];

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Hero />

        {/* Mission */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <span className="text-sm font-medium uppercase tracking-wide text-primary">
            Our mission
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            Every child deserves the chance to learn and grow.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            YoungMinds ET provides underserved students across Ethiopia with
            quality education through sustainable initiatives—bridging the gap
            with the tools, resources, and mentorship they need to thrive.
          </p>
        </section>

        {/* Where your gift goes */}
        <section className="bg-secondary/60 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <div className="max-w-2xl mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                Where your gift goes
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Every contribution turns directly into opportunity for a student
                in need.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {impact.map(({ amount, title, desc, icon: Icon }) => (
                <Card key={amount} className="border-border/60">
                  <CardContent className="p-6 sm:p-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-brand-accent-foreground">
                      {amount}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="rounded-3xl bg-primary text-primary-foreground px-6 sm:px-12 py-14 sm:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight max-w-2xl mx-auto">
              Be the reason a student stays in school.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-primary-foreground/80 max-w-xl mx-auto leading-relaxed">
              Your support—one-time or monthly—creates lasting change for
              students across Ethiopia.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto min-w-[160px]"
              >
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto min-w-[160px] border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link href="/join">Join Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
