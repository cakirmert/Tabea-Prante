import Image from "next/image";
import { PhotoPlaceholder } from "@/components/common/PhotoPlaceholder";
import type { Series, ImageSpec } from "@/data/series";
import { getAssetPath } from "@/utils/paths";

export function SeriesImageLayout({ series }: { series: Series }) {
  // Group images by project
  const groupedImages = series.images.reduce((acc, img) => {
    const project = img.project || "Other";
    if (!acc[project]) {
      acc[project] = [];
    }
    acc[project].push(img);
    return acc;
  }, {} as Record<string, ImageSpec[]>);

  // Get project names (keys)
  const projects = Object.keys(groupedImages);

  const renderImages = (images: ImageSpec[]) => {
    if (series.layoutType === "portrait") {
      return (
        <div className="flex flex-col gap-10">
          {images.map((img) => (
            <figure key={img.id} className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-md bg-zinc-100 relative w-full aspect-[3/4]">
                {img.usePlaceholder || !img.src ? (
                  <PhotoPlaceholder series={series.slug} aspect="portrait" mediaType={img.mediaType} />
                ) : (
                  <Image
                    src={getAssetPath(img.src)}
                    alt={img.title ?? ""}
                    width={1200}
                    height={1600}
                    className="h-full w-full object-cover align-middle transition-transform duration-700 ease-out hover:scale-[1.02]"
                    priority
                  />
                )}
              </div>
              {(img.title || img.description) && (
                <figcaption className="max-w-md text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {img.title && <div className="mb-1">{img.title}</div>}
                  {img.description && (
                    <p className="text-[11px] normal-case tracking-normal text-zinc-500">
                      {img.description}
                    </p>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      );
    }

    if (series.layoutType === "experimental") {
      return (
        <div className="grid grid-cols-6 gap-4">
          {images.map((img, index) => {
            const span = index % 3 === 0 ? 4 : 3;
            return (
              <figure
                key={img.id}
                className={`col-span-6 sm:col-span-${span} flex flex-col gap-3`}
              >
                <div className="overflow-hidden rounded-md bg-zinc-100 relative w-full aspect-[4/3]">
                  {img.usePlaceholder || !img.src ? (
                    <PhotoPlaceholder series={series.slug} aspect="landscape" mediaType={img.mediaType} />
                  ) : (
                    <Image
                      src={getAssetPath(img.src)}
                      alt={img.title ?? ""}
                      width={1200}
                      height={900}
                      className="h-full w-full object-cover align-middle transition-transform duration-700 ease-out hover:scale-[1.03]"
                    />
                  )}
                </div>
                {(img.title || img.description) && (
                  <figcaption className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                    {img.title}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      );
    }

    // Default Layout
    return (
      <div className="flex flex-col gap-10">
        {images.map((img, index) => (
          <figure
            key={img.id}
            className={
              index % 2 === 0
                ? "grid gap-4 md:grid-cols-[3fr,2fr]"
                : "grid gap-4 md:grid-cols-[2fr,3fr]"
            }
          >
            <div className="overflow-hidden rounded-md bg-zinc-100 md:col-span-1 relative w-full aspect-[4/3]">
              {img.usePlaceholder || !img.src ? (
                <PhotoPlaceholder series={series.slug} aspect="landscape" mediaType={img.mediaType} />
              ) : (
                <Image
                  src={getAssetPath(img.src)}
                  alt={img.title ?? ""}
                  width={1400}
                  height={900}
                  className="h-full w-full object-cover align-middle transition-transform duration-700 ease-out hover:scale-[1.02]"
                />
              )}
            </div>
            {(img.title || img.description) && (
              <figcaption className="flex items-end text-xs uppercase tracking-[0.18em] text-zinc-500">
                <div>
                  {img.title && <div className="mb-2">{img.title}</div>}
                  {img.description && (
                    <p className="text-[11px] normal-case tracking-normal text-zinc-500">
                      {img.description}
                    </p>
                  )}
                </div>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-20">
      {projects.map((project) => (
        <div key={project} className="flex flex-col gap-8">
          {projects.length > 1 && (
            <h2 className="text-xl font-light tracking-widest uppercase border-b border-zinc-200 pb-2">
              {project}
            </h2>
          )}
          {renderImages(groupedImages[project])}
        </div>
      ))}
    </div>
  );
}
