import { Resend } from "resend";

let client: Resend | undefined;

function getResend(): Resend {
  if (client) {
    return client;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  client = new Resend(apiKey);
  return client;
}

type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

const sender = "YoungMinds ET <no-reply@youngmindset.org>";

/** Sends an email. Resend reports failures in the result, so this throws to keep them visible. */
export async function sendEmail(message: EmailMessage): Promise<void> {
  const { error } = await getResend().emails.send({ from: sender, ...message });
  if (error) {
    throw new Error(`Resend rejected email "${message.subject}": ${error.name} ${error.message}`);
  }
}

type NewsletterContact = {
  email: string;
  firstName?: string;
};

/**
 * Adds the contact to the newsletter segment. An existing contact keeps its
 * subscription status, so a previous unsubscribe is never reversed from here.
 */
export async function subscribeToNewsletter({ email, firstName }: NewsletterContact): Promise<void> {
  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
  if (!segmentId) {
    throw new Error("RESEND_NEWSLETTER_SEGMENT_ID is not configured");
  }

  const resend = getResend();
  const created = await resend.contacts.create({
    email,
    ...(firstName ? { firstName } : {}),
    segments: [{ id: segmentId }],
  });
  if (!created.error) {
    return;
  }

  // Creating fails when the contact already exists; add the existing contact to the segment instead.
  const added = await resend.contacts.segments.add({ email, segmentId });
  if (added.error) {
    throw new Error(
      `Resend could not subscribe contact: ${created.error.name} ${created.error.message}; ${added.error.name} ${added.error.message}`
    );
  }
}
