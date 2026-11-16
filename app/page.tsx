import type { Metadata } from "next";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { getPreviewRef } from "@prismicio/next";
import { components } from "@/slices";
import { getHomepage } from "@/lib/content";
import { Container } from "@/components/Container";

export default async function Home() {
  const page = await getHomepage(await getPreviewRef());

  if (!page) {
    return (
      <Container className="py-24">
        <p className="text-muted">
          Publish the Homepage document in Prismic to see it here.
        </p>
      </Container>
    );
  }

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomepage(await getPreviewRef());
  return {
    title: page?.data.meta_title || undefined,
    description: page?.data.meta_description,
    openGraph: { images: [{ url: asImageSrc(page?.data.meta_image) ?? "" }] },
  };
}
