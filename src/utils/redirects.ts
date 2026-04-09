export const retiredInsightSlugRedirects: Record<string, string> = {
  "why-more-leads-means-fewer-signed-cases":
    "/insights/why-most-law-firm-leads-dont-turn-into-signed-cases",
  "qualified-leads-vs-clients-ready-to-sign":
    "/insights/why-most-law-firm-leads-dont-turn-into-signed-cases",
  "how-law-firms-can-make-intake-more-predictable":
    "/insights/where-law-firm-marketing-budgets-get-wasted",
};

export const publicRouteRedirects: Record<string, string> = {
  "/updates": "/insights",
  ...Object.fromEntries(
    Object.entries(retiredInsightSlugRedirects).map(([slug, target]) => [
      `/insights/${slug}`,
      target,
    ])
  ),
};
