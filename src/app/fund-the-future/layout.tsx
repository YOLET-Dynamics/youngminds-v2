import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fund the Future",
  description:
    "The YoungMinds ET \"Fund the Future\" campaign reached its goal—thank you to everyone who helped make a direct impact on students' futures.",
  alternates: { canonical: "/fund-the-future" },
};

export default function FundTheFutureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
