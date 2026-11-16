import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { getPreviewRef } from "@prismicio/next";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { getPage, staticParamsOrPlaceholder } from "@/lib/content";

/** Services, About, Case studies (listing), Blog (listing), legal pages, etc. */
export default async function Page({ params }: PageProps<"/[uid]">) {
  const { uid } = await params;
  const page = await getPage(uid, await getPreviewRef());
  if (!page) notFound();

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({ params }: PageProps<"/[uid]">): Promise<Metadata> {
  const { uid } = await params;
  const page = await getPage(uid, await getPreviewRef());
  if (!page) return {};

  return {
    title: page.data.meta_title || undefined,
    description: page.data.meta_description,
    openGraph: { images: [{ url: asImageSrc(page.data.meta_image) ?? "" }] },
  };
}

export async function generateStaticParams() {
  const pages = await createClient().getAllByType("page");
  return staticParamsOrPlaceholder(pages.map((page) => page.uid));
}
