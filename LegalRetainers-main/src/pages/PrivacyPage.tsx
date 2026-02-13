import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Privacy Policy | LegalRetainers"
        description="Privacy policy for LegalRetainers. Learn how we protect client information and handle case data for pre-signed retainer deliveries."
        canonical="https://legalretainers.com/privacy"
        keywords="legal privacy policy, case data protection, attorney client confidentiality, retainer agreement privacy"
      />
      <StructuredData type="webPage" data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Privacy Policy",
        "description": "LegalRetainers Privacy Policy - How we protect client information and case data",
        "url": "https://legalretainers.com/privacy",
        "isPartOf": {
          "@id": "https://legalretainers.com/#website"
        }
      }} />
      <StructuredData type="breadcrumbList" data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "@id": "https://legalretainers.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Privacy Policy",
            "@id": "https://legalretainers.com/privacy"
          }
        ]
      }} />
      <Header />
      <main className="flex-1">
        <section className="py-8 md:py-12">
          <div className="lr-width-container">
            <div className="max-w-3xl">
              <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy" }]} />
              <h1 className="lr-heading-xl mt-4">Privacy Policy</h1>
              <p className="lr-body-s text-muted-foreground mb-8">Last updated: January 2026</p>
              
              <div className="space-y-10">
                <section>
                  <h2 className="lr-heading-l">1. Introduction</h2>
                  <p className="lr-body">LegalRetainers.com ("we," "our," or "us") operates a marketplace connecting law firms with pre-qualified, pre-signed legal cases. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website or use our services.</p>
                  <p className="lr-body">By using our services, you consent to the data practices described in this policy. If you do not agree with these practices, please do not use our website or services.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">2. Information We Collect</h2>
                  
                  <h3 className="lr-heading-m">Information from Law Firms</h3>
                  <p className="lr-body">When law firms register or use our services, we collect:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>Firm name, address, and contact details</li>
                    <li>Attorney bar numbers and licensing information</li>
                    <li>Practice area preferences and case criteria</li>
                    <li>Payment and billing information</li>
                    <li>Account login credentials</li>
                  </ul>

                  <h3 className="lr-heading-m mt-6">Information from Claimants</h3>
                  <p className="lr-body">When individuals submit case information, we collect:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>Full name and contact information</li>
                    <li>Details about their legal matter or injury</li>
                    <li>Signed retainer agreements and consent forms</li>
                    <li>Medical records or documentation (when voluntarily provided)</li>
                    <li>Communication preferences</li>
                  </ul>

                  <h3 className="lr-heading-m mt-6">Automatically Collected Information</h3>
                  <p className="lr-body">When you visit our website, we automatically collect:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>IP address and device identifiers</li>
                    <li>Browser type and operating system</li>
                    <li>Pages visited and time spent on each page</li>
                    <li>Referring website or source</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">3. How We Use Your Information</h2>
                  <p className="lr-body">We use collected information for the following purposes:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Service Delivery:</strong> To match cases with appropriate law firms and facilitate case transfers</li>
                    <li><strong>Communication:</strong> To respond to inquiries, send service updates, and provide customer support</li>
                    <li><strong>Verification:</strong> To verify attorney licensing and firm credentials</li>
                    <li><strong>Compliance:</strong> To ensure TCPA compliance and maintain proper consent records</li>
                    <li><strong>Improvement:</strong> To analyze usage patterns and improve our services</li>
                    <li><strong>Security:</strong> To detect and prevent fraud, abuse, or unauthorized access</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">4. Information Sharing and Disclosure</h2>
                  <p className="lr-body">We share information only in the following circumstances:</p>
                  
                  <h3 className="lr-heading-m">With Purchasing Law Firms</h3>
                  <p className="lr-body">When a law firm purchases a case, they receive the claimant's contact information, case details, and signed retainer agreement. Each case is sold exclusively to one firm—we do not share the same claimant information with competing firms.</p>

                  <h3 className="lr-heading-m mt-6">Service Providers</h3>
                  <p className="lr-body">We may share information with trusted third-party service providers who assist with:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>Payment processing and fraud prevention</li>
                    <li>Website hosting and data storage</li>
                    <li>Analytics and performance monitoring</li>
                    <li>Customer support services</li>
                  </ul>

                  <h3 className="lr-heading-m mt-6">Legal Requirements</h3>
                  <p className="lr-body">We may disclose information when required by law, court order, or governmental regulation, or when necessary to protect our rights, safety, or property.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">5. Data Security</h2>
                  <p className="lr-body">We implement industry-standard security measures to protect your information:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>256-bit SSL/TLS encryption for data transmission</li>
                    <li>Encrypted storage for sensitive personal information</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Access controls limiting data access to authorized personnel</li>
                    <li>Secure backup and disaster recovery procedures</li>
                  </ul>
                  <p className="lr-body">While we take reasonable precautions, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your data.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">6. Data Retention</h2>
                  <p className="lr-body">We retain personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Specifically:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Active accounts:</strong> Data retained while the account remains active</li>
                    <li><strong>Completed cases:</strong> Case records retained for 7 years for legal compliance</li>
                    <li><strong>Consent records:</strong> TCPA consent documentation retained for 5 years</li>
                    <li><strong>Analytics data:</strong> Anonymized usage data may be retained indefinitely</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">7. Your Rights and Choices</h2>
                  <p className="lr-body">Depending on your jurisdiction, you may have the following rights:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal retention requirements)</li>
                    <li><strong>Portability:</strong> Request your data in a portable, machine-readable format</li>
                    <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                    <li><strong>Do Not Sell:</strong> California residents may opt out of the "sale" of personal information</li>
                  </ul>
                  <p className="lr-body">To exercise these rights, contact us at <a href="mailto:info@legalretainers.com" className="lr-link">info@legalretainers.com</a>.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">8. Cookies and Tracking</h2>
                  <p className="lr-body">We use cookies and similar technologies to enhance your experience. For detailed information about our cookie practices, please see our <a href="/cookies" className="lr-link">Cookie Policy</a>.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">9. Third-Party Links</h2>
                  <p className="lr-body">Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">10. Children's Privacy</h2>
                  <p className="lr-body">Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">11. Changes to This Policy</h2>
                  <p className="lr-body">We may update this Privacy Policy periodically. We will notify you of material changes by posting the updated policy on our website with a new "Last Updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">12. Contact Us</h2>
                  <p className="lr-body">If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Email:</strong> <a href="mailto:info@legalretainers.com" className="lr-link">info@legalretainers.com</a></li>
                    <li><strong>Phone:</strong> 305-900-5954</li>
                    <li><strong>Mail:</strong> LegalRetainers.com, Privacy Team, 2345 E Thomas Rd Ste 100 #498, Phoenix, AZ 85016</li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
