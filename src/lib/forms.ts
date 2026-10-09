import { z } from "zod";
import { escapeHtml } from "./html.ts";
import { subscriptionChangeOptions, subscriptionChangeValues } from "./subscription-changes.ts";

export const joinSubmissionSchema = z
  .object({
    firstName: z.string().trim().min(2).max(80),
    lastName: z.string().trim().min(2).max(80),
    email: z.string().trim().email().max(254),
    phone: z
      .string()
      .trim()
      .min(7)
      .max(32)
      .regex(/^[0-9+().\-\s]+$/, "Please enter a valid phone number")
      .refine(
        (value) => value.replace(/\D/g, "").length >= 7,
        "Please enter a valid phone number"
      ),
    message: z.string().trim().min(10).max(1000),
    newsletter: z.boolean().optional(),
  })
  .strict();

export const newsletterSignupSchema = z
  .object({
    email: z.string().trim().email().max(254),
  })
  .strict();

export const subscriptionManagementSchema = z
  .object({
    fullName: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    change: z.enum(subscriptionChangeValues),
    details: z.string().trim().max(1000).optional(),
  })
  .strict();

export type JoinSubmission = z.infer<typeof joinSubmissionSchema>;
export type SubscriptionManagementSubmission = z.infer<
  typeof subscriptionManagementSchema
>;

type EmailContent = {
  subject: string;
  html: string;
  text: string;
};

export function buildJoinEmail(submission: JoinSubmission): EmailContent {
  const fullName = `${submission.firstName} ${submission.lastName}`;

  return {
    subject: "New Join Request",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
        <h1 style="color: #1e293b; text-align: center; margin-bottom: 24px;">New Join Request</h1>
        <div style="background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <p style="margin-bottom: 16px;"><strong>Name:</strong> ${escapeHtml(fullName)}</p>
          <p style="margin-bottom: 16px;"><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
          <p style="margin-bottom: 16px;"><strong>Phone:</strong> ${escapeHtml(submission.phone)}</p>
          <div style="margin-top: 16px;">
            <p style="margin-bottom: 8px;"><strong>Message:</strong></p>
            <p style="background-color: #f8fafc; padding: 12px; border-radius: 4px; border-left: 4px solid #1e293b;">${escapeHtml(submission.message)}</p>
          </div>
        </div>
        <p style="text-align: center; margin-top: 24px; color: #64748b; font-size: 14px;">This is an automated message from YoungMinds ET</p>
      </div>
    `,
    text: [
      "New Join Request",
      "",
      `Name: ${fullName}`,
      `Email: ${submission.email}`,
      `Phone: ${submission.phone}`,
      "",
      "Message:",
      submission.message,
    ].join("\n"),
  };
}

export function buildSubscriptionManagementEmail(
  submission: SubscriptionManagementSubmission
): EmailContent {
  const change = subscriptionChangeOptions[submission.change];
  const details = submission.details || "None provided";

  return {
    subject: "UNVERIFIED Subscription Management Request",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
        <h1 style="color: #1e293b; text-align: center; margin-bottom: 24px;">UNVERIFIED Subscription Management Request</h1>
        <p style="background-color: #fef3c7; border-left: 4px solid #d97706; padding: 12px; border-radius: 4px;">
          This request was submitted through a public form. Verify the subscriber directly in Stripe before making any subscription changes.
        </p>
        <div style="background-color: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <p style="margin-bottom: 16px;"><strong>Name:</strong> ${escapeHtml(submission.fullName)}</p>
          <p style="margin-bottom: 16px;"><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
          <p style="margin-bottom: 16px;"><strong>Requested change:</strong> ${escapeHtml(change)}</p>
          <div style="margin-top: 16px;">
            <p style="margin-bottom: 8px;"><strong>Details:</strong></p>
            <p style="background-color: #f8fafc; padding: 12px; border-radius: 4px; border-left: 4px solid #1e293b;">${escapeHtml(details)}</p>
          </div>
        </div>
        <p style="text-align: center; margin-top: 24px; color: #64748b; font-size: 14px;">This is an automated message from YoungMinds ET</p>
      </div>
    `,
    text: [
      "UNVERIFIED Subscription Management Request",
      "",
      "This request was submitted through a public form. Verify the subscriber directly in Stripe before making any subscription changes.",
      "",
      `Name: ${submission.fullName}`,
      `Email: ${submission.email}`,
      `Requested change: ${change}`,
      "",
      "Details:",
      details,
    ].join("\n"),
  };
}
