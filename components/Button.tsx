import type { ReactNode } from "react";
import { isFilled, type LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

export type ButtonVariant = "solid" | "outline" | "text";

const CLASSES: Record<ButtonVariant, string> = {
  solid:
    "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80",
  outline:
    "inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background",
  text: "inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4 hover:text-muted",
};

/** A Prismic link styled as a button. Children default to the link's own text. */
export function Button({
  field,
  variant = "solid",
  children,
}: {
  field: LinkField;
  variant?: ButtonVariant;
  children?: ReactNode;
}) {
  if (!isFilled.link(field)) return null;
  return (
    <PrismicNextLink field={field} className={CLASSES[variant]}>
      {children}
    </PrismicNextLink>
  );
}
