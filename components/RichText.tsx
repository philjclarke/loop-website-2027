import type { RichTextField } from "@prismicio/client";
import { PrismicRichText, type JSXMapSerializer } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <h1 className="text-4xl font-medium tracking-tight sm:text-6xl">{children}</h1>
  ),
  heading2: ({ children }) => (
    <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">{children}</h2>
  ),
  heading3: ({ children }) => (
    <h3 className="mt-8 text-xl font-medium">{children}</h3>
  ),
  paragraph: ({ children }) => <p className="mt-4 first:mt-0">{children}</p>,
  list: ({ children }) => <ul className="mt-4 list-disc space-y-1 pl-5">{children}</ul>,
  oList: ({ children }) => <ol className="mt-4 list-decimal space-y-1 pl-5">{children}</ol>,
  hyperlink: ({ node, children }) => (
    <PrismicNextLink field={node.data} className="underline underline-offset-4 hover:text-muted">
      {children}
    </PrismicNextLink>
  ),
};

export function RichText({ field }: { field: RichTextField | null | undefined }) {
  return <PrismicRichText field={field} components={components} />;
}
