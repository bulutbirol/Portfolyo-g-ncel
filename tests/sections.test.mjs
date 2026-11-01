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

test("the app respects the user's reduced motion setting", async () => {
  const source = await import("node:fs/promises").then((fs) => fs.readFile("src/App.jsx", "utf8"));
  assert.match(source, /<MotionConfig reducedMotion="user">/);
});

test("hero keeps its actions and the full headline in markup", async () => {
  const html = await render("/src/components/hero/Hero.jsx", "default", {}, "tr");
  assert.match(html, /İşleri kolaylaştıran yazılımlar geliştiriyorum\./);
  assert.match(html, /href="#projects"/);
  assert.match(html, /github\.com\/bulutbirol/);
  assert.match(html, /Spring Boot/);
});

test("marquee duplicate copy is hidden from screen readers", async () => {
  const html = await render("/src/components/hero/Marquee.jsx", "default", { items: ["React"] });
  assert.match(html, /aria-hidden="true"/);
  assert.equal((html.match(/>React</g) || []).length, 2);
});
