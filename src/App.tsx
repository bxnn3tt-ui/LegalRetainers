import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import CasesPage from "./pages/CasesPage";
import CaseDetailPage from "./pages/CaseDetailPage";
import RequestCasesForm from "./pages/RequestCasesForm";
import AboutPage from "./pages/AboutPage";
import UpdateDetailPage from "./pages/UpdateDetailPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import AccessibilityPage from "./pages/AccessibilityPage";
import CookiesPage from "./pages/CookiesPage";
import EditorialPage from "./pages/EditorialPage";
import ContactSuccessPage from "./pages/ContactSuccessPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import NewsletterSuccessPage from "./pages/NewsletterSuccessPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import DesignSystemPage from "./pages/DesignSystemPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
