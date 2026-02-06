import fs from "fs";
import path from "path";
import { Series, ImageSpec, seriesDefinitions, SeriesSlug } from "@/data/series";
import { getAssetPath } from "@/utils/paths";

const CONTENT_DIR = path.join(process.cwd(), "public", "content");

// Simple frontmatter parser since we might not have gray-matter
function parseFrontmatter(content: string): { data: any; content: string; body: string } {
    const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
    const match = frontmatterRegex.exec(content);

    if (!match) {
        return { data: {}, content: content, body: content };
    }

    const frontmatterBlock = match[1];
    const body = content.replace(frontmatterRegex, "").trim();
    const data: any = {};

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
        let images: ImageSpec[] = [];

        if (fs.existsSync(seriesDir)) {
            const projects = fs.readdirSync(seriesDir).filter((file) => {
                return fs.statSync(path.join(seriesDir, file)).isDirectory();
            });

            projects.forEach((projectSlug) => {
                const projectDir = path.join(seriesDir, projectSlug);
                const files = fs.readdirSync(projectDir);

                // Find description.md
                const descFile = files.find((f) => f === "description.md");
                let metadata: any = {};

                if (descFile) {
                    const fileContent = fs.readFileSync(path.join(projectDir, descFile), "utf-8");
                    const parsed = parseFrontmatter(fileContent);
                    metadata = parsed.data;
                }

                // Find images
                const imageFiles = files.filter((f) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));

                imageFiles.forEach((imgFile) => {
                    images.push({
                        id: `${def.slug}-${projectSlug}-${imgFile}`,
                        // We construct the URL relative to the public folder.
                        // The component will handle the base path prefixing using getAssetPath.
                        src: `/content/${def.slug}/${projectSlug}/${imgFile}`,
                        aspect: metadata.aspect || "landscape",
                        title: metadata.title,
                        description: metadata.description || metadata.body,
                        mediaType: metadata.mediaType || "photo",
                        project: metadata.title || projectSlug, // Use title as project name grouping
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
