import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Section } from "@/components/Container";
import { RichText } from "@/components/RichText";

export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

export default function Testimonials({ slice }: TestimonialsProps) {
  const { label, items } = slice.primary;
  return (
    <Section label={label} sliceType={slice.slice_type}>
      <ul className="grid gap-12">
        {items.map((item, i) => (
          <li key={i}>
            <figure>
              <blockquote className="text-2xl leading-snug font-medium tracking-tight sm:text-3xl">
                <RichText field={item.quote} />
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted">
                {[item.name, item.role].filter(Boolean).join(", ")}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
