import { whyChooseUs } from "@/data/site";

const icons = [
  <svg key="q" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 5L12 14.8 7.5 16.7l.9-5L4.8 8.2l5-.7L12 3z" />
  </svg>,
  <svg key="r" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    <circle cx="12" cy="12" r="4.5" />
  </svg>,
  <svg key="c" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M4 7h16M4 12h10M4 17h7" />
    <path d="M16 14l4 4-2 2-4-4" />
  </svg>,
  <svg key="d" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z" />
  </svg>,
  <svg key="e" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
];

export function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28 bg-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 metal-grid opacity-20" aria-hidden />
      <div
        className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-sky/10 blur-3xl"
        aria-hidden
      />
      <div className="section-pad container-max relative">
        <div className="reveal max-w-2xl">
          <p className="text-sky-soft text-xs font-semibold tracking-[0.18em] uppercase">
            Why choose us
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Built on craftsmanship and dependable delivery
          </h2>
          <p className="mt-4 text-white/70 leading-relaxed max-w-xl">
            Straightforward strengths that matter when you need metalwork done properly.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyChooseUs.map((item, i) => (
            <article
              key={item.title}
              className={`reveal rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm ${
                i === whyChooseUs.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-sky/15 text-sky-soft">
                {icons[i]}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
