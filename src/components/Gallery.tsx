"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { BeforeAfterPair, GalleryPhoto } from "@/lib/site-config";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, ZoomIcon } from "./icons";

// Shared scroll-snap carousel behavior: which slide is "active" (for
// dots/arrow-disable state) and a helper to scroll to a given slide.
//
// Two earlier attempts derived "active" purely from scroll geometry
// (visibility ratio, then nearest-to-center), and both broke specifically
// at the edges: the first/last slide often can't be fully centered or
// fully "ratio 1" at the scroll limit, because there isn't enough content
// past it to scroll any further — so a neighbor kept winning instead,
// and a boundary patch on top of that fought legitimate navigation away
// from the edge (it kept re-firing and snapping back, since the neighbor
// slide's own centered position could *also* land near that same scroll
// limit once slides cluster near the end).
//
// The fix: don't derive "active" from geometry for button/dot clicks at
// all — they already know exactly which slide they're targeting, so they
// just say so directly. Geometry-based detection (nearest-center, with a
// boundary snap) is only used to sync `active` after a genuine manual
// drag/swipe, where there's no explicit target to reference. A flag
// distinguishes the two so a click's own scroll settling doesn't get
// "corrected" back to the wrong slide by the drag-sync logic.
function useCarousel(count: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  // Wall-clock cooldown rather than a boolean: a smooth-scroll animation
  // can fire scroll events in bursts with gaps between them, and each
  // gap over the debounce window below looks like a "settle" — a plain
  // flag reset by the first such gap would let a later, still-mid-
  // animation settle fire the drag-sync path anyway. Gating on elapsed
  // time survives any number of those intermediate settles.
  const programmaticUntilRef = useRef(0);
  const settleTimerRef = useRef<number | null>(null);

  function scrollToSlide(index: number) {
    const clamped = Math.max(0, Math.min(count - 1, index));
    programmaticUntilRef.current = Date.now() + 900;
    setActive(clamped);
    slideRefs.current[clamped]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track || count === 0) return;

    function onScroll() {
      if (settleTimerRef.current !== null) window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = window.setTimeout(() => {
        if (Date.now() < programmaticUntilRef.current) {
          return;
        }
        // A real drag/swipe/wheel scroll — derive active from where the
        // user actually left it, snapping to the edge slide once close
        // enough (it may never reach true min/max distance-to-center).
        if (track!.scrollLeft <= 2) {
          setActive(0);
          return;
        }
        if (track!.scrollLeft >= track!.scrollWidth - track!.clientWidth - 2) {
          setActive(count - 1);
          return;
        }
        const trackRect = track!.getBoundingClientRect();
        const trackCenter = trackRect.left + trackRect.width / 2;
        let bestIndex = 0;
        let bestDistance = Infinity;
        slideRefs.current.forEach((el, index) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const distance = Math.abs(r.left + r.width / 2 - trackCenter);
          if (distance < bestDistance) {
            bestDistance = distance;
            bestIndex = index;
          }
        });
        setActive(bestIndex);
      }, 120);
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (settleTimerRef.current !== null) window.clearTimeout(settleTimerRef.current);
    };
  }, [count]);

  return { trackRef, slideRefs, active, scrollToSlide };
}

// Keyboard nav + scroll lock while a lightbox is open.
function useLightboxKeyboard(
  count: number,
  lightboxIndex: number | null,
  setLightboxIndex: (updater: (i: number | null) => number | null) => void
) {
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(() => null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % count));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? i : (i - 1 + count) % count));
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, count, setLightboxIndex]);
}

function CarouselControls({
  count,
  active,
  scrollToSlide,
}: {
  count: number;
  active: number;
  scrollToSlide: (index: number) => void;
}) {
  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex gap-1.5">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
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
          className="flex size-9 items-center justify-center rounded-md border border-line text-ink disabled:opacity-30"
        >
          <ArrowLeftIcon className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollToSlide(Math.min(active + 1, count - 1))}
          disabled={active === count - 1}
          aria-label="Next photo"
          className="flex size-9 items-center justify-center rounded-md border border-line text-ink disabled:opacity-30"
        >
          <ArrowRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}

function LightboxShell({
  onClose,
  onPrev,
  onNext,
  position,
  children,
}: {
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  position: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-md text-paper hover:bg-white/10"
      >
        <CloseIcon className="size-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous photo"
        className="absolute left-2 flex size-11 items-center justify-center rounded-md text-paper hover:bg-white/10 sm:left-4"
      >
        <ArrowLeftIcon className="size-6" />
      </button>

      <div onClick={(e) => e.stopPropagation()}>{children}</div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next photo"
        className="absolute right-2 flex size-11 items-center justify-center rounded-md text-paper hover:bg-white/10 sm:right-4"
      >
        <ArrowRightIcon className="size-6" />
      </button>

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-mist">{position}</p>
    </div>
  );
}

const SLIDE_HEIGHT = "h-[190px] sm:h-[300px] lg:h-[380px]";

function PhotoSlide({ photo, onOpen }: { photo: GalleryPhoto; onOpen: () => void }) {
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
          sizes="(min-width: 640px) 380px, 300px"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/20 group-hover:opacity-100">
          <ZoomIcon className="size-7 text-paper drop-shadow" />
        </span>
      </button>
    </div>
  );
}

export function PhotoCarousel({ photos }: { photos: GalleryPhoto[] }) {
  const { trackRef, slideRefs, active, scrollToSlide } = useCarousel(photos.length);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  useLightboxKeyboard(photos.length, lightboxIndex, setLightboxIndex);

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
            className={`relative w-fit shrink-0 snap-center ${SLIDE_HEIGHT}`}
          >
            <PhotoSlide photo={photo} onOpen={() => setLightboxIndex(index)} />
          </div>
        ))}
      </div>

      <CarouselControls count={photos.length} active={active} scrollToSlide={scrollToSlide} />

      {lightboxPhoto && (
        <LightboxShell
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length))}
          onNext={() => setLightboxIndex((i) => (i === null ? i : (i + 1) % photos.length))}
          position={`${lightboxIndex! + 1} / ${photos.length}`}
        >
          <Image
            src={lightboxPhoto.src}
            alt={lightboxPhoto.alt}
            width={lightboxPhoto.width}
            height={lightboxPhoto.height}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            sizes="90vw"
          />
        </LightboxShell>
      )}
    </div>
  );
}

function BeforeAfterHalf({
  photo,
  label,
  onOpen,
}: {
  photo: GalleryPhoto;
  label: string;
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
          sizes="(min-width: 640px) 380px, 300px"
        />
        <span className="absolute top-2 left-2 rounded-md bg-black/70 px-2 py-1 font-display text-xs font-semibold tracking-widest text-paper uppercase">
          {label}
        </span>
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/20 group-hover:opacity-100">
          <ZoomIcon className="size-7 text-paper drop-shadow" />
        </span>
      </button>
    </div>
  );
}

function LightboxPairHalf({ photo, label }: { photo: GalleryPhoto; label: string }) {
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

export function BeforeAfterCarousel({ pairs }: { pairs: BeforeAfterPair[] }) {
  const { trackRef, slideRefs, active, scrollToSlide } = useCarousel(pairs.length);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  useLightboxKeyboard(pairs.length, lightboxIndex, setLightboxIndex);

  if (pairs.length === 0) {
    return (
      <div
        className={`flex ${SLIDE_HEIGHT} flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line text-steel`}
      >
        <ZoomIcon className="size-6" />
        <p className="text-sm">Before/after comparisons coming soon.</p>
      </div>
    );
  }

  const lightboxPair = lightboxIndex === null ? null : pairs[lightboxIndex];

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {pairs.map((pair, index) => (
          <div
            key={`${pair.before.src}|${pair.after.src}`}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className={`relative w-fit shrink-0 snap-center ${SLIDE_HEIGHT}`}
          >
            <div className="flex h-full gap-1">
              <BeforeAfterHalf photo={pair.before} label="Before" onOpen={() => setLightboxIndex(index)} />
              <BeforeAfterHalf photo={pair.after} label="After" onOpen={() => setLightboxIndex(index)} />
            </div>
          </div>
        ))}
      </div>

      <CarouselControls count={pairs.length} active={active} scrollToSlide={scrollToSlide} />

      {lightboxPair && (
        <LightboxShell
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i === null ? i : (i - 1 + pairs.length) % pairs.length))}
          onNext={() => setLightboxIndex((i) => (i === null ? i : (i + 1) % pairs.length))}
          position={`${lightboxIndex! + 1} / ${pairs.length}`}
        >
          <div className="flex max-h-[85vh] max-w-[90vw] flex-col items-center gap-4 sm:flex-row">
            <LightboxPairHalf photo={lightboxPair.before} label="Before" />
            <LightboxPairHalf photo={lightboxPair.after} label="After" />
          </div>
        </LightboxShell>
      )}
    </div>
  );
}
