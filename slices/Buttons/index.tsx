import { isFilled, type Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export type ButtonsProps = SliceComponentProps<Content.ButtonsSlice>;

/**
 * A row of buttons, e.g. links out to a client's live site. Each link picks
 * its own style (Solid or Outline). Links to other websites get an ↗ arrow.
 * Ranged left, in line with galleries and images.
 */
export default function Buttons({ slice }: ButtonsProps) {
  const links = slice.primary.links.filter((link) => isFilled.link(link));
  if (!links.length) return null;

  return (
    <section data-slice-type={slice.slice_type} className="py-6 sm:py-8">
      <Container>
        <div className="flex flex-wrap gap-3">
          {links.map((link, i) => (
            <Button
              key={link.key ?? i}
              field={link}
              variant={link.variant === "Outline" ? "outline" : "solid"}
            >
              {link.text || (link.link_type === "Web" ? link.url : "Find out more")}
              {link.link_type === "Web" && <span aria-hidden="true">↗</span>}
            </Button>
          ))}
        </div>
      </Container>
    </section>
  );
}
