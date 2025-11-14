import clsx from "clsx";

const SERIES_COLORS: Record<string, string> = {
  portrait: "fill-rose-200",
  experimental: "fill-indigo-200",
  architecture: "fill-emerald-200",
};

export function PhotoPlaceholder({
  series,
  aspect,
}: {
  series: "portrait" | "experimental" | "architecture";
  aspect: "portrait" | "landscape" | "square";
}) {
  const colorClass = SERIES_COLORS[series] ?? "fill-zinc-200";

  const aspectClass =
    aspect === "portrait"
      ? "aspect-[3/4]"
      : aspect === "landscape"
      ? "aspect-[4/3]"
      : "aspect-square";

  return (
    <div className={clsx("w-full overflow-hidden rounded-sm", aspectClass)}>
      <svg
        className={clsx("h-full w-full", colorClass)}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
        viewBox="0 0 400 400"
      >
        <rect width="400" height="400" rx="6" />
      </svg>
    </div>
  );
}
