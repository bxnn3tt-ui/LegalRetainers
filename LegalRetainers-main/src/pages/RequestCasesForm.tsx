import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cases, practiceAreas } from "@/data/cases";

const RequestCasesForm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [searchParams] = useSearchParams();
  const caseSlug = searchParams.get('case');
  const selectedCase = caseSlug ? cases.find(c => c.slug === caseSlug) : null;
  
  // Determine if this is a case order flow or partnership inquiry
  const isCaseOrder = !!caseSlug;
  
  const [step, setStep] = useState(1);
  const [formError, setFormError] = useState("");
  
  // Form data for case order flow
  const [caseOrderData, setCaseOrderData] = useState({
    firmName: '',
    attorneyName: '',
    barNumber: '',
    email: '',
    phone: '',
    practiceAreas: [] as string[],
    selectedCases: caseSlug ? [{
      caseType: caseSlug,
      quantity: 1
    }] : [{
      caseType: '',
      quantity: 1
    }] as Array<{
      caseType: string;
      quantity: number;
    }>,
    geographicPreferences: [] as string[],
    requirements: '',
    yearsInPractice: '',
    referralSource: '',
    serviceAgreement: false
  });
  
  // Form data for partnership inquiry
  const [partnershipData, setPartnershipData] = useState({
    firmName: '',
    contactName: '',
    title: '',
    email: '',
    phone: '',
    firmSize: '',
    practiceAreas: [] as string[],
    geographicCoverage: [] as string[],
    currentChallenges: '',
    partnershipGoals: '',
    monthlyVolume: '',
    referralSource: '',
    additionalInfo: '',
    agreementAccepted: false
  });

  const totalSteps = isCaseOrder ? 4 : 3;
  const progress = step / totalSteps * 100;

  const handleNext = () => {
    setFormError("");
    
    if (isCaseOrder) {
      // Case order validation (existing logic)
      if (step === 1) {
        if (!caseOrderData.firmName || !caseOrderData.attorneyName || !caseOrderData.email || !caseOrderData.phone) {
          setFormError('Please fill in all required fields.');
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(caseOrderData.email)) {
          setFormError('Please enter a valid email address.');
          return;
        }
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!phoneRegex.test(caseOrderData.phone)) {
          setFormError('Please enter a valid phone number (e.g., 555-123-4567).');
          return;
        }
      }
      if (step === 2) {
        const validCases = caseOrderData.selectedCases.filter(selection => selection.caseType && selection.quantity > 0);
        if (validCases.length === 0) {
          setFormError('Please select at least one case type with a quantity greater than 0.');
          return;
        }
        if (caseOrderData.geographicPreferences.length === 0) {
          setFormError('Please select at least one geographic preference.');
          return;
        }
      }
      if (step === 3) {
        if (!caseOrderData.yearsInPractice || !caseOrderData.referralSource) {
          setFormError('Please fill in all required fields.');
          return;
        }
      }
    } else {
      // Partnership inquiry validation
      if (step === 1) {
        if (!partnershipData.firmName || !partnershipData.contactName || !partnershipData.email || !partnershipData.phone) {
          setFormError('Please fill in all required fields.');
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(partnershipData.email)) {
          setFormError('Please enter a valid email address.');
          return;
        }
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!phoneRegex.test(partnershipData.phone)) {
          setFormError('Please enter a valid phone number (e.g., 555-123-4567).');
          return;
        }
      }
      if (step === 2) {
        if (partnershipData.practiceAreas.length === 0) {
          setFormError('Please select at least one practice area of interest.');
          return;
        }
        if (!partnershipData.partnershipGoals) {
          setFormError('Please describe your partnership goals.');
          return;
        }
      }
    }
    
    if (step < totalSteps) {
      setStep(step + 1);
      setFormError("");
      setTimeout(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }, 0);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (isCaseOrder) {
      if (!caseOrderData.serviceAgreement) {
        setFormError('Please acknowledge the service agreement to continue.');
        return;
      }
    } else {
      if (!partnershipData.agreementAccepted) {
        setFormError('Please acknowledge the partnership inquiry terms to continue.');
        return;
      }
    }
    
    // Generate #XXXX reference number
    const refNum = Math.floor(1000 + Math.random() * 9000);
    const orderReference = `#${refNum}`;
    
    const orderData = isCaseOrder ? {
      orderReference,
      firmName: caseOrderData.firmName,
      attorneyName: caseOrderData.attorneyName,
      email: caseOrderData.email,
      phone: caseOrderData.phone,
      selectedCases: caseOrderData.selectedCases.reduce((sum, s) => sum + s.quantity, 0),
      geographicPreferences: caseOrderData.geographicPreferences
    } : {
      orderReference,
      firmName: partnershipData.firmName,
      attorneyName: partnershipData.contactName,
      email: partnershipData.email,
      phone: partnershipData.phone
    };
    
    navigate('/order-success', { state: orderData });
  };

  // Case order helper functions
  const updateCaseSelection = (index: number, field: 'caseType' | 'quantity', value: any) => {
    const newSelections = [...caseOrderData.selectedCases];
    newSelections[index] = { ...newSelections[index], [field]: value };
    setCaseOrderData({ ...caseOrderData, selectedCases: newSelections });
  };

  const addCaseSelection = () => {
    setCaseOrderData({
      ...caseOrderData,
      selectedCases: [...caseOrderData.selectedCases, { caseType: '', quantity: 1 }]
    });
  };

  const removeCaseSelection = (index: number) => {
    const newSelections = caseOrderData.selectedCases.filter((_, i) => i !== index);
    setCaseOrderData({ ...caseOrderData, selectedCases: newSelections });
  };

  // Success page redirect check
  if (window.location.pathname === '/order-success') {
    return <div className="min-h-screen bg-background">
        <SEOHead title="Request Submitted | LegalRetainers" description="Your inquiry has been submitted successfully." noIndex={true} />
        <Header />
        <main className="py-16">
          <div className="lr-width-container max-w-xl mx-auto text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h1 className="lr-heading-xl mb-4">Request Submitted</h1>
            <p className="lr-body-l text-muted-foreground mb-8">
              Thank you for your inquiry. Our team will review your submission and contact you within 1-2 business days.
            </p>
            <Button onClick={() => navigate('/')}>Return to Home</Button>
          </div>
        </main>
        <Footer />
      </div>;
  }

  // Partnership Inquiry Form (when no case slug)
  if (!isCaseOrder) {
    return <div className="min-h-screen bg-background">
      <SEOHead 
        title="Partner With Us | Law Firm Partnership Inquiry | LegalRetainers" 
        description="Explore partnership opportunities with LegalRetainers. We work with plaintiff law firms nationwide to deliver pre-qualified, signed legal cases." 
        canonical="https://legalretainers.com/request-clients" 
        keywords="law firm partnership, legal case partnership, case acquisition partner, plaintiff law firm collaboration" 
      />
      <StructuredData type="service" data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Law Firm Partnership Program",
        "description": "Partner with LegalRetainers to receive pre-qualified, signed legal cases for your law firm",
        "provider": {
          "@type": "Organization",
          "@id": "https://legalretainers.com/#organization"
        },
        "areaServed": "United States"
      }} />
      <StructuredData type="llmOptimizedPage" data={{
        pageName: "Law Firm Partnership Inquiry",
        pageDescription: "Submit a partnership inquiry to work with LegalRetainers for pre-qualified legal case delivery.",
        pageUrl: "https://legalretainers.com/request-clients",
        pageType: "WebPage"
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
          "name": "Partner With Us",
          "@id": "https://legalretainers.com/request-clients"
        }]
      }} />
      <Header />
      
      <main className="py-8">
        <div className="lr-width-container max-w-2xl mx-auto">
          <div className="mb-6">
            <Link to="/" className="lr-link lr-focus inline-flex items-center gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <h1 className="lr-heading-xl">Partner With Us</h1>
            <p className="lr-body-l text-muted-foreground max-w-xl">
              Tell us about your firm and how we can work together. We partner with plaintiff law firms nationwide.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="lr-body-s">Step {step} of {totalSteps}</span>
              <span className="lr-body-s">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          <Card className="border-2 border-black">
            <CardHeader className="border-b-2 border-black">
              <CardTitle className="lr-heading-m">
                {step === 1 && "Your Contact Information"}
                {step === 2 && "Partnership Interests"}
                {step === 3 && "Review & Submit"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {formError && <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>}
              
              {step === 1 && <div className="space-y-4">
                <div>
                  <Label htmlFor="firmName" className="lr-body font-bold">
                    Law Firm Name *
                  </Label>
                  <Input 
                    id="firmName" 
                    value={partnershipData.firmName} 
                    onChange={e => setPartnershipData({...partnershipData, firmName: e.target.value})} 
                    required 
                    className="lr-focus border-2 border-black" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName" className="lr-body font-bold">
                      Contact Name *
                    </Label>
                    <Input 
                      id="contactName" 
                      value={partnershipData.contactName} 
                      onChange={e => setPartnershipData({...partnershipData, contactName: e.target.value})} 
                      required 
                      className="lr-focus border-2 border-black" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="title" className="lr-body font-bold">
                      Title
                    </Label>
                    <Input 
                      id="title" 
                      value={partnershipData.title} 
                      onChange={e => setPartnershipData({...partnershipData, title: e.target.value})} 
                      placeholder="e.g., Managing Partner"
                      className="lr-focus border-2 border-black" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="lr-body font-bold">
                      Email Address *
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={partnershipData.email} 
                      onChange={e => setPartnershipData({...partnershipData, email: e.target.value})} 
                      required 
                      className="lr-focus border-2 border-black" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="lr-body font-bold">
                      Phone Number *
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={partnershipData.phone} 
                      onChange={e => setPartnershipData({...partnershipData, phone: e.target.value})} 
                      required 
                      className="lr-focus border-2 border-black" 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="firmSize" className="lr-body font-bold">
                    Firm Size
                  </Label>
                  <Select value={partnershipData.firmSize} onValueChange={value => setPartnershipData({...partnershipData, firmSize: value})}>
                    <SelectTrigger className="lr-focus border-2 border-black">
                      <SelectValue placeholder="Select firm size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solo">Solo Practitioner</SelectItem>
                      <SelectItem value="2-5">2-5 Attorneys</SelectItem>
                      <SelectItem value="6-15">6-15 Attorneys</SelectItem>
                      <SelectItem value="16-50">16-50 Attorneys</SelectItem>
                      <SelectItem value="50+">50+ Attorneys</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>}

              {step === 2 && <div className="space-y-6">
                <div>
                  <Label className="lr-body font-bold mb-3 block">Practice Areas of Interest *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {practiceAreas.map(area => (
                      <div 
                        key={area.id} 
                        className={`flex items-center space-x-3 p-3 border-2 transition-all cursor-pointer ${
                          partnershipData.practiceAreas.includes(area.id) 
                            ? 'border-black bg-[#FFD900] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                            : 'border-black/10 bg-white hover:border-black/30'
                        }`}
                        onClick={() => {
                          const isSelected = partnershipData.practiceAreas.includes(area.id);
                          if (!isSelected) {
                            setPartnershipData({
                              ...partnershipData,
                              practiceAreas: [...partnershipData.practiceAreas, area.id]
                            });
                          } else {
                            setPartnershipData({
                              ...partnershipData,
                              practiceAreas: partnershipData.practiceAreas.filter(id => id !== area.id)
                            });
                          }
                        }}
                      >
                        <Checkbox 
                          id={area.id} 
                          checked={partnershipData.practiceAreas.includes(area.id)} 
                          onCheckedChange={() => {}}
                          className="border-2 border-black data-[state=checked]:bg-black data-[state=checked]:text-white" 
                        />
                        <label htmlFor={area.id} className="lr-body-s font-bold cursor-pointer select-none">
                          {area.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="lr-body font-bold mb-3 block">Geographic Coverage</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 mb-4">
                    {['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI', 'NJ', 'VA', 'WA', 'AZ', 'MA', 'TN', 'IN', 'MO', 'MD', 'WI'].map(state => (
                      <div 
                        key={state} 
                        className={`flex items-center justify-center p-2 border-2 transition-all cursor-pointer font-bold text-sm ${
                          partnershipData.geographicCoverage.includes(state)
                            ? 'border-black bg-[#FFD900] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                            : 'border-black/10 bg-white hover:border-black/30'
                        }`}
                        onClick={() => {
                          const isSelected = partnershipData.geographicCoverage.includes(state);
                          if (!isSelected) {
                            setPartnershipData({
                              ...partnershipData,
                              geographicCoverage: [...partnershipData.geographicCoverage, state]
                            });
                          } else {
                            setPartnershipData({
                              ...partnershipData,
                              geographicCoverage: partnershipData.geographicCoverage.filter(s => s !== state)
                            });
                          }
                        }}
                      >
                        {state}
                      </div>
                    ))}
                  </div>
                  <p className="lr-body-s text-muted-foreground">Select states where your firm is licensed to practice</p>
                </div>

                <div>
                  <Label htmlFor="partnershipGoals" className="lr-body font-bold">
                    What are you looking for in a partnership? *
                  </Label>
                  <Textarea 
                    id="partnershipGoals" 
                    value={partnershipData.partnershipGoals} 
                    onChange={e => setPartnershipData({...partnershipData, partnershipGoals: e.target.value})} 
                    rows={4} 
                    placeholder="Describe what you're looking for: case types, volume, specific requirements, etc."
                    className="lr-focus border-2 border-black" 
                  />
                </div>

                <div>
                  <Label htmlFor="monthlyVolume" className="lr-body font-bold">
                    Estimated Monthly Case Volume
                  </Label>
                  <Select value={partnershipData.monthlyVolume} onValueChange={value => setPartnershipData({...partnershipData, monthlyVolume: value})}>
                    <SelectTrigger className="lr-focus border-2 border-black">
                      <SelectValue placeholder="Select estimated volume" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5 cases/month</SelectItem>
                      <SelectItem value="6-15">6-15 cases/month</SelectItem>
                      <SelectItem value="16-30">16-30 cases/month</SelectItem>
                      <SelectItem value="31-50">31-50 cases/month</SelectItem>
                      <SelectItem value="50+">50+ cases/month</SelectItem>
                      <SelectItem value="unsure">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="referralSource" className="lr-body font-bold">
                    How did you hear about us?
                  </Label>
                  <Select value={partnershipData.referralSource} onValueChange={value => setPartnershipData({...partnershipData, referralSource: value})}>
                    <SelectTrigger className="lr-focus border-2 border-black">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="search-engine">Search Engine</SelectItem>
                      <SelectItem value="attorney-referral">Attorney Referral</SelectItem>
                      <SelectItem value="conference-event">Conference/Event</SelectItem>
                      <SelectItem value="advertising">Advertising</SelectItem>
                      <SelectItem value="social-media">Social Media</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>}

              {step === 3 && <div className="space-y-6">
                <div>
                  <h4 className="lr-heading-s mb-4">Review Your Inquiry</h4>
                  <dl className="space-y-3">
                    <div className="pb-3 border-b border-black/10">
                      <dt className="lr-body font-bold text-black/60 text-sm uppercase tracking-wide">Law Firm</dt>
                      <dd className="lr-body mt-1">{partnershipData.firmName}</dd>
                    </div>
                    <div className="pb-3 border-b border-black/10">
                      <dt className="lr-body font-bold text-black/60 text-sm uppercase tracking-wide">Contact</dt>
                      <dd className="lr-body mt-1">
                        {partnershipData.contactName}{partnershipData.title && `, ${partnershipData.title}`}
                      </dd>
                    </div>
                    <div className="pb-3 border-b border-black/10">
                      <dt className="lr-body font-bold text-black/60 text-sm uppercase tracking-wide">Email & Phone</dt>
                      <dd className="lr-body mt-1">{partnershipData.email} | {partnershipData.phone}</dd>
                    </div>
                    <div className="pb-3 border-b border-black/10">
                      <dt className="lr-body font-bold text-black/60 text-sm uppercase tracking-wide">Practice Areas</dt>
                      <dd className="lr-body mt-1">
                        {partnershipData.practiceAreas.map(id => {
                          const area = practiceAreas.find(a => a.id === id);
                          return area?.name;
                        }).filter(Boolean).join(', ') || 'None selected'}
                      </dd>
                    </div>
                    {partnershipData.geographicCoverage.length > 0 && (
                      <div className="pb-3 border-b border-black/10">
                        <dt className="lr-body font-bold text-black/60 text-sm uppercase tracking-wide">Geographic Coverage</dt>
                        <dd className="lr-body mt-1">{partnershipData.geographicCoverage.join(', ')}</dd>
                      </div>
                    )}
                    <div className="pb-3 border-b border-black/10">
                      <dt className="lr-body font-bold text-black/60 text-sm uppercase tracking-wide">Partnership Goals</dt>
                      <dd className="lr-body mt-1">{partnershipData.partnershipGoals}</dd>
                    </div>
                  </dl>
                </div>

                <div className="space-y-4 p-4 bg-muted/50">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="agreementAccepted" 
                      checked={partnershipData.agreementAccepted} 
                      onCheckedChange={checked => setPartnershipData({...partnershipData, agreementAccepted: checked as boolean})} 
                      className="lr-focus mt-1 border-2 border-black" 
                      required 
                    />
                    <label htmlFor="agreementAccepted" className="lr-body-s">
                      I understand this is a partnership inquiry and a member of the LegalRetainers team will contact me to discuss potential collaboration.
                    </label>
                  </div>
                </div>
              </div>}

              <div className="flex justify-between pt-6">
                {step > 1 && <Button variant="outline" onClick={handleBack} className="lr-focus border-2 border-black">
                  Previous
                </Button>}
                
                <div className="ml-auto">
                  {step < totalSteps ? (
                    <Button onClick={handleNext} className="lr-focus">
                      Next
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} variant="brutalist" className="lr-focus">
                      Submit Inquiry
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>;
  }

  // Case Order Form (when case slug is present)
  return <div className="min-h-screen bg-background">
    <SEOHead title="Request Cases | Order Pre-Signed Legal Cases | LegalRetainers" description="Submit a case request to receive pre-qualified, signed legal cases for your law firm. 24-48 hour delivery with complete documentation and exclusive representation." canonical="https://legalretainers.com/request-clients" keywords="order legal cases, request signed cases, law firm case acquisition, pre-qualified clients, case delivery" />
    <StructuredData type="service" data={{
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Legal Case Acquisition Service",
      "description": "Purchase pre-qualified, signed legal cases for your law firm with 24-48 hour delivery",
      "provider": {
        "@type": "Organization",
        "@id": "https://legalretainers.com/#organization"
      },
      "areaServed": "United States",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceRange": "$$"
      }
    }} />
    <StructuredData type="action" data={{
      actionType: "OrderAction",
      name: "Request Signed Legal Cases",
      description: "Submit a request for pre-qualified, signed legal cases delivered to your law firm within 24-48 hours",
      targetUrl: "https://legalretainers.com/request-clients"
    }} />
    <StructuredData type="llmOptimizedPage" data={{
      pageName: "Request Signed Legal Cases - Order Form",
      pageDescription: "Order pre-qualified, signed legal cases for your law firm. Complete the form to request cases with 24-48 hour delivery.",
      pageUrl: "https://legalretainers.com/request-clients",
      pageType: "WebPage",
      additionalData: {
        keywords: ["order cases", "request clients", "buy legal cases", "case acquisition form"],
        mentions: ["Signed Retainer", "Pre-Qualified Client", "24-48 Hour Delivery", "Exclusive Representation"]
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
        "name": "Request Cases",
        "@id": "https://legalretainers.com/request-clients"
      }]
    }} />
    <Header />
    
    <main className="py-8">
      <div className="lr-width-container max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to={selectedCase ? `/cases/${selectedCase.slug}` : "/"} className="lr-link lr-focus inline-flex items-center gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            {selectedCase ? `Back to ${selectedCase.title}` : 'Back to home'}
          </Link>
          <h1 className="lr-heading-xl">Request Signed Cases</h1>
          {selectedCase && (
            <div className="mb-4">
              <Badge variant="secondary" className="bg-[#FFD900] text-primary border border-black rounded-none font-bold text-xs tracking-wider">
                {selectedCase.title}
              </Badge>
            </div>
          )}
          <p className="lr-body-l text-muted-foreground max-w-xl">
            Tell us about your firm and we'll match you with pre-qualified clients ready for representation.
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="lr-body-s">Step {step} of {totalSteps}</span>
            <span className="lr-body-s">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        <Card className="border-2 border-black">
          <CardHeader className="border-b-2 border-black">
            <CardTitle className="lr-heading-m">
              {step === 1 && "Law Firm Information"}
              {step === 2 && "Case Selection & Requirements"}
              {step === 3 && "Firm Qualifications"}
              {step === 4 && "Review & Submit"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {formError && <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{formError}</AlertDescription>
            </Alert>}
            
            {step === 1 && <div className="space-y-4">
              <div>
                <Label htmlFor="firmName" className="lr-body font-bold">
                  Law Firm Name *
                </Label>
                <Input id="firmName" value={caseOrderData.firmName} onChange={e => setCaseOrderData({...caseOrderData, firmName: e.target.value})} required className="lr-focus border-2 border-black" />
              </div>
              
              <div>
                <Label htmlFor="attorneyName" className="lr-body font-bold">
                  Attorney Name *
                </Label>
                <Input id="attorneyName" value={caseOrderData.attorneyName} onChange={e => setCaseOrderData({...caseOrderData, attorneyName: e.target.value})} required className="lr-focus border-2 border-black" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="lr-body font-bold">
                    Email Address *
                  </Label>
                  <Input id="email" type="email" value={caseOrderData.email} onChange={e => setCaseOrderData({...caseOrderData, email: e.target.value})} required className="lr-focus border-2 border-black" />
                </div>
                <div>
                  <Label htmlFor="phone" className="lr-body font-bold">
                    Phone Number *
                  </Label>
                  <Input id="phone" type="tel" value={caseOrderData.phone} onChange={e => setCaseOrderData({...caseOrderData, phone: e.target.value})} required className="lr-focus border-2 border-black" />
                </div>
              </div>
            </div>}

            {step === 2 && <div className="space-y-6">
              <div>
                <Label className="lr-body font-bold">Case Selection *</Label>
                <p className="lr-body-s text-muted-foreground mb-4">
                  Select the types and quantities of cases you want to request
                </p>
                
                {caseOrderData.selectedCases.map((selection, index) => <div key={index} className="p-4 border-2 border-black space-y-3 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Label className="lr-body-s font-bold">Case Type</Label>
                      <Select value={selection.caseType} onValueChange={value => updateCaseSelection(index, 'caseType', value)} disabled={caseSlug && index === 0}>
                        <SelectTrigger className="border-2 border-black">
                          <SelectValue placeholder="Select case type" />
                        </SelectTrigger>
                        <SelectContent>
                          {cases.map(caseItem => <SelectItem key={caseItem.slug} value={caseItem.slug}>
                            {caseItem.title}
                          </SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="lr-body-s font-bold">Quantity</Label>
                      <Input type="number" min="1" value={selection.quantity} onChange={e => updateCaseSelection(index, 'quantity', parseInt(e.target.value))} className="lr-focus border-2 border-black" />
                    </div>
                  </div>
                  {caseOrderData.selectedCases.length > 1 && <Button type="button" variant="outline" size="sm" onClick={() => removeCaseSelection(index)}>
                    Remove Case Type
                  </Button>}
                </div>)}
                
                <Button type="button" variant="outline" onClick={addCaseSelection} className="w-full border-2 border-black">
                  + Add Another Case Type
                </Button>
              </div>
              
              <div>
                <Label className="lr-body font-bold mb-3 block">Geographic Preferences *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 mb-4">
                  {['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI', 'NJ', 'VA', 'WA', 'AZ', 'MA', 'TN', 'IN', 'MO', 'MD', 'WI'].map(state => (
                    <div 
                      key={state} 
                      className={`flex items-center justify-center p-2 border-2 transition-all cursor-pointer font-bold text-sm ${
                        caseOrderData.geographicPreferences.includes(state)
                          ? 'border-black bg-[#FFD900] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                          : 'border-black/10 bg-white hover:border-black/30'
                      }`}
                      onClick={() => {
                        const isSelected = caseOrderData.geographicPreferences.includes(state);
                        if (!isSelected) {
                          setCaseOrderData({
                            ...caseOrderData,
                            geographicPreferences: [...caseOrderData.geographicPreferences, state]
                          });
                        } else {
                          setCaseOrderData({
                            ...caseOrderData,
                            geographicPreferences: caseOrderData.geographicPreferences.filter(s => s !== state)
                          });
                        }
                      }}
                    >
                      {state}
                    </div>
                  ))}
                </div>

                <div>
                  <Label className="lr-body-s font-bold mb-1">Additional States</Label>
                  <Select value="" onValueChange={value => {
                    if (!caseOrderData.geographicPreferences.includes(value)) {
                      setCaseOrderData({
                        ...caseOrderData,
                        geographicPreferences: [...caseOrderData.geographicPreferences, value]
                      });
                    }
                  }}>
                    <SelectTrigger className="w-full md:w-64 border-2 border-black">
                      <SelectValue placeholder="Select additional states..." />
                    </SelectTrigger>
                    <SelectContent>
                      {['AL', 'AK', 'AR', 'CO', 'CT', 'DE', 'HI', 'ID', 'IA', 'KS', 'KY', 'LA', 'ME', 'MN', 'MS', 'MT', 'NE', 'NV', 'NH', 'NM', 'ND', 'OK', 'OR', 'RI', 'SC', 'SD', 'UT', 'VT', 'WV', 'WY'].filter(state => !caseOrderData.geographicPreferences.includes(state)).map(state => <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {caseOrderData.geographicPreferences.some(s => !['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI', 'NJ', 'VA', 'WA', 'AZ', 'MA', 'TN', 'IN', 'MO', 'MD', 'WI'].includes(s)) && <div className="mt-2">
                  <p className="lr-body-s font-bold mb-1">Selected additional states:</p>
                  <div className="flex flex-wrap gap-2">
                    {caseOrderData.geographicPreferences.filter(s => !['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI', 'NJ', 'VA', 'WA', 'AZ', 'MA', 'TN', 'IN', 'MO', 'MD', 'WI'].includes(s)).map(state => <Badge key={state} variant="secondary" className="cursor-pointer" onClick={() => {
                      setCaseOrderData({
                        ...caseOrderData,
                        geographicPreferences: caseOrderData.geographicPreferences.filter(s => s !== state)
                      });
                    }}>
                      {state} ×
                    </Badge>)}
                  </div>
                </div>}
              </div>
              
              <div>
                <Label htmlFor="requirements" className="lr-body font-bold">
                  Specific Requirements or Criteria
                </Label>
                <Textarea id="requirements" value={caseOrderData.requirements} onChange={e => setCaseOrderData({...caseOrderData, requirements: e.target.value})} rows={4} placeholder="Describe any specific case criteria, value ranges, or other requirements..." className="lr-focus border-2 border-black" />
              </div>
            </div>}

            {step === 3 && <div className="space-y-4">
              <div>
                <Label htmlFor="yearsInPractice" className="lr-body font-bold">
                  Years in Practice *
                </Label>
                <Select value={caseOrderData.yearsInPractice} onValueChange={value => setCaseOrderData({...caseOrderData, yearsInPractice: value})}>
                  <SelectTrigger className="lr-focus border-2 border-black">
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="11-15">11-15 years</SelectItem>
                    <SelectItem value="16-20">16-20 years</SelectItem>
                    <SelectItem value="20+">20+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="referralSource" className="lr-body font-bold">
                  How did you find us? *
                </Label>
                <Select value={caseOrderData.referralSource} onValueChange={value => setCaseOrderData({...caseOrderData, referralSource: value})}>
                  <SelectTrigger className="lr-focus border-2 border-black">
                    <SelectValue placeholder="Select referral source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="search-engine">Search Engine</SelectItem>
                    <SelectItem value="attorney-referral">Attorney Referral</SelectItem>
                    <SelectItem value="conference-event">Conference/Event</SelectItem>
                    <SelectItem value="advertising">Advertising</SelectItem>
                    <SelectItem value="social-media">Social Media</SelectItem>
                    <SelectItem value="existing-client">Existing Client</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>}

            {step === 4 && <div className="space-y-6">
              <div>
                <h4 className="lr-heading-s mb-4">Review Your Case Request</h4>
                <dl className="space-y-3">
                  <div className="pb-3 border-b border-black/10">
                    <dt className="lr-body font-bold text-black/60 text-sm uppercase tracking-wide">Law Firm</dt>
                    <dd className="lr-body mt-1">{caseOrderData.firmName}</dd>
                  </div>
                  <div className="pb-3 border-b border-black/10">
                    <dt className="lr-body font-bold text-black/60 text-sm uppercase tracking-wide">Attorney</dt>
                    <dd className="lr-body mt-1">{caseOrderData.attorneyName}</dd>
                  </div>
                  <div className="pb-3 border-b border-black/10">
                    <dt className="lr-body font-bold text-black/60 text-sm uppercase tracking-wide">Contact</dt>
                    <dd className="lr-body mt-1">{caseOrderData.email} | {caseOrderData.phone}</dd>
                  </div>
                  <div className="pb-3 border-b border-black/10">
                    <dt className="lr-body font-bold text-black/60 text-sm uppercase tracking-wide">Selected Cases</dt>
                    <dd className="lr-body mt-1">
                      {caseOrderData.selectedCases.map((selection, index) => {
                        const caseType = cases.find(c => c.slug === selection.caseType);
                        return <div key={index} className="mb-1">
                          {selection.quantity}x {caseType?.title}
                        </div>;
                      })}
                    </dd>
                  </div>
                  <div className="pb-3 border-b border-black/10">
                    <dt className="lr-body font-bold text-black/60 text-sm uppercase tracking-wide">Geographic Preferences</dt>
                    <dd className="lr-body mt-1">{caseOrderData.geographicPreferences.join(', ')}</dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-4 p-4 bg-muted/50">
                <div className="flex items-start space-x-2">
                  <Checkbox id="serviceAgreement" checked={caseOrderData.serviceAgreement} onCheckedChange={checked => setCaseOrderData({...caseOrderData, serviceAgreement: checked as boolean})} className="lr-focus mt-1 border-2 border-black" required />
                  <label htmlFor="serviceAgreement" className="lr-body-s">I acknowledge that case availability is subject to confirmation by LegalRetainers.</label>
                </div>
              </div>
            </div>}

            <div className="flex justify-between pt-6">
              {step > 1 && <Button variant="outline" onClick={handleBack} className="lr-focus border-2 border-black">
                Previous
              </Button>}
              
              <div className="ml-auto">
                {step < totalSteps ? (
                  <Button onClick={handleNext} className="lr-focus">
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} variant="brutalist" className="lr-focus">
                    Submit Case Request
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
    
    <Footer />
  </div>;
};

export default RequestCasesForm;
