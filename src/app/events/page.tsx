"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const events = [
  {
    title: "Fund the Future",
    description:
      "Our inaugural fundraising campaign to provide essential educational resources for students in Ethiopia. Thanks to our amazing community, we successfully raised over $1,000 to support their academic journeys.",
    status: "Completed",
    date: "Spring 2024",
    image: "/fund-the-future-banner.png",
    link: "/fund-the-future",
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen pt-40 pb-16 bg-background">
      <div className="container px-4 sm:px-6 mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Our Events
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our past and upcoming events. Each one is a step towards
            empowering students and building brighter futures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {events.map((event) => (
            <Card
              key={event.title}
              className="group flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={550}
                  className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <CardHeader className="p-0">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-2xl font-semibold">
                      {event.title}
                    </CardTitle>
                    <Badge
                      variant={
                        event.status === "Completed" ? "default" : "secondary"
                      }
                    >
                      {event.status}
                    </Badge>
                  </div>
                  <CardDescription className="pt-2">
                    {event.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0 py-4">
                  <p className="text-muted-foreground">{event.description}</p>
                </CardContent>
                <CardFooter className="p-0">
                  <Button asChild variant="link" className="group/link px-0">
                    <Link
                      href={event.link}
                      className="font-semibold text-primary"
                    >
                      Learn More
                      <ArrowUpRight className="h-4 w-4 ml-1 transition-transform duration-200 group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-4">Stay Tuned</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We are always planning new ways to make a difference. Follow our
            journey and be the first to know about upcoming events.
          </p>
        </div>
      </div>
    </div>
  );
}
