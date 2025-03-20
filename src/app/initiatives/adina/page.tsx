import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Users, Handshake } from "lucide-react";
import Link from "next/link";
export const metadata = {
  title: "Adina Project | Initiatives",
  description:
    "A Christ-centered initiative dedicated to raising children in Ethiopia with love, wisdom, and purpose through education and spiritual guidance.",
};

export default function AdinaProjectPage() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 max-w-7xl mx-auto mt-32">
      <div className="text-left mb-16 space-y-4 w-full">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
          Adina Project
        </h1>
        <p className="text-2xl font-semibold text-muted-foreground">
          Raising the Next Generation in Christ
        </p>
        <p className="text-lg text-muted-foreground max-w-3xl">
          The Adina Project is a Christ-centered initiative dedicated to raising
          children with love, wisdom, and purpose. We believe that every child
          deserves to grow in a faith-filled, nurturing environment, surrounded
          by mentors, spiritual guidance, and a family they can rely on.
        </p>
      </div>

      <Card className="w-full mb-16 bg-gradient-to-br from-emerald-700/10 to-green-600/10">
        <CardContent className="p-8 text-center">
          <p className="text-xl italic text-muted-foreground mb-2">
            "Train up a child in the way he should go; even when he is old, he
            will not depart from it."
          </p>
          <p className="text-sm font-semibold">Proverbs 22:6</p>
        </CardContent>
      </Card>

      <div className="w-full mb-16">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Christ-Centered Guidance",
              description:
                "Teaching children the way of Christ, helping them build a strong spiritual foundation and live with faith and integrity.",
              accent: "blue",
              icon: BookOpen,
            },
            {
              title: "Mentorship & Leadership",
              description:
                "Providing role models who guide them in wisdom, discipline, and purpose, following Jesus' example of servant leadership.",
              accent: "green",
              icon: Users,
            },
            {
              title: "A Family in Christ",
              description:
                "Creating a community of love and support, where children feel safe, valued, and encouraged in their faith journey.",
              accent: "purple",
              icon: Heart,
            },
            {
              title: "Serving with Compassion",
              description:
                "Providing essential resources to children in need, ensuring they grow in a nurturing and faith-driven environment.",
              accent: "red",
              icon: Handshake,
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  {item.icon && (
                    <item.icon className={`h-6 w-6 text-${item.accent}-700`} />
                  )}
                  <h3
                    className={`text-xl font-semibold text-${item.accent}-700`}
                  >
                    {item.title}
                  </h3>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-full mb-16">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
          Following Christ's Call to Serve
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Jesus taught us to care for the vulnerable, to love unconditionally,
          and to build each other up in faith. The Adina Project is our response
          to that calling—a mission to raise children in the light of Christ,
          equipping them with wisdom, strength, and a deep relationship with
          God.
        </p>
        <Card className="bg-gradient-to-br from-emerald-700/10 to-green-600/10">
          <CardContent className="p-8 text-center">
            <p className="text-xl italic text-muted-foreground mb-2">
              "Let the little children come to me, and do not hinder them, for
              the kingdom of heaven belongs to such as these."
            </p>
            <p className="text-sm font-semibold">Matthew 19:14</p>
          </CardContent>
        </Card>
      </div>

      <div className="w-full text-center bg-gradient-to-br from-slate-900/5 to-slate-800/10 rounded-3xl p-12 shadow-xl mt-24 border border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Join the Movement
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            The Adina Project is about building a generation rooted in faith,
            love, and purpose. Whether you're a mentor, parent, or someone
            called to serve, we invite you to be part of this journey.
          </p>
          <div className="flex justify-center items-center space-x-4">
            <Link href="/donate">
              <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:opacity-90 text-white text-xl py-8 px-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-semibold cursor-pointer">
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
