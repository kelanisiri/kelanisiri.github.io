import Image from "next/image";
import type { GalleryImage } from "@/lib/gallery";
import { getCategoryTitle } from "@/lib/gallery";

export function FeaturedProjects({ items }: { items: GalleryImage[] }) {
  if (!items.length) return null;

  const showcase = items.slice(0, 5);

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="section-pad container-wide">
        <div className="reveal flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <p className="text-sky text-xs font-semibold tracking-[0.18em] uppercase">
              Featured projects
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              A closer look at finished work
            </h2>
            <p className="mt-3 text-steel leading-relaxed max-w-xl">
              Selected installations that show the standard of finishing across pantry units,
              gates, roofing, and custom metalwork.
            </p>
          </div>
          <a href="#work" className="btn-outline self-start sm:self-auto">
            Browse full gallery
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 auto-rows-[220px] md:auto-rows-[260px]">
          {showcase.map((item, i) => {
            const spans = [
              "md:col-span-7 md:row-span-2",
              "md:col-span-5",
              "md:col-span-5",
              "md:col-span-6",
              "md:col-span-6",
            ];
            return (
              <a
                key={item.id}
                href="#work"
                className={`reveal group relative overflow-hidden rounded-xl bg-mist min-h-[220px] ${spans[i]}`}
              >
                <Image
                  src={item.full}
                  alt={item.alt}
                  fill
                  sizes={
                    i === 0
                      ? "(max-width: 768px) 100vw, 58vw"
                      : "(max-width: 768px) 100vw, 42vw"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-soft">
                    {getCategoryTitle(item.category)}
                  </p>
                  <p className="mt-1 text-white font-semibold">Completed installation</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
