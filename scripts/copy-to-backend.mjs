// Az előrenderelt Angular buildet átmásolja a Laravelbe, hogy egy tárhelyen fusson a kettő:
//  - a statikus fájlok (js, css, képek, sitemap, robots) a public mappába kerülnek,
//  - az oldalak HTML-je (index.html-ek mappánként) a resources/frontend mappába; ezeket a Laravel szolgálja ki
//    a régi WordPress címeken (perjellel a végén), így a public-ban nem keletkeznek az útvonalakkal ütköző mappák.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist', 'frontend', 'browser');
// A Laravel projekt mappája: BACKEND_DIR környezeti változó, vagy a mellette lévő mate_back / backend mappa.
const candidates = [process.env.BACKEND_DIR, join(root, '..', 'mate_back'), join(root, '..', 'backend')].filter(Boolean);
const backend = candidates.find((dir) => existsSync(join(dir, 'artisan')));
if (!backend) {
  console.error('Nem találom a Laravel projektet. Add meg az útvonalát: BACKEND_DIR=../mate_back npm run build:backend');
  process.exit(1);
}
if (!existsSync(dist)) {
  console.error('Nincs build. Futtasd előbb: npm run build');
  process.exit(1);
}

const publicDir = join(backend, 'public');
const pagesDir = join(backend, 'resources', 'frontend');

// Előző build törlése: hash-elt fájlok a public-ból, az oldalak teljes mappája.
for (const name of readdirSync(publicDir)) {
  if (/^(main|chunk|polyfills|styles)-[A-Z0-9]+\.(js|css)$/.test(name) || name === 'index.html' || name === 'index.csr.html') {
    rmSync(join(publicDir, name));
  }
}
rmSync(pagesDir, { recursive: true, force: true });

let pages = 0;
let assets = 0;
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = relative(dist, full);
    if (statSync(full).isDirectory()) {
      walk(full);
    } else if (name.endsWith('.html')) {
      mkdirSync(dirname(join(pagesDir, rel)), { recursive: true });
      cpSync(full, join(pagesDir, rel));
      pages++;
    } else {
      mkdirSync(dirname(join(publicDir, rel)), { recursive: true });
      cpSync(full, join(publicDir, rel));
      assets++;
    }
  }
};
walk(dist);
console.log(`Bemásolva: ${pages} oldal -> ${pagesDir}, ${assets} statikus fájl -> ${publicDir}`);
