// `npm start`: a frontend és a backend együtt.
// 1. Megnézi, fut-e a DONE Translations Laravel backend (GET /api/health).
// 2. Ha nem, elindítja a szomszédos mate_back mappából (vagy a BACKEND_DIR mappából): php artisan serve.
// 3. Elindítja az Angular fejlesztői szervert (ng serve). Ctrl+C mindkettőt leállítja.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = process.env.API_TARGET || 'http://127.0.0.1:8000';
const backendDir = resolve(process.env.BACKEND_DIR || join(root, '..', 'mate_back'));
const children = [];
const say = (msg) => console.log(`\x1b[33m[dev]\x1b[0m ${msg}`);

async function health() {
  try {
    const res = await fetch(`${target}/api/health`, { signal: AbortSignal.timeout(1500) });
    if (!res.ok) return res.status === 404 ? 'other' : 'down';
    const body = await res.json().catch(() => ({}));
    return body.app === 'done-translations' ? 'ok' : 'other';
  } catch {
    return 'down';
  }
}

function run(cmd, args, cwd, label) {
  const child = spawn(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
  child.on('exit', (code) => { if (code) say(`${label} leállt (${code}).`); });
  children.push(child);
  return child;
}

const stopAll = () => { children.forEach((c) => c.kill('SIGINT')); process.exit(0); };
process.on('SIGINT', stopAll);
process.on('SIGTERM', stopAll);

let state = await health();
if (state === 'ok') {
  say(`A backend fut: ${target}`);
} else if (state === 'other') {
  say(`A ${target} címen más program fut, nem ez a Laravel (az /api/health nem a DONE Translations backendé).`);
  say('Állítsd le azt a programot (macOS: lsof -i :8000), vagy add meg a jó címet: API_TARGET=http://127.0.0.1:8001 npm start');
} else if (existsSync(join(backendDir, 'artisan'))) {
  const { port, hostname } = new URL(target);
  say(`A backend nem fut, elindítom: ${backendDir} → php artisan serve --host=${hostname} --port=${port}`);
  run('php', ['artisan', 'serve', `--host=${hostname}`, `--port=${port}`], backendDir, 'A Laravel');
  for (let i = 0; i < 20 && (state = await health()) !== 'ok'; i++) await new Promise((r) => setTimeout(r, 500));
  say(state === 'ok' ? `A backend fut: ${target}` : 'A backend nem válaszol. Nézd meg a fenti Laravel-hibát (pl. .env, adatbázis, php artisan migrate).');
} else {
  say(`A backend nem fut, és nem találom a mappáját (${backendDir}).`);
  say('Indítsd el kézzel a mate_back mappában: php artisan serve – vagy add meg: BACKEND_DIR=/út/a/mate_back npm start');
}

run(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['ng', 'serve', ...process.argv.slice(2)], root, 'Az Angular');
