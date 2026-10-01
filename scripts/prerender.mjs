import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist");
const template = await readFile(resolve(output, "index.html"), "utf8");
const { default: App } = await import(pathToFileURL(resolve(root, ".ssr", "App.js")));

const pages = {
  en: {
    url: "https://birolweb.dev/",
    title: "Birol Bulut | Full Stack Developer",
    description: "Birol Bulut is a full stack developer in Bursa, Türkiye. Explore React, Spring Boot and PostgreSQL projects including ServiceFlow and Shortlink.",
    locale: "en_US",
  },
  tr: {
    url: "https://birolweb.dev/tr/",
    title: "Birol Bulut | Full Stack Geliştirici",
    description: "Birol Bulut, Bursa'da React, Spring Boot ve PostgreSQL ile projeler geliştiren bir full stack geliştirici. ServiceFlow ve Shortlink projelerini inceleyin.",
    locale: "tr_TR",
  },
};

const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const alternate = `
    <link rel="alternate" hreflang="en" href="${pages.en.url}" />
    <link rel="alternate" hreflang="tr" href="${pages.tr.url}" />
    <link rel="alternate" hreflang="x-default" href="${pages.en.url}" />`;

for (const [language, page] of Object.entries(pages)) {
    const content = renderToString(React.createElement(App, { initialLanguage: language }));
    const data = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", name: "Birol Bulut", url: page.url, inLanguage: language },
        {
          "@type": "Person",
          name: "Birol Bulut",
          url: "https://birolweb.dev/",
          jobTitle: language === "tr" ? "Full Stack Geliştirici" : "Full Stack Developer",
          homeLocation: { "@type": "Place", name: "Bursa, Türkiye" },
          sameAs: ["https://github.com/bulutbirol", "https://www.linkedin.com/in/birol-bulut/"],
        },
      ],
    };
    const meta = `
    <title>${escape(page.title)}</title>
    <meta name="description" content="${escape(page.description)}" />
    <link rel="canonical" href="${page.url}" />${alternate}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Birol Bulut" />
    <meta property="og:locale" content="${page.locale}" />
    <meta property="og:title" content="${escape(page.title)}" />
    <meta property="og:description" content="${escape(page.description)}" />
    <meta property="og:url" content="${page.url}" />
    <meta property="og:image" content="https://birolweb.dev/social-card.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(page.title)}" />
    <meta name="twitter:description" content="${escape(page.description)}" />
    <meta name="twitter:image" content="https://birolweb.dev/social-card.png" />
    <script type="application/ld+json">${JSON.stringify(data).replaceAll("<", "\\u003c")}</script>`;
    const html = template
      .replace('<html lang="en"', `<html lang="${language}"`)
      .replace("<!-- SEO_META -->", meta)
      .replace('<div id="root"></div>', `<div id="root">${content}</div>`);
    const dir = language === "tr" ? resolve(output, "tr") : output;
    await mkdir(dir, { recursive: true });
    await writeFile(resolve(dir, "index.html"), html);
}
