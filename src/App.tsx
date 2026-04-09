import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ScrollToTop } from "./components/ScrollToTop";

const Index = lazy(() => import("./pages/Index"));
const CasesPage = lazy(() => import("./pages/CasesPage"));
const CaseDetailPage = lazy(() => import("./pages/CaseDetailPage"));
const RequestCasesForm = lazy(() => import("./pages/RequestCasesForm"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const UpdateDetailPage = lazy(() => import("./pages/UpdateDetailPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const AccessibilityPage = lazy(() => import("./pages/AccessibilityPage"));
const CookiesPage = lazy(() => import("./pages/CookiesPage"));
const EditorialPage = lazy(() => import("./pages/EditorialPage"));
const ContactSuccessPage = lazy(() => import("./pages/ContactSuccessPage"));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage"));
const NewsletterSuccessPage = lazy(() => import("./pages/NewsletterSuccessPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const DesignSystemPage = lazy(() => import("./pages/DesignSystemPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => <main className="min-h-screen bg-background" />;

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/cases/:slug" element={<CaseDetailPage />} />
            <Route path="/request-clients" element={<RequestCasesForm />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Redirect /updates to /insights (combined view) */}
            <Route path="/updates" element={<Navigate to="/insights" replace />} />
            <Route path="/updates/:id" element={<UpdateDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/editorial" element={<EditorialPage />} />
            <Route path="/contact-success" element={<ContactSuccessPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/newsletter-success" element={<NewsletterSuccessPage />} />
            <Route path="/insights" element={<BlogPage />} />
            <Route path="/insights/:slug" element={<BlogPostPage />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
