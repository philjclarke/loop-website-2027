import Image from "next/image";
import Link from "next/link";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import type { SettingsDocument } from "@/prismicio-types";
import { Container } from "./Container";

/** Used until navigation is filled in on the Settings document in Prismic. */
const FALLBACK_NAV = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header({ settings }: { settings: SettingsDocument | null }) {
  const siteName = settings?.data.site_name || "loop";
  const nav =
    settings?.data.navigation.filter((link) => isFilled.link(link)) ?? [];

  return (
    <header className="py-6">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <Link href="/" className="shrink-0" aria-label={`${siteName} home`}>
          {/* Both logos render; CSS shows the one matching the current theme. */}
          <Image
            src="/logo.png"
            alt={siteName}
            width={364}
            height={160}
            priority
            className="h-8 w-auto dark:hidden"
          />
          <Image
            src="/logo-ro.png"
            alt={siteName}
            width={364}
            height={160}
            priority
            className="hidden h-8 w-auto dark:block"
          />
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {nav.length
              ? nav.map((link, i) => (
                  <li key={i}>
                    <PrismicNextLink
                      field={link}
                      className="hover:text-muted"
                    />
                  </li>
                ))
              : FALLBACK_NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-muted">
                      {item.label}
                    </Link>
                  </li>
                ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
