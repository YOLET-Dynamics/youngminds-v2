import type { Metadata } from "next";
import { FactList } from "@/components/site/blocks";
import { JoinForm } from "@/components/site/JoinForm";

export const metadata: Metadata = {
  title: "Join us",
  description:
    "Volunteer with YoungMinds ET: help at events, share your skills, or connect us with partners in the DMV and Ethiopia.",
  alternates: { canonical: "/join" },
};

export default function JoinPage() {
  return (
    <section className="hero">
      <div className="wrap split split-5-7 items-start">
        <div className="stack">
          <p className="eyebrow">Join our mission</p>
          <h1 className="display">Lend a hand, not just a dollar.</h1>
          <p className="lead">Help at events, share your skills, or connect us with partners in the DMV and Ethiopia.</p>
          <FactList
            emphasis="value"
            items={[
              { icon: "calendar", label: "Event volunteers", value: "Set up, welcome guests, run the donation table." },
              { icon: "book", label: "Skills", value: "Design, photography, tutoring, translation." },
              { icon: "heart", label: "Ambassadors", value: "Bring YoungMinds ET to your church, school or work." },
            ]}
          />
        </div>
        <JoinForm />
      </div>
    </section>
  );
}
