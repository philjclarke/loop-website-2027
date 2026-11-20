import type { MetadataRoute } from "next";
import { getBlogPosts, getCaseStudies, getHomepage, getPages } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

/** Every published page, case study and blog post, at /sitemap.xml. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [homepage, pages, caseStudies, posts] = await Promise.all([
    getHomepage(),
    getPages(),
    getCaseStudies(),
    getBlogPosts(),
  ]);

  const entry = (path: string, doc?: { last_publication_date: string } | null) => ({
    url: `${SITE_URL}${path}`,
    ...(doc && { lastModified: doc.last_publication_date }),
  });

  return [
    entry("/", homepage),
    ...pages.map((page) => entry(`/${page.uid}`, page)),
    ...caseStudies.map((study) => entry(`/work/${study.uid}`, study)),
    ...posts.map((post) => entry(`/blog/${post.uid}`, post)),
  ];
}
