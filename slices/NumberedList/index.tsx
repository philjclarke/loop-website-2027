import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Section } from "@/components/Container";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/Button";

export type NumberedListProps = SliceComponentProps<Content.NumberedListSlice>;

/** Used for services, "how we work" steps, etc. */
export default function NumberedList({ slice }: NumberedListProps) {
  const { label, heading, items, link } = slice.primary;
  return (
    <Section label={label} sliceType={slice.slice_type}>
      <RichText field={heading} />
      <ol className="mt-10">
        {items.map((item, i) => (
          <li
            key={i}
            className="grid gap-2 border-t border-line py-6 sm:grid-cols-[3rem_1fr_2fr] sm:gap-6"
          >
            <span className="text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-lg font-medium">{item.title}</h3>
            <div className="text-muted">
              <RichText field={item.description} />
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-8">
        <Button field={link} />
      </div>
    </Section>
  );
}
