// A sitemap.xml és a robots.txt előállítása a paths.json alapján (minden oldal mindkét nyelven, hreflang párokkal).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://donetranslations.hu';
const paths = JSON.parse(readFileSync(join(root, 'src/app/content/paths.json'), 'utf8'));
const url = (p) => `${SITE}/${p ? p + '/' : ''}`;
const today = new Date().toISOString().slice(0, 10);

const entries = [];
for (const [key, langs] of Object.entries(paths)) {
  if (key === 'thanks') continue;
  for (const lang of ['hu', 'en']) {
    entries.push(`  <url>
    <loc>${url(langs[lang])}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="hu" href="${url(langs.hu)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${url(langs.en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url(langs.hu)}"/>
  </url>`);
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
writeFileSync(join(root, 'public/sitemap.xml'), xml);
writeFileSync(join(root, 'public/robots.txt'), `User-agent: *\nDisallow: /admin\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`sitemap.xml: ${entries.length} cím`);
