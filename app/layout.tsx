import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { getPreviewRef } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { getSettings } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings(await getPreviewRef());
  const siteName = settings?.data.site_name || "loop";
  return {
    title: { default: siteName, template: `%s | ${siteName}` },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings(await getPreviewRef());

  return (
    <html lang="en-GB" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
