import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { asImageSrc, asText, isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { getPreviewRef, PrismicNextImage } from "@prismicio/next";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { getBlogPost, staticParamsOrPlaceholder } from "@/lib/content";
import { shareImages } from "@/lib/site";
import { Container } from "@/components/Container";
import { RichText } from "@/components/RichText";
import { formatDate } from "@/components/PostCard";

export default async function BlogPost({ params }: PageProps<"/blog/[uid]">) {
  const { uid } = await params;
  const page = await getBlogPost(uid, await getPreviewRef());
  if (!page) notFound();

  const { data } = page;
  const date = formatDate(data.published);

  return (
    <article>
      <Container className="pt-12 pb-16 sm:pt-20">
        <Link href="/blog" className="text-sm text-muted hover:text-foreground">
          ← Blog
        </Link>
        <div className="mt-8 max-w-4xl">
          {date && <p className="mb-4 text-sm text-muted">{date}</p>}
          <RichText field={data.title} />
          {data.excerpt && <p className="mt-6 text-xl text-muted">{data.excerpt}</p>}
        </div>
      </Container>
      {isFilled.image(data.featured_image) && (
        <Container>
          <PrismicNextImage
            field={data.featured_image}
            className="w-full rounded-2xl"
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority
          />
        </Container>
      )}
      <SliceZone slices={data.slices} components={components} />
    </article>
  );
}

export async function generateMetadata({ params }: PageProps<"/blog/[uid]">): Promise<Metadata> {
  const { uid } = await params;
  const page = await getBlogPost(uid, await getPreviewRef());
  if (!page) return {};

  return {
    title: page.data.meta_title || asText(page.data.title),
    description: page.data.meta_description || page.data.excerpt,
    openGraph: shareImages(asImageSrc(page.data.meta_image), asImageSrc(page.data.featured_image)),
  };
}

export async function generateStaticParams() {
  const pages = await createClient().getAllByType("blog_post");
  return staticParamsOrPlaceholder(pages.map((page) => page.uid));
}
