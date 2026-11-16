import { asDate, asText } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import type { BlogPostDocument } from "@/prismicio-types";

export function formatDate(date: Parameters<typeof asDate>[0]) {
  const d = asDate(date);
  return d
    ? d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : null;
}

export function PostCard({ doc }: { doc: BlogPostDocument }) {
  const date = formatDate(doc.data.published);
  return (
    <PrismicNextLink
      document={doc}
      className="group grid gap-1 border-t border-line py-6 sm:grid-cols-[1fr_auto] sm:gap-8"
    >
      <div>
        <h3 className="text-lg font-medium group-hover:text-muted">
          {asText(doc.data.title) || doc.uid}
        </h3>
        {doc.data.excerpt && <p className="mt-1 text-muted">{doc.data.excerpt}</p>}
      </div>
      {date && <p className="text-sm text-muted">{date}</p>}
    </PrismicNextLink>
  );
}
