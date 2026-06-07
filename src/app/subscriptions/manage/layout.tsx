import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Your Subscription",
  description:
    "Update or cancel your recurring donation to YoungMinds ET, or manage it yourself through Stripe's secure portal.",
  alternates: { canonical: "/subscriptions/manage" },
};

export default function ManageSubscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
