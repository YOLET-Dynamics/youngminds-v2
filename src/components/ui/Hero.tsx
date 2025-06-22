"use client";

import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export default function Hero() {
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const fetchTotal = useCallback(async () => {
    try {
      const response = await fetch("/api/donations?totalOnly=true");
      if (!response.ok) {
        console.error("Failed to fetch donation total");
        return;
      }
      const data = await response.json();
      if (data.error) {
        console.error("Error fetching donation total:", data.error);
        return;
      }
      setTotalAmount(data.total);
    } catch (err) {
      console.error("Error fetching donation total:", err);
    }
  }, []);

  useEffect(() => {
    fetchTotal();
    const interval = setInterval(fetchTotal, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [fetchTotal]);

  return (
    <section className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/child-rm-bg.jpg"
          alt="Children in Ethiopia"
          fill
          priority
          className="object-cover object-center w-full h-full brightness-[0.7]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          quality={100}
        />
      </div>

      <div className="relative z-10 container px-4 sm:px-6 mx-auto">
        <div className="max-w-[800px] mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8">
          <div className="inline-flex px-3 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-xs sm:text-sm font-medium text-white tracking-wide">
              EMPOWERING ETHIOPIA'S STUDENTS
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">
            Unlocking Potential,{" "}
            <span className="text-primary/90 block mt-1 sm:mt-2">
              One Student at a Time
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-[600px] mx-auto leading-relaxed px-2">
            Empowering students in need across Ethiopia with education and
            opportunities, creating lasting change and brighter futures.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 px-4 sm:px-0">
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[160px] h-10 sm:h-11 bg-primary hover:bg-primary/90 text-white rounded-lg 
                       transition-all duration-200 shadow-lg hover:shadow-primary/25 text-sm sm:text-base"
              asChild
            >
              <Link href="/donate">Donate Now</Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[160px] h-10 sm:h-11 border-white/20 bg-white/10 hover:bg-white/20 
                       text-white rounded-lg backdrop-blur-sm transition-all duration-200 text-sm sm:text-base"
              asChild
            >
              <Link href="/join">Join Us</Link>
            </Button>
          </div>

          <div className="mt-6">
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[200px] h-12 sm:h-14 border-2 border-[#22c55e] bg-transparent hover:bg-[#22c55e]/10 
                       text-white font-medium rounded-lg transition-all duration-300 text-base sm:text-lg
                       relative after:absolute after:inset-0 after:rounded-lg after:animate-pulse after:bg-[#22c55e]/20 after:-z-10
                       shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
              asChild
            >
              <Link href="/fund-the-future">
                {totalAmount !== null ? (
                  <span className="flex flex-col items-center">
                    Fund the Future
                    <span className="text-sm font-normal opacity-80 tracking-normal">
                      $
                      {totalAmount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      Raised
                    </span>
                  </span>
                ) : (
                  "Fund the Future"
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/10 pointer-events-none" />
    </section>
  );
}
