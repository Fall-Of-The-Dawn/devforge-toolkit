import { useEffect } from "react";
import { TOOL_SEO } from "../utils/constants";

const BASE_URL = "https://omnistack.vercel.app";

function setMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function SEOHead({ toolId }) {
  const seo = TOOL_SEO[toolId] || TOOL_SEO.home;

  useEffect(() => {
    document.title = seo.title;

    setMeta("name", "description", seo.description);
    setMeta("name", "keywords", seo.keywords);
    setMeta("name", "robots", "index, follow");
    setLink("canonical", BASE_URL);

    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", BASE_URL);
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:site_name", "OmniStack");
    setMeta("property", "og:locale", "en_US");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);

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
        item: BASE_URL,
      });
    }

    let ldScript = document.querySelector("script[data-seo-breadcrumb]");
    if (!ldScript) {
      ldScript = document.createElement("script");
      ldScript.type = "application/ld+json";
      ldScript.setAttribute("data-seo-breadcrumb", "true");
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify(breadcrumbLD);
  }, [toolId, seo.title, seo.description, seo.keywords, seo.slug]);

  return null;
}
