import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { generateSitemapXML } from "../src/utils/generateSitemap";

async function main() {
  const publicDir = path.join(process.cwd(), "public");
  const sitemapPath = path.join(publicDir, "sitemap.xml");

  await mkdir(publicDir, { recursive: true });
  await writeFile(sitemapPath, generateSitemapXML(), "utf8");
}

main().catch((error) => {
  console.error("Failed to generate sitemap.xml", error);
  process.exitCode = 1;
});
