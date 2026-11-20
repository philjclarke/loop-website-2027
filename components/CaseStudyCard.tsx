import { asText } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import type { CaseStudyDocument } from "@/prismicio-types";
import { formatYear } from "@/lib/site";

export const SERVICES = [
  { id: "design", label: "Design" },
  { id: "development", label: "Development" },
  { id: "learning_support", label: "Learning support" },
] as const;

/**
 * Featured images are cropped to this shape everywhere they appear (listings
 * and the case study page), matching the 3600 x 2048 artwork the images are
 * made at. Images in other shapes are cropped to fit, centred.
 */
export const FEATURED_IMAGE_ASPECT = "aspect-[225/128]";

export type ServiceId = (typeof SERVICES)[number]["id"];

export function caseStudyServices(doc: CaseStudyDocument): ServiceId[] {
  return SERVICES.filter((s) => doc.data[s.id]).map((s) => s.id);
}

export function CaseStudyCard({ doc }: { doc: CaseStudyDocument }) {
  const services = SERVICES.filter((s) => doc.data[s.id]).map((s) => s.label);
  const meta = [doc.data.scope, ...services].filter(Boolean).join(" · ");

  return (
    <PrismicNextLink document={doc} className="group block">
      <div className={`${FEATURED_IMAGE_ASPECT} overflow-hidden rounded-2xl border border-line bg-surface`}>
        <PrismicNextImage
          field={doc.data.featured_image}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          fallbackAlt=""
          sizes="(min-width: 768px) 40vw, 100vw"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-medium">{asText(doc.data.title) || doc.uid}</h3>
        {doc.data.year && <span className="text-sm text-muted">{formatYear(doc.data.year)}</span>}
      </div>
      {meta && <p className="mt-1 text-sm text-muted">{meta}</p>}
    </PrismicNextLink>
  );
}
