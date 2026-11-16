import { isFilled, type LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

export function Button({ field, variant = "solid" }: { field: LinkField; variant?: "solid" | "text" }) {
  if (!isFilled.link(field)) return null;

  const className =
    variant === "solid"
      ? "inline-flex items-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
      : "inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4 hover:text-muted";

  return <PrismicNextLink field={field} className={className} />;
}
