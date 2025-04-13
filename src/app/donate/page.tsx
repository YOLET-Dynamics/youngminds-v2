import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { QRCodeDialog } from "@/components/QRCodeDialog";

export const metadata = {
  title: "Donate | YoungMinds ET",
  description:
    "Make a difference in a child's life. Support education in Ethiopia through one-time donations or monthly subscriptions.",
};

export default function DonatePage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center px-4 sm:px-6 md:px-8 
                   py-16 sm:py-20 md:py-24 max-w-7xl mx-auto mt-16 sm:mt-20 md:mt-32"
    >
      <div className="text-left mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4 w-full">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold 
                    bg-gradient-to-r from-emerald-700 to-green-600 
                    bg-clip-text text-transparent
                    tracking-tight leading-tight"
        >
          Be Part of It
        </h1>
        <p
          className="text-base sm:text-lg text-muted-foreground 
                   max-w-3xl leading-relaxed"
        >
          Your donation can be the bridge that turns a child's struggle into
          success, offering them hope and a brighter future. Together, we can
          give these children the tools they need to build a better tomorrow—one
          backpack, one book, one dream at a time.
        </p>
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
                  className="w-full sm:w-auto bg-gradient-to-r from-slate-900 to-slate-700 
                              hover:opacity-90 text-white py-2 px-4 h-10 sm:h-11
                              text-sm sm:text-base font-medium
                              active:scale-98 transition-all duration-200"
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
                href="https://donate.stripe.com/14k00vetc5H6eys14f"
                target="_blank"
                className="flex-1"
              >
                <Button
                  className="w-full bg-gradient-to-r from-slate-900 to-slate-700 
                              hover:opacity-90 text-white py-2 px-4 h-10 sm:h-11
                              text-sm sm:text-base font-medium
                              active:scale-98 transition-all duration-200"
                >
                  Donate Now
                </Button>
              </Link>
              <QRCodeDialog url="https://donate.stripe.com/14k00vetc5H6eys14f" title="Make a One-time Donation" />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
