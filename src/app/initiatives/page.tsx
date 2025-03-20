import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Our Initiatives | YoungMinds ET",
  description:
    "Discover our projects and partnerships helping shape the future of Ethiopia's youth through education and sustainable development.",
};

export default function Initiatives() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 max-w-7xl mx-auto mt-32">
      <div className="text-left mb-16 space-y-4 w-full">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
          Our Initiatives
        </h1>
        <p className="text-lg text-muted-foreground mx-auto">
          Discover the projects and partnerships that are helping us shape the
          future of Ethiopia&apos;s youth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <Card className="group transition-all duration-300 overflow-hidden p-0 pb-6 hover:-translate-y-1 hover:shadow-xl">
          {/* Optional image - can be removed if no image available */}
          {/* <div className="aspect-video w-full">
            <img 
              src="/path-to-image.jpg" 
              alt="Adina Project"
              className="w-full h-full object-cover"
            />
          </div> */}

          <div className="aspect-[21/9] w-full bg-gradient-to-br from-emerald-700/10 to-green-600/10 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from)_0%,_var(--tw-gradient-to)_100%)] from-emerald-700/20 to-green-600/20 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                Adina Project
              </span>
            </div>
          </div>

          <CardHeader>
            <h3 className="text-2xl font-semibold">Adina Project</h3>
            <p className="text-muted-foreground">
              Christ-centered initiative, dedicated to raising children with
              love, wisdom and purpose
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              The Adina Project is a Christ-centered initiative dedicated to
              raising children with love, wisdom, and purpose. We believe
              that...
            </p>
            <Link href="/initiatives/adina">
              <Button className="bg-gradient-to-r from-emerald-700 to-green-600 hover:opacity-90 w-full sm:w-auto text-white cursor-pointer">
                Learn More
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
