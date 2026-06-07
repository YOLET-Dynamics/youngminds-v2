import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore YoungMinds ET's fundraising events and campaigns supporting education for students in Ethiopia.",
  alternates: { canonical: "/events" },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
