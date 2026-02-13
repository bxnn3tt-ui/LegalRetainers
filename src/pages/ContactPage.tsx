import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="min-h-screen bg-background">
      <SEOHead title="Contact LegalRetainers | Inquire About Signed Legal Cases" description="Contact our team to discuss case acquisition for your law firm. Learn about our pre-signed case delivery process, pricing, and available case types." canonical="https://legalretainers.com/contact" keywords="contact legal case provider, case acquisition inquiry, law firm partnership, signed cases, pre-qualified clients" ogImage="https://legalretainers.com/og-image.png" />
      <StructuredData type="localBusiness" />
      <StructuredData type="contactPage" />
      <StructuredData type="llmOptimizedPage" data={{
        pageName: "Contact LegalRetainers - Request Signed Cases",
        pageDescription: "Contact us to order pre-signed legal cases. 24-48 hour delivery with complete documentation for law firms.",
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
        "name": "How quickly can you deliver signed cases?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most signed cases are delivered within 24-48 hours of order approval with complete case documentation."
        }
      }, {
        "@type": "Question",
        "name": "What quality verification do you provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All cases include client eligibility verification and complete case documentation reviewed for accuracy before delivery."
        }
      }, {
        "@type": "Question",
        "name": "Do you offer bulk case purchasing options?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer volume discounts and bulk case packages for established law firms. Contact us to discuss your specific needs."
        }
      }]
    }} />
      <Header />
      
      <main className="py-8 md:py-12">
        <div className="lr-width-container">
          <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
          
          <div className="mb-8">
            <h1 className="lr-heading-xl mb-4">Contact Us</h1>
            <p className="lr-body-l text-muted-foreground max-w-2xl">
              Ready to grow your caseload with pre-signed clients? Our case acquisition team is available to discuss your practice areas, volume requirements, and delivery preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <Card className="border-2 border-black bg-white h-fit shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <CardHeader className="border-b-2 border-black bg-primary text-white">
                <CardTitle className="lr-heading-l text-white">Get in Touch</CardTitle>
                <p className="text-white/80">We're here to help grow your caseload</p>
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
                      <p className="lr-body-s text-muted-foreground mt-1">Available 24/7 for consultations</p>
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
                      <p className="lr-body-s text-muted-foreground mt-1">Response within 2-4 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Office</h3>
                      <p className="lr-body">2345 E Thomas Rd Ste 100</p>
                      <p className="lr-body">#498</p>
                      <p className="lr-body">Phoenix, AZ 85016</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Case Delivery</h3>
                      <p className="lr-body">Cases delivered within <strong>24-48 hours</strong></p>
                      <p className="lr-body-s text-muted-foreground mt-1">Complete documentation included</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="border-2 border-black bg-white">
              <CardHeader className="border-b-2 border-black">
                <CardTitle className="lr-heading-l">Send Us a Message</CardTitle>
                <p className="text-black/70 font-medium">We'll get back to you within 2-4 hours</p>
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
                    inquiryType: formData.get('inquiryType') as string,
                    message: formData.get('message') as string
                  };

                  // Client-side validation
                  if (!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.inquiryType || !contactData.message) {
                    setFormError('Please fill in all required fields.');
                    return;
                  }
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(contactData.email)) {
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
                    const responseData = await response.text();
                    if (response.ok) {
                      const referenceNumber = Math.random().toString(36).substring(2, 7).toUpperCase();
                      navigate('/contact-success', {
                        state: {
                          ...contactData,
                          referenceNumber
                        }
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
                        Email Address *
                      </Label>
                      <Input id="email" name="email" type="email" required className="lr-focus border-2 border-black" />
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
                      <Select name="inquiryType" required>
                        <SelectTrigger className="lr-focus border-2 border-black">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new-order">New Case Inquiry</SelectItem>
                          <SelectItem value="pricing">Pricing & Volume Inquiry</SelectItem>
                          <SelectItem value="custom-request">Custom Practice Area Request</SelectItem>
                          <SelectItem value="partnership">Firm Partnership Proposal</SelectItem>
                          <SelectItem value="other">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="lr-body font-bold">
                        Message *
                      </Label>
                      <Textarea id="message" name="message" rows={6} placeholder="Please describe your question or situation..." required className="lr-focus border-2 border-black" />
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
                      Send Message
                    </Button>

                    <p className="text-xs text-center text-muted-foreground pt-2">
                      By submitting, you agree to our privacy policy
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
                What payment terms do you offer for signed case purchases?
              </h3>
              <p className="lr-body-s text-black/70 font-medium">
                We accept purchase orders from established law firms with flexible 
                payment terms. Contact us to discuss your firm's requirements and exclusive case packages.
              </p>
            </div>

            <div className="bg-white border-2 border-black p-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
              <h3 className="lr-heading-s mb-3">
                How quickly can you deliver purchased cases?
              </h3>
              <p className="lr-body-s text-black/70 font-medium">
                Most signed cases are delivered within 24-48 hours after purchase 
                order approval with complete case documentation.
              </p>
            </div>

            <div className="bg-white border-2 border-black p-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
              <h3 className="lr-heading-s mb-3">
                What quality verification do you provide?
              </h3>
              <p className="lr-body-s text-black/70 font-medium">
                All cases include client eligibility verification 
                and complete case documentation reviewed for accuracy before delivery.
              </p>
            </div>

            <div className="bg-white border-2 border-black p-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
              <h3 className="lr-heading-s mb-3">
                Do you offer bulk case purchasing options?
              </h3>
              <p className="lr-body-s text-black/70 font-medium">
                Yes, we offer volume discounts and bulk case packages for 
                established law firms. Contact us to discuss your specific needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default ContactPage;