import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Accessibility Statement | LegalRetainers"
        description="LegalRetainers is committed to digital accessibility for people with disabilities. Learn about our WCAG 2.1 AA compliance efforts and accessibility features."
        keywords="accessibility statement, WCAG, ADA compliance, digital accessibility, screen reader, keyboard navigation"
        canonical="https://legalretainers.com/accessibility"
      />
      <StructuredData type="webPage" data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Accessibility Statement",
        "description": "LegalRetainers Accessibility Statement",
        "url": "https://legalretainers.com/accessibility",
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
            "name": "Accessibility Statement",
            "@id": "https://legalretainers.com/accessibility"
          }
        ]
      }} />
      <Header />
      <main className="flex-1">
        <section className="py-8 md:py-12">
          <div className="lr-width-container">
            <div className="max-w-3xl">
              <Breadcrumbs items={[{ label: "Accessibility Statement", href: "/accessibility" }]} />
              <h1 className="lr-heading-xl mt-4">Accessibility Statement</h1>
              <p className="lr-body-s text-muted-foreground mb-8">Last updated: January 2026</p>
              
              <div className="space-y-10">
                <section>
                  <h2 className="lr-heading-l">Our Commitment</h2>
                  <p className="lr-body">LegalRetainers.com is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards to ensure we provide equal access to all users.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">Accessibility Standards</h2>
                  <p className="lr-body">We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines explain how to make web content more accessible to people with disabilities, including those with:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>Visual impairments (blindness, low vision, color blindness)</li>
                    <li>Hearing impairments (deafness, hard of hearing)</li>
                    <li>Motor impairments (limited fine motor control, paralysis)</li>
                    <li>Cognitive impairments (dyslexia, attention disorders, memory limitations)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">Conformance Status</h2>
                  <p className="lr-body"><strong>Current Status:</strong> Partially Conformant</p>
                  <p className="lr-body">"Partially conformant" means that some parts of the content do not fully conform to WCAG 2.1 Level AA. We are actively working to achieve full conformance.</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Last Assessment:</strong> January 2026</li>
                    <li><strong>Testing Methodology:</strong> Combination of automated testing (WAVE, axe DevTools, Lighthouse) and manual testing with assistive technologies</li>
                    <li><strong>Next Scheduled Review:</strong> July 2026</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">Accessibility Features</h2>
                  <p className="lr-body">Our website includes the following accessibility features:</p>
                  
                  <h3 className="lr-heading-m">Navigation and Structure</h3>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Skip to main content:</strong> Bypass navigation links to access main content quickly</li>
                    <li><strong>Consistent navigation:</strong> Navigation structure is consistent across all pages</li>
                    <li><strong>Clear headings:</strong> Proper heading hierarchy (H1, H2, H3) for easy navigation</li>
                    <li><strong>Breadcrumbs:</strong> Clear indication of location within the site</li>
                  </ul>

                  <h3 className="lr-heading-m mt-6">Keyboard Accessibility</h3>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Full keyboard access:</strong> All interactive elements accessible via keyboard (Tab, Enter, Space, Arrow keys)</li>
                    <li><strong>Visible focus indicators:</strong> Clear yellow focus outlines on all interactive elements</li>
                    <li><strong>Logical tab order:</strong> Focus moves in a predictable, logical sequence</li>
                    <li><strong>No keyboard traps:</strong> Users can navigate to and from all elements</li>
                  </ul>

                  <h3 className="lr-heading-m mt-6">Visual Accessibility</h3>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Color contrast:</strong> Minimum 4.5:1 contrast ratio for normal text (WCAG AA)</li>
                    <li><strong>Resizable text:</strong> Text can be resized up to 200% without loss of functionality</li>
                    <li><strong>No color-only information:</strong> Color is not used as the sole means of conveying information</li>
                    <li><strong>Alternative text:</strong> Descriptive alt text for all informational images</li>
                  </ul>

                  <h3 className="lr-heading-m mt-6">Screen Reader Compatibility</h3>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Semantic HTML:</strong> Proper use of HTML5 elements (nav, main, article, footer)</li>
                    <li><strong>ARIA labels:</strong> Appropriate ARIA attributes for interactive components</li>
                    <li><strong>Form labels:</strong> All form inputs have associated labels</li>
                    <li><strong>Error identification:</strong> Form errors clearly identified and described</li>
                  </ul>

                  <h3 className="lr-heading-m mt-6">Content Accessibility</h3>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Plain language:</strong> Clear, simple language avoiding unnecessary jargon</li>
                    <li><strong>Readable line lengths:</strong> Content constrained to readable widths (max 70 characters)</li>
                    <li><strong>Sufficient spacing:</strong> Adequate line height and paragraph spacing</li>
                    <li><strong>Responsive design:</strong> Mobile-friendly layout that adapts to different screen sizes</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">Assistive Technologies Tested</h2>
                  <p className="lr-body">We regularly test our website with the following assistive technologies:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>JAWS</strong> (Job Access With Speech) with Chrome on Windows</li>
                    <li><strong>NVDA</strong> (NonVisual Desktop Access) with Firefox on Windows</li>
                    <li><strong>VoiceOver</strong> with Safari on macOS and iOS</li>
                    <li><strong>TalkBack</strong> with Chrome on Android</li>
                    <li><strong>Dragon NaturallySpeaking</strong> for voice control</li>
                    <li><strong>ZoomText</strong> for screen magnification</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">Known Accessibility Issues</h2>
                  <p className="lr-body">We are aware of the following accessibility issues and are working to resolve them:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>PDF documents:</strong> Some PDF documents may not be fully accessible. Contact us for accessible alternatives.</li>
                    <li><strong>Third-party content:</strong> Embedded content from third-party providers may have accessibility limitations.</li>
                    <li><strong>Complex data tables:</strong> Some tables may be difficult to navigate with screen readers. We are working on improvements.</li>
                  </ul>
                  <p className="lr-body">If you encounter additional accessibility barriers not listed here, please report them using the contact information below.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">Feedback and Support</h2>
                  <p className="lr-body">We welcome feedback on the accessibility of LegalRetainers.com. If you encounter accessibility barriers or need assistance, please contact us:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Email:</strong> <a href="mailto:info@legalretainers.com" className="lr-link">info@legalretainers.com</a></li>
                    <li><strong>Phone:</strong> 305-900-5954 (TTY available)</li>
                    <li><strong>Subject Line:</strong> "Accessibility Feedback" or "Accessibility Assistance"</li>
                  </ul>
                  <p className="lr-body">We aim to respond to accessibility feedback within 2 business days.</p>

                  <h3 className="lr-heading-m mt-6">When Reporting an Issue</h3>
                  <p className="lr-body">To help us address your concern quickly, please include:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>The web page URL where you encountered the issue</li>
                    <li>A description of the problem</li>
                    <li>The assistive technology you were using (if applicable)</li>
                    <li>Your browser and operating system</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">Formal Complaint Process</h2>
                  <p className="lr-body">If you are not satisfied with our response to your accessibility concern:</p>
                  <ol className="lr-list" style={{ listStyleType: 'decimal', paddingLeft: '1.5rem' }}>
                    <li className="mb-2">Submit your complaint to <a href="mailto:info@legalretainers.com" className="lr-link">info@legalretainers.com</a> with subject "Accessibility Complaint"</li>
                    <li className="mb-2">We will acknowledge receipt within 2 business days</li>
                    <li className="mb-2">We will investigate and provide a resolution plan within 10 business days</li>
                    <li className="mb-2">If unresolved, request escalation to our Accessibility Manager</li>
                    <li className="mb-2">If still unresolved, you may file a complaint with the U.S. Department of Justice</li>
                  </ol>
                </section>

                <section>
                  <h2 className="lr-heading-l">Technical Specifications</h2>
                  <p className="lr-body">The accessibility of LegalRetainers.com relies on the following technologies:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>HTML5</li>
                    <li>CSS3</li>
                    <li>JavaScript (ES6+)</li>
                    <li>WAI-ARIA (Accessible Rich Internet Applications)</li>
                  </ul>

                  <h3 className="lr-heading-m mt-6">Compatible Browsers</h3>
                  <p className="lr-body">For the best accessibility experience, we recommend using the latest version of:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>Google Chrome</li>
                    <li>Mozilla Firefox</li>
                    <li>Apple Safari</li>
                    <li>Microsoft Edge</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">Legal Requirements</h2>
                  <p className="lr-body">This accessibility statement is in accordance with applicable laws and regulations, including:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Americans with Disabilities Act (ADA)</strong> - Title III</li>
                    <li><strong>Section 508</strong> of the Rehabilitation Act</li>
                    <li><strong>Web Content Accessibility Guidelines (WCAG) 2.1</strong> Level AA</li>
                  </ul>
                  <p className="lr-body">For more information about web accessibility:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><a href="https://www.w3.org/WAI/" className="lr-link" target="_blank" rel="noopener noreferrer">W3C Web Accessibility Initiative (WAI)</a></li>
                    <li><a href="https://www.ada.gov/" className="lr-link" target="_blank" rel="noopener noreferrer">ADA.gov</a></li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">Ongoing Improvements</h2>
                  <p className="lr-body">We are committed to continuous improvement of our website's accessibility. This includes:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>Regular accessibility audits (quarterly)</li>
                    <li>User testing with people who use assistive technologies</li>
                    <li>Staff training on accessibility best practices</li>
                    <li>Continuous monitoring and updates to maintain compliance</li>
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
