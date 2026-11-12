import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

let vite;

before(async () => {
  vite = await createServer({
    appType: "custom",
    configFile: false,
    esbuild: { jsx: "automatic" },
    logLevel: "silent",
    root: process.cwd(),
    server: { middlewareMode: true },
  });
});

after(() => vite.close());

async function render(path, exportName, { reducedMotion = "never", ...props } = {}, language = "en") {
  const mod = await vite.ssrLoadModule(path);
  const { LanguageProvider } = await vite.ssrLoadModule("/src/LanguageProvider.jsx");
  const { MotionConfig } = await vite.ssrLoadModule("framer-motion");
  const tree = React.createElement(
    LanguageProvider,
    { initialLanguage: language },
    React.createElement(MotionConfig, { reducedMotion }, React.createElement(mod[exportName], props))
  );
  return renderToStaticMarkup(tree);
}

test("Reveal keeps its content in the server markup", async () => {
  const html = await render("/src/components/Reveal.jsx", "Reveal", { as: "section", children: "hello" });
  assert.match(html, /<section[^>]*>hello<\/section>/);
});

test("animations run on every device", async () => {
  const fs = await import("node:fs/promises");
  const app = await fs.readFile("src/App.jsx", "utf8");
  assert.match(app, /<MotionConfig reducedMotion="never">/);
  const html = await render("/src/components/hero/Hero.jsx", "default", {}, "en");
  assert.doesNotMatch(html, /motion-reduce:/);
});

test("navbar shows a scroll progress bar", async () => {
  const html = await render("/src/components/layout/Navbar.jsx", "Navbar", {}, "en");
  assert.match(html, /data-scroll-progress/);
});

test("section headings keep readable text while words animate", async () => {
  const html = await render("/src/components/SplitText.jsx", "SplitText", { text: "My Selected Projects" });
  assert.match(html, /<span class="sr-only">My Selected Projects<\/span>/);
  assert.equal((html.match(/data-word/g) || []).length, 3);
});

test("cards follow the mouse with a spotlight", async () => {
  const html = await render("/src/components/Spotlight.jsx", "Spotlight", { className: "x", children: "card" });
  assert.match(html, /data-spotlight/);
  assert.match(html, />card</);
});

test("hero keeps its actions and the full headline in markup", async () => {
  const html = await render("/src/components/hero/Hero.jsx", "default", {}, "tr");
  assert.match(html, /İşleri kolaylaştıran yazılımlar geliştiriyorum\./);
  assert.match(html, /href="#projects"/);
  assert.match(html, /github\.com\/bulutbirol/);
  assert.match(html, /Spring Boot/);
  assert.match(html, /İşleri<\/span><\/span> <span/);
});

test("marquee duplicate copy is hidden from screen readers", async () => {
  const html = await render("/src/components/hero/Marquee.jsx", "default", { items: ["React"] });
  assert.match(html, /aria-hidden="true"/);
  assert.equal((html.match(/>React</g) || []).length, 2);
});

test("about keeps CV download, contact CTA and stack as text", async () => {
  const html = await render("/src/sections/About.jsx", "About", {}, "en");
  assert.match(html, /About Me/);
  assert.match(html, /href="\/cv\.pdf"/);
  assert.match(html, /download="Birol-Bulut-CV\.pdf"/);
  assert.match(html, /href="#contact"/);
  assert.match(html, />Spring Boot</);
  assert.doesNotMatch(html, /<img/);
});

test("about intro is split into a lead, a detail line and three values", async () => {
  const html = await render("/src/sections/About.jsx", "About", {}, "tr");
  assert.match(html, /data-about-lead/);
  assert.match(html, /data-about-detail/);
  assert.equal((html.match(/data-about-value/g) || []).length, 3);
  assert.match(html, /Güvenilir veri/);
});

test("every project row has its own description and demo link", async () => {
  const html = await render("/src/sections/Projects.jsx", "default", {}, "en");
  assert.match(html, /Create short links, track clicks, and turn links off from your account\./);
  assert.match(html, /aria-label="Open Shortlink live demo"/);
  assert.equal((html.match(/data-project-row/g) || []).length, 5);
  assert.match(html, /serviceflow-web-ten\.vercel\.app/);
  assert.match(html, /FSM-Platform-Project/);
});

test("project screenshots stay visible in every row and the ServiceFlow scene renders", async () => {
  const html = await render("/src/sections/Projects.jsx", "default", {}, "en");
  assert.match(html, /data-project-scene/);
  assert.equal((html.match(/src="\/projects\/[a-z]+\.jpg"/g) || []).length, 6);
  assert.doesNotMatch(html, /grid-rows-\[0fr\]/);
});

test("contact labels are tied to their inputs", async () => {
  // Inputs live on later steps, so they are not in the first-render markup.
  const fs = await import("node:fs/promises");
  const src = await fs.readFile("src/sections/Contact.jsx", "utf8");
  for (const id of ["contact-name", "contact-email", "contact-message"]) {
    assert.match(src, new RegExp(`htmlFor="${id}"`));
    assert.match(src, new RegExp(`id="${id}"`));
  }
});

test("footer links have accessible names", async () => {
  const html = await render("/src/sections/Footer.jsx", "default", {}, "en");
  for (const name of ["GitHub", "LinkedIn", "Instagram"]) assert.match(html, new RegExp(`aria-label="${name}"`));
  assert.match(html, /href="\/cv\.pdf"/);
});

test("work shows both roles under its heading", async () => {
  const html = await render("/src/sections/Work.jsx", "Work", {}, "en");
  assert.match(html, /Work Experience/);
  assert.match(html, /Workintech/);
  assert.match(html, /BBROZ/);
});

test("app has a decorative animated background", async () => {
  const html = await render("/src/App.jsx", "default", {}, "en");
  assert.match(html, /<div[^>]*data-backdrop[^>]*aria-hidden="true"|<div[^>]*aria-hidden="true"[^>]*data-backdrop/);
});

test("heading suffix stays on the last word", async () => {
  const html = await render("/src/components/SplitText.jsx", "SplitText", { text: "Let's Talk", after: "." });
  assert.match(html, />Talk\.<\/span>/);
});

test("contact form includes the Turnstile check", async () => {
  // The widget renders on the last step, so check that the send path still requires a token.
  const fs = await import("node:fs/promises");
  const src = await fs.readFile("src/sections/Contact.jsx", "utf8");
  assert.match(src, /turnstile\.render\(captchaRef\.current/);
  assert.match(src, /turnstileToken: token/);
  const { translations } = await vite.ssrLoadModule("/src/i18n.js");
  assert.ok(translations.en.contact.errors.captcha);
  assert.ok(translations.tr.contact.errors.captcha);
});

test("contact starts as a step-by-step form", async () => {
  const html = await render("/src/sections/Contact.jsx", "default", {}, "en");
  assert.match(html, /What can I help you with\?/);
  assert.match(html, /role="checkbox"/);
  assert.match(html, /Job opportunity/);
  assert.doesNotMatch(html, /birolblood@gmail\.com/);
});
