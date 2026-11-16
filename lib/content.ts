import { cacheLife, cacheTag } from "next/cache";
import { cacheTagPrismicPages } from "@prismicio/next";
import { createClient } from "@/prismicio";

/**
 * Every cached Prismic fetch is tagged with this, so publishing anything in
 * Prismic refreshes the whole site (see app/api/revalidate). The site is small,
 * so this keeps listings (case studies, blog) correct when new pages are added.
 */
export const PRISMIC_CACHE_TAG = "prismic";

function tag(pages: Parameters<typeof cacheTagPrismicPages>[0]) {
  cacheLife("max");
  cacheTag(PRISMIC_CACHE_TAG);
  cacheTagPrismicPages(pages);
}

export async function getSettings(ref?: string) {
  "use cache";
  const settings = await createClient()
    .getSingle("settings", { ref })
    .catch(() => null);
  tag(settings ? [settings] : []);
  return settings;
}

export async function getHomepage(ref?: string) {
  "use cache";
  const page = await createClient()
    .getSingle("homepage", { ref })
    .catch(() => null);
  tag(page ? [page] : []);
  return page;
}

export async function getPage(uid: string, ref?: string) {
  "use cache";
  const page = await createClient()
    .getByUID("page", uid, { ref })
    .catch(() => null);
  tag(page ? [page] : []);
  return page;
}

export async function getCaseStudy(uid: string, ref?: string) {
  "use cache";
  const page = await createClient()
    .getByUID("case_study", uid, { ref })
    .catch(() => null);
  tag(page ? [page] : []);
  return page;
}

export async function getCaseStudies(ref?: string) {
  "use cache";
  const pages = await createClient().getAllByType("case_study", {
    ref,
    orderings: [{ field: "document.first_publication_date", direction: "desc" }],
  });
  tag(pages);
  return pages;
}

export async function getBlogPost(uid: string, ref?: string) {
  "use cache";
  const page = await createClient()
    .getByUID("blog_post", uid, { ref })
    .catch(() => null);
  tag(page ? [page] : []);
  return page;
}

export async function getBlogPosts(ref?: string) {
  "use cache";
  const pages = await createClient().getAllByType("blog_post", {
    ref,
    orderings: [
      { field: "my.blog_post.published", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });
  tag(pages);
  return pages;
}

/**
 * With Cache Components, generateStaticParams must return at least one entry.
 * Before any content is published we return a placeholder that 404s.
 */
export function staticParamsOrPlaceholder(uids: (string | null)[]) {
  const params = uids.filter((uid): uid is string => !!uid).map((uid) => ({ uid }));
  return params.length ? params : [{ uid: "__placeholder__" }];
}
