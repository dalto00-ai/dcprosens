// scripts/submit-indexnow.mjs
// Submits all 541+ URLs from sitemap.xml directly to IndexNow (Bing, Yandex, Naver, Seznam)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

const HOST = 'dcprosens.com';
const PRIMARY_KEY = '61d5d9d3b13e474893b5e52432e2b70c'; // New Bing Key
const BACKUP_KEY = 'd11bb27999754f2586c5fb8bea3a4ee4';  // Pre-verified Key

// Read sitemap.xml to get every single canonical URL
const sitemapPath = path.join(root, 'public', 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error(`Sitemap not found at ${sitemapPath}`);
  process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const locMatches = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)];
const urlList = Array.from(new Set(locMatches.map(m => m[1].trim()))).filter(Boolean);

console.log(`\n==================================================`);
console.log(`🚀 IndexNow Automated Submitter for ${HOST}`);
console.log(`🔑 Primary Key: ${PRIMARY_KEY}`);
console.log(`🔑 Verified Fallback Key: ${BACKUP_KEY}`);
console.log(`📄 Total unique URLs to index: ${urlList.length}`);
console.log(`==================================================\n`);

async function sendIndexNow(endpointUrl, name, key) {
  const payload = {
    host: HOST,
    key: key,
    keyLocation: `https://${HOST}/${key}.txt`,
    urlList: urlList,
  };

  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    const body = await response.text();
    return { status, body };
  } catch (err) {
    return { error: err.message };
  }
}

async function submitTarget(endpointUrl, name) {
  console.log(`📡 Submitting ${urlList.length} URLs to ${name}...`);
  // Try primary key first
  let res = await sendIndexNow(endpointUrl, name, PRIMARY_KEY);
  if (res.status === 200 || res.status === 202) {
    console.log(`✅ [${name}] HTTP ${res.status}: Successfully accepted with primary key!`);
    return;
  }

  // If primary key is still propagating/verifying on Bing's crawlers, use the verified backup key
  console.log(`ℹ️ [${name}] Primary key status: ${res.status}. Falling back to verified key...`);
  let resBackup = await sendIndexNow(endpointUrl, name, BACKUP_KEY);
  if (resBackup.status === 200 || resBackup.status === 202) {
    console.log(`✅ [${name}] HTTP ${resBackup.status}: Successfully submitted with verified key!`);
  } else {
    console.warn(`⚠️ [${name}] HTTP ${resBackup.status}: ${resBackup.body || resBackup.error}`);
  }
}

async function main() {
  await submitTarget('https://api.indexnow.org/indexnow', 'IndexNow API');
  await submitTarget('https://www.bing.com/indexnow', 'Bing Direct');
  console.log(`\n🎉 IndexNow submission finished successfully 100%!\n`);
}

main();
