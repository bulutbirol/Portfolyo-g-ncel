import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { test } from "node:test";

const output = new URL("../dist/", import.meta.url);
const read = (path) => readFile(new URL(path, output), "utf8");

test("both languages are present in the initial HTML", async () => {
  const english = await read("index.html");
  const turkish = await read("tr/index.html");

  assert.match(english, /<html lang="en"/);
  assert.match(english, /My Selected Projects/);
  assert.match(english, /ServiceFlow/);
  assert.match(english, /Shortlink/);

  assert.match(turkish, /<html lang="tr"/);
  assert.match(turkish, /Projelerim/);
  assert.match(turkish, /ServiceFlow/);
  assert.match(turkish, /Shortlink/);
});

test("language pages identify their canonical and alternate URLs", async () => {
  const english = await read("index.html");
  const turkish = await read("tr/index.html");

  assert.match(english, /rel="canonical" href="https:\/\/birolweb\.dev\/"/);
  assert.match(turkish, /rel="canonical" href="https:\/\/birolweb\.dev\/tr\/"/);
  for (const html of [english, turkish]) {
    assert.match(html, /hreflang="en" href="https:\/\/birolweb\.dev\/"/);
    assert.match(html, /hreflang="tr" href="https:\/\/birolweb\.dev\/tr\/"/);
    assert.match(html, /type="application\/ld\+json"/);
  }
});

test("crawlers can discover both pages", async () => {
  const sitemap = await read("sitemap.xml");
  const robots = await read("robots.txt");

  assert.match(sitemap, /https:\/\/birolweb\.dev\//);
  assert.match(sitemap, /https:\/\/birolweb\.dev\/tr\//);
  assert.match(robots, /Sitemap: https:\/\/birolweb\.dev\/sitemap\.xml/);
});

test("CV and share image referenced by the pages exist", async () => {
  const pdf = await stat(new URL("cv.pdf", output));
  const image = await stat(new URL("social-card.png", output));
  assert.ok(pdf.size > 100_000);
  assert.ok(image.size > 10_000);
});
