import type { Metadata } from "next";
import { Barlow, Manrope } from "next/font/google";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/data/site";
import "./globals.css";

const display = Barlow({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kelanisiri Aluminium & Steel Contracts | Aluminium & Steel Fabrication",
  description: site.description,
  metadataBase: new URL("https://kelanisiri123-web.github.io/kelanisiri123-web/"),
  openGraph: {
    title: "Kelanisiri Aluminium & Steel Contracts | Aluminium & Steel Fabrication",
    description: site.description,
    locale: site.locale,
    type: "website",
    siteName: site.name,
    images: [{ url: site.logo, alt: `${site.name} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [site.logo],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  keywords: [
    "Kelanisiri",
    "aluminium fabrication",
    "steel fabrication",
    "pantry cupboards",
    "gates",
    "roofing",
    "Sri Lanka",
    "Gonawala",
    "Kelaniya",
    "Biyagama Road",
    "metalwork",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
