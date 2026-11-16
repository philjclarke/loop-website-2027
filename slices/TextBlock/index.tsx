import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Section } from "@/components/Container";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/Button";

export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

export default function TextBlock({ slice }: TextBlockProps) {
  const { label, heading, body, link } = slice.primary;
  return (
    <Section label={label} sliceType={slice.slice_type}>
      <div className="max-w-3xl">
        <RichText field={heading} />
        <div className="mt-6 text-lg leading-relaxed">
          <RichText field={body} />
        </div>
        <div className="mt-8">
          <Button field={link} variant="text" />
        </div>
      </div>
    </Section>
  );
}
