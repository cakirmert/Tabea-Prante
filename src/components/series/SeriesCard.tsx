import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/utils/paths";
import type { Series } from "@/data/series";

export function SeriesCard({ series }: { series: Series }) {
  const previewImages = series.images.slice(0, 3);

  return (
    <Link
      href={`/series/${series.slug}`}
      className="group flex flex-col gap-3"
    >
      <div className="overflow-hidden rounded-md bg-zinc-100">
        {previewImages[0] && (
          <Image
            src={getAssetPath(previewImages[0].src)}
            alt={previewImages[0].title ?? ""}
            width={900}
            height={700}
            className="h-auto w-full object-cover align-middle transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-zinc-600">
        <span>{series.title}</span>
      </div>
    </Link>
  );
}
