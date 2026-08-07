"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryItem, GalleryPhoto } from "@/lib/site-config";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, ZoomIcon } from "./icons";

function itemKey(item: GalleryItem) {
  return item.kind === "photo" ? item.photo.src : `${item.before.src}|${item.after.src}`;
}

export function Gallery({ items }: { items: GalleryItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ratiosRef = useRef<number[]>([]);
  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Track which slide is most visible as the user swipes/scrolls the
  // carousel. Several slides can be partially on-screen at once, so we
  // can't just react to whichever one last crossed a threshold — that
  // picks up whichever slide happens to be last in DOM order among the
  // ones currently visible, not the one actually most in view. Instead,
  // keep every slide's current visibility ratio and pick the max.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    ratiosRef.current = items.map(() => 0);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = slideRefs.current.findIndex((el) => el === entry.target);
          if (index !== -1) ratiosRef.current[index] = entry.intersectionRatio;
        }
        let bestIndex = 0;
        let bestRatio = -1;
        ratiosRef.current.forEach((ratio, index) => {
          // >= so that on an exact tie (e.g. two slides both fully visible
          // near the end of the track, where a narrow last slide fits
          // alongside its neighbor) the later slide wins — otherwise the
          // tracker gets stuck one slide early and Next never disables.
          if (ratio >= bestRatio) {
            bestRatio = ratio;
            bestIndex = index;
          }
        });
        setActive(bestIndex);
      },
      { root: track, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  function scrollToSlide(index: number) {
    slideRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }

  // Lightbox keyboard nav + scroll lock.
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, items.length]);

  const lightboxItem = lightboxIndex === null ? null : items[lightboxIndex];

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <div
            key={itemKey(item)}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className="relative h-[420px] w-fit shrink-0 snap-center sm:h-[520px]"
          >
            {item.kind === "photo" ? (
              <GallerySlide
                photo={item.photo}
                onOpen={() => setLightboxIndex(index)}
              />
            ) : (
              <div className="flex h-full gap-1">
                <GallerySlide photo={item.before} label="Before" onOpen={() => setLightboxIndex(index)} />
                <GallerySlide photo={item.after} label="After" onOpen={() => setLightboxIndex(index)} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex gap-1.5">
          {items.map((item, index) => (
            <button
              key={itemKey(item)}
              type="button"
              onClick={() => scrollToSlide(index)}
              aria-label={`Go to photo ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                index === active ? "w-6 bg-ink" : "w-1.5 bg-line"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollToSlide(Math.max(active - 1, 0))}
            disabled={active === 0}
            aria-label="Previous photo"
            className="flex size-10 items-center justify-center rounded-md border border-line text-ink disabled:opacity-30"
          >
            <ArrowLeftIcon className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollToSlide(Math.min(active + 1, items.length - 1))}
            disabled={active === items.length - 1}
            aria-label="Next photo"
            className="flex size-10 items-center justify-center rounded-md border border-line text-ink disabled:opacity-30"
          >
            <ArrowRightIcon className="size-5" />
          </button>
        </div>
      </div>

      {lightboxItem && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
            className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-md text-paper hover:bg-white/10"
          >
            <CloseIcon className="size-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
            }}
            aria-label="Previous photo"
            className="absolute left-2 flex size-11 items-center justify-center rounded-md text-paper hover:bg-white/10 sm:left-4"
          >
            <ArrowLeftIcon className="size-6" />
          </button>

          {lightboxItem.kind === "photo" ? (
            <Image
              src={lightboxItem.photo.src}
              alt={lightboxItem.photo.alt}
              width={lightboxItem.photo.width}
              height={lightboxItem.photo.height}
              className="max-h-[85vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
              sizes="90vw"
            />
          ) : (
            <div
              className="flex max-h-[85vh] max-w-[90vw] flex-col items-center gap-4 sm:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <LightboxHalf photo={lightboxItem.before} label="Before" />
              <LightboxHalf photo={lightboxItem.after} label="After" />
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i === null ? i : (i + 1) % items.length));
            }}
            aria-label="Next photo"
            className="absolute right-2 flex size-11 items-center justify-center rounded-md text-paper hover:bg-white/10 sm:right-4"
          >
            <ArrowRightIcon className="size-6" />
          </button>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-mist">
            {lightboxIndex! + 1} / {items.length}
          </p>
        </div>
      )}
    </div>
  );
}

function GallerySlide({
  photo,
  label,
  onOpen,
}: {
  photo: GalleryPhoto;
  label?: string;
  onOpen: () => void;
}) {
  return (
    <div className="relative h-full" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
      <button
        type="button"
        onClick={onOpen}
        className="group relative block h-full w-full overflow-hidden rounded-lg border border-line"
        aria-label={`View full-size: ${photo.alt}`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 640px) 520px, 420px"
        />
        {label && (
          <span className="absolute top-2 left-2 rounded-md bg-black/70 px-2 py-1 font-display text-xs font-semibold tracking-widest text-paper uppercase">
            {label}
          </span>
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/20 group-hover:opacity-100">
          <ZoomIcon className="size-8 text-paper drop-shadow" />
        </span>
      </button>
    </div>
  );
}

function LightboxHalf({ photo, label }: { photo: GalleryPhoto; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-display text-xs font-semibold tracking-widest text-mist uppercase">
        {label}
      </span>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        className="max-h-[40vh] max-w-[90vw] object-contain sm:max-h-[75vh] sm:max-w-[42vw]"
        sizes="90vw"
      />
    </div>
  );
}
