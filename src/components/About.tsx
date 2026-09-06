import Image from "next/image";
import { aboutCopy, site } from "@/data/site";
import { assetPath } from "@/lib/paths";

type Props = {
  accentImage?: string;
};

export function About({ accentImage }: Props) {
  return (
    <section id="about" className="relative py-20 sm:py-28 bg-white">
      <div className="section-pad container-max grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="reveal">
          <p className="text-sky text-xs font-semibold tracking-[0.18em] uppercase">
            {aboutCopy.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight leading-tight">
            {aboutCopy.title}
          </h2>
          <div className="mt-6 space-y-4 text-steel leading-relaxed text-[0.975rem] sm:text-base">
            {aboutCopy.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-[var(--line)] bg-paper p-5 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                  Owner
                </p>
                <p className="mt-1 font-display text-xl font-bold text-navy">{site.owner}</p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sky">
                Gonawala, Kelaniya
              </p>
            </div>
            <p className="mt-3 text-sm text-steel leading-relaxed">
              {site.name} — aluminium and steel fabrication with a focus on quality finishing
              and dependable service.
            </p>
          </div>
        </div>

        <div className="reveal relative">
          <div className="grid grid-cols-12 gap-3 sm:gap-4">
            <div className="relative col-span-12 sm:col-span-7 overflow-hidden rounded-xl bg-mist aspect-[3/4] min-h-[280px] shadow-[var(--shadow)]">
              {accentImage ? (
                <Image
                  src={assetPath(accentImage)}
                  alt="Completed aluminium pantry work by Kelanisiri Aluminium & Steel Contracts"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
                  className="object-cover object-center"
                  priority
                />
              ) : null}
            </div>
            <div className="col-span-12 sm:col-span-5 flex flex-col gap-3 sm:gap-4">
              <div className="rounded-xl bg-navy text-white p-5 flex-1 flex flex-col justify-end min-h-[160px]">
                <p className="text-sky-soft text-xs font-semibold tracking-[0.16em] uppercase">
                  Approach
                </p>
                <p className="mt-2 font-display text-lg font-semibold leading-snug">
                  Practical solutions. Clean finishing. Durable work.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--line)] bg-sky-pale p-5">
                <p className="font-display text-2xl font-bold text-navy tracking-tight">KASC</p>
                <p className="mt-1 text-sm text-steel leading-snug">
                  Kelanisiri Aluminium &amp; Steel Contracts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
