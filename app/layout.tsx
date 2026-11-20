import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { PrismicPreview } from "@prismicio/next";
import { getPreviewRef } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { getSettings } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { themeScript } from "@/lib/theme";
import { SITE_URL, shareImages } from "@/lib/site";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings(await getPreviewRef());
  const siteName = settings?.data.site_name || "loop";
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: siteName, template: `%s | ${siteName}` },
    openGraph: { siteName, locale: "en_GB", type: "website", ...shareImages() },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings(await getPreviewRef());

  return (
    <html
      lang="en-GB"
      className={`${figtree.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <Header settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        {/* Cookieless visit statistics (Vercel Web Analytics). */}
        <Analytics />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
