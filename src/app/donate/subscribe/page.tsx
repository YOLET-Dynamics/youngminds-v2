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
    <main className="flex min-h-screen flex-col items-center py-24 max-w-7xl mx-auto mt-32">
      <div className="text-left mb-16 space-y-4 w-full">
        <h1 className="font-display font-semibold text-3xl lg:text-4xl xl:text-6xl">
          Subscribe to our cause
        </h1>
        <p className="font-body font-normal text-sm xl:text-lg xl:leading-10 lg:w-1/2">
          Your subscription will help us provide underserved students with
          access to quality education in a sustainable way.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <CardHeader>
            <h3 className="text-2xl font-semibold">Basic Support</h3>
            <p className="text-3xl font-bold">$10/month</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-muted-foreground">
              Your monthly gift of $10 can help provide basic school supplies to
              a child in need.
            </p>
            <Link
              href="https://buy.stripe.com/5kAcNh4SCb1q3TOaEH"
              target="_blank"
            >
              <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:opacity-90 text-white py-2 px-4 w-full cursor-pointer">
                Subscribe Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <CardHeader>
            <h3 className="text-2xl font-semibold">Regular Support</h3>
            <p className="text-3xl font-bold">$25/month</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-muted-foreground">
              Your monthly gift of $25 can help provide textbooks and learning
              materials to students.
            </p>
            <Link
              href="https://buy.stripe.com/aEUaF9etc9Xm0HCcMT"
              target="_blank"
            >
              <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:opacity-90 text-white py-2 px-4 w-full cursor-pointer">
                Subscribe Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <CardHeader>
            <h3 className="text-2xl font-semibold">Champion Support</h3>
            <p className="text-3xl font-bold">$50/month</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-muted-foreground">
              Your monthly gift of $50 can help provide comprehensive
              educational support to multiple students.
            </p>
            <Link
              href="https://buy.stripe.com/3cs8x11Gq8TigGA6ot"
              target="_blank"
            >
              <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:opacity-90 text-white py-2 px-4 w-full">
                Subscribe Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
