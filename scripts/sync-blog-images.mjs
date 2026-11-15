#!/usr/bin/env node
// Regenerates the AVAILABLE set inside src/utils/blogImageResolver.ts from
// whatever actually sits in public/blog/.
//
// Why this exists: AVAILABLE used to be a hand-maintained list. Whenever a
// batch of new post images was added to public/blog/ without someone also
// editing the list by hand, resolveBlogImage() stopped recognising those
// files and silently swapped in a keyword-matched generic image instead —
// so 50 real, correct images sat on disk unused while their posts rendered
// a shared placeholder. The list has to stay a literal (the resolver is
// imported by a client component, so it can't read the filesystem at
// runtime), but it no longer has to be maintained by hand.
//
// Run: node scripts/sync-blog-images.mjs
// Wired into `npm run build` via the prebuild script.

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = join(root, "public", "blog");
const resolverPath = join(root, "src", "utils", "blogImageResolver.ts");

const files = readdirSync(blogDir)
  .filter((f) => f.endsWith(".webp"))
  .sort((a, b) => a.localeCompare(b, "en"));

const block = `const AVAILABLE = new Set([\n${files
  .map((f) => `  ${JSON.stringify(f)},`)
  .join("\n")}\n]);`;

const source = readFileSync(resolverPath, "utf8");
const AVAILABLE_BLOCK = /const AVAILABLE = new Set\(\[[\s\S]*?\n\]\);/;

// Test for the block explicitly. Comparing before/after text instead would
// report "block not found" on the common case where the list is already in
// sync and the rewrite is a no-op.
const match = source.match(AVAILABLE_BLOCK);
if (!match) {
  console.error("sync-blog-images: could not find the AVAILABLE block in blogImageResolver.ts.");
  process.exit(1);
}

const before = (match[0].match(/"[^"]+\.webp"/g) ?? []).length;
const updated = source.replace(AVAILABLE_BLOCK, () => block);

if (updated !== source) writeFileSync(resolverPath, updated);

const delta = files.length - before;
console.log(
  delta === 0
    ? `sync-blog-images: AVAILABLE already in sync (${files.length} images)`
    : `sync-blog-images: AVAILABLE ${before} -> ${files.length} images (${delta > 0 ? "+" : ""}${delta})`
);
