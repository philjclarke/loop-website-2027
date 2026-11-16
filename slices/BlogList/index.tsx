import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { getPreviewRef } from "@prismicio/next";
import { getBlogPosts } from "@/lib/content";
import { Section } from "@/components/Container";
import { RichText } from "@/components/RichText";
import { Button } from "@/components/Button";
import { PostCard } from "@/components/PostCard";

export type BlogListProps = SliceComponentProps<Content.BlogListSlice>;

export default async function BlogList({ slice }: BlogListProps) {
  const { label, heading, limit, link } = slice.primary;
  const all = await getBlogPosts(await getPreviewRef());
  const posts = limit ? all.slice(0, limit) : all;

  return (
    <Section label={label} sliceType={slice.slice_type}>
      <RichText field={heading} />
      <ul className="mt-10 border-b border-line">
        {posts.map((doc) => (
          <li key={doc.id}>
            <PostCard doc={doc} />
          </li>
        ))}
      </ul>
      {!posts.length && <p className="mt-6 text-muted">Posts coming soon.</p>}
      <div className="mt-8">
        <Button field={link} variant="text" />
      </div>
    </Section>
  );
}
