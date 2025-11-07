"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MatrimonyInitiativePage() {
  const goalAmount = 2000;
  const [totalRaised, setTotalRaised] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchTotal() {
      try {
        setIsLoading(true);
        // Sum donations from Nov 1, 2025 onward
        const response = await fetch(
          `/api/donations?campaign=all&totalOnly=true&since=2025-11-01`,
          {
          cache: "no-store",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to load total raised");
        }
        const data = await response.json();
        if (isMounted && typeof data.total === "number") {
          setTotalRaised(data.total);
        }
      } catch (err: any) {
        if (isMounted) setLoadError(err?.message || "Unexpected error");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchTotal();
    return () => {
      isMounted = false;
    };
  }, []);

  const progress = Math.min((totalRaised / goalAmount) * 100, 100);

  return (
    <div className="min-h-screen pt-40 pb-16">
      <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left Column: Content */}
          <div className="lg:col-span-3">
            {/* Header Section */}
            <div className="text-center lg:text-left mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
                Matrimony Initiative
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                A dedicated campaign to support students with essential educational resources and
                opportunities. Beginning November 2, 2025 — ongoing.
              </p>
            </div>

            {/* Fundraising Section */}
            <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg mb-12">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Help Us Reach the Goal</h2>
                  <p className="text-muted-foreground">
                    Your generosity equips students to learn, grow, and thrive.
                  </p>
                </div>
                <div className="text-right mt-4 sm:mt-0">
                  <p className="text-3xl font-bold text-green-600">
                    {isLoading ? "Loading…" : `$${totalRaised.toFixed(2)}`}
                  </p>
                  <p className="text-sm text-muted-foreground">of ${goalAmount} goal raised</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-4 bg-muted rounded-full overflow-hidden mb-6" aria-label="progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
                <div
                  className="h-full bg-green-500 transition-all duration-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://donate.stripe.com/7sYaEX8lt2tr8J86vkdjO0f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
                >
                  Donate via Stripe
                </a>
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground font-medium transition-colors"
                >
                  Other Ways to Give
                </Link>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-6 text-muted-foreground">
              <p>
                This initiative advances our mission to empower students through education,
                mentorship, and sustainable support. Every contribution helps provide supplies,
                tuition assistance, and programs that open doors to brighter futures.
              </p>
              {loadError ? (
                <p className="text-sm text-red-600">{loadError}</p>
              ) : null}
              <p>
                Share the campaign with friends and family to amplify the impact. Together, we can
                reach more students and build momentum for lasting change.
              </p>
            </div>
          </div>

          {/* Right Column: Visual Placeholder */}
          <div className="lg:col-span-2">
            <div className="sticky top-40">
              <div className="w-full aspect-[16/9] rounded-lg shadow-xl bg-gradient-to-br from-emerald-700/15 to-green-600/15 border border-border/60 flex items-center justify-center">
                <span className="text-muted-foreground">Campaign image coming soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


