"use client";

import Image from "next/image";
import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { type ImageSpec, type Series } from "@/data/series";
import { getAssetPath } from "@/utils/paths";
import clsx from "clsx";
import gsap from "gsap";

type GalleryItem = ImageSpec & {
  seriesTitle: string;
};

interface WorkListRendererProps {
  seriesList: Series[];
}

const ALL_FILTER = "selected work";

export function WorkListRenderer({ seriesList }: WorkListRendererProps) {
  const [activeFilter, setActiveFilter] = useState<string>(ALL_FILTER);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Interleave items from all series (round-robin)
  const allItems = useMemo<GalleryItem[]>(() => {
    const grouped = seriesList.map((series) =>
      series.images.map((image) => ({
        ...image,
        seriesTitle: series.title,
      }))
    );
    const interleaved: GalleryItem[] = [];
    const maxLen = Math.max(...grouped.map((g) => g.length));
    for (let i = 0; i < maxLen; i++) {
      for (const group of grouped) {
        if (i < group.length) {
          interleaved.push(group[i]);
        }
      }
    }
    return interleaved;
  }, [seriesList]);

  const filters = useMemo(() => {
    return [ALL_FILTER, ...seriesList.map((series) => series.title)];
  }, [seriesList]);

  // Initial entrance animation
  useEffect(() => {
    if (!gridRef.current || hasAnimated.current) return;
    const items = gridRef.current.querySelectorAll(".gallery-item");
    if (items.length === 0) return;

    hasAnimated.current = true;
    gsap.set(items, { opacity: 0, y: 40 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: "power3.out",
      delay: 0.1,
    });
  }, [allItems]);

  // Filter: fade non-matching, keep layout intact
  const handleFilter = useCallback(
    (filter: string) => {
      if (!gridRef.current || filter === activeFilter) return;
      setActiveFilter(filter);

      const items = gridRef.current.querySelectorAll(".gallery-item");
      items.forEach((item) => {
        const series = (item as HTMLElement).dataset.series;
        const matches = filter === ALL_FILTER || series === filter;

        gsap.to(item, {
          opacity: matches ? 1 : 0.06,
          scale: matches ? 1 : 0.97,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    },
    [activeFilter]
  );

  // Close modal on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedItem]);

  return (
    <section className="w-full" aria-label="Selected work gallery">
      {/* Filters */}
      <div className="mb-10 flex flex-wrap items-center gap-8 text-sm tracking-wider text-zinc-700">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilter(filter)}
            className={clsx(
              "border-b pb-1 transition-colors",
              activeFilter === filter
                ? "border-zinc-900 text-zinc-900"
                : "border-transparent text-zinc-400 hover:border-zinc-400 hover:text-zinc-700"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Masonry columns — natural aspect ratios */}
      <div
        ref={gridRef}
        className="columns-2 gap-3 sm:columns-3 md:columns-4 xl:columns-5"
      >
        {allItems.map((item) => (
          <div
            key={item.id}
            data-series={item.seriesTitle}
            className="gallery-item mb-3 break-inside-avoid cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <article className="group relative overflow-hidden bg-zinc-200/60">
              {item.mediaType === "video" ? (
                <video
                  src={getAssetPath(item.src)}
                  poster={item.poster ? getAssetPath(item.poster) : undefined}
                  preload="auto"
                  muted
                  playsInline
                  loop
                  className="h-auto w-full object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
                  onMouseEnter={(e) => {
                    e.currentTarget.play();
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                  }}
                />
              ) : (
                <Image
                  src={getAssetPath(item.src)}
                  alt={item.title ?? "Portfolio image"}
                  width={800}
                  height={1200}
                  unoptimized
                  className="h-auto w-full object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
                />
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-white drop-shadow-lg">
                    {item.title}
                  </span>
                  <span className="block text-[9px] uppercase tracking-widest text-zinc-300 mt-0.5">
                    {item.seriesTitle}
                  </span>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-pointer p-6 md:p-12"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative flex flex-col items-center gap-4 max-w-[90vw] max-h-[90vh] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute -top-8 right-0 text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors z-10"
            >
              Close &times;
            </button>

            {/* Media — centered */}
            <div className="flex items-center justify-center flex-1 min-h-0">
              {selectedItem.mediaType === "video" ? (
                <video
                  src={getAssetPath(selectedItem.src)}
                  autoPlay
                  loop
                  playsInline
                  controls
                  className="max-h-[75vh] max-w-[85vw] w-auto h-auto object-contain rounded-sm"
                />
              ) : (
                <Image
                  src={getAssetPath(selectedItem.src)}
                  alt={selectedItem.title ?? "Portfolio image"}
                  width={1800}
                  height={1800}
                  unoptimized
                  className="max-h-[75vh] max-w-[85vw] w-auto h-auto object-contain rounded-sm"
                />
              )}
            </div>

            {/* Info — below the image, always visible */}
            <div className="text-center w-full max-w-xl">
              <h3 className="text-lg font-light text-white">
                {selectedItem.title}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mt-1">
                {selectedItem.seriesTitle}
              </p>
              {selectedItem.description && (
                <p className="text-sm leading-relaxed text-zinc-400 mt-3">
                  {selectedItem.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
