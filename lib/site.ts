import type { Metadata } from "next";

/** The site's public address, used for canonical URLs, the sitemap and share images. */
export const SITE_URL = "https://www.loopdesign.org";

/** Used whenever a page has no share image of its own (public/og-default.png). */
const DEFAULT_SHARE_IMAGE = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: "loop: design, development and learning support for education",
};

/**
 * Open Graph images for a page: the first image that's set, or the site-wide
 * default. Pass candidates in order of preference (e.g. meta image, then
 * featured image).
 */
export function shareImages(...candidates: (string | null | undefined)[]): Metadata["openGraph"] {
  const url = candidates.find(Boolean);
  return { images: [url ? { url } : DEFAULT_SHARE_IMAGE] };
}

/** Year ranges display with an en dash however they were typed ("2018 - 2026" → "2018–2026"). */
export function formatYear(year: string | null | undefined) {
  return year?.replace(/\s*[-–—]\s*/g, "–") ?? "";
}
