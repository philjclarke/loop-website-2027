import { isFilled, type Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Container } from "@/components/Container";
import { GalleryGrid, type GalleryShape } from "./GalleryGrid";

export type GalleryProps = SliceComponentProps<Content.GallerySlice>;

const SHAPES: Record<Content.GallerySlice["primary"]["image_shape"], GalleryShape> = {
  "Landscape (4:3)": "landscape",
  "Square (1:1)": "square",
  "Widescreen (16:9)": "widescreen",
};

/**
 * A grid of images, 2 or 3 to a row, that wraps onto as many rows as there are
 * images. Clicking one opens it full size in an overlay.
 */
export default function Gallery({ slice }: GalleryProps) {
  const { columns, image_shape, images } = slice.primary;
  const items = images
    .filter((item) => isFilled.image(item.image))
    .map((item) => ({ image: item.image, caption: item.caption || null }));
  if (!items.length) return null;

  return (
    <section data-slice-type={slice.slice_type} className="py-8 sm:py-12">
      <Container>
        <GalleryGrid
          items={items}
          columns={columns === "2" ? 2 : 3}
          shape={SHAPES[image_shape] ?? "landscape"}
        />
      </Container>
    </section>
  );
}
