import type { Metadata } from "next";
import { PastCampaignPage } from "@/components/site/PastCampaignPage";
import { pastCampaigns } from "@/lib/campaigns";

export const metadata: Metadata = {
  title: "Fund the Future",
  description:
    "The YoungMinds ET \"Fund the Future\" campaign raised more than $1,000 against a $650 goal. Thank you to everyone who helped.",
  alternates: { canonical: "/fund-the-future" },
};

export default function FundTheFuturePage() {
  return (
    <PastCampaignPage
      campaign={pastCampaigns[0]}
      title="We funded the future."
      intro="Our inaugural campaign set out to raise $650 for essential educational resources. Together, you gave more than $1,000."
    />
  );
}
