import Image from "next/image";
import { site } from "@/data/site";

/** Sharp stock hero visual — blue/white aluminium & glass architecture */
const HERO_STOCK = {
  src: "/images/hero/aluminium-glass-blue-white.jpg",
  alt: "Modern aluminium and glass building facade under a clear blue sky",
};

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden hero-wash">
      <div className="absolute inset-0 metal-grid opacity-40" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(120deg, transparent 40%, rgba(61,154,214,0.35) 50%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative section-pad container-wide grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center min-h-[100svh] pt-32 pb-16">
        <div className="text-white">
          <div className="inline-flex items-center gap-3 mb-7">
            <Image
              src={site.logo}
              alt={`${site.name} logo`}
              width={88}
              height={88}
              className="rounded-full bg-white/95 p-1 shadow-lg ring-1 ring-white/20"
              priority
            />
            <div>
              <p className="text-sky-soft text-xs font-bold tracking-[0.18em] uppercase">
                Sri Lanka
              </p>
              <p className="font-display text-lg sm:text-xl font-bold leading-tight">
                {site.name}
              </p>
            </div>
          </div>

          <h1 className="font-display text-[2.15rem] sm:text-5xl xl:text-[3.35rem] font-extrabold leading-[1.08] tracking-tight max-w-xl">
            Quality Aluminium &amp; Steel Work,{" "}
            <span className="text-sky-soft">Built to Last.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base sm:text-lg text-white/78 leading-relaxed">
            Professional aluminium and steel fabrication for homes and businesses —
            pantry cupboards, gates, roofing, and custom metalwork finished with care.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#work" className="btn-primary">
              View Our Work
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Us
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg">
            {[
              { label: "Focus", value: "Fabrication" },
              { label: "Materials", value: "Aluminium & Steel" },
              { label: "Location", value: "Gonawala, Kelaniya" },
            ].map((item) => (
              <div key={item.label} className="border-t border-white/15 pt-3">
                <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-white/45">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-white/90">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-2xl bg-sky/20 blur-2xl opacity-50" aria-hidden />
          <figure className="relative overflow-hidden rounded-xl border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.35)] bg-navy-deep/40 aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={HERO_STOCK.src}
              alt={HERO_STOCK.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover object-center"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-transparent">
              <p className="text-xs uppercase tracking-[0.16em] text-sky-soft">
                Aluminium &amp; steel
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                Clean lines. Durable finishes. Built with care.
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
