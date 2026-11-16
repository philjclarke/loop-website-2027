import { isFilled, type Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Container } from "@/components/Container";

export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

export default function ImageBlock({ slice }: ImageBlockProps) {
  const { image, caption } = slice.primary;
  if (!isFilled.image(image)) return null;

  return (
    <section data-slice-type={slice.slice_type} className="py-8 sm:py-12">
      <Container>
        <figure>
          <PrismicNextImage
            field={image}
            className="w-full rounded-2xl"
            sizes="(min-width: 1152px) 1152px, 100vw"
          />
          {caption && <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>}
        </figure>
      </Container>
    </section>
  );
}
