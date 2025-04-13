"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters"),
  paymentMethod: z.string({
    required_error: "Please select a payment method",
  }),
  reason: z
    .string()
    .min(10, "Reason must be at least 10 characters")
    .max(500, "Reason must be less than 500 characters"),
});

const paymentMethods = [
  { value: "visa", label: "Visa" },
  { value: "mastercard", label: "Mastercard" },
  { value: "amex", label: "American Express" },
  { value: "paypal", label: "PayPal" },
  { value: "other", label: "Other" },
];

export default function ManageSubscriptionForm() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      paymentMethod: "",
      reason: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsConfirmationOpen(true);
  }

  async function handleConfirm() {
    try {
      setIsLoading(true);
      setError(null);
      
      const values = form.getValues();
      const response = await fetch("/api/subscriptions/manage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit form");
      }

      setIsConfirmationOpen(false);
      setIsSubmitted(true);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      setIsConfirmationOpen(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 max-w-7xl mx-auto mt-16 sm:mt-24 md:mt-32">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
            Manage Your Subscription
          </h1>
          <p className="text-muted-foreground">
            Update or cancel your subscription with us.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center"
              >
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="w-10 h-10 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="space-y-2"
              >
                <h2 className="text-2xl font-semibold">Request Received</h2>
                <p className="text-muted-foreground">
                  We've received your subscription management request. Our team
                  will process it shortly.
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {paymentMethods.map((method) => (
                              <SelectItem
                                key={method.value}
                                value={method.value}
                              >
                                {method.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason for Change</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Please explain why you want to modify your subscription"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-emerald-700 to-green-600 hover:opacity-90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => form.reset()}
                      disabled={isLoading}
                    >
                      Reset Form
                    </Button>
                  </div>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>

        <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Your Request</DialogTitle>
              <DialogDescription>
                Are you sure you want to proceed with this subscription change?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsConfirmationOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                className="bg-gradient-to-r from-emerald-700 to-green-600 hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
