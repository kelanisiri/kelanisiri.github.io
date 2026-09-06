import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | Kelanisiri",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center section-pad bg-paper">
      <div className="text-center max-w-md">
        <p className="text-sky text-xs font-semibold tracking-[0.18em] uppercase">404</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-navy">Page not found</h1>
        <p className="mt-3 text-steel">The page you requested is not available.</p>
        <a href="/" className="btn-navy mt-8 inline-flex">
          Back to home
        </a>
      </div>
    </main>
  );
}
