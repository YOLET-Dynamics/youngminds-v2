import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { QRCodeDialog } from "@/components/QRCodeDialog";
import { stripeLinks } from "@/lib/stripe-links";
import { BadgeCheck, ShieldCheck, HeartHandshake } from "lucide-react";

const trustSignals = [
  {
    icon: BadgeCheck,
    title: "Tax-deductible",
    desc: "YoungMinds ET is a registered 501(c)(3) nonprofit.",
  },
  {
    icon: ShieldCheck,
    title: "Secure payment",
    desc: "Every gift is processed safely through Stripe.",
  },
  {
    icon: HeartHandshake,
    title: "Direct impact",
    desc: "Your gift goes straight to students' education.",
  },
];

export const metadata = {
  title: "Donate",
  description:
    "Make a difference in a child's life. Support education in Ethiopia through one-time donations or monthly subscriptions.",
  alternates: { canonical: "/donate" },
};

export default function DonatePage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center px-4 sm:px-6 md:px-8 
                   py-16 sm:py-20 md:py-24 max-w-7xl mx-auto mt-16 sm:mt-20 md:mt-32"
    >
      <div className="text-left mb-8 space-y-3 sm:space-y-4 w-full">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold
                    bg-gradient-to-r from-primary to-primary/60
                    bg-clip-text text-transparent
                    tracking-tight leading-tight"
        >
          Support a Student's Future
        </h1>
        <p
          className="text-base sm:text-lg text-muted-foreground
                   max-w-3xl leading-relaxed"
        >
          Your gift gives students in Ethiopia the tools to stay in school and
          thrive—school supplies, textbooks, and the mentorship to keep going.
          Give once, or give monthly to create lasting change.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full mb-8 sm:mb-12 md:mb-16">
        {trustSignals.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-start gap-3 rounded-xl border border-border/60 bg-secondary/50 p-4"
          >
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full">
        <Card
          className="group transition-all duration-300 hover:-translate-y-1 
                      hover:shadow-xl border-border/60 flex flex-col"
        >
          <CardHeader className="pb-3 sm:pb-4">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Subscription
            </h3>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            <div className="flex-1">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Join us in making a lasting impact by supporting children in need
                with a monthly gift. Your ongoing generosity will provide them
                with continuous support and the chance to thrive.
              </p>
            </div>
            <div className="mt-6">
              <Link href="/donate/subscribe" className="w-full sm:w-auto">
                <Button
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 h-10 sm:h-11
                              text-sm sm:text-base font-medium transition-all duration-200"
                >
                  Subscribe
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card
          className="group transition-all duration-300 hover:-translate-y-1 
                      hover:shadow-xl border-border/60 flex flex-col"
        >
          <CardHeader className="pb-3 sm:pb-4">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              One-time
            </h3>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            <div className="flex-1">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Make a difference today—your one-time gift can help a child in
                need take a step closer to a brighter future.
              </p>
            </div>
            <div className="flex items-center mt-6">
              <Link
                href={stripeLinks.oneTimeDonation}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 h-10 sm:h-11
                              text-sm sm:text-base font-medium transition-all duration-200"
                >
                  Donate Now
                </Button>
              </Link>
              <QRCodeDialog url={stripeLinks.oneTimeDonation} title="Make a One-time Donation" />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
