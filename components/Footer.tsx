import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import type { SettingsDocument } from "@/prismicio-types";
import { Container } from "./Container";
import { RichText } from "./RichText";
import { Button } from "./Button";

export function Footer({ settings }: { settings: SettingsDocument | null }) {
  const data = settings?.data;
  const siteName = data?.site_name || "loop";
  const social = data?.social_links.filter((l) => isFilled.link(l)) ?? [];
  const legal = data?.legal_links.filter((l) => isFilled.link(l)) ?? [];

  return (
    <footer className="mt-auto border-t border-line">
      <Container className="py-16 sm:py-24">
        {isFilled.richText(data?.cta_heading) ? (
          <div className="max-w-2xl">
            <RichText field={data.cta_heading} />
            <div className="mt-4 text-lg text-muted">
              <RichText field={data.cta_text} />
            </div>
            <div className="mt-8">
              <Button field={data.cta_link} />
            </div>
          </div>
        ) : (
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Ready to start a project?
          </h2>
        )}
        {data?.email && (
          <a href={`mailto:${data.email}`} className="mt-6 inline-block text-lg underline underline-offset-4">
            {data.email}
          </a>
        )}
      </Container>
      <Container className="flex flex-col gap-4 border-t border-line py-8 text-sm text-muted sm:flex-row sm:justify-between">
        <p>© {siteName}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {[...social, ...legal].map((link, i) => (
            <li key={i}>
              <PrismicNextLink field={link} className="hover:text-foreground" />
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
