import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { generateSitemapXML } from "../src/utils/generateSitemap";
import { blogAuthors, blogPosts } from "../src/data/blog";

const toDateString = (value: Date) => value.toISOString().split("T")[0];

async function getFileLastmod(...relativePaths: string[]) {
  const stats = await Promise.all(
    relativePaths.map(async (relativePath) => {
      const absolutePath = path.join(process.cwd(), relativePath);
      const fileStats = await stat(absolutePath);
      return toDateString(fileStats.mtime);
    })
  );

  return stats.sort().at(-1);
}

function getLatestDate(...values: Array<string | undefined>) {
  return values.filter(Boolean).sort().at(-1);
}

async function main() {
  const publicDir = path.join(process.cwd(), "public");
  const sitemapPath = path.join(publicDir, "sitemap.xml");
  const blogDataLastmod = await getFileLastmod("src/data/blog.ts");
  const casesLastmod = await getFileLastmod("src/data/cases.ts", "src/pages/CaseDetailPage.tsx");
  const authorPageLastmod = await getFileLastmod("src/pages/AuthorPage.tsx");

  const authorLastmods = Object.fromEntries(
    blogAuthors.map((author) => {
      const latestAuthorPostDate = blogPosts
        .filter((post) => post.status === "published" && post.author.id === author.id)
        .map((post) => post.modifiedDate || post.publishedDate)
        .sort()
        .at(-1);

      return [
        author.url,
        getLatestDate(
          blogDataLastmod,
          latestAuthorPostDate,
          authorPageLastmod
        ),
      ];
    })
  );

  await mkdir(publicDir, { recursive: true });
  await writeFile(
    sitemapPath,
    generateSitemapXML({
      lastmods: {
        "/": await getFileLastmod("src/pages/Index.tsx"),
        "/cases": await getFileLastmod("src/pages/CasesPage.tsx", "src/components/case-finder.tsx"),
        "/cases/:slug": casesLastmod,
        "/request-clients": await getFileLastmod("src/pages/RequestCasesForm.tsx"),
        "/about": await getFileLastmod("src/pages/AboutPage.tsx"),
        "/contact": await getFileLastmod("src/pages/ContactPage.tsx"),
        "/editorial": await getFileLastmod("src/pages/EditorialPage.tsx"),
        "/privacy": await getFileLastmod("src/pages/PrivacyPage.tsx"),
        "/terms": await getFileLastmod("src/pages/TermsPage.tsx"),
        "/cookies": await getFileLastmod("src/pages/CookiesPage.tsx"),
        "/accessibility": await getFileLastmod("src/pages/AccessibilityPage.tsx"),
        "/insights": await getFileLastmod("src/pages/BlogPage.tsx", "src/data/blog.ts"),
        "/insights/author/:authorId": await getFileLastmod("src/pages/AuthorPage.tsx", "src/data/blog.ts"),
        ...authorLastmods,
      },
    }),
    "utf8"
  );
}

main().catch((error) => {
  console.error("Failed to generate sitemap.xml", error);
  process.exitCode = 1;
});
