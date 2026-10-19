import { formatUsd } from "@/lib/campaigns";

type CampaignTrackerProps = {
  goalCents: number;
  /** Null when the live total could not be loaded. */
  raisedCents: number | null;
  donorCount?: number;
  status?: "live" | "complete";
  raisedLabel?: string;
  size?: "default" | "compact";
};

export function CampaignTracker({
  goalCents,
  raisedCents,
  donorCount,
  status = "live",
  raisedLabel,
  size = "default",
}: CampaignTrackerProps) {
  const raisedClassName = `tracker-raised${size === "compact" ? " text-[2.25rem]" : ""}`;

  if (raisedCents === null) {
    return (
      <div className="tracker">
        <div className="tracker-amount">
          <span className={raisedClassName}>
            Goal {formatUsd(goalCents)}
          </span>
        </div>
        <div className="tracker-meta">
          <span>The live total is temporarily unavailable.</span>
        </div>
      </div>
    );
  }

  const percent = Math.round((raisedCents / goalCents) * 100);
  const fill = Math.min(percent, 100);
  const isComplete = status === "complete" || percent >= 100;
  const raised = raisedLabel ?? formatUsd(raisedCents);

  return (
    <div className={`tracker${isComplete ? " is-complete" : ""}`}>
      <div className="tracker-amount">
        <span className={raisedClassName}>
          {raised}
        </span>
        <span className="tracker-goal">of {formatUsd(goalCents)} goal</span>
      </div>
      <div
        className="tracker-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={fill}
        aria-label={`${raised} raised of ${formatUsd(goalCents)} goal`}
      >
        <div className="tracker-fill" style={{ width: `${fill}%` }} />
      </div>
      <div className="tracker-meta">
        <span>
          <strong>{percent}%</strong> of goal
          {donorCount !== undefined && ` · ${donorCount} ${donorCount === 1 ? "donor" : "donors"}`}
        </span>
        <span>{status === "complete" ? "Final total" : "Recent campaign total"}</span>
      </div>
    </div>
  );
}
