export const isProd = process.env.NODE_ENV === "production";

/**
 * Returns the path with the base path prepended if in production.
 * This is used for assets and content loaded from the public directory.
 */
export function getAssetPath(path: string): string {
    const basePath = isProd ? "/Tabea-Prante" : "";
    // Ensure path starts with / if it doesn't
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${basePath}${normalizedPath}`;
}
