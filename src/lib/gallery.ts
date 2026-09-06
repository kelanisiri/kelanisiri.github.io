import galleryManifest from "@/data/gallery.generated.json";

export type GalleryImage = {
  id: string;
  category: string;
  source?: string;
  thumb: string;
  full: string;
  width: number;
  height: number;
  thumbWidth?: number;
  thumbHeight?: number;
  alt: string;
};

export type GalleryCategory = {
  slug: string;
  title: string;
  description: string;
  order: number;
  count: number;
  cover: string;
  coverFull: string;
};

export type GalleryManifest = {
  generatedAt: string;
  categories: GalleryCategory[];
  images: GalleryImage[];
  featured: GalleryImage[];
};

export const gallery = galleryManifest as GalleryManifest;

export function getImagesByCategory(slug: string | "all") {
  if (slug === "all") return gallery.images;
  return gallery.images.filter((img) => img.category === slug);
}

export function getCategoryTitle(slug: string) {
  return gallery.categories.find((c) => c.slug === slug)?.title ?? slug;
}
