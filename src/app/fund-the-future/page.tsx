"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Donation {
  id: string;
  name: string;
  amount: number;
  date: number;
}

const formatDonorName = (name: string) => {
  if (!name || name.toLowerCase() === "anonymous") {
    return "Anonymous";
  }
  const parts = name.trim().split(" ");
  if (parts.length > 1) {
    return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
  }
  return name;
};

export default function FundTheFuture() {
  const goalAmount = 650;
  const [totalAmount, setTotalAmount] = useState(0);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 5;

  const fetchDonations = useCallback(async (isInitialLoad = false) => {
    if (isInitialLoad) {
      setIsLoading(true);
    }
    try {
      const response = await fetch("/api/donations");
      if (!response.ok) {
        throw new Error("Failed to fetch donation data.");
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      setTotalAmount(data.total);
      setDonations(data.donations);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      if (isInitialLoad) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchDonations(true); // Initial fetch with loading state

    const interval = setInterval(() => {
      fetchDonations(false); // Poll without loading state
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchDonations]);

  const progress = (totalAmount / goalAmount) * 100;

  // Pagination logic
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = donations.slice(
    indexOfFirstDonation,
    indexOfLastDonation
  );
  const totalPages = Math.ceil(donations.length / donationsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen pt-40 pb-16">
      <div className="container px-4 sm:px-6 mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Fund the Future
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help us provide quality education to students in need. Your contribution
            makes a direct impact on their future.
          </p>
        </div>

        {isLoading && <p className="text-center">Loading contributions...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {!isLoading && !error && (
          <>
            {/* Progress Section */}
            <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg mb-12">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    Current Progress
                  </h2>
                  <p className="text-muted-foreground">
                    Help us reach our goal!
                  </p>
                </div>
                <div className="text-right mt-4 sm:mt-0">
                  <p className="text-3xl font-bold text-primary">
                    ${totalAmount.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    of ${goalAmount} goal
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-4 bg-muted rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-primary transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>

              <Button
                size="lg"
                className="w-full sm:w-auto min-w-[200px] bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-primary/40 transition-shadow duration-300"
                asChild
              >
                <Link
                  href="https://donate.stripe.com/eVq3cvgRZ2tr6B04ncdjO0c"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contribute Now
                </Link>
              </Button>
            </div>

            {/* Recent Donations */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Recent Contributions
              </h2>
              {donations.length > 0 ? (
                <div className="space-y-4">
                  {currentDonations.map((donation) => (
                    <div
                      key={donation.id}
                      className="bg-card/50 rounded-lg p-4 border border-border/50 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">
                            {formatDonorName(donation.name)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(donation.date).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="font-semibold text-primary">
                          ${donation.amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No contributions yet. Be the first to help!
                </p>
              )}
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage - 1);
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : undefined
                        }
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(i + 1);
                          }}
                          isActive={currentPage === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage + 1);
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : undefined
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 