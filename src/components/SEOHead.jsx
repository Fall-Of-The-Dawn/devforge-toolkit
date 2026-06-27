import { Helmet } from "react-helmet-async";
import { TOOL_SEO } from "../utils/constants";

const BASE_URL = "https://omnistack.vercel.app";

export default function SEOHead({ toolId }) {
  const seo = TOOL_SEO[toolId] || TOOL_SEO.home;
  const url = seo.slug ? `${BASE_URL}/${seo.slug}` : BASE_URL;

  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    ],
  };

  if (seo.slug) {
    breadcrumbLD.itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: seo.title.split(" | ")[0],
      item: url,
    });
  }

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:site_name" content="OmniStack" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />

      {/* JSON-LD Breadcrumb */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbLD)}
      </script>
    </Helmet>
  );
}
