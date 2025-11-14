export type SeriesSlug = "portrait" | "experimental" | "architecture";

export type ImageSpec = {
  id: string;
  src: string;
  aspect: "portrait" | "landscape" | "square";
  title?: string;
  description?: string;
};

export type Series = {
  slug: SeriesSlug;
  title: string;
  layoutType: SeriesSlug;
  images: ImageSpec[];
};

export const seriesList: Series[] = [
  {
    slug: "portrait",
    title: "Portrait",
    layoutType: "portrait",
    images: [
      {
        id: "maya",
        src: "/MAYA.jpg",
        aspect: "portrait",
        title: "MAYA",
        description: "Digital portrait photography – confident, warm, intense.",
      },
      {
        id: "maya-crop",
        src: "/MAYA.jpg",
        aspect: "portrait",
        title: "MAYA (detail)",
        description: "The same portrait, read as a tighter frame.",
      },
    ],
  },
  {
    slug: "experimental",
    title: "Experimental",
    layoutType: "experimental",
    images: [
      {
        id: "blurry-marseille",
        src: "/Blurry_Marseille.jpg",
        aspect: "landscape",
        title: "Blurry in Marseille",
        description:
          "Analog experiment – motion, color, and poetic blur.",
      },
      {
        id: "die-treppe",
        src: "/Die_Treppe.jpg",
        aspect: "portrait",
        title: "Die Treppe",
        description:
          "Digital – perspective, depth, and the pull of the unknown.",
      },
      {
        id: "die-treppe-alt",
        src: "/Die_Treppe.jpg",
        aspect: "portrait",
        title: "Die Treppe (alt)",
        description: "Alternate read of the same image in the grid.",
      },
    ],
  },
  {
    slug: "architecture",
    title: "Architecture",
    layoutType: "architecture",
    images: [
      {
        id: "paris-apartements",
        src: "/paris_apartements.jpg",
        aspect: "landscape",
        title: "Pariser Eleganz",
        description:
          "Timeless apartments – light, shadow, and urban geometry.",
      },
      {
        id: "paris-apartements-alt",
        src: "/paris_apartements.jpg",
        aspect: "landscape",
        title: "Pariser Eleganz (alt)",
        description: "A second framing suggestion for the same building.",
      },
    ],
  },
];

export function getSeriesBySlug(slug: SeriesSlug): Series | undefined {
  return seriesList.find((s) => s.slug === slug);
}
