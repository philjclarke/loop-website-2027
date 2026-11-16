import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { getPreviewRef } from "@prismicio/next";
import { getCaseStudies } from "@/lib/content";
import { Section } from "@/components/Container";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/Button";
import { CaseStudyCard, caseStudyServices, SERVICES } from "@/components/CaseStudyCard";
import { CaseStudyFilter } from "@/components/CaseStudyFilter";

export type CaseStudyListProps = SliceComponentProps<Content.CaseStudyListSlice>;

/**
 * Lists case studies. On the homepage, tick "Featured only" and untick
 * "Show filters"; on the Work page, leave filters on.
 */
export default async function CaseStudyList({ slice }: CaseStudyListProps) {
  const { label, heading, featured_only, show_filters, link } = slice.primary;
  const all = await getCaseStudies(await getPreviewRef());
  const docs = featured_only ? all.filter((doc) => doc.data.featured) : all;

  return (
    <Section label={label} sliceType={slice.slice_type}>
      <RichText field={heading} />
      <div className="mt-10">
        {show_filters ? (
          <CaseStudyFilter
            services={SERVICES}
            items={docs.map((doc) => ({
              id: doc.id,
              services: caseStudyServices(doc),
              scope: doc.data.scope,
              card: <CaseStudyCard doc={doc} />,
            }))}
          />
        ) : (
          <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2">
            {docs.map((doc) => (
              <li key={doc.id}>
                <CaseStudyCard doc={doc} />
              </li>
            ))}
          </ul>
        )}
        {!docs.length && <p className="text-muted">More work coming soon.</p>}
      </div>
      <div className="mt-10">
        <Button field={link} variant="text" />
      </div>
    </Section>
  );
}
