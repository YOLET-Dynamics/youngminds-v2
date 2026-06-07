import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Us",
  description:
    "Get involved with YoungMinds ET. Join our mission to bring quality education to underserved students across Ethiopia.",
  alternates: { canonical: "/join" },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
