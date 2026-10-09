import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Read our terms and conditions for using our website and making donations to our organization.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions of Use"
      effectiveDate="April 1, 2025"
      contactTitle="Contact Information"
      intro={
        <p className="lead text-ink">
          Please read these Terms and Conditions (&quot;Terms&quot;) carefully before using our website (the
          &quot;Site&quot;), operated by YoungMindsET Inc., a nonprofit organization registered under Section
          501(c)(3) of the Internal Revenue Code. By accessing or using this Site, you acknowledge that you have read,
          understood, and agree to be legally bound by these Terms. If you do not agree with these Terms, please do
          not use the Site.
        </p>
      }
      sections={[
        {
          id: "donations",
          title: "1. Donations and Recurring Subscriptions",
          body: (
            <>
              <h3>a. One-Time Donations</h3>
              <p>
                All donations are considered final and non-refundable. Refunds will only be issued in the event of a
                verified processing error or unauthorized transaction. To request a refund, please contact us at
                contact@youngmindset.org within 15 days of the transaction date.
              </p>
              <h3>b. Recurring Donations and Subscriptions</h3>
              <p>
                Users may opt to make recurring donations or subscribe to support our work. These can be managed or
                canceled at any time by logging into your user account (if applicable) or by contacting us at
                contact@youngmindset.org.
              </p>
              <p>
                Failure to cancel before a scheduled donation date may result in charges being processed. YoungMindsET
                Inc. is not responsible for any overdraft fees or financial penalties incurred due to automatic
                donations.
              </p>
              <h3>c. Tax-Deductibility</h3>
              <p>
                YoungMindsET Inc. is a registered 501(c)(3) nonprofit organization. Donations may be tax-deductible to
                the extent permitted by law. Donors are advised to retain donation receipts and consult with a
                qualified tax advisor for tax-related inquiries.
              </p>
            </>
          ),
        },
        {
          id: "user-responsibilities",
          title: "2. User Responsibilities",
          body: (
            <>
              <p>By using the Site, you agree to:</p>
              <ul>
                <li>Provide accurate, current, and complete information as prompted by any forms or fields on the Site</li>
                <li>Refrain from using the Site for any illegal, abusive, fraudulent, or harmful purpose</li>
                <li>
                  Not attempt to gain unauthorized access to any part of the Site, user accounts, or computer systems
                  connected to the Site
                </li>
                <li>Promptly notify us of any unauthorized use of your account or any other breach of security</li>
              </ul>
            </>
          ),
        },
        {
          id: "intellectual-property",
          title: "3. Intellectual Property Rights",
          body: (
            <>
              <p>
                All content and materials on the Site, including but not limited to text, graphics, logos, images,
                audio, video, and software, are the intellectual property of YoungMindsET Inc. or its content
                providers and are protected by U.S. and international copyright, trademark, and other intellectual
                property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, transmit, display, perform, publish, license, create
                derivative works from, or sell any content without prior written consent from YoungMindsET Inc.
              </p>
            </>
          ),
        },
        {
          id: "third-party",
          title: "4. Third-Party Links and Services",
          body: (
            <>
              <p>
                The Site may contain links to third-party websites or services that are not owned or controlled by
                YoungMindsET Inc. We do not endorse or assume any responsibility for the content, policies, or
                practices of any third-party sites.
              </p>
              <p>
                Your interactions with such third parties are governed solely by their terms and conditions. You
                acknowledge and agree that YoungMindsET Inc. shall not be liable for any damages or losses caused by
                the use of or reliance on any third-party content or services.
              </p>
            </>
          ),
        },
        {
          id: "disclaimers",
          title: "5. Disclaimers",
          body: (
            <ul>
              <li>
                The Site and its content are provided on an &quot;as-is&quot; and &quot;as-available&quot; basis
                without any warranties, express or implied
              </li>
              <li>
                We do not warrant that the Site will be uninterrupted, error-free, secure, or free of viruses or other
                harmful components
              </li>
              <li>
                YoungMindsET Inc. disclaims all warranties, including but not limited to warranties of
                merchantability, fitness for a particular purpose, and non-infringement
              </li>
            </ul>
          ),
        },
        {
          id: "liability",
          title: "6. Limitation of Liability",
          body: (
            <>
              <p>
                To the maximum extent permitted by law, YoungMindsET Inc. and its directors, officers, employees,
                agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or
                punitive damages, including but not limited to loss of profits, data, use, goodwill, or other
                intangible losses, resulting from:
              </p>
              <ul>
                <li>Your access to or use of (or inability to access or use) the Site</li>
                <li>Any conduct or content of any third party on the Site</li>
                <li>Any content obtained from the Site</li>
                <li>Unauthorized access, use, or alteration of your transmissions or data</li>
              </ul>
            </>
          ),
        },
        {
          id: "governing-law",
          title: "7. Governing Law and Jurisdiction",
          body: (
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Maryland,
              without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of
              the courts located in Montgomery County, Maryland for any disputes arising out of or relating to your use
              of the Site.
            </p>
          ),
        },
        {
          id: "modification",
          title: "8. Modification of Terms",
          body: (
            <p>
              We reserve the right to update, change, or replace any part of these Terms at our sole discretion.
              Updates will be posted on this page with a revised &quot;Effective Date.&quot; Your continued use of the
              Site after such changes constitutes acceptance of the updated Terms.
            </p>
          ),
        },
      ]}
    />
  );
}
