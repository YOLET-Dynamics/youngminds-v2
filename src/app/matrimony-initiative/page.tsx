import type { Metadata } from "next";
import { PastCampaignPage } from "@/components/site/PastCampaignPage";
import { pastCampaigns } from "@/lib/campaigns";

export const metadata: Metadata = {
  title: "Matrimony Initiative",
  description:
    "The YoungMinds ET Matrimony Initiative raised $641 for students' essential educational resources. Thank you to everyone who gave.",
  alternates: { canonical: "/matrimony-initiative" },
};

export default function MatrimonyInitiativePage() {
  return (
    <PastCampaignPage
      campaign={pastCampaigns[1]}
      title="The Matrimony Initiative met its goal."
      intro="In November 2025 our community raised $641 to support students with essential educational resources and opportunities."
    />
  );
}
