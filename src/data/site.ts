export const site = {
  name: "Kelanisiri Aluminium & Steel Contracts",
  shortName: "Kelanisiri",
  acronym: "KASC",
  tagline: "Quality Aluminium & Steel Work, Built to Last.",
  description:
    "Professional aluminium and steel fabrication in Gonawala, Kelaniya — pantry cupboards, gates, roofing, and custom metalwork by Kelanisiri Aluminium & Steel Contracts.",
  owner: "W.N. Jagath Nishantha",
  phones: [
    { display: "071 991 5384", href: "tel:+94719915384", raw: "0719915384" },
    { display: "071 620 3564", href: "tel:+94716203564", raw: "0716203564" },
  ],
  email: "kelanisir123@gmail.com",
  emailHref: "mailto:kelanisir123@gmail.com",
  logo: "/brand/logo.jpeg",
  locale: "en_LK",
  country: "Sri Lanka",
  location: {
    label: "Workshop & office",
    addressLines: ["No. 18/E, Biyagama Road", "Gonawala, Kelaniya", "Sri Lanka"],
    short: "No. 18/E, Biyagama Rd, Gonawala",
    /** Approximate pin on Biyagama Road, Gonawala — matches Google Business listing area */
    lat: 6.9516252,
    lng: 79.9174011,
    mapsSearchUrl:
      "https://www.google.com/maps/search/?api=1&query=Kelanisiri+Aluminium+%26+Steel+Contracts+No.+18%2FE+Biyagama+Rd+Gonawala+Sri+Lanka",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Kelanisiri+Aluminium+%26+Steel+Contracts,+No.+18/E+Biyagama+Rd,+Gonawala,+Sri+Lanka&hl=en&z=16&output=embed",
  },
};

export const nav = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Our Work" },
  { href: "#contact", label: "Contact" },
];

export const aboutCopy = {
  eyebrow: "About the company",
  title: "Crafted metalwork with careful finishing",
  paragraphs: [
    "Kelanisiri Aluminium & Steel Contracts delivers practical aluminium and steel fabrication for homes and commercial spaces across Sri Lanka. From custom pantry cupboards and gates to roofing and structural metalwork, every project is handled with a focus on clean finishing and durable construction.",
    "Under the ownership of W.N. Jagath Nishantha, the business prioritises reliable communication, attention to detail, and solutions that suit each customer’s requirements and site conditions.",
  ],
};

export const whyChooseUs = [
  {
    title: "Quality Workmanship",
    text: "Careful attention to finishing and construction quality on every installation.",
  },
  {
    title: "Reliable Service",
    text: "Clear communication and dependable project execution from start to finish.",
  },
  {
    title: "Custom Solutions",
    text: "Work designed around your requirements, measurements, and site conditions.",
  },
  {
    title: "Durable Materials",
    text: "Practical, long-lasting aluminium and steel solutions built for daily use.",
  },
  {
    title: "Attention to Detail",
    text: "Clean edges, accurate fits, and finishing that make a project look professional.",
  },
];

/** Fallback services if gallery has not been generated yet */
export const defaultServices = [
  {
    slug: "aluminium-work",
    title: "Aluminium Work",
    description: "Precision aluminium fabrication for residential and commercial projects.",
  },
  {
    slug: "steel-fabrication",
    title: "Steel Fabrication",
    description: "Strong, practical steel work for gates, frames, and structural needs.",
  },
  {
    slug: "pantry-cupboards",
    title: "Pantry Cupboards",
    description: "Custom aluminium pantry and kitchen cupboard solutions.",
  },
  {
    slug: "gates",
    title: "Gates",
    description: "Secure, well-finished aluminium and steel gate fabrication.",
  },
  {
    slug: "roofs",
    title: "Roofing Work",
    description: "Roofing and related aluminium & steel construction work.",
  },
  {
    slug: "custom",
    title: "Custom Fabrication",
    description: "Bespoke aluminium and steel solutions tailored to your brief.",
  },
];
