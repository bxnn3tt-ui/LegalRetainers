import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  AboutRoute,
  AccessibilityRoute,
  AuthorRoute,
  BlogPostRoute,
  BlogRoute,
  CaseDetailRoute,
  CasesRoute,
  ContactRoute,
  ContactSuccessRoute,
  CookiesRoute,
  DesignSystemRoute,
  EditorialRoute,
  IndexRoute,
  NewsletterSuccessRoute,
  NotFoundRoute,
  OrderSuccessRoute,
  PrivacyRoute,
  RequestCasesRoute,
  TermsRoute,
  UpdateDetailRoute,
} from "./clientRoutes";

export function AppClientRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<IndexRoute />} />
        <Route path="/cases" element={<CasesRoute />} />
        <Route path="/cases/:slug" element={<CaseDetailRoute />} />
        <Route path="/request-clients" element={<RequestCasesRoute />} />
        <Route path="/about" element={<AboutRoute />} />
        <Route path="/updates" element={<Navigate to="/insights" replace />} />
        <Route path="/updates/:id" element={<UpdateDetailRoute />} />
        <Route path="/contact" element={<ContactRoute />} />
        <Route path="/privacy" element={<PrivacyRoute />} />
        <Route path="/terms" element={<TermsRoute />} />
        <Route path="/accessibility" element={<AccessibilityRoute />} />
        <Route path="/cookies" element={<CookiesRoute />} />
        <Route path="/editorial" element={<EditorialRoute />} />
        <Route path="/contact-success" element={<ContactSuccessRoute />} />
        <Route path="/order-success" element={<OrderSuccessRoute />} />
        <Route path="/newsletter-success" element={<NewsletterSuccessRoute />} />
        <Route path="/insights" element={<BlogRoute />} />
        <Route path="/insights/author/:authorId" element={<AuthorRoute />} />
        <Route path="/insights/:slug" element={<BlogPostRoute />} />
        <Route path="/design-system" element={<DesignSystemRoute />} />
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </Suspense>
  );
}
