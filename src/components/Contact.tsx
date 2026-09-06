import { site } from "@/data/site";

export function Contact() {
  const { location } = site;

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 metal-grid opacity-30 pointer-events-none" aria-hidden />
      <div className="section-pad container-max relative">
        <div className="reveal max-w-2xl">
          <p className="text-sky text-xs font-semibold tracking-[0.18em] uppercase">
            Contact
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            Visit us or get in touch
          </h2>
          <p className="mt-4 text-steel leading-relaxed max-w-xl">
            Speak with Kelanisiri about your aluminium or steel project — or visit the workshop
            on Biyagama Road, Gonawala.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-[0.92fr_1.08fr] gap-5 lg:gap-7 items-stretch">
          <div className="reveal rounded-2xl border border-[var(--line)] bg-paper p-6 sm:p-8 shadow-[var(--shadow)] flex flex-col">
            <p className="font-display text-xl font-bold text-navy leading-snug">{site.name}</p>
            <p className="mt-1 text-sm text-steel">Owner: {site.owner}</p>

            <dl className="mt-7 space-y-6 flex-1">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                  Location
                </dt>
                <dd className="mt-2 text-navy font-semibold leading-relaxed">
                  {location.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
                <a
                  href={location.mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-sky hover:text-navy transition-colors"
                >
                  Open in Google Maps
                  <span aria-hidden>↗</span>
                </a>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                  Phone
                </dt>
                <dd className="mt-2 flex flex-col gap-2">
                  {site.phones.map((phone) => (
                    <a
                      key={phone.raw}
                      href={phone.href}
                      className="text-lg font-bold text-navy hover:text-sky transition-colors"
                    >
                      {phone.display}
                    </a>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={site.emailHref}
                    className="text-base sm:text-lg font-bold text-navy hover:text-sky break-all transition-colors"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href={site.phones[0].href} className="btn-navy text-center">
                Call Now
              </a>
              <a href={site.emailHref} className="btn-outline text-center">
                Email Us
              </a>
            </div>
          </div>

          <div className="reveal min-h-[340px] sm:min-h-[460px]">
            <div className="relative h-full min-h-[340px] sm:min-h-[460px] overflow-hidden rounded-2xl border border-[var(--line)] bg-mist shadow-[var(--shadow)]">
              <iframe
                title="Kelanisiri Aluminium & Steel Contracts on Google Maps"
                src={location.mapsEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
