import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function EditorialPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Editorial Policy | LegalRetainers"
        description="Learn about LegalRetainers' editorial standards, content review process, fact-checking procedures, and commitment to accurate legal information."
        keywords="editorial policy, content standards, fact-checking, legal journalism, editorial ethics"
        canonical="https://legalretainers.com/editorial"
      />
      <StructuredData type="webPage" data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Editorial Policy",
        "description": "LegalRetainers Editorial Policy",
        "url": "https://legalretainers.com/editorial",
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
            "name": "Editorial Policy",
            "@id": "https://legalretainers.com/editorial"
          }
        ]
      }} />
      <Header />
      <main className="flex-1">
        <section className="py-8 md:py-12">
          <div className="lr-width-container">
            <div className="max-w-3xl">
              <Breadcrumbs items={[{ label: "Editorial Policy", href: "/editorial" }]} />
              <h1 className="lr-heading-xl mt-4">Editorial Policy</h1>
              <p className="lr-body-s text-muted-foreground mb-8">Last updated: January 2026</p>
              
              <div className="space-y-10">
                <section>
                  <h2 className="lr-heading-l">1. Our Mission</h2>
                  <p className="lr-body">LegalRetainers.com is committed to providing accurate, helpful, and unbiased information about legal services and case types. Our editorial content serves to:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>Educate individuals about their legal rights and options</li>
                    <li>Help law firms understand the pre-signed case marketplace</li>
                    <li>Provide clear, accessible explanations of complex legal topics</li>
                    <li>Keep our audience informed about developments in relevant practice areas</li>
                  </ul>
                  <p className="lr-body">We believe that informed individuals make better decisions about their legal representation, and informed law firms can better serve their clients.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">2. Editorial Independence</h2>
                  <p className="lr-body">Our editorial content is created independently from our business operations. This means:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>Editorial decisions are made based on accuracy and value to readers, not commercial considerations</li>
                    <li>Our content team operates separately from our sales and marketing teams</li>
                    <li>We do not accept payment for favorable coverage or content placement</li>
                    <li>Law firms cannot influence or approve editorial content about their practice areas</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">3. Content Standards</h2>
                  <p className="lr-body">All content published on our website adheres to the following standards:</p>
                  
                  <h3 className="lr-heading-m">Accuracy</h3>
                  <p className="lr-body">Information is thoroughly researched and fact-checked before publication. We verify claims against primary sources, including statutes, regulations, court decisions, and authoritative legal references.</p>

                  <h3 className="lr-heading-m mt-6">Objectivity</h3>
                  <p className="lr-body">Content is presented fairly without undue bias. When topics are subject to legal debate or differing interpretations, we present multiple perspectives and clearly identify areas of uncertainty.</p>

                  <h3 className="lr-heading-m mt-6">Clarity</h3>
                  <p className="lr-body">Complex legal concepts are explained in plain language accessible to non-lawyers. We avoid unnecessary jargon and define legal terms when they must be used.</p>

                  <h3 className="lr-heading-m mt-6">Currency</h3>
                  <p className="lr-body">Information is kept up-to-date with current laws and regulations. We regularly review and update existing content to ensure continued accuracy.</p>

                  <h3 className="lr-heading-m mt-6">Attribution</h3>
                  <p className="lr-body">Sources are properly credited and referenced. We link to primary sources when available and clearly identify the basis for factual claims.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">4. Content Review Process</h2>
                  <p className="lr-body">Our editorial content undergoes a rigorous multi-step review process:</p>
                  <ol className="lr-list" style={{ listStyleType: 'decimal', paddingLeft: '1.5rem' }}>
                    <li className="mb-3"><strong>Research:</strong> Content creators conduct thorough research using authoritative legal sources</li>
                    <li className="mb-3"><strong>Writing:</strong> Articles are written by experienced content professionals with legal knowledge</li>
                    <li className="mb-3"><strong>Legal Review:</strong> Content involving specific legal claims is reviewed by licensed attorneys for accuracy</li>
                    <li className="mb-3"><strong>Editorial Review:</strong> All content is reviewed for clarity, style, and adherence to our standards</li>
                    <li className="mb-3"><strong>Final Approval:</strong> Senior editors approve content before publication</li>
                    <li className="mb-3"><strong>Ongoing Updates:</strong> Published content is regularly reviewed and updated as needed</li>
                  </ol>
                </section>

                <section>
                  <h2 className="lr-heading-l">5. Types of Content</h2>
                  <p className="lr-body">Our website features several types of content, each with specific purposes:</p>
                  
                  <h3 className="lr-heading-m">Educational Articles</h3>
                  <p className="lr-body">In-depth explanations of legal topics, procedures, and rights. These articles help readers understand their options and make informed decisions. Educational content does not constitute legal advice.</p>

                  <h3 className="lr-heading-m mt-6">Case Type Information</h3>
                  <p className="lr-body">Detailed descriptions of different practice areas and case types available through our marketplace. This content helps both claimants and law firms understand specific legal matters.</p>

                  <h3 className="lr-heading-m mt-6">Legal News and Updates</h3>
                  <p className="lr-body">Coverage of significant court decisions, legislative changes, and regulatory developments that may affect our audience. We focus on developments relevant to the practice areas we serve.</p>

                  <h3 className="lr-heading-m mt-6">Industry Insights</h3>
                  <p className="lr-body">Analysis and commentary on trends in the legal services industry, case acquisition, and law firm marketing. This content reflects our expertise and perspective as a marketplace operator.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">6. Sources and References</h2>
                  <p className="lr-body">Our content draws from reliable, authoritative sources:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Primary legal sources:</strong> Federal and state statutes, regulations, and court decisions</li>
                    <li><strong>Government publications:</strong> Agency guidance, reports, and official resources</li>
                    <li><strong>Professional organizations:</strong> American Bar Association and state bar associations</li>
                    <li><strong>Academic sources:</strong> Peer-reviewed legal journals and law school publications</li>
                    <li><strong>Expert input:</strong> Licensed attorneys with relevant practice experience</li>
                    <li><strong>Reputable news sources:</strong> Established legal news outlets and mainstream media</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">7. Advertising and Sponsored Content</h2>
                  <p className="lr-body">We clearly distinguish between editorial content and advertising:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Attorney Advertising:</strong> All content that constitutes attorney advertising is clearly labeled as such</li>
                    <li><strong>Sponsored Content:</strong> Any content created for or in partnership with third parties is clearly identified</li>
                    <li><strong>Editorial Independence:</strong> Advertising relationships do not influence our editorial content</li>
                    <li><strong>Disclosure:</strong> We disclose financial relationships that may be relevant to readers</li>
                  </ul>
                  <p className="lr-body">Our case listings and marketplace content are commercial in nature and are clearly presented as such.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">8. Important Disclaimers</h2>
                  <div className="bg-muted p-6 border-l-4 border-primary">
                    <p className="lr-body"><strong>Not Legal Advice:</strong> Information provided on LegalRetainers.com is for educational purposes only and does not constitute legal advice. Only a licensed attorney can provide legal advice specific to your situation.</p>
                    <p className="lr-body mt-4"><strong>Jurisdictional Variations:</strong> Laws vary by jurisdiction and may change over time. The information provided may not apply in all locations or circumstances.</p>
                    <p className="lr-body mt-4"><strong>Individual Circumstances:</strong> Legal outcomes depend on the specific facts of each case. Information about typical outcomes or processes may not apply to your situation.</p>
                    <p className="lr-body mt-4"><strong>Professional Consultation:</strong> We recommend consulting with a qualified attorney before making legal decisions.</p>
                  </div>
                </section>

                <section>
                  <h2 className="lr-heading-l">9. Corrections and Updates</h2>
                  <p className="lr-body">We are committed to maintaining accurate information:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Error Correction:</strong> Factual errors are corrected promptly when identified. Significant corrections are noted on the affected content.</li>
                    <li><strong>Updates:</strong> Content is updated to reflect changes in law, regulations, or industry practices. We indicate when content has been substantially updated.</li>
                    <li><strong>Removal:</strong> Content that is no longer accurate or relevant may be removed or archived with appropriate notice.</li>
                  </ul>
                  <p className="lr-body">If you identify an error or have concerns about the accuracy of our content, please contact us at <a href="mailto:info@legalretainers.com" className="lr-link">info@legalretainers.com</a>.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">10. Author and Expert Credentials</h2>
                  <p className="lr-body">We believe in transparency about who creates our content:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>Articles include author bylines where appropriate</li>
                    <li>Authors' qualifications and experience are disclosed</li>
                    <li>Expert reviewers are identified by their credentials</li>
                    <li>Guest contributors are clearly identified</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">11. User-Generated Content</h2>
                  <p className="lr-body">If we publish user-generated content such as comments, testimonials, or reviews:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>Such content is clearly identified as coming from users</li>
                    <li>We do not edit user content for meaning, only for appropriateness</li>
                    <li>User content does not represent our views or endorsement</li>
                    <li>We reserve the right to remove inappropriate content</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">12. Contact Us</h2>
                  <p className="lr-body">For questions about our editorial policy, to report errors, or to provide feedback on our content, please contact us:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Email:</strong> <a href="mailto:info@legalretainers.com" className="lr-link">info@legalretainers.com</a></li>
                    <li><strong>Phone:</strong> 305-900-5954</li>
                    <li><strong>Subject Line:</strong> Include "Editorial Inquiry" or "Content Correction"</li>
                  </ul>
                  <p className="lr-body">We welcome feedback from our readers and are committed to continuous improvement of our content.</p>
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
