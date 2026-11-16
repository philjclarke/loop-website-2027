import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Section } from "@/components/Container";
import { RichText } from "@/components/RichText";

export type TeamProps = SliceComponentProps<Content.TeamSlice>;

export default function Team({ slice }: TeamProps) {
  const { label, heading, members } = slice.primary;
  return (
    <Section label={label} sliceType={slice.slice_type}>
      <RichText field={heading} />
      <ul className="mt-10 grid gap-12 md:grid-cols-2">
        {members.map((member, i) => (
          <li key={i}>
            <div className="aspect-square overflow-hidden rounded-2xl bg-surface">
              <PrismicNextImage
                field={member.photo}
                fallbackAlt=""
                className="h-full w-full object-cover"
                sizes="(min-width: 768px) 30vw, 100vw"
              />
            </div>
            <h3 className="mt-4 text-lg font-medium">{member.name}</h3>
            {member.role && <p className="text-sm text-muted">{member.role}</p>}
            <div className="mt-3 text-muted">
              <RichText field={member.bio} />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
