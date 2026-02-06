export type SeriesSlug =
  | "experimental"
  | "architecture"
  | "portrait"
  | "film"
  | "design"
  | "geometric-studies"
  | "surreal-dreams"
  | "urban-glitch"
  | "portrait-extras";

export type ImageSpec = {
  id: string;
  src: string;
  aspect: "portrait" | "landscape" | "square";
  title?: string;
  description?: string;
  mediaType?: "photo" | "video" | "design";
  usePlaceholder?: boolean;
  project?: string; // Added for project grouping
};

export type Series = {
  slug: SeriesSlug;
  title: string;
  layoutType: string;
  images: ImageSpec[];
};

// Base definitions for series metadata (title, layout)
// Images will be populated from the file system
export const seriesDefinitions: Omit<Series, "images">[] = [
  {
    slug: "experimental",
    title: "Experimental",
    layoutType: "experimental",
  },
  {
    slug: "architecture",
    title: "Architecture",
    layoutType: "architecture",
  },
  {
    slug: "portrait",
    title: "Portrait",
    layoutType: "portrait",
  },
  {
    slug: "film",
    title: "Video Reel (Concept)",
    layoutType: "video",
  },
  {
    slug: "design",
    title: "Design System (Concept)",
    layoutType: "design",
  },
  {
    slug: "geometric-studies",
    title: "Geometric Studies",
    layoutType: "experimental",
  },
  {
    slug: "surreal-dreams",
    title: "Surreal Dreams",
    layoutType: "experimental",
  },
  {
    slug: "urban-glitch",
    title: "Urban Glitch",
    layoutType: "experimental",
  },
  {
    slug: "portrait-extras",
    title: "Studio (Concept)",
    layoutType: "portrait",
  },
];
