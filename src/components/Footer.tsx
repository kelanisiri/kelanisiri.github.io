import Image from "next/image";
import { nav, site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-white">
      <div className="section-pad container-max py-14 sm:py-16">
        <div className="grid md:grid-cols-[1.2fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={site.logo}
                alt={`${site.name} logo`}
                width={52}
                height={52}
                className="rounded-full bg-white p-0.5"
              />
              <div>
                <p className="font-display font-bold">{site.shortName}</p>
                <p className="text-sm text-white/55">Aluminium &amp; Steel Contracts</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-white/60 max-w-sm leading-relaxed">
              Quality Aluminium &amp; Steel Work — professional fabrication with careful
              finishing.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-sky-soft">Navigate</p>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-white/70 hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-sky-soft">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Owner: {site.owner}</li>
              <li>
                <a
                  href={site.location.mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {site.location.short}
                </a>
              </li>
              {site.phones.map((p) => (
                <li key={p.raw}>
                  <a href={p.href} className="hover:text-white">
                    {p.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={site.emailHref} className="hover:text-white break-all">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-xs text-white/45">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}
