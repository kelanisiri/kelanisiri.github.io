"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryCategory, GalleryImage } from "@/lib/gallery";

type Props = {
  categories: GalleryCategory[];
  images: GalleryImage[];
};

export function Gallery({ categories, images }: Props) {
  const [filter, setFilter] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return images;
    return images.filter((img) => img.category === filter);
  }, [filter, images]);

  useEffect(() => {
    setActiveIndex(null);
  }, [filter]);

  const openAt = (id: string) => {
    const idx = filtered.findIndex((img) => img.id === id);
    if (idx >= 0) setActiveIndex(idx);
  };

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null || !filtered.length) return i;
      return (i - 1 + filtered.length) % filtered.length;
    });
  }, [filtered.length]);

  const showNext = useCallback(() => {
    setActiveIndex((i) => {
      if (i === null || !filtered.length) return i;
      return (i + 1) % filtered.length;
    });
  }, [filtered.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, showPrev, showNext]);

  const active = activeIndex !== null ? filtered[activeIndex] : null;
  const categoryTitle = (slug: string) =>
    categories.find((c) => c.slug === slug)?.title ?? slug;

  return (
    <section id="work" className="py-20 sm:py-28 bg-paper">
      <div className="section-pad container-wide">
        <div className="reveal max-w-2xl">
          <p className="text-sky text-xs font-semibold tracking-[0.18em] uppercase">
            Our work
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Project gallery
          </h2>
          <p className="mt-4 text-steel leading-relaxed">
            Browse completed aluminium and steel projects by category. Tap any photo to view
            it larger.
          </p>
        </div>

        <div
          className="reveal mt-8 -mx-1 flex gap-2 overflow-x-auto pb-2 px-1"
          role="toolbar"
          aria-label="Filter projects by category"
        >
          <button
            type="button"
            className="filter-chip"
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All ({images.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              className="filter-chip"
              aria-pressed={filter === cat.slug}
              onClick={() => setFilter(cat.slug)}
            >
              {cat.title} ({cat.count})
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 text-steel">No projects in this category yet.</p>
        ) : (
          <div
            key={filter}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          >
            {filtered.map((img) => (
              <button
                key={`${filter}-${img.id}`}
                type="button"
                className="gallery-card group w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
                onClick={() => openAt(img.id)}
                aria-label={`Open ${categoryTitle(img.category)} project photo`}
              >
                <div className="gallery-frame">
                  <Image
                    src={img.thumb}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="gallery-image"
                    loading="lazy"
                  />
                </div>
                <span className="pointer-events-none absolute left-3 bottom-3 z-[1] rounded bg-navy/90 px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {categoryTitle(img.category)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[80] lightbox-backdrop flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Project photo viewer"
          onClick={close}
        >
          <button
            type="button"
            className="absolute top-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={close}
            aria-label="Close gallery"
          >
            ✕
          </button>

          <button
            type="button"
            className="absolute left-2 sm:left-5 z-10 h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 hidden sm:inline-flex items-center justify-center text-xl"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-2 sm:right-5 z-10 h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 hidden sm:inline-flex items-center justify-center text-xl"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next photo"
          >
            ›
          </button>

          <div
            className="relative w-full max-w-5xl max-h-[85svh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[75svh] flex items-center justify-center bg-transparent">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.full}
                alt={active.alt}
                className="max-h-[75svh] w-auto max-w-full object-contain rounded-md shadow-2xl"
              />
            </div>
            <div className="mt-4 flex w-full items-center justify-between gap-4 text-white px-1">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-sky-soft font-semibold">
                  {categoryTitle(active.category)}
                </p>
                <p className="text-sm text-white/80 mt-0.5">
                  {(activeIndex ?? 0) + 1} / {filtered.length}
                </p>
              </div>
              <div className="flex gap-2 sm:hidden">
                <button
                  type="button"
                  className="h-10 px-4 rounded-md bg-white/10 text-sm font-semibold"
                  onClick={showPrev}
                >
                  Prev
                </button>
                <button
                  type="button"
                  className="h-10 px-4 rounded-md bg-white/10 text-sm font-semibold"
                  onClick={showNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
