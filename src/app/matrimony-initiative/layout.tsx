import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matrimony Initiative",
  description:
    "Thanks to generous supporters, the YoungMinds ET Matrimony Initiative raised funds to provide students with essential educational resources.",
  alternates: { canonical: "/matrimony-initiative" },
};

export default function MatrimonyInitiativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
