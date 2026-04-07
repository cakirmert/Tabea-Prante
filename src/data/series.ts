export type SeriesSlug =
  | "Design"
  | "Film"
  | "Fotografie";

export type ImageSpec = {
  id: string;
  src: string;
  aspect: "portrait" | "landscape" | "square";
  title?: string;
  description?: string;
  mediaType: "photo" | "video";
  poster?: string;
  usePlaceholder?: boolean;
  project?: string;
  seriesSlug: SeriesSlug;
};

export type Series = {
  slug: SeriesSlug;
  title: string;
  layoutType: string;
  images: ImageSpec[];
};

export const seriesDefinitions: Omit<Series, "images">[] = [
  {
    slug: "Design",
    title: "Design",
    layoutType: "Design",
  },
  {
    slug: "Film",
    title: "Film",
    layoutType: "Film",
  },
  {
    slug: "Fotografie",
    title: "Fotografie",
    layoutType: "Fotografie",
  },
];
