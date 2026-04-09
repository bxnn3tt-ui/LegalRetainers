import { matchPath } from "react-router-dom";
import { createLoadableRoute } from "./lib/loadableRoute";

export const IndexRoute = createLoadableRoute(() => import("./pages/Index"));
export const CasesRoute = createLoadableRoute(() => import("./pages/CasesPage"));
export const CaseDetailRoute = createLoadableRoute(() => import("./pages/CaseDetailPage"));
export const RequestCasesRoute = createLoadableRoute(() => import("./pages/RequestCasesForm"));
export const AboutRoute = createLoadableRoute(() => import("./pages/AboutPage"));
export const UpdateDetailRoute = createLoadableRoute(() => import("./pages/UpdateDetailPage"));
export const ContactRoute = createLoadableRoute(() => import("./pages/ContactPage"));
export const PrivacyRoute = createLoadableRoute(() => import("./pages/PrivacyPage"));
export const TermsRoute = createLoadableRoute(() => import("./pages/TermsPage"));
export const AccessibilityRoute = createLoadableRoute(() => import("./pages/AccessibilityPage"));
export const CookiesRoute = createLoadableRoute(() => import("./pages/CookiesPage"));
export const EditorialRoute = createLoadableRoute(() => import("./pages/EditorialPage"));
export const ContactSuccessRoute = createLoadableRoute(() => import("./pages/ContactSuccessPage"));
export const OrderSuccessRoute = createLoadableRoute(() => import("./pages/OrderSuccessPage"));
export const NewsletterSuccessRoute = createLoadableRoute(() => import("./pages/NewsletterSuccessPage"));
export const BlogRoute = createLoadableRoute(() => import("./pages/BlogPage"));
export const BlogPostRoute = createLoadableRoute(() => import("./pages/BlogPostPage"));
export const AuthorRoute = createLoadableRoute(() => import("./pages/AuthorPage"));
export const DesignSystemRoute = createLoadableRoute(() => import("./pages/DesignSystemPage"));
export const NotFoundRoute = createLoadableRoute(() => import("./pages/NotFound"));

const routePreloaders = [
  { path: "/", preload: IndexRoute.preload },
  { path: "/cases", preload: CasesRoute.preload },
  { path: "/cases/:slug", preload: CaseDetailRoute.preload },
  { path: "/request-clients", preload: RequestCasesRoute.preload },
  { path: "/about", preload: AboutRoute.preload },
  { path: "/updates/:id", preload: UpdateDetailRoute.preload },
  { path: "/contact", preload: ContactRoute.preload },
  { path: "/privacy", preload: PrivacyRoute.preload },
  { path: "/terms", preload: TermsRoute.preload },
  { path: "/accessibility", preload: AccessibilityRoute.preload },
  { path: "/cookies", preload: CookiesRoute.preload },
  { path: "/editorial", preload: EditorialRoute.preload },
  { path: "/contact-success", preload: ContactSuccessRoute.preload },
  { path: "/order-success", preload: OrderSuccessRoute.preload },
  { path: "/newsletter-success", preload: NewsletterSuccessRoute.preload },
  { path: "/insights", preload: BlogRoute.preload },
  { path: "/insights/author/:authorId", preload: AuthorRoute.preload },
  { path: "/insights/:slug", preload: BlogPostRoute.preload },
  { path: "/design-system", preload: DesignSystemRoute.preload },
];

function normalizePathname(pathname: string) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "") || "/";
}

export async function preloadRouteModules(pathname: string) {
  const normalizedPathname = normalizePathname(pathname);

  const matchedPreloaders = routePreloaders
    .filter(({ path }) => matchPath({ path, end: true }, normalizedPathname))
    .map(({ preload }) => preload);

  const preloaders = matchedPreloaders.length > 0 ? matchedPreloaders : [NotFoundRoute.preload];

  await Promise.all(preloaders.map((preload) => preload()));
}
