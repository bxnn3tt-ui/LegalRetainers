import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
const ContactPage = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="min-h-screen bg-background">
      <SEOHead title="Contact LegalRetainers | Talk Through Case Fit and Availability" description="Contact LegalRetainers to discuss case types, intake fit, documentation, and availability for your law firm." canonical="https://legalretainers.com/contact" keywords="contact legal case provider, case acquisition inquiry, law firm partnership, signed cases, legal intake support" ogImage="https://legalretainers.com/og-image.png" />
      <StructuredData type="localBusiness" />
      <StructuredData type="contactPage" />
      <StructuredData type="llmOptimizedPage" data={{
        pageName: "Contact LegalRetainers - Request Signed Cases",
        pageDescription: "Contact us to discuss case fit, documentation, and availability for your firm.",
        pageUrl: "https://legalretainers.com/contact",
        pageType: "ContactPage",
        additionalData: {
          keywords: ["contact legal cases", "order signed cases", "law firm case acquisition"],
          mentions: ["Case Delivery", "Signed Retainer Agreements", "Client Documentation"]
        }
      }} />
      <StructuredData type="breadcrumbList" data={{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "@id": "https://legalretainers.com/"
      }, {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "@id": "https://legalretainers.com/contact"
      }]
    }} />
      <StructuredData type="faqPage" data={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "How should we use this form?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use it when you want a real answer about fit, documentation, timing, or availability. The more context you give us, the more useful our response will be."
        }
      }, {
        "@type": "Question",
        "name": "How quickly do you respond?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Response times depend on message volume and the complexity of the request, but we aim to reply quickly once we have enough information to understand what your firm needs."
        }
      }, {
        "@type": "Question",
        "name": "What should we include in our message?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Practice areas, jurisdictions, target case types, monthly capacity, and any non-negotiables on documentation or timing will help us point you in the right direction faster."
        }
      }, {
        "@type": "Question",
        "name": "What happens after we reach out?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We review your message, look at fit and availability, and then tell you the clearest next step. If there is a strong match, we move the conversation forward from there."
        }
      }]
    }} />
      <Header />
      
      <main className="py-8 md:py-12">
        <div className="lr-width-container">
          <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
          
          <div className="mb-8">
            <h1 className="lr-heading-xl mb-4">Let’s Talk Through Fit</h1>
            <p className="lr-body-l text-muted-foreground max-w-2xl">
              Tell us what your firm is looking for, what your team can handle, and what a worthwhile handoff looks like.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <Card className="border-2 border-black bg-white h-fit shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <CardHeader className="border-b-2 border-black bg-primary text-white">
                <CardTitle className="lr-heading-l text-white">Start the Conversation</CardTitle>
                <p className="text-white/80">Clear answers, no guesswork</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y-2 divide-border">
                  <div className="flex items-start gap-4 p-5">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Phone</h3>
                      <a href="tel:305-900-5954" className="lr-heading-s text-primary hover:underline lr-focus">
                        305-900-5954
                      </a>
                      <p className="lr-body-s text-muted-foreground mt-1">Best for urgent case questions</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <a href="mailto:help@legalretainers.com" className="lr-link lr-body-l">
                        help@legalretainers.com
                      </a>
                      <p className="lr-body-s text-muted-foreground mt-1">Best for detailed practice-area, volume, or intake questions</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Office</h3>
                      <p className="lr-body">2345 E Thomas Rd Ste 100</p>
                      <p className="lr-body">#589</p>
                      <p className="lr-body">Phoenix , AZ 85016</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">What to Expect</h3>
                      <p className="lr-body">We start with fit, documentation, and availability.</p>
                      <p className="lr-body-s text-muted-foreground mt-1">If there is a match, we move fast on the next step.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="border-2 border-black bg-white">
              <CardHeader className="border-b-2 border-black">
                <CardTitle className="lr-heading-l">How Can We Help?</CardTitle>
                <p className="text-black/70 font-medium">The more specific you are, the faster we can tell you whether there’s a fit.</p>
              </CardHeader>
              <CardContent className="pt-6">
                  <form className="space-y-6" onSubmit={async e => {
                  e.preventDefault();
                  setFormError("");
                  const formData = new FormData(e.currentTarget);
                  const contactData = {
                    firstName: formData.get('firstName') as string,
                    lastName: formData.get('lastName') as string,
                    email: formData.get('email') as string,
                    phone: formData.get('phone') as string,
                    inquiryType,
                    message: formData.get('message') as string
                  };

                  // Client-side validation
                  if (!contactData.firstName || !contactData.lastName || !contactData.inquiryType || !contactData.message) {
                    setFormError('Please fill in all required fields.');
                    return;
                  }
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (contactData.email && !emailRegex.test(contactData.email)) {
                    setFormError('Please enter a valid email address.');
                    return;
                  }
                  try {
                    const response = await fetch('/api/send-contact', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(contactData)
                    });
                    if (response.ok) {
                      navigate('/contact-success', {
                        state: contactData
                      });
                    } else {
                      setFormError('There was an error sending your message. Please check your information and try again.');
                    }
                  } catch (error) {
                    setFormError('There was an error sending your message. Please check your connection and try again.');
                  }
                }}>
                    {formError && <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{formError}</AlertDescription>
                      </Alert>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="lr-body font-bold">
                          First Name *
                        </Label>
                        <Input id="firstName" name="firstName" required className="lr-focus border-2 border-black" />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="lr-body font-bold">
                          Last Name *
                        </Label>
                        <Input id="lastName" name="lastName" required className="lr-focus border-2 border-black" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="lr-body font-bold">
                        Email Address
                      </Label>
                      <Input id="email" name="email" type="email" className="lr-focus border-2 border-black" />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="lr-body font-bold">
                        Phone Number
                      </Label>
                      <Input id="phone" name="phone" type="tel" className="lr-focus border-2 border-black" />
                    </div>

                    <div>
                      <Label htmlFor="inquiry-type" className="lr-body font-bold">
                        Inquiry Type *
                      </Label>
                      <Select name="inquiryType" value={inquiryType} onValueChange={setInquiryType} required>
                        <SelectTrigger className="lr-focus border-2 border-black">
                          <SelectValue placeholder="Choose the type of conversation you want to have" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="Question About a Case Type">Question About a Case Type</SelectItem>
                        <SelectItem value="Documentation / Intake Process">Documentation / Intake Process</SelectItem>
                        <SelectItem value="Pricing / Volume">Pricing / Volume</SelectItem>
                        <SelectItem value="Existing Submission Follow-Up">Existing Submission Follow-Up</SelectItem>
                        <SelectItem value="Custom Case Request">Custom Case Request</SelectItem>
                        <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="lr-body font-bold">
                        Message *
                      </Label>
                      <Textarea id="message" name="message" rows={6} placeholder="Tell us your practice areas, jurisdictions, ideal case profile, monthly capacity, or the specific question you want answered..." required className="lr-focus border-2 border-black" />
                    </div>

                    <div className="bg-muted/50 p-4 rounded-none hidden">
                      <p className="lr-body-s text-muted-foreground">
                        <strong>Important:</strong> This form is for general inquiries only. 
                        For case requests, please use our{" "}
                        <a href="/request-clients" className="lr-link">client request form</a> or 
                        call us directly at 305-900-5954.
                      </p>
                    </div>

                    <Button type="submit" variant="brutalist" size="lg" className="w-full lr-focus">
                      Send message
                    </Button>

                    <p className="text-xs text-center text-muted-foreground pt-2">
                      By submitting, you agree to our{" "}
                      <Link to="/privacy" className="lr-link">
                        privacy policy
                      </Link>
                      .
                    </p>
                  </form>
                </CardContent>
              </Card>
          </div>
        </div>
      </main>

      {/* FAQ Section with Blue Background */}
      <section className="bg-primary py-12 md:py-16">
        <div className="lr-width-container">
          <h2 className="lr-heading-l text-white mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white border-2 border-black p-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
              <h3 className="lr-heading-s mb-3">
                How should we use this form?
              </h3>
              <p className="lr-body-s text-black/70 font-medium">
                Use it when you want a real answer about fit, documentation, timing, or availability. The more context you give us, the more useful our response will be.
              </p>
            </div>

            <div className="bg-white border-2 border-black p-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
              <h3 className="lr-heading-s mb-3">
                How quickly do you respond?
              </h3>
              <p className="lr-body-s text-black/70 font-medium">
                Response times depend on message volume and the complexity of the request, but we aim to reply quickly once we have enough information to understand what your firm needs.
              </p>
            </div>

            <div className="bg-white border-2 border-black p-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
              <h3 className="lr-heading-s mb-3">
                What should we include in our message?
              </h3>
              <p className="lr-body-s text-black/70 font-medium">
                Practice areas, jurisdictions, target case types, monthly capacity, and any non-negotiables on documentation or timing will help us point you in the right direction faster.
              </p>
            </div>

            <div className="bg-white border-2 border-black p-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
              <h3 className="lr-heading-s mb-3">
                What happens after we reach out?
              </h3>
              <p className="lr-body-s text-black/70 font-medium">
                We review your message, look at fit and availability, and then tell you the clearest next step. If there is a strong match, we move the conversation forward from there.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default ContactPage;
