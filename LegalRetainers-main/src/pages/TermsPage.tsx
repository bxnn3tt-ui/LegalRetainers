import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Terms of Service | LegalRetainers"
        description="Terms of service for LegalRetainers' pre-signed case delivery service. Review service agreements, exclusivity terms, and retainer transfer policies."
        canonical="https://legalretainers.com/terms"
        keywords="legal terms of service, case purchase terms, retainer agreement terms, pre-signed case terms"
      />
      <StructuredData type="webPage" data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Terms of Service",
        "description": "LegalRetainers Terms of Service - Service agreements and policies",
        "url": "https://legalretainers.com/terms",
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
            "name": "Terms of Service",
            "@id": "https://legalretainers.com/terms"
          }
        ]
      }} />
      <Header />
      <main className="flex-1">
        <section className="py-8 md:py-12">
          <div className="lr-width-container">
            <div className="max-w-3xl">
              <Breadcrumbs items={[{ label: "Terms of Service", href: "/terms" }]} />
              <h1 className="lr-heading-xl mt-4">Terms of Service</h1>
              <p className="lr-body-s text-muted-foreground mb-8">Last updated: January 2026</p>
              
              <div className="space-y-10">
                <section>
                  <h2 className="lr-heading-l">1. Acceptance of Terms</h2>
                  <p className="lr-body">By accessing or using LegalRetainers.com ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use the Service.</p>
                  <p className="lr-body">These terms apply to all visitors, users, law firms, attorneys, and others who access or use the Service.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">2. Service Description</h2>
                  <p className="lr-body">LegalRetainers.com operates a marketplace that connects law firms with pre-qualified individuals who have signed retainer agreements ("Cases"). Our services include:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>Pre-screening and qualification of potential claimants</li>
                    <li>Collection of signed retainer agreements and consent forms</li>
                    <li>Exclusive case delivery to purchasing law firms</li>
                    <li>Case information and documentation transfer</li>
                  </ul>
                  <p className="lr-body"><strong>Important:</strong> We are a marketing and lead generation service, not a law firm. We do not provide legal advice or represent clients in legal matters.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">3. Attorney Advertising Disclosure</h2>
                  <p className="lr-body">This website contains attorney advertising. Prior results do not guarantee a similar outcome. The information provided on this website is for general informational purposes only and does not constitute legal advice.</p>
                  <p className="lr-body">Law firms using our service are responsible for compliance with their jurisdiction's attorney advertising rules and regulations.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">4. Case Exclusivity and Delivery</h2>
                  
                  <h3 className="lr-heading-m">Exclusive Delivery</h3>
                  <p className="lr-body">Each case is sold exclusively to one law firm. We do not sell or share the same claimant's information with competing attorneys or firms.</p>

                  <h3 className="lr-heading-m mt-6">Delivery Timeline</h3>
                  <p className="lr-body">Cases are typically delivered within 24-48 hours of order confirmation. Delivery times may vary based on case type, volume, and availability.</p>

                  <h3 className="lr-heading-m mt-6">What You Receive</h3>
                  <p className="lr-body">Upon purchase, law firms receive:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>Claimant contact information (name, phone, email, address)</li>
                    <li>Case summary and relevant details</li>
                    <li>Signed retainer agreement</li>
                    <li>TCPA consent documentation</li>
                    <li>Any supporting documentation provided by the claimant</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">5. No Guarantee of Retention or Outcome</h2>
                  <p className="lr-body"><strong>Important Disclaimer:</strong> While cases are pre-qualified and include signed retainer agreements, LegalRetainers does not guarantee:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>That the claimant will remain as your client</li>
                    <li>The success or outcome of any legal matter</li>
                    <li>The accuracy of information provided by claimants</li>
                    <li>Any specific conversion rate or case value</li>
                  </ul>
                  <p className="lr-body">Claimants may terminate the attorney-client relationship at any time. Case viability and outcomes depend on individual circumstances, evidence, and legal factors outside our control.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">6. TCPA Compliance</h2>
                  <p className="lr-body">All cases include documented consent under the Telephone Consumer Protection Act (TCPA). Claimants provide express written consent to be contacted by law firms regarding legal representation.</p>
                  <p className="lr-body">Law firms are responsible for:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>Maintaining TCPA compliance in their own communications</li>
                    <li>Honoring opt-out requests from claimants</li>
                    <li>Proper recordkeeping of consent documentation</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">7. Law Firm Eligibility and Obligations</h2>
                  <p className="lr-body">To use our services, law firms must:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>Be licensed to practice law in the relevant jurisdiction</li>
                    <li>Maintain professional liability insurance</li>
                    <li>Comply with all applicable bar rules and regulations</li>
                    <li>Provide accurate firm and attorney information</li>
                    <li>Handle claimant information confidentially and securely</li>
                  </ul>
                  <p className="lr-body">We reserve the right to verify licensing and refuse service to any firm that does not meet our eligibility requirements.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">8. Payment Terms</h2>
                  <p className="lr-body">Case pricing varies by practice area and case type. All prices are displayed at the time of order. Payment is due upon case delivery.</p>
                  <p className="lr-body">We accept major credit cards and approved payment methods. All sales are final except as provided in our Return Policy (Section 9).</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">9. Return Policy</h2>
                  <p className="lr-body">Cases may be returned for credit under the following circumstances:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Invalid contact information:</strong> Claimant cannot be reached after reasonable attempts</li>
                    <li><strong>Case does not match criteria:</strong> Case details differ materially from the order specifications</li>
                    <li><strong>Duplicate delivery:</strong> Same case delivered to firm previously</li>
                  </ul>
                  <p className="lr-body">Return requests must be submitted within 5 business days of delivery. We review all return requests and may require documentation of contact attempts.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">10. Intellectual Property</h2>
                  <p className="lr-body">The Service and its original content, features, and functionality are owned by LegalRetainers.com and are protected by copyright, trademark, and other intellectual property laws.</p>
                  <p className="lr-body">You may not reproduce, distribute, or create derivative works from our content without express written permission.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">11. Limitation of Liability</h2>
                  <p className="lr-body">To the maximum extent permitted by law:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>LegalRetainers.com shall not be liable for any indirect, incidental, special, consequential, or punitive damages</li>
                    <li>Our total liability shall not exceed the amount paid for the specific case giving rise to the claim</li>
                    <li>We are not liable for actions, omissions, or conduct of law firms, claimants, or third parties</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">12. Indemnification</h2>
                  <p className="lr-body">You agree to indemnify and hold harmless LegalRetainers.com, its officers, directors, employees, and agents from any claims, damages, or expenses (including attorney fees) arising from:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>Your use of the Service</li>
                    <li>Your violation of these Terms</li>
                    <li>Your violation of any third-party rights</li>
                    <li>Your handling of claimant matters</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">13. Dispute Resolution</h2>
                  <p className="lr-body">Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in Arizona, and the decision shall be final and binding.</p>
                  <p className="lr-body">You waive any right to participate in a class action lawsuit or class-wide arbitration.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">14. Modifications to Terms</h2>
                  <p className="lr-body">We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our website. Your continued use of the Service after changes constitutes acceptance of the modified Terms.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">15. Termination</h2>
                  <p className="lr-body">We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the Service ceases immediately.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">16. Governing Law</h2>
                  <p className="lr-body">These Terms shall be governed by and construed in accordance with the laws of Arizona, without regard to its conflict of law provisions.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">17. Contact Information</h2>
                  <p className="lr-body">For questions about these Terms of Service, please contact us:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Email:</strong> <a href="mailto:info@legalretainers.com" className="lr-link">info@legalretainers.com</a></li>
                    <li><strong>Phone:</strong> 305-900-5954</li>
                    <li><strong>Mail:</strong> LegalRetainers.com, Legal Department, 2345 E Thomas Rd Ste 100 #498, Phoenix, AZ 85016</li>
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
