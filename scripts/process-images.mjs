/**
 * Image preprocessing for Kelanisiri portfolio.
 *
 * - Scans /images/<category>/ for source photos (JPG/PNG/WEBP)
 * - Preserves originals untouched
 * - Writes enhanced WebP thumbs + full sizes to /public/images/work/<category>/
 * - Writes /src/data/gallery.generated.json for the site
 *
 * Enhancement is photographic only (exposure, contrast, sharpen).
 * It does NOT redesign, invent, or replace fabricated work.
 *
 * Usage: npm run process-images
 * Add new work by dropping photos into images/<category-slug>/
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE_DIR = path.join(ROOT, "images");
const OUTPUT_DIR = path.join(ROOT, "public", "images", "work");
const MANIFEST_PATH = path.join(ROOT, "src", "data", "gallery.generated.json");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);

const CATEGORY_META = {
  "pantry-cupboards": {
    title: "Pantry Cupboards",
    description: "Custom aluminium pantry and kitchen cupboard solutions.",
    order: 1,
  },
  gates: {
    title: "Gates",
    description: "Durable aluminium and steel gate fabrication.",
    order: 2,
  },
  roofs: {
    title: "Roofs",
    description: "Roofing and structural aluminium & steel work.",
    order: 3,
  },
  others: {
    title: "Other Work",
    description: "Additional aluminium and steel fabrication projects.",
    order: 4,
  },
};

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function listSourceCategories() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.warn(`No source directory found at ${SOURCE_DIR}`);
    return [];
  }

  return fs
    .readdirSync(SOURCE_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("."))
    .map((d) => {
      const slug = slugify(d.name);
      const meta = CATEGORY_META[slug] || {
        title: titleFromSlug(slug),
        description: `${titleFromSlug(slug)} fabrication work.`,
        order: 100,
      };
      return {
        slug,
        folderName: d.name,
        sourcePath: path.join(SOURCE_DIR, d.name),
        ...meta,
      };
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

function listImages(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .filter((f) => !f.startsWith("."))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

/** Fresh enhanced sharp pipeline from a source file (photographic polish only). */
function enhanced(inputPath) {
  return sharp(inputPath, { failOn: "none" })
    .rotate()
    .normalize({ lower: 2, upper: 98 })
    .modulate({
      brightness: 1.03,
      saturation: 1.06,
    })
    .sharpen({
      sigma: 0.8,
      m1: 0.8,
      m2: 0.4,
    });
}

async function processOne(sourceFile, categorySlug, index) {
  const baseId = `${categorySlug}-${String(index + 1).padStart(3, "0")}`;
  const outDir = path.join(OUTPUT_DIR, categorySlug);
  fs.mkdirSync(outDir, { recursive: true });

  const thumbName = `${baseId}-thumb.webp`;
  const fullName = `${baseId}-full.webp`;
  const thumbPath = path.join(outDir, thumbName);
  const fullPath = path.join(outDir, fullName);

  const meta = await sharp(sourceFile, { failOn: "none" }).rotate().metadata();
  const width = meta.width || 1600;
  const height = meta.height || 1200;
  const landscape = width >= height;

  // Gallery thumbs: consistent 4:3 cover crop — no letterboxing / side gaps
  await enhanced(sourceFile)
    .resize({
      width: 720,
      height: 540,
      fit: "cover",
      position: "centre",
    })
    .webp({ quality: 80, effort: 4 })
    .toFile(thumbPath);

  await enhanced(sourceFile)
    .resize({
      width: landscape ? 1920 : undefined,
      height: landscape ? undefined : 1920,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 84, effort: 4 })
    .toFile(fullPath);

  const thumbMeta = await sharp(thumbPath).metadata();
  const fullMeta = await sharp(fullPath).metadata();
  const title = CATEGORY_META[categorySlug]?.title || titleFromSlug(categorySlug);

  return {
    id: baseId,
    category: categorySlug,
    source: path.relative(ROOT, sourceFile),
    thumb: `/images/work/${categorySlug}/${thumbName}`,
    full: `/images/work/${categorySlug}/${fullName}`,
    width: fullMeta.width || width,
    height: fullMeta.height || height,
    thumbWidth: thumbMeta.width || width,
    thumbHeight: thumbMeta.height || height,
    alt: `${title} — completed project by Kelanisiri Aluminium & Steel Contracts`,
  };
}

function pickFeatured(images, categories) {
  if (!images.length) return [];

  const byCat = new Map();
  for (const img of images) {
    if (!byCat.has(img.category)) byCat.set(img.category, []);
    byCat.get(img.category).push(img);
  }

  const picks = [];
  const slugs = categories.map((c) => c.slug);
  let guard = 0;
  while (picks.length < 6 && guard < 50) {
    for (const slug of slugs) {
      if (picks.length >= 6) break;
      const pool = byCat.get(slug) || [];
      if (!pool.length) continue;
      pool.sort((a, b) => b.width / b.height - a.width / a.height);
      const next = pool.shift();
      if (next && !picks.find((p) => p.id === next.id)) {
        picks.push({
          id: next.id,
          category: next.category,
          thumb: next.thumb,
          full: next.full,
          width: next.width,
          height: next.height,
          alt: next.alt,
        });
      }
    }
    guard++;
  }
  return picks;
}

function sourceFingerprint(categories) {
  const parts = [];
  for (const cat of categories) {
    for (const file of listImages(cat.sourcePath)) {
      const st = fs.statSync(path.join(cat.sourcePath, file));
      parts.push(`${cat.slug}:${file}:${st.size}:${st.mtimeMs}`);
    }
  }
  return parts.sort().join("|");
}

function shouldSkip(categories) {
  if (process.env.FORCE_IMAGE_PROCESS === "1") return false;
  if (!fs.existsSync(MANIFEST_PATH) || !fs.existsSync(OUTPUT_DIR)) return false;
  try {
    const existing = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
    if (!existing.fingerprint) return false;
    return existing.fingerprint === sourceFingerprint(categories);
  } catch {
    return false;
  }
}

async function main() {
  console.log("Kelanisiri image processor");
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}`);

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const categories = listSourceCategories();
  const fingerprint = sourceFingerprint(categories);

  if (shouldSkip(categories)) {
    console.log("Sources unchanged — skipping image processing.");
    return;
  }

  if (fs.existsSync(OUTPUT_DIR)) {
    for (const entry of fs.readdirSync(OUTPUT_DIR, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        fs.rmSync(path.join(OUTPUT_DIR, entry.name), { recursive: true, force: true });
      }
    }
  }

  const allImages = [];
  const categorySummaries = [];

  for (const cat of categories) {
    const files = listImages(cat.sourcePath);
    console.log(`\n[${cat.slug}] ${files.length} source image(s)`);

    const items = [];
    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(cat.sourcePath, files[i]);
      process.stdout.write(`  → ${files[i]} ... `);
      try {
        const item = await processOne(filePath, cat.slug, i);
        items.push(item);
        allImages.push(item);
        console.log("ok");
      } catch (err) {
        console.log("FAILED");
        console.error(`    ${err.message}`);
      }
    }

    if (items.length) {
      categorySummaries.push({
        slug: cat.slug,
        title: cat.title,
        description: cat.description,
        order: cat.order,
        count: items.length,
        cover: items[0].thumb,
        coverFull: items[0].full,
      });
    }
  }

  const featured = pickFeatured(allImages, categorySummaries);

  const manifest = {
    generatedAt: new Date().toISOString(),
    fingerprint,
    categories: categorySummaries,
    images: allImages,
    featured,
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nWrote manifest: ${MANIFEST_PATH}`);
  console.log(`Categories: ${categorySummaries.length} | Images: ${allImages.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
