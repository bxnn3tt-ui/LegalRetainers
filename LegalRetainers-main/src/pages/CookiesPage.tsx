import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Cookie Policy | LegalRetainers"
        description="Learn how LegalRetainers uses cookies and similar tracking technologies. Manage your cookie preferences and understand how we collect analytics data."
        keywords="cookie policy, cookies, tracking, analytics, privacy, browser settings"
        canonical="https://legalretainers.com/cookies"
      />
      <StructuredData type="webPage" data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Cookie Policy",
        "description": "LegalRetainers Cookie Policy",
        "url": "https://legalretainers.com/cookies",
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
            "name": "Cookie Policy",
            "@id": "https://legalretainers.com/cookies"
          }
        ]
      }} />
      <Header />
      <main className="flex-1">
        <section className="py-8 md:py-12">
          <div className="lr-width-container">
            <div className="max-w-3xl">
              <Breadcrumbs items={[{ label: "Cookie Policy", href: "/cookies" }]} />
              <h1 className="lr-heading-xl mt-4">Cookie Policy</h1>
              <p className="lr-body-s text-muted-foreground mb-8">Last updated: January 2026</p>
              
              <div className="space-y-10">
                <section>
                  <h2 className="lr-heading-l">1. What Are Cookies</h2>
                  <p className="lr-body">Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.</p>
                  <p className="lr-body">Cookies allow websites to recognize your device and remember information about your visit, such as your preferences and actions.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">2. How We Use Cookies</h2>
                  <p className="lr-body">LegalRetainers.com uses cookies for several purposes:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Essential functionality:</strong> To make our website work correctly</li>
                    <li><strong>Performance:</strong> To understand how visitors use our website</li>
                    <li><strong>Preferences:</strong> To remember your settings and choices</li>
                    <li><strong>Security:</strong> To protect against fraud and unauthorized access</li>
                    <li><strong>Analytics:</strong> To measure and improve our services</li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">3. Types of Cookies We Use</h2>
                  
                  <h3 className="lr-heading-m">Strictly Necessary Cookies</h3>
                  <p className="lr-body">These cookies are essential for the website to function properly. Without them, you would not be able to navigate the website or use its features. These cookies do not collect personal information and cannot be disabled.</p>
                  <div className="bg-muted p-4 mt-4 text-primary">
                    <p className="lr-body-s font-bold mb-2">Examples:</p>
                    <ul className="lr-list lr-list--bullet text-sm">
                      <li>Session management cookies</li>
                      <li>Security and authentication cookies</li>
                      <li>Load balancing cookies</li>
                    </ul>
                  </div>

                  <h3 className="lr-heading-m mt-8">Performance and Analytics Cookies</h3>
                  <p className="lr-body">These cookies collect information about how visitors use our website, such as which pages are visited most often and if users encounter error messages. This helps us improve how our website works.</p>
                  <div className="bg-muted p-4 mt-4 text-primary">
                    <p className="lr-body-s font-bold mb-2">Examples:</p>
                    <ul className="lr-list lr-list--bullet text-sm">
                      <li>Google Analytics (_ga, _gid, _gat)</li>
                      <li>Page load time tracking</li>
                      <li>Error logging</li>
                    </ul>
                  </div>

                  <h3 className="lr-heading-m mt-8">Functional Cookies</h3>
                  <p className="lr-body">These cookies remember choices you make to improve your experience, such as your preferred language, region, or display settings. They may also be used to provide enhanced features.</p>
                  <div className="bg-muted p-4 mt-4 text-primary">
                    <p className="lr-body-s font-bold mb-2">Examples:</p>
                    <ul className="lr-list lr-list--bullet text-sm">
                      <li>Language preference cookies</li>
                      <li>Form data auto-fill</li>
                      <li>Recent searches or viewed cases</li>
                    </ul>
                  </div>

                  <h3 className="lr-heading-m mt-8">Marketing and Advertising Cookies</h3>
                  <p className="lr-body">These cookies track your browsing activity to deliver advertisements relevant to you and your interests. They also limit the number of times you see an ad and help measure the effectiveness of advertising campaigns.</p>
                  <div className="bg-muted p-4 mt-4 text-primary">
                    <p className="lr-body-s font-bold mb-2">Examples:</p>
                    <ul className="lr-list lr-list--bullet text-sm">
                      <li>Google Ads conversion tracking</li>
                      <li>Facebook Pixel</li>
                      <li>Remarketing cookies</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="lr-heading-l">4. Cookie Details</h2>
                  <p className="lr-body">Below is a list of the main cookies we use:</p>
                  
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full border-collapse border-2 border-border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border-2 border-border p-3 text-left lr-body-s font-bold">Cookie Name</th>
                          <th className="border-2 border-border p-3 text-left lr-body-s font-bold">Purpose</th>
                          <th className="border-2 border-border p-3 text-left lr-body-s font-bold">Duration</th>
                          <th className="border-2 border-border p-3 text-left lr-body-s font-bold">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border-2 border-border p-3 lr-body-s">_ga</td>
                          <td className="border-2 border-border p-3 lr-body-s">Google Analytics - distinguishes users</td>
                          <td className="border-2 border-border p-3 lr-body-s">2 years</td>
                          <td className="border-2 border-border p-3 lr-body-s">Analytics</td>
                        </tr>
                        <tr>
                          <td className="border-2 border-border p-3 lr-body-s">_gid</td>
                          <td className="border-2 border-border p-3 lr-body-s">Google Analytics - distinguishes users</td>
                          <td className="border-2 border-border p-3 lr-body-s">24 hours</td>
                          <td className="border-2 border-border p-3 lr-body-s">Analytics</td>
                        </tr>
                        <tr>
                          <td className="border-2 border-border p-3 lr-body-s">_gat</td>
                          <td className="border-2 border-border p-3 lr-body-s">Google Analytics - throttle request rate</td>
                          <td className="border-2 border-border p-3 lr-body-s">1 minute</td>
                          <td className="border-2 border-border p-3 lr-body-s">Analytics</td>
                        </tr>
                        <tr>
                          <td className="border-2 border-border p-3 lr-body-s">cookie_consent</td>
                          <td className="border-2 border-border p-3 lr-body-s">Stores your cookie preferences</td>
                          <td className="border-2 border-border p-3 lr-body-s">1 year</td>
                          <td className="border-2 border-border p-3 lr-body-s">Essential</td>
                        </tr>
                        <tr>
                          <td className="border-2 border-border p-3 lr-body-s">session_id</td>
                          <td className="border-2 border-border p-3 lr-body-s">Maintains your session</td>
                          <td className="border-2 border-border p-3 lr-body-s">Session</td>
                          <td className="border-2 border-border p-3 lr-body-s">Essential</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h2 className="lr-heading-l">5. Third-Party Cookies</h2>
                  <p className="lr-body">Some cookies on our website are set by third-party services. These include:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Google Analytics:</strong> Website usage analysis and reporting</li>
                    <li><strong>Google Ads:</strong> Advertising and conversion tracking</li>
                    <li><strong>Facebook/Meta:</strong> Social sharing and advertising</li>
                    <li><strong>LinkedIn:</strong> Professional networking and advertising</li>
                  </ul>
                  <p className="lr-body">These third parties have their own privacy policies governing how they use cookies. We recommend reviewing their policies for more information.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">6. Managing Your Cookie Preferences</h2>
                  <p className="lr-body">You have several options for managing cookies:</p>

                  <h3 className="lr-heading-m">Browser Settings</h3>
                  <p className="lr-body">Most web browsers allow you to control cookies through their settings. You can:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>View what cookies are stored on your device</li>
                    <li>Delete some or all cookies</li>
                    <li>Block all cookies or only third-party cookies</li>
                    <li>Set preferences for specific websites</li>
                  </ul>
                  <p className="lr-body">Instructions for common browsers:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><a href="https://support.google.com/chrome/answer/95647" className="lr-link" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                    <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="lr-link" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                    <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" className="lr-link" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
                    <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="lr-link" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
                  </ul>

                  <h3 className="lr-heading-m mt-6">Opt-Out Tools</h3>
                  <p className="lr-body">You can opt out of specific tracking services:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><a href="https://tools.google.com/dlpage/gaoptout" className="lr-link" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
                    <li><a href="https://optout.networkadvertising.org/" className="lr-link" target="_blank" rel="noopener noreferrer">Network Advertising Initiative Opt-out</a></li>
                    <li><a href="https://optout.aboutads.info/" className="lr-link" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance Opt-out</a></li>
                  </ul>
                </section>

                <section>
                  <h2 className="lr-heading-l">7. Impact of Disabling Cookies</h2>
                  <p className="lr-body">If you choose to disable cookies, please be aware that:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li>Some features of our website may not function properly</li>
                    <li>You may need to re-enter information on each visit</li>
                    <li>Your preferences will not be saved</li>
                    <li>Some pages may not display correctly</li>
                  </ul>
                  <p className="lr-body">Essential cookies cannot be disabled as they are necessary for the website to function.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">8. Do Not Track</h2>
                  <p className="lr-body">Some browsers have a "Do Not Track" feature that signals to websites that you do not want to be tracked. Our website currently does not respond to "Do Not Track" signals, but you can manage your cookie preferences as described above.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">9. Updates to This Policy</h2>
                  <p className="lr-body">We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. Any changes will be posted on this page with an updated "Last updated" date.</p>
                  <p className="lr-body">We encourage you to review this policy periodically to stay informed about how we use cookies.</p>
                </section>

                <section>
                  <h2 className="lr-heading-l">10. Contact Us</h2>
                  <p className="lr-body">If you have questions about our use of cookies or this Cookie Policy, please contact us:</p>
                  <ul className="lr-list lr-list--bullet">
                    <li><strong>Email:</strong> <a href="mailto:info@legalretainers.com" className="lr-link">info@legalretainers.com</a></li>
                    <li><strong>Phone:</strong> 305-900-5954</li>
                  </ul>
                  <p className="lr-body">For more information about how we handle your personal data, please see our <a href="/privacy" className="lr-link">Privacy Policy</a>.</p>
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
