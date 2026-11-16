import { isFilled, type Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Section } from "@/components/Container";
import { RichText } from "@/components/RichText";

export type ClientListProps = SliceComponentProps<Content.ClientListSlice>;

export default function ClientList({ slice }: ClientListProps) {
  const { label, heading, clients } = slice.primary;
  return (
    <Section label={label} sliceType={slice.slice_type}>
      <RichText field={heading} />
      <ul className="mt-10 grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-4">
        {clients.map((client, i) => (
          <li
            key={i}
            className="flex min-h-24 items-center justify-center border-r border-b border-line p-6 text-center"
          >
            {isFilled.image(client.logo) ? (
              /*
               * Logos are single-colour artwork on a shared canvas. The
               * filter turns them black in light mode and white in dark
               * mode, whatever colour they were uploaded in.
               */
              <PrismicNextImage
                field={client.logo}
                fallbackAlt=""
                sizes="(min-width: 1024px) 200px, 45vw"
                className="h-auto w-full max-w-[200px] opacity-80 brightness-0 dark:invert"
              />
            ) : (
              <span className="font-medium">{client.name}</span>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
