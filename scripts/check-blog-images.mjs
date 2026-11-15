#!/usr/bin/env node
// Reports blog-image coverage: which posts have their own image, which are
// falling back to a shared generic one, and which declared files are missing.
//
// Run: node scripts/check-blog-images.mjs
// Exits 0 always — this is a report, not a gate.

import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = join(root, "public", "blog");
const postsDir = join(root, "src", "lib", "posts-data");

const onDisk = new Set(readdirSync(blogDir).filter((f) => f.endsWith(".webp")));

const posts = [];
for (const file of readdirSync(postsDir).filter((f) => f.endsWith(".ts"))) {
  const src = readFileSync(join(postsDir, file), "utf8");
  for (const block of src.split(/["']?slug["']?:\s*['"]/i).slice(1)) {
    const slugMatch = block.match(/^([^'"]+)/);
    const slug = slugMatch ? slugMatch[1] : null;
    const imgMatch = block.match(/["']?image["']?:\s*['"]([^'"]+)['"]/);
    if (slug && imgMatch) posts.push({ slug, image: imgMatch[1], file });
  }
}

const missing = [];
const shared = new Map();
for (const p of posts) {
  const name = p.image.split("/").pop();
  if (!onDisk.has(name)) {
    missing.push(p);
    continue;
  }
  if (!shared.has(name)) shared.set(name, []);
  shared.get(name).push(p.slug);
}

const reused = [...shared.entries()].filter(([, slugs]) => slugs.length > 1);
const unused = [...onDisk].filter((f) => !posts.some((p) => p.image.endsWith("/" + f)));

console.log(`posts:            ${posts.length}`);
console.log(`images on disk:   ${onDisk.size}`);
console.log(`own image OK:     ${posts.length - missing.length - reused.reduce((n, [, s]) => n + s.length, 0)}`);
console.log(`missing file:     ${missing.length}`);
console.log(`sharing an image: ${reused.reduce((n, [, s]) => n + s.length, 0)} posts across ${reused.length} images`);
console.log(`unused on disk:   ${unused.length}`);

if (missing.length) {
  console.log("\n--- missing (post will render a generic fallback) ---");
  for (const p of missing) console.log(`  ${p.image.split("/").pop().padEnd(58)} <- ${p.slug}`);
}
if (reused.length) {
  console.log("\n--- shared images ---");
  for (const [name, slugs] of reused.sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${String(slugs.length).padStart(3)}x ${name}`);
  }
}
if (unused.length) {
  console.log("\n--- on disk but referenced by no post ---");
  for (const f of unused) console.log(`  ${f}`);
}
