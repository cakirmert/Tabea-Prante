import fs from "fs";
import path from "path";
import { Series, ImageSpec, seriesDefinitions } from "@/data/series";

const CONTENT_DIR = path.join(process.cwd(), "public", "content");

/** Map specific filenames to curated titles */
const TITLE_OVERRIDES: Record<string, string> = {
    "DSCF1556": "Westfield Intervention",
    "Insta Post__website": "Social Campaign",
    "Insta Post__website5": "Social Campaign II",
    "Insta Post__website6": "Social Campaign III",
    "LOGO-PROFILBILD_White": "Logo",
    "A5_Wegeleitplan_druck": "Wayfinding System",
    "Westfield_intervention": "Westfield Intervention",
    "Westfield_intervention2": "Westfield Intervention II",
    "FREE MIND neu": "Free Mind",
    "FREE_MIND": "Free Mind",
    "BTS_for_YSL_Koolkidnelly": "BTS for YSL \u2014 Koolkidnelly",
    "BTS_for_YSL_Koolkidnelly(1)": "BTS for YSL \u2014 Koolkidnelly II",
    "BTS_for_YSL_Koolkidnelly(2)": "BTS for YSL \u2014 Koolkidnelly III",
    "BTS_for_YSL_Koolkidnelly(3)": "BTS for YSL \u2014 Koolkidnelly IV",
    "ceren_und_thies_f\u00FCr_plus49group": "Ceren & Thies \u2014 Plus49 Group",
    "Amphietheater_Selge": "Amphitheatre, Selge",
    "Dede_Papa": "Dede & Papa",
    "Marche\u0301_des_Lilas": "March\u00E9 des Lilas",
    "March\u00E9_des_Lilas": "March\u00E9 des Lilas",
    "Manavgat_brennt": "Manavgat brennt",
    "Nostalgie_Lokum": "Nostalgie Lokum",
    "Nostalgische_Banane": "Nostalgische Banane",
    "Nostalgische_Treppe": "Nostalgische Treppe",
    "Nanalevrai_in_Ravani": "Nanalevrai in Ravani",
    "Paris_en_f\u00E9vrier": "Paris en f\u00E9vrier",
    "Portrait_am_Schlachtensee": "Portrait am Schlachtensee",
    "Portr\u00E4t_am_Schlachtensee": "Portr\u00E4t am Schlachtensee",
    "Rue_d_Italie": "Rue d\u2019Italie",
    "Urlaub_in_Antalya": "Urlaub in Antalya",
    "Modou": "Modou",
    "Modou(1)": "Modou II",
    "Jan": "Jan",
    "Maya": "Maya",
};

/** Turn a raw filename into a presentable title */
function humanizeFilename(filename: string): string {
    // Strip extension
    const nameNoExt = filename.replace(/\.[^.]+$/, "");

    // Check overrides first
    if (TITLE_OVERRIDES[nameNoExt]) return TITLE_OVERRIDES[nameNoExt];

    let name = nameNoExt;
    // Screenshot prefixes → "Film Still"
    name = name.replace(/^Bildschirmfoto\s*\d{4}-\d{2}-\d{2}\s*um\s*\d{2}\.\d{2}\.\d{2}$/i, "Film Still");
    // Remove numbering suffixes like (1), (2)
    name = name.replace(/\(\d+\)$/, "").trim();
    // Replace underscores and hyphens with spaces
    name = name.replace(/[_-]/g, " ").trim();
    // Remove duplicate spaces
    name = name.replace(/\s+/g, " ");
    // Camera codes
    name = name.replace(/\b(DSCF|DSC|IMG)\s*\d+/gi, "").trim();
    name = name.replace(/\bneu\b/gi, "").trim();
    // Capitalise first letter of each word if all-lowercase
    if (name === name.toLowerCase()) {
        name = name.replace(/\b\w/g, (c) => c.toUpperCase());
    }
    return name || "Untitled";
}

function toPublicContentPath(...segments: string[]): string {
    return "/" + segments.map((segment) => encodeURIComponent(segment)).join("/");
}

type FrontmatterData = Record<string, string>;

type ProjectMetadata = {
    aspect?: "portrait" | "landscape" | "square";
    title?: string;
    description?: string;
    mediaType?: "photo" | "video";
    body?: string;
};

// Simple frontmatter parser since we might not have gray-matter
function parseFrontmatter(content: string): { data: FrontmatterData; content: string; body: string } {
    const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
    const match = frontmatterRegex.exec(content);

    if (!match) {
        return { data: {}, content: content, body: content };
    }

    const frontmatterBlock = match[1];
    const body = content.replace(frontmatterRegex, "").trim();
    const data: FrontmatterData = {};

    frontmatterBlock.split("\n").forEach((line) => {
        const [key, ...valueParts] = line.split(":");
        if (key && valueParts.length > 0) {
            let value = valueParts.join(":").trim();
            // Remove quotes if present
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            data[key.trim()] = value;
        }
    });

    return { data, content, body }; // Added body for clarity
}

export function getAllSeries(): Series[] {
    return seriesDefinitions.map((def) => {
        const seriesDir = path.join(CONTENT_DIR, def.slug);
        const images: ImageSpec[] = [];

        if (fs.existsSync(seriesDir)) {
            const files = fs.readdirSync(seriesDir);
            
            // Allow reading files directly in the series folder
            const directFiles = files.filter(f => fs.statSync(path.join(seriesDir, f)).isFile());
            
            // Find images and videos directly in directory (exclude poster thumbnails)
            const mediaFiles = directFiles.filter(
                (f) => /\.(jpg|jpeg|png|gif|webp|mov|mp4)$/i.test(f) && !/_poster\.(jpg|png)$/i.test(f)
            );
            
            mediaFiles.forEach((mediaFile) => {
                const isVideo = /\.(mov|mp4)$/i.test(mediaFile);
                const nameNoExt = mediaFile.replace(/\.[^.]+$/, "");
                const posterFile = directFiles.find(
                    (f) => f === `${nameNoExt}_poster.jpg` || f === `${nameNoExt}_poster.png`
                );
                images.push({
                    id: `${def.slug}-${mediaFile}`,
                    src: toPublicContentPath("content", def.slug, mediaFile),
                    aspect: "landscape",
                    title: humanizeFilename(mediaFile),
                    description: "",
                    mediaType: isVideo ? "video" : "photo",
                    poster: posterFile
                        ? toPublicContentPath("content", def.slug, posterFile)
                        : undefined,
                    seriesSlug: def.slug,
                });
            });

            // If there are subdirectories (projects), process them too just in case
            const projects = files.filter((file) => {
                return fs.statSync(path.join(seriesDir, file)).isDirectory();
            });

            projects.forEach((projectSlug) => {
                const projectDir = path.join(seriesDir, projectSlug);
                const projectFiles = fs.readdirSync(projectDir);

                // Find description.md
                const descFile = projectFiles.find((f) => f === "description.md");
                let metadata: ProjectMetadata = {};

                if (descFile) {
                    const fileContent = fs.readFileSync(path.join(projectDir, descFile), "utf-8");
                    const parsed = parseFrontmatter(fileContent);
                    metadata = {
                        aspect: parsed.data.aspect as ProjectMetadata["aspect"],
                        title: parsed.data.title,
                        description: parsed.data.description,
                        mediaType: parsed.data.mediaType as ProjectMetadata["mediaType"],
                        body: parsed.body,
                    };
                }

                // Find images
                const projectMediaFiles = projectFiles.filter((f) => /\.(jpg|jpeg|png|gif|webp|mov|mp4)$/i.test(f));

                projectMediaFiles.forEach((mediaFile) => {
                    const isVideo = /\.(mov|mp4)$/i.test(mediaFile);
                    images.push({
                        id: `${def.slug}-${projectSlug}-${mediaFile}`,
                        // We construct the URL relative to the public folder.
                        // The component will handle the base path prefixing using getAssetPath.
                        src: toPublicContentPath("content", def.slug, projectSlug, mediaFile),
                        aspect: metadata.aspect || "landscape",
                        title: metadata.title,
                        description: metadata.description || metadata.body,
                        mediaType: metadata.mediaType || (isVideo ? "video" : "photo"),
                        project: metadata.title || projectSlug, // Use title as project name grouping
                        seriesSlug: def.slug,
                    });
                });
            });
        }

        return {
            ...def,
            images,
        };
    });
}

export function getSeries(slug: string): Series | undefined {
    const all = getAllSeries();
    return all.find((s) => s.slug === slug);
}
