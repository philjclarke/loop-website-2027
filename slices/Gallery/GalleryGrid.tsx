"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

export type GalleryShape = "landscape" | "square" | "widescreen";

type Item = { image: ImageField; caption: string | null };

const ASPECT: Record<GalleryShape, string> = {
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  widescreen: "aspect-video",
};

export function GalleryGrid({
  items,
  columns,
  shape,
}: {
  items: Item[];
  columns: 2 | 3;
  shape: GalleryShape;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? null : items[index];
  const several = items.length > 1;

  function open(i: number) {
    setIndex(i);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  function step(by: number) {
    setIndex((i) => (i === null ? i : (i + by + items.length) % items.length));
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  }

  return (
    <>
      <ul className={`grid gap-2 sm:gap-4 ${columns === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
        {items.map((item, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`Enlarge image ${i + 1} of ${items.length}${item.image.alt ? `: ${item.image.alt}` : ""}`}
              className={`group block w-full cursor-zoom-in overflow-hidden rounded-xl bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:rounded-2xl ${ASPECT[shape]}`}
            >
              <PrismicNextImage
                field={item.image}
                fallbackAlt=""
                sizes={columns === 2 ? "(min-width: 1152px) 576px, 50vw" : "(min-width: 1152px) 384px, 33vw"}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      {/*
       * A native modal dialog: it traps focus, closes on Esc and hides the
       * page from screen readers while open. Always dark, whatever the theme.
       */}
      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
        aria-label="Image viewer"
        className="m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 text-white backdrop:bg-black/90"
      >
        {current && (
          <div
            className="flex h-full flex-col items-center justify-center gap-4 p-4 sm:p-16"
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <PrismicNextImage
              key={index}
              field={current.image}
              fallbackAlt=""
              sizes="100vw"
              className="h-auto max-h-[80dvh] w-auto max-w-full rounded-lg object-contain"
            />
            {(current.caption || several) && (
              <p className="text-center text-sm text-white/70">
                {current.caption}
                {current.caption && several && " · "}
                {several && `${index! + 1} / ${items.length}`}
              </p>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white"
        >
          <Icon path="M6 6l12 12M18 6L6 18" />
        </button>
        {several && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white sm:left-4"
            >
              <Icon path="M15 5l-7 7 7 7" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white sm:right-4"
            >
              <Icon path="M9 5l7 7-7 7" />
            </button>
          </>
        )}
      </dialog>
    </>
  );
}

function Icon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}
