"use client";

import { useState, type ReactNode } from "react";

type Option = { id: string; label: string };

export type FilterItem = {
  id: string;
  services: string[];
  scope: string | null;
  card: ReactNode;
};

const SCOPES: Option[] = [
  { id: "Company-wide", label: "Company-wide" },
  { id: "Project", label: "Project" },
];

export function CaseStudyFilter({
  items,
  services,
}: {
  items: FilterItem[];
  services: readonly Option[];
}) {
  const [service, setService] = useState<string | null>(null);
  const [scope, setScope] = useState<string | null>(null);

  const visible = items.filter(
    (item) =>
      (!service || item.services.includes(service)) && (!scope || item.scope === scope),
  );

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
        <FilterGroup label="Service" options={services} value={service} onChange={setService} />
        <FilterGroup label="Scope" options={SCOPES} value={scope} onChange={setScope} />
      </div>
      <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
        {visible.map((item) => (
          <li key={item.id}>{item.card}</li>
        ))}
      </ul>
      {!visible.length && <p className="mt-10 text-muted">Nothing matches those filters.</p>}
    </div>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly Option[];
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  const all: (Option | { id: null; label: string })[] = [{ id: null, label: "All" }, ...options];
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2 text-sm">
      {all.map((option) => {
        const active = value === option.id;
        return (
          <button
            key={option.label}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className={`rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-foreground bg-foreground text-background"
                : "border-line hover:border-foreground"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
