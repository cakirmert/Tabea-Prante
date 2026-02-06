export type SeriesSlug = "portrait" | "experimental" | "architecture" | "film" | "design" | "surreal-dreams" | "urban-glitch" | "geometric-studies";

export type ImageSpec = {
  id: string;
  src: string;
  aspect: "portrait" | "landscape" | "square";
  title?: string;
  description?: string;
  mediaType?: "photo" | "video" | "design"; // New field
  usePlaceholder?: boolean; // New field to force placeholder
};

export type Series = {
  slug: SeriesSlug;
  title: string;
  layoutType: string;
  images: ImageSpec[];
};

export const seriesList: Series[] = [
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
    ],
  },
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
        mediaType: "photo",
      },
    ],
  },
  // --- PLACEHOLDERS BELOW ---
  {
    slug: "film",
    title: "Video Reel (Concept)",
    layoutType: "video",
    images: [
      {
        id: "reel-2026",
        src: "",
        aspect: "landscape",
        title: "Showreel 2026",
        description: "A compilation of narrative shorts and commercial spots.",
        mediaType: "video",
        usePlaceholder: true,
      },
    ],
  },
  {
    slug: "design",
    title: "Design System (Concept)",
    layoutType: "design",
    images: [
      {
        id: "ui-kit",
        src: "",
        aspect: "square",
        title: "Neo-Brutalist Icons",
        description: "Iconography set designated for the Tabea Prante brand.",
        mediaType: "design",
        usePlaceholder: true,
      },
      {
        id: "design-system",
        src: "",
        aspect: "landscape",
        title: "Layout Grid Study",
        description: "Modular grid system exploration.",
        mediaType: "design",
        usePlaceholder: true,
      },
    ],
  },
  {
    slug: "portrait-extras", // Changed slug to avoid duplicate key issues if any, but array order matters most
    title: "Studio (Concept)",
    layoutType: "portrait",
    images: [
      {
        id: "placeholder-1",
        src: "",
        aspect: "portrait",
        title: "Study 02 (Pending)",
        description: "Upcoming shoot from Berlin session.",
        mediaType: "photo",
        usePlaceholder: true,
      },
      {
        id: "placeholder-2",
        src: "",
        aspect: "landscape",
        title: "Studio Context",
        description: "Behind the scenes.",
        mediaType: "photo",
        usePlaceholder: true,
      },
    ],
  },
];

export function getSeriesBySlug(slug: SeriesSlug): Series | undefined {
  return seriesList.find((s) => s.slug === slug);
}
