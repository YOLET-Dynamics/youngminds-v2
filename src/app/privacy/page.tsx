import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn about how we collect, use, and protect your personal information when you visit our website or make donations.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      effectiveDate="April 1, 2025"
      contactTitle="Contact Us"
      intro={
        <>
          <p className="lead text-ink">
            YoungMindsET Inc. (&quot;YoungMindsET,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
            committed to respecting and protecting your privacy. This Privacy Policy describes how we collect, use,
            disclose, and protect your personal information when you use our website (the &quot;Site&quot;), donate,
            subscribe, or otherwise engage with our services.
          </p>
          <p>
            By accessing the Site or submitting information to us, you agree to the practices described in this
            Privacy Policy.
          </p>
        </>
      }
      sections={[
        {
          id: "information-we-collect",
          title: "1. Information We Collect",
          body: (
            <>
              <h3>a. Personal Information</h3>
              <p>
                We collect the following information when voluntarily provided by you, such as when making a
                donation, signing up for a newsletter, or contacting us:
              </p>
              <ul>
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Mailing/Billing Address</li>
                <li>Phone Number (if provided)</li>
                <li>Donation Amount and History</li>
                <li>Payment Information (processed via secure third-party providers, e.g., Stripe)</li>
              </ul>
              <p>We do not store full credit card numbers or CVV codes on our servers.</p>
              <h3>b. Automated Data Collection</h3>
              <p>When you visit our Site, we may automatically collect:</p>
              <ul>
                <li>IP Address</li>
                <li>Browser Type and Version</li>
                <li>Device Type and Operating System</li>
                <li>Pages Viewed and Time Spent</li>
                <li>Referring URL</li>
                <li>Cookies and usage analytics (e.g., through Google Analytics or similar tools)</li>
              </ul>
              <p>You may manage cookie preferences via your browser settings.</p>
            </>
          ),
        },
        {
          id: "how-we-use",
          title: "2. How We Use Your Information",
          body: (
            <>
              <p>We may use your personal data to:</p>
              <ul>
                <li>Process donations, recurring subscriptions, and issue donation receipts</li>
                <li>Respond to inquiries or requests</li>
                <li>Send updates, newsletters, and fundraising communications (with opt-out options)</li>
                <li>Maintain and improve Site performance and security</li>
                <li>Comply with applicable laws, regulations, or tax requirements</li>
              </ul>
              <p>
                We use analytics data in aggregate to improve the functionality and relevance of our content and
                outreach.
              </p>
            </>
          ),
        },
        {
          id: "how-we-share",
          title: "3. How We Share Your Information",
          body: (
            <>
              <p>We do not sell, rent, or trade your personal information to third parties.</p>
              <p>We may share information in the following limited circumstances:</p>
              <h3>a. With Service Providers</h3>
              <p>
                We may share your information with trusted third-party vendors that assist with payment processing,
                IT support, email marketing, donation management, and website analytics. These providers are
                contractually obligated to protect your data and use it solely for the services provided to us.
              </p>
              <h3>b. For Legal Compliance</h3>
              <p>
                We may disclose information if required by law, legal process, or governmental request, including to
                protect our rights or respond to claims.
              </p>
              <h3>c. In the Event of a Business Transfer</h3>
              <p>
                In the unlikely event of a merger, dissolution, or transfer of assets, donor and user information may
                be transferred, subject to appropriate data protection safeguards.
              </p>
            </>
          ),
        },
        {
          id: "data-security",
          title: "4. Data Security",
          body: (
            <>
              <p>
                We implement industry-standard safeguards to protect the confidentiality and security of your
                information, including:
              </p>
              <ul>
                <li>Secure Socket Layer (SSL) encryption</li>
                <li>Firewalls and access controls</li>
                <li>Regular security monitoring</li>
              </ul>
              <p>
                However, no method of transmission over the internet or electronic storage is 100% secure. We cannot
                guarantee absolute security.
              </p>
            </>
          ),
        },
        {
          id: "your-rights",
          title: "5. Your Rights and Choices",
          body: (
            <>
              <p>
                Depending on your location, you may have the following rights under applicable privacy laws (e.g.,
                GDPR, CCPA, etc.):
              </p>
              <ul>
                <li>
                  <strong>Access:</strong> Request access to the personal information we hold about you
                </li>
                <li>
                  <strong>Correction:</strong> Request corrections or updates to your information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your data, subject to legal or operational retention
                  needs
                </li>
                <li>
                  <strong>Opt-Out:</strong> Unsubscribe from marketing or fundraising communications at any time via
                  the &quot;unsubscribe&quot; link or by contacting us
                </li>
                <li>
                  <strong>Data Portability:</strong> Request a copy of your data in a machine-readable format (where
                  applicable)
                </li>
                <li>
                  <strong>Restrict Processing:</strong> Request limits on how your data is used
                </li>
              </ul>
              <p>
                To exercise your rights, please contact us at contact@youngmindset.org. We may verify your identity
                before fulfilling certain requests.
              </p>
            </>
          ),
        },
        {
          id: "childrens-privacy",
          title: "6. Children’s Privacy",
          body: (
            <p>
              Our services are not intended for children under the age of 13. We do not knowingly collect personal
              information from individuals under 13. If we become aware that we have collected such data, we will
              delete it promptly. Parents or guardians may contact us to request removal.
            </p>
          ),
        },
        {
          id: "data-retention",
          title: "7. Data Retention",
          body: (
            <p>
              We retain personal data for as long as necessary to fulfill the purposes outlined in this Privacy
              Policy, comply with legal obligations, resolve disputes, and enforce our agreements. Donor records may
              be retained for accounting and tax purposes.
            </p>
          ),
        },
        {
          id: "international-users",
          title: "8. International Users",
          body: (
            <p>
              If you are accessing the Site from outside the United States, please note that your information may be
              transferred to, stored, and processed in the United States or other jurisdictions where our service
              providers are located. By using our Site, you consent to such transfers in accordance with this Privacy
              Policy.
            </p>
          ),
        },
        {
          id: "changes",
          title: "9. Changes to This Policy",
          body: (
            <p>
              We may update this Privacy Policy periodically. Changes will be posted on this page with a revised
              &quot;Effective Date.&quot; Your continued use of the Site after any changes constitutes your acceptance
              of the revised policy.
            </p>
          ),
        },
      ]}
    />
  );
}
