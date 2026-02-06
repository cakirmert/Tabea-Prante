import clsx from "clsx";

const SERIES_COLORS: Record<string, string> = {
  portrait: "fill-rose-200",
  experimental: "fill-indigo-200",
  architecture: "fill-emerald-200",
  video: "fill-zinc-800",
  design: "fill-blue-200",
};

export function PhotoPlaceholder({
  series,
  aspect,
  mediaType = "photo",
}: {
  series: string;
  aspect: "portrait" | "landscape" | "square";
  mediaType?: "photo" | "video" | "design";
}) {
  const colorClass = SERIES_COLORS[series] ?? SERIES_COLORS[mediaType] ?? "fill-zinc-200";

  const aspectClass =
    aspect === "portrait"
      ? "aspect-[3/4]"
      : aspect === "landscape"
        ? "aspect-[4/3]"
        : "aspect-square";

  return (
    <div className={clsx("w-full overflow-hidden rounded-sm relative group", aspectClass)}>
      <svg
        className={clsx("h-full w-full transition-colors duration-500", colorClass)}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
        viewBox="0 0 400 400"
      >
        <rect width="400" height="400" rx="0" />
      </svg>

      {/* Centered Icon / Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500/50 mix-blend-multiply">
        {/* Placeholder Label */}
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold border border-current px-2 py-1 mb-2 opacity-50">
          Placeholder
        </span>

        {mediaType === "video" && (
          <div className="h-16 w-16 rounded-full border-2 border-current flex items-center justify-center pl-1 group-hover:scale-110 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}

        {mediaType === "design" && (
          <div className="grid grid-cols-2 gap-1 opacity-50 group-hover:gap-2 transition-all">
            <div className="w-4 h-4 bg-current rounded-sm"></div>
            <div className="w-4 h-4 bg-current rounded-full"></div>
            <div className="w-4 h-4 bg-current rounded-full"></div>
            <div className="w-4 h-4 bg-current rounded-sm"></div>
          </div>
        )}

        {mediaType === "photo" && (
          <span className="text-xs uppercase tracking-widest opacity-70">
            Image Pending
          </span>
        )}
      </div>
    </div>
  );
}
