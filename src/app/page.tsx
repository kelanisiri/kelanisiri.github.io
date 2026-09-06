import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { gallery } from "@/lib/gallery";

export default function HomePage() {
  const aboutImage =
    gallery.images.find(
      (i) => i.category === "pantry-cupboards" && i.height >= i.width,
    )?.full ||
    gallery.featured.find((i) => i.category === "pantry-cupboards")?.full ||
    gallery.images[0]?.full;

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About accentImage={aboutImage} />
        <WhyChooseUs />
        <FeaturedProjects items={gallery.featured} />
        <Gallery categories={gallery.categories} images={gallery.images} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
