import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Subscribe | YoungMinds ET",
  description:
    "Support education in Ethiopia through monthly donations. Choose from different subscription tiers to make a lasting impact.",
};

export default function SubscribePage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 sm:px-6 md:px-8 
                   py-16 sm:py-20 md:py-24 max-w-7xl mx-auto mt-16 sm:mt-20 md:mt-32">
      <div className="text-left mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4 w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold 
                    tracking-tight leading-tight">
          Subscribe to our cause
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground 
                   max-w-2xl leading-relaxed">
          Your subscription will help us provide underserved students with
          access to quality education in a sustainable way.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                    gap-4 sm:gap-6 md:gap-8 w-full">
        {/* Basic Support Card */}
        <Card className="group transition-all duration-300 hover:-translate-y-1 
                      hover:shadow-xl border-border/60">
          <CardHeader className="pb-3 sm:pb-4 space-y-2">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Basic Support
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-primary">
              $10/month
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:gap-6">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Your monthly gift of $10 can help provide basic school supplies to
              a child in need.
            </p>
            <Link
              href="https://buy.stripe.com/5kAcNh4SCb1q3TOaEH"
              target="_blank"
              className="w-full"
            >
              <Button className="w-full bg-gradient-to-r from-slate-900 to-slate-700 
                              hover:opacity-90 text-white py-2 px-4 h-10 sm:h-11
                              text-sm sm:text-base font-medium
                              active:scale-98 transition-all duration-200">
                Subscribe Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Regular Support Card */}
        <Card className="group transition-all duration-300 hover:-translate-y-1 
                      hover:shadow-xl border-border/60">
          <CardHeader className="pb-3 sm:pb-4 space-y-2">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Regular Support
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-primary">
              $25/month
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:gap-6">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Your monthly gift of $25 can help provide textbooks and learning
              materials to students.
            </p>
            <Link
              href="https://buy.stripe.com/aEUaF9etc9Xm0HCcMT"
              target="_blank"
              className="w-full"
            >
              <Button className="w-full bg-gradient-to-r from-slate-900 to-slate-700 
                              hover:opacity-90 text-white py-2 px-4 h-10 sm:h-11
                              text-sm sm:text-base font-medium
                              active:scale-98 transition-all duration-200">
                Subscribe Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Champion Support Card */}
        <Card className="group transition-all duration-300 hover:-translate-y-1 
                      hover:shadow-xl border-border/60 
                      sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-3 sm:pb-4 space-y-2">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Champion Support
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-primary">
              $50/month
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:gap-6">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Your monthly gift of $50 can help provide comprehensive
              educational support to multiple students.
            </p>
            <Link
              href="https://buy.stripe.com/3cs8x11Gq8TigGA6ot"
              target="_blank"
              className="w-full"
            >
              <Button className="w-full bg-gradient-to-r from-slate-900 to-slate-700 
                              hover:opacity-90 text-white py-2 px-4 h-10 sm:h-11
                              text-sm sm:text-base font-medium
                              active:scale-98 transition-all duration-200">
                Subscribe Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
