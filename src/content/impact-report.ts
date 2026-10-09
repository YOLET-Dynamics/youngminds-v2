/**
 * 2025–2026 annual report content. The /impact page renders only what is filled in:
 * leave a value as null (or a list empty) until it is confirmed, and that part stays hidden.
 */

export type ReportStat = { value: string; label: string };
export type ReportAllocation = { label: string; percent: number };
export type ReportProgram = { pillar: "housing" | "food" | "education" | "vision"; title: string; summary: string | null };
export type ReportStory = { quote: string; name: string; image: { src: string; alt: string } | null };
export type ReportMilestone = { status: "done" | "in-progress" | "next"; text: string };
export type ReportDocument = { href: string; sizeLabel: string };

export type ImpactReport = {
  period: string;
  intro: string;
  /** Full report PDF in /public/reports. */
  pdf: ReportDocument | null;
  stats: ReportStat[];
  /** Share of funds spent per area. Percentages should add up to 100. */
  allocation: ReportAllocation[];
  programs: ReportProgram[];
  stories: ReportStory[];
  vision: { year: number; of: number; milestones: ReportMilestone[] } | null;
  archive: { title: string; href: string }[];
};

export const impactReport: ImpactReport = {
  period: "2025–2026",
  intro: "What your gifts made possible this year, where the money went, and how far we are toward our five-year vision.",
  pdf: null,
  stats: [{ value: "$641", label: "Raised in the Matrimony Initiative" }],
  allocation: [],
  programs: [
    { pillar: "housing", title: "Housing", summary: null },
    { pillar: "food", title: "Food & care", summary: null },
    { pillar: "education", title: "Education", summary: null },
    { pillar: "vision", title: "5-year vision", summary: null },
  ],
  stories: [],
  vision: null,
  archive: [],
};
