import { isFilled, type Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { Section } from "@/components/Container";
import { RichText } from "@/components/RichText";

export type ContactDetailsProps = SliceComponentProps<Content.ContactDetailsSlice>;

export default function ContactDetails({ slice }: ContactDetailsProps) {
  const { label, heading, body, email, phone, address, links } = slice.primary;
  const otherLinks = links.filter((link) => isFilled.link(link));

  return (
    <Section label={label} sliceType={slice.slice_type}>
      <div className="max-w-3xl">
        <RichText field={heading} />
        <div className="mt-6 text-lg text-muted">
          <RichText field={body} />
        </div>
      </div>
      <dl className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
        {email && (
          <div>
            <dt className="text-sm text-muted">Email</dt>
            <dd className="mt-1 text-xl">
              <a href={`mailto:${email}`} className="underline underline-offset-4 hover:text-muted">
                {email}
              </a>
            </dd>
          </div>
        )}
        {phone && (
          <div>
            <dt className="text-sm text-muted">Phone</dt>
            <dd className="mt-1 text-xl">
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-muted">
                {phone}
              </a>
            </dd>
          </div>
        )}
        {isFilled.richText(address) && (
          <div>
            <dt className="text-sm text-muted">Address</dt>
            <dd className="mt-1">
              <RichText field={address} />
            </dd>
          </div>
        )}
        {otherLinks.length > 0 && (
          <div>
            <dt className="text-sm text-muted">Elsewhere</dt>
            <dd className="mt-1">
              <ul className="space-y-1">
                {otherLinks.map((link, i) => (
                  <li key={i}>
                    <PrismicNextLink field={link} className="underline underline-offset-4 hover:text-muted" />
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}
      </dl>
    </Section>
  );
}
