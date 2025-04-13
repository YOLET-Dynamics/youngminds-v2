export const metadata = {
  title: "Terms and Conditions | YoungMinds ET",
  description:
    "Read our terms and conditions for using our website and making donations to our organization.",
};

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 max-w-7xl mx-auto mt-16 sm:mt-24 md:mt-32">
      <div className="w-full mb-12 sm:mb-16 md:mb-24">
        <div className="max-w-[85ch] mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 
                       bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent
                       tracking-tight leading-tight">
            Terms and Conditions of Use
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-8">
            Effective Date: April 1, 2025
          </p>
          
          <div className="space-y-8 text-base sm:text-lg text-muted-foreground">
            <section>
              <p className="leading-relaxed mb-4">
                Please read these Terms and Conditions ("Terms") carefully before using our website (the "Site"), operated by YoungMindsET Inc., a nonprofit organization registered under Section 501(c)(3) of the Internal Revenue Code. By accessing or using this Site, you acknowledge that you have read, understood, and agree to be legally bound by these Terms. If you do not agree with these Terms, please do not use the Site.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-slate-900">1. Donations and Recurring Subscriptions</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 text-slate-800">a. One-Time Donations</h4>
                  <p className="leading-relaxed">
                    All donations are considered final and non-refundable. Refunds will only be issued in the event of a verified processing error or unauthorized transaction. To request a refund, please contact us at contact@youngmindset.org within 15 days of the transaction date.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 text-slate-800">b. Recurring Donations and Subscriptions</h4>
                  <p className="leading-relaxed">
                    Users may opt to make recurring donations or subscribe to support our work. These can be managed or canceled at any time by logging into your user account (if applicable) or by contacting us at contact@youngmindset.org.
                  </p>
                  <p className="leading-relaxed mt-2">
                    Failure to cancel before a scheduled donation date may result in charges being processed. YoungMindsET Inc. is not responsible for any overdraft fees or financial penalties incurred due to automatic donations.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 text-slate-800">c. Tax-Deductibility</h4>
                  <p className="leading-relaxed">
                    YoungMindsET Inc. is a registered 501(c)(3) nonprofit organization. Donations may be tax-deductible to the extent permitted by law. Donors are advised to retain donation receipts and consult with a qualified tax advisor for tax-related inquiries.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-slate-900">2. User Responsibilities</h3>
              <p className="leading-relaxed mb-2">
                By using the Site, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, current, and complete information as prompted by any forms or fields on the Site</li>
                <li>Refrain from using the Site for any illegal, abusive, fraudulent, or harmful purpose</li>
                <li>Not attempt to gain unauthorized access to any part of the Site, user accounts, or computer systems connected to the Site</li>
                <li>Promptly notify us of any unauthorized use of your account or any other breach of security</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-slate-900">3. Intellectual Property Rights</h3>
              <p className="leading-relaxed">
                All content and materials on the Site, including but not limited to text, graphics, logos, images, audio, video, and software, are the intellectual property of YoungMindsET Inc. or its content providers and are protected by U.S. and international copyright, trademark, and other intellectual property laws.
              </p>
              <p className="leading-relaxed mt-2">
                You may not reproduce, distribute, modify, transmit, display, perform, publish, license, create derivative works from, or sell any content without prior written consent from YoungMindsET Inc.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-slate-900">4. Third-Party Links and Services</h3>
              <p className="leading-relaxed">
                The Site may contain links to third-party websites or services that are not owned or controlled by YoungMindsET Inc. We do not endorse or assume any responsibility for the content, policies, or practices of any third-party sites.
              </p>
              <p className="leading-relaxed mt-2">
                Your interactions with such third parties are governed solely by their terms and conditions. You acknowledge and agree that YoungMindsET Inc. shall not be liable for any damages or losses caused by the use of or reliance on any third-party content or services.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-slate-900">5. Disclaimers</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>The Site and its content are provided on an "as-is" and "as-available" basis without any warranties, express or implied</li>
                <li>We do not warrant that the Site will be uninterrupted, error-free, secure, or free of viruses or other harmful components</li>
                <li>YoungMindsET Inc. disclaims all warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-slate-900">6. Limitation of Liability</h3>
              <p className="leading-relaxed">
                To the maximum extent permitted by law, YoungMindsET Inc. and its directors, officers, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Your access to or use of (or inability to access or use) the Site</li>
                <li>Any conduct or content of any third party on the Site</li>
                <li>Any content obtained from the Site</li>
                <li>Unauthorized access, use, or alteration of your transmissions or data</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-slate-900">7. Governing Law and Jurisdiction</h3>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of Maryland, without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the courts located in Montgomery County, Maryland for any disputes arising out of or relating to your use of the Site.
              </p>
            </section>

            <section>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-slate-900">8. Modification of Terms</h3>
              <p className="leading-relaxed">
                We reserve the right to update, change, or replace any part of these Terms at our sole discretion. Updates will be posted on this page with a revised "Effective Date." Your continued use of the Site after such changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="bg-gradient-to-br from-slate-900/5 to-slate-800/10 rounded-xl p-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-slate-900">Contact Information</h3>
              <div className="space-y-2">
                <p className="leading-relaxed">YoungMindsET Inc.</p>
                <p className="leading-relaxed">735 Sligo Avenue #106</p>
                <p className="leading-relaxed">Silver Spring, MD, United States</p>
                <p className="leading-relaxed">Email: contact@youngmindset.org</p>
                <p className="leading-relaxed">Phone: (571) 235-6218</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
