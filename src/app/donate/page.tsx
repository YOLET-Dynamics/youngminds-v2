import type { Metadata } from "next";
import { DonateForm } from "@/components/site/DonateForm";
import { DonateQr } from "@/components/site/DonateQr";
import { FactList } from "@/components/site/blocks";
import { designations, parseDesignation } from "@/lib/campaigns";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Give once or monthly to fund housing, food and care, and education for students in need across Ethiopia. Tax-deductible and secure via Stripe.",
  alternates: { canonical: "/donate" },
};

export default async function DonatePage({ searchParams }: PageProps<"/donate">) {
  const campaign = parseDesignation((await searchParams).campaign);
  const donatePath = campaign ? `/donate?campaign=${campaign}` : "/donate";

  return (
    <>
      <section className="hero">
        <div className="wrap grid items-start gap-12 min-[900px]:grid-cols-2 min-[900px]:gap-x-16">
          <div className="stack min-[900px]:col-start-1">
            <p className="eyebrow">Donate</p>
            <h1 className="display">Support a student’s future.</h1>
            <p className="lead">Your gift funds housing, food and care, and education for students in Ethiopia.</p>
          </div>

          <div className="grid gap-6 min-[900px]:col-start-2 min-[900px]:row-span-2 min-[900px]:row-start-1">
            <DonateForm campaign={campaign} campaignName={campaign ? designations[campaign].name : undefined} />
            <div className="hidden md:flex items-center gap-4 px-2">
              <DonateQr url={`${siteConfig.url}${donatePath}`} size={96} />
              <p className="small muted">On a computer? Scan with your phone to give with Apple Pay or Google Pay.</p>
            </div>
          </div>

          <div className="min-[900px]:col-start-1">
            <FactList
              label="Why give with us"
              emphasis="value"
              items={[
                {
                  icon: "receipt",
                  label: "Tax-deductible",
                  value: `${siteConfig.legalName} is a US 501(c)(3). You’ll get a receipt by email.`,
                },
                { icon: "shield", label: "Secure via Stripe", value: "We never see or store your card details." },
                { icon: "heart", label: "Direct impact", value: "Gifts go to students’ housing, meals, care and school." },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section-tight band-white">
        <div className="wrap center stack-sm">
          <p className="small muted">
            Questions about your gift? <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </div>
      </section>
    </>
  );
}
