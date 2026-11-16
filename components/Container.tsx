import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** A page section with optional small label, in the style of the reference template. */
export function Section({
  label,
  children,
  className = "",
  sliceType,
}: {
  label?: string | null;
  children: ReactNode;
  className?: string;
  sliceType?: string;
}) {
  return (
    <section data-slice-type={sliceType} className={`py-16 sm:py-24 ${className}`}>
      <Container>
        <div className="grid gap-8 md:grid-cols-[1fr_3fr]">
          <p className="text-sm text-muted">{label}</p>
          <div>{children}</div>
        </div>
      </Container>
    </section>
  );
}
