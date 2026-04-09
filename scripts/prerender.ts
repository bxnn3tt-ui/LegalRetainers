import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { blogAuthors, blogPosts } from "../src/data/blog";
import { cases } from "../src/data/cases";
import { renderRoute } from "../src/entry-server";

const staticRoutes = [
  "/",
  "/cases",
  "/request-clients",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
  "/cookies",
  "/editorial",
  "/contact-success",
  "/order-success",
  "/newsletter-success",
  "/insights",
  "/design-system",
];

const prerenderRoutes = [
  ...staticRoutes,
  ...cases.map((caseItem) => `/cases/${caseItem.slug}`),
  ...blogPosts
    .filter((post) => post.status === "published")
    .map((post) => `/insights/${post.slug}`),
  ...blogAuthors.map((author) => author.url),
  "/404",
];

function injectPrerenderedMarkup(template: string, route: string, appHtml: string, headTags: string) {
  const routeAwareTemplate = template.includes("<!-- All meta tags dynamically managed by SEOHead component -->")
    ? template.replace(
        "<!-- All meta tags dynamically managed by SEOHead component -->",
        `<!-- All meta tags dynamically managed by SEOHead component -->\n${headTags}`
      )
    : template.replace("</head>", `${headTags}\n</head>`);

  return routeAwareTemplate.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

async function writeRouteHtml(distDir: string, route: string, html: string) {
  if (route === "/") {
    await writeFile(path.join(distDir, "index.html"), html, "utf8");
    return;
  }

  if (route === "/404") {
    await writeFile(path.join(distDir, "404.html"), html, "utf8");
    return;
  }

  const routeDir = path.join(distDir, route.replace(/^\//, ""));
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), html, "utf8");
}

async function main() {
  const distDir = path.join(process.cwd(), "dist");
  const template = await readFile(path.join(distDir, "index.html"), "utf8");

  for (const route of prerenderRoutes) {
    const { appHtml, headTags } = renderRoute(route);
    const html = injectPrerenderedMarkup(template, route, appHtml, headTags);
    await writeRouteHtml(distDir, route, html);
  }
}

main().catch((error) => {
  console.error("Failed to prerender routes", error);
  process.exitCode = 1;
});
