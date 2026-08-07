export const SITE = {
  name: "Vertex Solutions",
  url: "https://vertexsolutions.in",
  locale: "en_IN",
  themeColor: "#0a0b0d",
  twitter: "@VertexSolutionsIN",
  ogImage: "/og-image.png",
  phone: "+91-96800-82311",
  email: "info@vertexsolutions.in",
  address:
    "B-301, 3rd Floor, The Coronation – FS Reality, Sanganer, Jaipur, Rajasthan 302029, India",
  geo: { lat: 26.8125, lng: 75.7871 },
  founder: "CA Abhishek Agarwal",
  description:
    "Tax & Business Advisory and Consulting firm in Sanganer, Jaipur offering GST, income tax, company registration, startup India, ISO, trademark, DSC, government subsidy and business advisory services.",
};

const BASE = SITE.url.replace(/\/+$/, "");

export const siteUrl = (path = "/") => `${BASE}/${String(path).replace(/^\//, "")}`;

function orgNode() {
  return {
    "@id": `${BASE}/#organization`,
    "@type": "ProfessionalService",
    name: SITE.name,
    description: SITE.description,
    url: `${BASE}/`,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "$$",
    image: `${BASE}${SITE.ogImage}`,
    founder: { "@type": "Person", name: SITE.founder },
    address: {
      "@type": "PostalAddress",
      streetAddress: "B-301, 3rd Floor, The Coronation – FS Reality, Sanganer",
      addressLocality: "Jaipur",
      postalCode: "302029",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    hasMap: "https://maps.google.com/?q=The+Coronation+FS+Reality+Sanganer+Jaipur+302029",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Jaipur" },
      { "@type": "State", name: "Rajasthan" },
      { "@type": "Country", name: "India" },
    ],
    sameAs: [],
  };
}

export function organizationLd() {
  return { "@context": "https://schema.org", "@type": "ProfessionalService", ...orgNode() };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: `${BASE}/`,
    name: SITE.name,
    description: "Tax & Business Advisory and Consulting firm in Jaipur, Rajasthan.",
    publisher: { "@id": `${BASE}/#organization` },
    inLanguage: "en-IN",
  };
}

export function faqLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function breadcrumbLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([label, href], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: label,
      ...(href ? { item: href === "/" ? `${BASE}/` : `${BASE}${href}` } : {}),
    })),
  };
}

export function serviceLd(slug, name, description, path = `/${slug}`) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: siteUrl(path),
    areaServed: [
      { "@type": "City", name: "Jaipur" },
      { "@type": "State", name: "Rajasthan" },
    ],
    provider: { "@id": `${BASE}/#organization` },
  };
}

export function itemListLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      description: item.description,
      url: siteUrl(item.href),
    })),
  };
}

export function contactPageLd() {
  return { "@context": "https://schema.org", "@type": "LocalBusiness", ...orgNode() };
}