/** Public asset prefix for GitHub Pages project sites (empty on user/org root sites). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a root-relative public path with the site basePath. */
export function assetPath(path: string): string {
  if (!path) return path;
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!basePath) return normalized;
  if (normalized === basePath || normalized.startsWith(`${basePath}/`)) return normalized;
  return `${basePath}${normalized}`;
}
