"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-[rgba(12,35,64,0.1)] bg-white transition-shadow duration-300 ${
        scrolled || open
          ? "shadow-[0_8px_30px_rgba(7,22,40,0.1)]"
          : "shadow-none"
      }`}
    >
      <div
        className={`section-pad container-wide flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled ? "py-2.5" : "py-3.5"
        }`}
      >
        <a href="#home" className="flex items-center gap-3 min-w-0">
          <Image
            src={site.logo}
            alt={`${site.name} logo`}
            width={scrolled ? 48 : 56}
            height={scrolled ? 48 : 56}
            className="rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-all"
            priority
          />
          <div className="min-w-0 leading-tight">
            <p
              className="font-display font-bold tracking-tight truncate text-[0.95rem]"
              style={{ color: "#0c2340" }}
            >
              Kelanisiri
            </p>
            <p
              className="text-[0.7rem] font-bold tracking-[0.06em] uppercase truncate"
              style={{ color: "#3d9ad6" }}
            >
              Aluminium & Steel
            </p>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-bold tracking-wide transition-colors hover:opacity-70"
              style={{ color: "#0c2340" }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <a
            href={site.phones[0].href}
            className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-bold transition-colors hover:opacity-90"
            style={{ background: "#0c2340", color: "#ffffff" }}
          >
            Call Now
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md border transition-colors"
          style={{ borderColor: "rgba(12,35,64,0.2)", color: "#0c2340" }}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="relative h-4 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </div>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden border-t transition-all duration-300 ${
          open
            ? "max-h-[28rem] border-[rgba(12,35,64,0.1)] bg-white opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <nav className="section-pad flex flex-col gap-1 py-4" aria-label="Mobile">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-3 text-base font-bold hover:bg-[#e8f4fb]"
              style={{ color: "#0c2340" }}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.phones[0].href}
            className="mt-2 btn-navy font-bold"
            onClick={() => setOpen(false)}
          >
            Call {site.phones[0].display}
          </a>
        </nav>
      </div>
    </header>
  );
}
