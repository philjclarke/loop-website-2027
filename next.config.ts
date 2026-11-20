import type { NextConfig } from "next";

/**
 * Addresses from earlier loopdesign.org sites, so old links and search
 * results land somewhere useful. [old path, new path].
 */
const OLD_SITE_REDIRECTS: [string, string][] = [
  // 2025 site (static HTML)
  ["/index.html", "/"],
  ["/old-home.html", "/"],
  ["/about.html", "/about"],
  ["/services.html", "/services"],
  ["/clients.html", "/work"],
  ["/projects.html", "/work"],
  ["/blog.html", "/blog"],
  ["/contact.html", "/contact"],
  ["/contact-thanks.html", "/contact"],
  ["/careers.html", "/about"],
  ["/detail_projects.html", "/work"],
  ["/detail_services.html", "/services"],
  ["/detail_blog.html", "/blog"],
  ["/detail_category.html", "/blog"],
  ["/detail_team.html", "/about"],
  ["/detail_careers.html", "/about"],
  ["/401.html", "/"],
  ["/legal/:path*", "/privacy"],
  ["/clients", "/work"],
  ["/projects", "/work"],
  ["/projects/:slug", "/work"],
  ["/services/:slug", "/services"],
  ["/category/:slug", "/blog"],
  ["/careers/:path*", "/about"],
  ["/careers", "/about"],
  ["/privacy-policy", "/privacy"],
  ["/cookie-policy", "/privacy"],
  ["/terms-of-service", "/privacy"],
  ["/blog/elevating-customer-experience-with-personalised-branding", "/blog"],
  // Earlier site
  ["/new-blog/:path*", "/blog"],
  ["/new-blog", "/blog"],
  ["/boots-soltan-for-schools", "/work"],
  ["/edf-energy-mycampus", "/work"],
  ["/ibili", "/work"],
  ["/imeche", "/work"],
  ["/learning-1", "/work"],
  ["/microsoft-tatler", "/work"],
  ["/plps", "/work"],
  ["/premier-league-primary-stars", "/work"],
  ["/the-ruse", "/work"],
  ["/search", "/"],
  ["/contatti.php", "/contact"],
  ["/webdesign.php", "/services"],
  ["/resource.php", "/"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // "Case studies" was renamed to "Work".
      { source: "/case-studies", destination: "/work", permanent: true },
      { source: "/case-studies/:uid", destination: "/work/:uid", permanent: true },
      ...OLD_SITE_REDIRECTS.map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
