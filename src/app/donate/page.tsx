import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Donate | YoungMinds ET",
  description:
    "Make a difference in a child's life. Support education in Ethiopia through one-time donations or monthly subscriptions.",
};

export default function DonatePage() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 max-w-7xl mx-auto mt-32">
      <div className="text-left mb-16 space-y-4 w-full">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
          Be Part of It
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Your donation can be the bridge that turns a child's struggle into
          success, offering them hope and a brighter future. Together, we can
          give these children the tools they need to build a better tomorrow—one
          backpack, one book, one dream at a time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <CardHeader>
            <h3 className="text-2xl font-semibold">Subscription</h3>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-muted-foreground">
              Join us in making a lasting impact by supporting children in need
              with a monthly gift. Your ongoing generosity will provide them
              with continuous support and the chance to thrive.
            </p>
            <Link href="/donate/subscribe">
              <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:opacity-90 text-white py-2 px-4">
                Subscribe
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <CardHeader>
            <h3 className="text-2xl font-semibold">One-time</h3>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-muted-foreground">
              Make a difference today—your one-time gift can help a child in
              need take a step closer to a brighter future.
            </p>
            <Link
              href="https://donate.stripe.com/7sI9B53Oy4D29e8cMS"
              target="_blank"
            >
              <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:opacity-90 text-white py-2 px-4 cursor-pointer">
                Donate Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
