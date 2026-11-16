import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Container } from "@/components/Container";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/Button";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

export default function Hero({ slice }: HeroProps) {
  const { eyebrow, heading, body, button } = slice.primary;
  return (
    <section data-slice-type={slice.slice_type} className="pt-16 pb-16 sm:pt-28 sm:pb-24">
      <Container>
        {eyebrow && <p className="mb-6 text-sm text-muted">{eyebrow}</p>}
        <div className="max-w-5xl">
          <RichText field={heading} />
        </div>
        <div className="mt-8 max-w-2xl text-lg text-muted sm:text-xl">
          <RichText field={body} />
        </div>
        <div className="mt-10">
          <Button field={button} />
        </div>
      </Container>
    </section>
  );
}
