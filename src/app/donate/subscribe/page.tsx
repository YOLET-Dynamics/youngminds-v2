import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { QRCodeDialog } from "@/components/QRCodeDialog";

export const metadata = {
  title: "Subscribe | YoungMinds ET",
  description:
    "Support education in Ethiopia through monthly donations. Choose from different subscription tiers to make a lasting impact.",
};

export default function SubscribePage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center px-4 sm:px-6 md:px-8 
                   py-16 sm:py-20 md:py-24 max-w-7xl mx-auto mt-16 sm:mt-20 md:mt-32"
    >
      <div className="text-left mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4 w-full">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold 
                    tracking-tight leading-tight"
        >
          Subscribe to our cause
        </h1>
        <p
          className="text-base sm:text-lg text-muted-foreground 
                   max-w-2xl leading-relaxed"
        >
          Your subscription will help us provide underserved students with
          access to quality education in a sustainable way.
        </p>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
                    gap-4 sm:gap-6 md:gap-8 w-full"
      >
        <Card
          className="group transition-all duration-300 hover:-translate-y-1 
                      hover:shadow-xl border-border/60 flex flex-col"
        >
          <CardHeader className="pb-3 sm:pb-4 space-y-2">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Beginner Support
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-primary">
              $3/month
            </p>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            <div className="flex-1">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Your monthly gift of $3 can help contribute to basic educational
                needs for a student.
              </p>
            </div>
            <div className="flex items-center mt-6">
              <Link
                href="https://donate.stripe.com/28EfZhbxF6JH2kKdXMdjO0d"
                target="_blank"
                className="flex-1"
              >
                <Button
                  className="w-full bg-gradient-to-r from-slate-900 to-slate-700 
                              hover:opacity-90 text-white py-2 px-4 h-10 sm:h-11
                              text-sm sm:text-base font-medium
                              active:scale-98 transition-all duration-200"
                >
                  Subscribe Now
                </Button>
              </Link>
              <QRCodeDialog
                url="https://donate.stripe.com/28EfZhbxF6JH2kKdXMdjO0d"
                title="Subscribe to Basic Support"
              />
            </div>
          </CardContent>
        </Card>
        {/* Basic Support Card */}
        <Card
          className="group transition-all duration-300 hover:-translate-y-1 
                      hover:shadow-xl border-border/60 flex flex-col"
        >
          <CardHeader className="pb-3 sm:pb-4 space-y-2">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Basic Support
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-primary">
              $10/month
            </p>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            <div className="flex-1">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Your monthly gift of $10 can help provide basic school supplies
                to a child in need.
              </p>
            </div>
            <div className="flex items-center mt-6">
              <Link
                href="https://donate.stripe.com/eVaeVp84O3yYcqk5ks"
                target="_blank"
                className="flex-1"
              >
                <Button
                  className="w-full bg-gradient-to-r from-slate-900 to-slate-700 
                              hover:opacity-90 text-white py-2 px-4 h-10 sm:h-11
                              text-sm sm:text-base font-medium
                              active:scale-98 transition-all duration-200"
                >
                  Subscribe Now
                </Button>
              </Link>
              <QRCodeDialog
                url="https://donate.stripe.com/eVaeVp84O3yYcqk5ks"
                title="Subscribe to Basic Support"
              />
            </div>
          </CardContent>
        </Card>

        {/* Regular Support Card */}
        <Card
          className="group transition-all duration-300 hover:-translate-y-1 
                      hover:shadow-xl border-border/60 flex flex-col"
        >
          <CardHeader className="pb-3 sm:pb-4 space-y-2">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Regular Support
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-primary">
              $25/month
            </p>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            <div className="flex-1">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Your monthly gift of $25 can help provide textbooks and learning
                materials to students.
              </p>
            </div>
            <div className="flex items-center mt-6">
              <Link
                href="https://donate.stripe.com/7sI4gLgBk8TieyscMV"
                target="_blank"
                className="flex-1"
              >
                <Button
                  className="w-full bg-gradient-to-r from-slate-900 to-slate-700 
                              hover:opacity-90 text-white py-2 px-4 h-10 sm:h-11
                              text-sm sm:text-base font-medium
                              active:scale-98 transition-all duration-200"
                >
                  Subscribe Now
                </Button>
              </Link>
              <QRCodeDialog
                url="https://donate.stripe.com/7sI4gLgBk8TieyscMV"
                title="Subscribe to Regular Support"
              />
            </div>
          </CardContent>
        </Card>

        {/* Champion Support Card */}
        <Card
          className="group transition-all duration-300 hover:-translate-y-1 
                      hover:shadow-xl border-border/60 flex flex-col"
        >
          <CardHeader className="pb-3 sm:pb-4 space-y-2">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Champion Support
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-primary">
              $50/month
            </p>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            <div className="flex-1">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Your monthly gift of $50 can help provide comprehensive
                educational support to multiple students.
              </p>
            </div>
            <div className="flex items-center mt-6">
              <Link
                href="https://donate.stripe.com/14k14z2Ku3yY1LG8wG"
                target="_blank"
                className="flex-1"
              >
                <Button
                  className="w-full bg-gradient-to-r from-slate-900 to-slate-700 
                              hover:opacity-90 text-white py-2 px-4 h-10 sm:h-11
                              text-sm sm:text-base font-medium
                              active:scale-98 transition-all duration-200"
                >
                  Subscribe Now
                </Button>
              </Link>
              <QRCodeDialog
                url="https://donate.stripe.com/14k14z2Ku3yY1LG8wG"
                title="Subscribe to Champion Support"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
