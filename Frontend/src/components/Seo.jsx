import { Helmet } from "react-helmet-async";
import { SITE } from "../data/seo.js";

const DOMAIN = SITE.url.replace(/\/+$/, "");

function absolute(image) {
  return /^https?:\/\//.test(image) ? image : `${DOMAIN}${image}`;
}

export default function Seo({
  title,
  description,
  path = "/",
  image = SITE.ogImage,
  type = "website",
  noindex = false,
  noTitleSuffix = false,
  jsonLd = [],
  children,
}) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url =
    cleanPath === "/"
      ? `${DOMAIN}/`
      : `${DOMAIN}${cleanPath.replace(/\/+$/, "")}`;

  const fullTitle =
    noTitleSuffix || title.includes(SITE.name)
      ? title
      : `${title} | ${SITE.name}`;

  const ogImage = absolute(image);

  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large";

  return (
    <Helmet>
      <title>{fullTitle}</title>

      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={description} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE.twitter} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}

      {children}
    </Helmet>
  );
}