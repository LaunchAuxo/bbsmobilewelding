"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryPhoto } from "@/lib/site-config";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, ZoomIcon } from "./icons";

export function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Track which slide is centered as the user swipes/scrolls the carousel.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = slideRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) setActive(index);
          }
        }
      },
      { root: track, threshold: 0.6 }
    );

    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [photos.length]);

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
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, photos.length]);

  const lightboxPhoto = lightboxIndex === null ? null : photos[lightboxIndex];

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, index) => (
          <div
            key={photo.src}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className="relative h-[420px] shrink-0 snap-center sm:h-[520px]"
            style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
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
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/20 group-hover:opacity-100">
                <ZoomIcon className="size-8 text-paper drop-shadow" />
              </span>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex gap-1.5">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
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
            onClick={() => scrollToSlide(Math.min(active + 1, photos.length - 1))}
            disabled={active === photos.length - 1}
            aria-label="Next photo"
            className="flex size-10 items-center justify-center rounded-md border border-line text-ink disabled:opacity-30"
          >
            <ArrowRightIcon className="size-5" />
          </button>
        </div>
      </div>

      {lightboxPhoto && (
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
              setLightboxIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
            }}
            aria-label="Previous photo"
            className="absolute left-2 flex size-11 items-center justify-center rounded-md text-paper hover:bg-white/10 sm:left-4"
          >
            <ArrowLeftIcon className="size-6" />
          </button>

          <Image
            src={lightboxPhoto.src}
            alt={lightboxPhoto.alt}
            width={lightboxPhoto.width}
            height={lightboxPhoto.height}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
            sizes="90vw"
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i === null ? i : (i + 1) % photos.length));
            }}
            aria-label="Next photo"
            className="absolute right-2 flex size-11 items-center justify-center rounded-md text-paper hover:bg-white/10 sm:right-4"
          >
            <ArrowRightIcon className="size-6" />
          </button>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-mist">
            {lightboxIndex! + 1} / {photos.length}
          </p>
        </div>
      )}
    </div>
  );
}
