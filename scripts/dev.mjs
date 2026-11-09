// `npm start`: a frontend és a backend együtt.
// 1. Megnézi, fut-e a DONE Translations Laravel backend (GET /api/health).
// 2. Ha nem, elindítja a szomszédos mate_back mappából (vagy a BACKEND_DIR mappából): php artisan serve;
//    ha a 8000-es portot más program foglalja, a következő szabad portot használja.
// 3. Elindítja az Angular fejlesztői szervert (ng serve). Ctrl+C mindkettőt leállítja.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createServer } from 'node:net';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let target = process.env.API_TARGET || 'http://127.0.0.1:8000';
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

/** Szabad-e a port 127.0.0.1-en (ha nem, más program foglalja). */
function portFree(port) {
  return new Promise((ok) => {
    const srv = createServer().once('error', () => ok(false)).once('listening', () => srv.close(() => ok(true)));
    srv.listen(port, '127.0.0.1');
  });
}

async function startBackend() {
  if (!existsSync(join(backendDir, 'artisan'))) {
    say(`Nem találom a backend mappáját (${backendDir}).`);
    say('Indítsd el kézzel a mate_back mappában: php artisan serve – vagy add meg: BACKEND_DIR=/út/a/mate_back npm start');
    return;
  }
  // Ha a kért port foglalt (más program), a következő szabad portot használjuk, és arra irányítjuk a frontendet.
  let { port } = new URL(target);
  port = Number(port || 80);
  while (!(await portFree(port)) && port < 8100) port++;
  target = `http://127.0.0.1:${port}`;
  say(`Elindítom a backendet: ${backendDir} → php artisan serve --host=127.0.0.1 --port=${port}`);
  run('php', ['artisan', 'serve', '--host=127.0.0.1', `--port=${port}`], backendDir, 'A Laravel');
  let state = 'down';
  for (let i = 0; i < 30 && (state = await health()) !== 'ok'; i++) await new Promise((r) => setTimeout(r, 500));
  say(state === 'ok' ? `A backend fut: ${target}` : 'A backend nem válaszol. Nézd meg a fenti Laravel-hibát (pl. .env, adatbázis, php artisan migrate).');
}

function run(cmd, args, cwd, label, env = process.env) {
  const child = spawn(cmd, args, { cwd, stdio: 'inherit', env, shell: process.platform === 'win32' });
  child.on('exit', (code) => { if (code) say(`${label} leállt (${code}).`); });
  children.push(child);
  return child;
}

const stopAll = () => { children.forEach((c) => c.kill('SIGINT')); process.exit(0); };
process.on('SIGINT', stopAll);
process.on('SIGTERM', stopAll);

const state = await health();
if (state === 'ok') {
  say(`A backend már fut: ${target}`);
} else {
  if (state === 'other') say(`A ${target} címen más program válaszol (nem ez a Laravel), ezért másik portot keresek.`);
  await startBackend();
}
say(`Frontend: http://localhost:4200  →  az /api hívások ide mennek: ${target}`);

run(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['ng', 'serve', ...process.argv.slice(2)], root, 'Az Angular', { ...process.env, API_TARGET: target });
