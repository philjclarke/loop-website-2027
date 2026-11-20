import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { asImageSrc, asText, isFilled } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { getPreviewRef, PrismicNextImage } from "@prismicio/next";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { getCaseStudy, staticParamsOrPlaceholder } from "@/lib/content";
import { formatYear, shareImages } from "@/lib/site";
import { Container } from "@/components/Container";
import { RichText } from "@/components/RichText";
import { FEATURED_IMAGE_ASPECT, SERVICES } from "@/components/CaseStudyCard";

export default async function CaseStudy({ params }: PageProps<"/work/[uid]">) {
  const { uid } = await params;
  const page = await getCaseStudy(uid, await getPreviewRef());
  if (!page) notFound();

  const { data } = page;
  const services = SERVICES.filter((s) => data[s.id]).map((s) => s.label);
  const facts = [
    { label: "Client", value: data.client },
    { label: "Scope", value: data.scope },
    { label: "Services", value: services.join(", ") },
    { label: "Year", value: formatYear(data.year) },
  ].filter((fact) => fact.value);

  return (
    <article>
      <Container className="pt-12 pb-16 sm:pt-20">
        <Link href="/work" className="text-sm text-muted hover:text-foreground">
          ← Work
        </Link>
        <div className="mt-8 max-w-4xl">
          <RichText field={data.title} />
          <div className="mt-6 text-xl text-muted">
            <RichText field={data.summary} />
          </div>
        </div>
        {facts.length > 0 && (
          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm md:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-muted">{fact.label}</dt>
                <dd className="mt-1">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
      {isFilled.image(data.featured_image) && (
        <Container>
          <div className={`${FEATURED_IMAGE_ASPECT} overflow-hidden rounded-2xl border border-line bg-surface`}>
            <PrismicNextImage
              field={data.featured_image}
              className="h-full w-full object-cover"
              sizes="(min-width: 1152px) 1152px, 100vw"
              priority
            />
          </div>
        </Container>
      )}
      <SliceZone slices={data.slices} components={components} />
    </article>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[uid]">): Promise<Metadata> {
  const { uid } = await params;
  const page = await getCaseStudy(uid, await getPreviewRef());
  if (!page) return {};

  return {
    title: page.data.meta_title || asText(page.data.title),
    description: page.data.meta_description || asText(page.data.summary),
    openGraph: shareImages(asImageSrc(page.data.meta_image), asImageSrc(page.data.featured_image)),
  };
}

export async function generateStaticParams() {
  const pages = await createClient().getAllByType("case_study");
  return staticParamsOrPlaceholder(pages.map((page) => page.uid));
}
