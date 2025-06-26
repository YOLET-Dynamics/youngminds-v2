"use client";

import Image from "next/image";

export default function FundTheFuture() {
  const goalAmount = 650;
  const totalAmount = 1000;

  const progress = Math.min((totalAmount / goalAmount) * 100, 100);

  return (
    <div className="min-h-screen pt-40 pb-16">
      <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left Column: Content */}
          <div className="lg:col-span-3">
            {/* Header Section */}
            <div className="text-center lg:text-left mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
                We Funded the Future!
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Thanks to your incredible support, we've successfully reached
                our goal. Your contributions will make a direct impact on
                students' futures.
              </p>
            </div>

            {/* Success Section */}
            <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg mb-12">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    Goal Achieved!
                  </h2>
                  <p className="text-muted-foreground">
                    We couldn't have done it without you.
                  </p>
                </div>
                <div className="text-right mt-4 sm:mt-0">
                  <p className="text-3xl font-bold text-green-500">
                    ${totalAmount.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    of ${goalAmount} goal raised
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-4 bg-muted rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-green-500 transition-all duration-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="text-center text-muted-foreground">
                The "Fund the Future" campaign has successfully concluded.
              </div>
            </div>

            {/* Thank You Section */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-semibold mb-6">
                A Huge Thank You to Our Donors
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto lg:mx-0">
                Every single contribution, big or small, has brought us to this
                momentous achievement. Your belief in our mission empowers us
                to continue creating lasting change. While this campaign is
                over, the journey to empower students continues. Thank you for
                being a vital part of it.
              </p>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-2">
            <div className="sticky top-40">
              <Image
                src="/fund-the-future-banner.png"
                alt="Fund the Future Event Banner"
                width={1200}
                height={675}
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
