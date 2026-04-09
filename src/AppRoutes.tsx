import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
import AuthorPage from "./pages/AuthorPage";
import DesignSystemPage from "./pages/DesignSystemPage";
import NotFound from "./pages/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/cases" element={<CasesPage />} />
      <Route path="/cases/:slug" element={<CaseDetailPage />} />
      <Route path="/request-clients" element={<RequestCasesForm />} />
      <Route path="/about" element={<AboutPage />} />
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
      <Route path="/insights/author/:authorId" element={<AuthorPage />} />
      <Route path="/insights/:slug" element={<BlogPostPage />} />
      <Route path="/design-system" element={<DesignSystemPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
