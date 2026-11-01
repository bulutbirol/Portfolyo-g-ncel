import assert from "node:assert/strict";
import { test } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

test("the navigation offers English and Turkish", async () => {
  const vite = await createServer({
    appType: "custom",
    configFile: false,
    esbuild: { jsx: "automatic" },
    logLevel: "silent",
    root: process.cwd(),
    server: { middlewareMode: true },
  });

  try {
    const { Navbar } = await vite.ssrLoadModule("/src/components/layout/Navbar.jsx");
    const html = renderToStaticMarkup(React.createElement(Navbar));
    assert.match(html, /aria-label="Language"/);
    assert.match(html, />EN</);
    assert.match(html, />TR</);
    for (const id of ["home", "about", "projects", "work", "contact"]) assert.match(html, new RegExp(`href="#${id}"`));
    assert.match(html, /aria-expanded="false"/);
    assert.match(html, /aria-controls="mobile-menu"/);
  } finally {
    await vite.close();
  }
});
