import { LAND } from '../content/languages-world';
import { CITIES } from './cities';

/**
 * Éjszakai világtérkép vásznon (canvas 2D, könyvtár nélkül): a városok fényei aranyban izzanak, Miskolcról
 * folyamatosan ívek indulnak a világba, Miskolc pulzál. Csak a böngészőben fut.
 * (A gömbbé formálódás – progress > 0 – megmaradt a kódban, de a nyitóképernyő nem használja.)
 */
const RAD = Math.PI / 180;
const HOME: [number, number] = [48.1, 20.8];
const TARGETS: [number, number][] = [[51.5, -0.1], [48.9, 2.35], [52.5, 13.4], [40.4, -3.7], [41.9, 12.5], [55.8, 37.6], [35.7, 139.7], [39.9, 116.4], [28.6, 77.2], [40.7, -74], [-23.5, -46.6], [-26.2, 28], [-33.9, 151.2], [25.2, 55.3], [30, 31.2], [19.4, -99.1], [1.35, 103.8], [37.6, 127], [59.3, 18.1], [41, 29]];

interface P { x: number; y: number; z: number }
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export class NightGlobe {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly land: [number, number][] = [];
  private lights: [number, number, number, number][] = [];
  private readonly stars: [number, number, number, number][] = [];
  private readonly glow: HTMLCanvasElement;
  private W = 0; private H = 0; private mobile = false;
  private spin = 0; private last = 0; private raf = 0; private running = false;
  /** 0 = lapos térkép, 1 = földgömb */
  progress = 0;

  constructor(private readonly canvas: HTMLCanvasElement, private readonly animate: boolean) {
    this.ctx = canvas.getContext('2d')!;
    const bytes = Uint8Array.from(atob(LAND.mask), (c) => c.charCodeAt(0));
    for (let r = 0; r < LAND.rows; r++) for (let c = 0; c < LAND.cols; c++) {
      const i = r * LAND.cols + c;
      if (bytes[i >> 3] & (0x80 >> (i & 7))) this.land.push([LAND.latTop - r * LAND.step, -180 + c * LAND.step + 1]);
    }
    let seed = 11;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 140; i++) this.stars.push([rnd(), rnd(), rnd() * 0.9 + 0.2, rnd()]);
    this.glow = document.createElement('canvas');
    this.glow.width = this.glow.height = 48;
    const g = this.glow.getContext('2d')!, gr = g.createRadialGradient(24, 24, 0, 24, 24, 24);
    gr.addColorStop(0, 'rgba(255,205,120,.55)'); gr.addColorStop(0.35, 'rgba(255,180,80,.18)'); gr.addColorStop(1, 'rgba(255,170,60,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 48, 48);
    this.resize();
  }

  resize(): void {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    this.W = this.canvas.clientWidth; this.H = this.canvas.clientHeight; this.mobile = this.W < 900;
    if (this.W < 10 || this.H < 10) return;
    this.canvas.width = this.W * dpr; this.canvas.height = this.H * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // városfények: a város köré szórt fénypontok (mobilon kevesebb)
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const gauss = () => Math.sqrt(-2 * Math.log(rnd() + 1e-9)) * Math.cos(2 * Math.PI * rnd());
    const per = this.mobile ? 7 : 22;
    this.lights = [];
    for (const [la, lo, w] of CITIES) {
      const n = Math.round(per * w);
      for (let k = 0; k < n; k++) {
        this.lights.push([la + gauss() * 0.9 * Math.sqrt(w), lo + gauss() * 1.2 * Math.sqrt(w), Math.max(0.15, 1 - Math.abs(gauss()) * 0.35), k < 3 ? 1 : 0]);
      }
    }
    if (!this.running) this.draw(performance.now());
  }

  start(): void {
    if (this.running || !this.animate) { this.draw(performance.now()); return; }
    this.running = true; this.last = performance.now();
    const loop = (t: number) => { if (!this.running) return; this.draw(t); this.raf = requestAnimationFrame(loop); };
    this.raf = requestAnimationFrame(loop);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private geo() {
    const { W, H, mobile } = this, short = H < 700;
    const fw = mobile ? W * 1.02 : Math.min(W * 0.7, H * 1.75);
    return {
      fw, fh: fw / 2.3,
      fcx: mobile ? W / 2 : W * 0.62, fcy: mobile ? H * (short ? 0.24 : 0.27) : H * 0.5,
      R: mobile ? Math.min(W * 0.36, H * (short ? 0.105 : 0.15)) : Math.min(H * 0.38, W * 0.26),
      gcx: mobile ? W / 2 : W * 0.7, gcy: mobile ? H * (short ? 0.235 : 0.29) : H * 0.52,
    };
  }

  private place(G: ReturnType<NightGlobe['geo']>, lat: number, lon: number, m: number, alt = 0): P {
    let fx = G.fcx + (lon / 180) * G.fw / 2;
    const fy = G.fcy - (lat / 85) * G.fh / 2 - alt * 60;
    fx = G.fcx + (fx - G.fcx) * (1 - ((G.fcy - fy) / G.fh) * 0.12);
    const lam = (lon - 20 - this.spin) * RAD, phi = lat * RAD, tx = 38 * RAD;
    const x = Math.cos(phi) * Math.sin(lam), y = Math.sin(phi), z = Math.cos(phi) * Math.cos(lam);
    const y2 = y * Math.cos(tx) - z * Math.sin(tx), z2 = y * Math.sin(tx) + z * Math.cos(tx);
    const rr = G.R * (1 + alt), e = ease(m);
    return { x: lerp(fx, G.gcx + x * rr, e), y: lerp(fy, G.gcy - y2 * rr, e), z: lerp(1, z2, e) };
  }

  private arc(G: ReturnType<NightGlobe['geo']>, a: [number, number], b: [number, number], m: number, n = 40): P[] {
    const [la1, lo1] = [a[0] * RAD, a[1] * RAD], [la2, lo2] = [b[0] * RAD, b[1] * RAD];
    const v1 = [Math.cos(la1) * Math.cos(lo1), Math.cos(la1) * Math.sin(lo1), Math.sin(la1)];
    const v2 = [Math.cos(la2) * Math.cos(lo2), Math.cos(la2) * Math.sin(lo2), Math.sin(la2)];
    const d = Math.acos(Math.min(1, v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2])) || 1e-6;
    const out: P[] = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, s1 = Math.sin((1 - t) * d) / Math.sin(d), s2 = Math.sin(t * d) / Math.sin(d);
      const v = [s1 * v1[0] + s2 * v2[0], s1 * v1[1] + s2 * v2[1], s1 * v1[2] + s2 * v2[2]];
      out.push(this.place(G, Math.asin(v[2]) / RAD, Math.atan2(v[1], v[0]) / RAD, m, Math.sin(Math.PI * t) * (0.08 + d * 0.12)));
    }
    return out;
  }

  private draw(now: number): void {
    const { ctx, W, H, mobile } = this;
    // Rejtett vagy épp átméretezett vászon (0 széles): nincs mit rajzolni, és a számítás nullával osztana.
    if (W < 10 || H < 10) return;
    const dt = Math.min(64, now - this.last); this.last = now;
    const m = this.progress, G = this.geo(), e = ease(m);
    if (this.animate) this.spin += dt * 0.004 * (0.15 + m);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, W, H);

    for (const [sx, sy, s, tw] of this.stars) {
      ctx.fillStyle = `rgba(230,225,210,${(0.15 + 0.25 * Math.abs(Math.sin(now * 0.0006 + tw * 9))) * 0.6})`;
      ctx.fillRect(sx * W, sy * H, s, s);
    }

    if (m > 0.02) {
      const halo = ctx.createRadialGradient(G.gcx, G.gcy, G.R * 0.95, G.gcx, G.gcy, G.R * 1.35);
      halo.addColorStop(0, `rgba(170,190,225,${0.16 * e})`); halo.addColorStop(0.35, `rgba(194,155,74,${0.06 * e})`); halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(G.gcx, G.gcy, G.R * 1.35, 0, Math.PI * 2); ctx.fill();
      const body = ctx.createRadialGradient(G.gcx + G.R * 0.3, G.gcy + G.R * 0.35, G.R * 0.2, G.gcx, G.gcy, G.R);
      body.addColorStop(0, `rgba(6,7,10,${e})`); body.addColorStop(0.85, `rgba(10,12,18,${e})`); body.addColorStop(1, `rgba(40,52,72,${e})`);
      ctx.fillStyle = body; ctx.beginPath(); ctx.arc(G.gcx, G.gcy, G.R, 0, Math.PI * 2); ctx.fill();
      const rim = ctx.createLinearGradient(G.gcx - G.R, G.gcy - G.R, G.gcx + G.R, G.gcy + G.R);
      rim.addColorStop(0, `rgba(215,228,250,${0.7 * e})`); rim.addColorStop(0.6, `rgba(160,180,215,${0.18 * e})`); rim.addColorStop(1, 'rgba(160,180,215,0)');
      ctx.strokeStyle = rim; ctx.lineWidth = 1.5; ctx.shadowColor = `rgba(190,210,245,${0.6 * e})`; ctx.shadowBlur = 22;
      ctx.beginPath(); ctx.arc(G.gcx, G.gcy, G.R + 0.5, 0, Math.PI * 2); ctx.stroke(); ctx.shadowBlur = 0;
    }

    // Szárazföld: halvány; fényerő szerint csoportosítva, csoportonként egy rajzolás
    const ds = mobile ? 1.3 : 1.6, LB = 6, lb: number[][] = Array.from({ length: LB }, () => []);
    for (const [lat, lon] of this.land) {
      const p = this.place(G, lat, lon, m); if (p.z < 0) continue;
      lb[Math.min(LB - 1, Math.floor(Math.min(1, p.z * 2) * LB))].push(p.x - ds / 2, p.y - ds / 2);
    }
    for (let k = 0; k < LB; k++) {
      if (!lb[k].length) continue;
      ctx.fillStyle = `rgba(190,196,206,${(0.13 + (0.12 * (k + 0.5)) / LB).toFixed(3)})`; ctx.beginPath();
      const a = lb[k]; for (let i = 0; i < a.length; i += 2) ctx.rect(a[i], a[i + 1], ds, ds);
      ctx.fill();
    }

    // Városfények (additív keverés: a sűrű helyek felizzanak)
    ctx.globalCompositeOperation = 'lighter';
    const flick = now * 0.002, QB = 8, qb: number[][] = Array.from({ length: QB }, () => []), gs = mobile ? 11 : 24;
    for (let i = 0; i < this.lights.length; i++) {
      const [lat, lon, br, core] = this.lights[i], p = this.place(G, lat, lon, m);
      if (p.z < 0.02) continue;
      const a = br * Math.min(1, p.z * 3) * (0.85 + 0.15 * Math.sin(flick + i * 0.7));
      if (core) { ctx.globalAlpha = a; ctx.drawImage(this.glow, p.x - gs / 2, p.y - gs / 2, gs, gs); ctx.globalAlpha = 1; }
      qb[Math.min(QB - 1, Math.floor(a * QB))].push(p.x, p.y, core);
    }
    for (let k = 0; k < QB; k++) {
      const b = qb[k]; if (!b.length) continue;
      const a = (k + 0.5) / QB;
      ctx.fillStyle = `rgba(255,${Math.round(195 + 45 * a)},${Math.round(115 + 75 * a)},${(0.7 * a).toFixed(3)})`; ctx.beginPath();
      for (let i = 0; i < b.length; i += 3) { const sz = b[i + 2] ? 1.8 : 1.15; ctx.rect(b[i] - sz / 2, b[i + 1] - sz / 2, sz, sz); }
      ctx.fill();
    }

    // Ívek Miskolcról
    const cycle = 4200;
    ctx.lineCap = 'round'; ctx.lineWidth = mobile ? 1 : 1.3;
    TARGETS.forEach((t, i) => {
      const arc = this.arc(G, HOME, t, m);
      const ph = this.animate ? ((now + i * 260) % cycle) / cycle : 0.6;
      const head = Math.min(1, ph / 0.55), fade = ph > 0.8 ? 1 - (ph - 0.8) / 0.2 : 1, upto = Math.floor(head * (arc.length - 1));
      if (upto > 0) {
        const gr = ctx.createLinearGradient(arc[0].x, arc[0].y, arc[upto].x, arc[upto].y);
        gr.addColorStop(0, `rgba(232,196,118,${0.06 * fade})`); gr.addColorStop(1, `rgba(240,205,130,${0.7 * fade})`);
        ctx.strokeStyle = gr; ctx.beginPath(); let pen = false;
        for (let k = 0; k <= upto; k++) { const q = arc[k]; if (q.z < -0.05) { pen = false; continue; } if (pen) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); pen = true; }
        ctx.stroke();
      }
      const hp = arc[upto];
      if (hp.z > -0.05 && fade > 0 && this.animate) { ctx.globalAlpha = fade; ctx.drawImage(this.glow, hp.x - 9, hp.y - 9, 18, 18); ctx.globalAlpha = 1; }
    });

    // Miskolc
    ctx.globalCompositeOperation = 'source-over';
    const h = this.place(G, HOME[0], HOME[1], m), pulse = (now % 2400) / 2400;
    const hg = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, 16);
    hg.addColorStop(0, 'rgba(255,255,255,.95)'); hg.addColorStop(0.25, 'rgba(255,240,210,.6)'); hg.addColorStop(1, 'rgba(255,220,150,0)');
    ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(h.x, h.y, 16, 0, Math.PI * 2); ctx.fill();
    if (this.animate) {
      ctx.strokeStyle = `rgba(255,235,200,${0.9 * (1 - pulse)})`; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(h.x, h.y, 4 + pulse * 22, 0, Math.PI * 2); ctx.stroke();
    }
  }
}
