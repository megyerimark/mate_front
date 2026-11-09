import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, NgZone, PLATFORM_ID, inject, signal } from '@angular/core';

/**
 * Egyetlen, passzív görgetésfigyelő az egész oldalnak (requestAnimationFrame-mel ritkítva).
 * A fejléc, a folyamatjelző és a parallax mind ebből olvas, így nem fut több külön figyelő.
 */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  /** Görgetési pozíció px-ben. */
  readonly y = signal(0);
  /** Az oldal mekkora része van már végiggörgetve (0..1). */
  readonly progress = signal(0);
  /** Ha a látogató csökkentett mozgást kért, a díszítő mozgás elmarad. */
  readonly reducedMotion: boolean;

  private readonly listeners = new Set<(y: number) => void>();

  constructor() {
    const doc = inject(DOCUMENT);
    const browser = isPlatformBrowser(inject(PLATFORM_ID));
    const win = doc.defaultView;
    this.reducedMotion = !!(browser && win?.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (!browser || !win) return;

    let queued = false;
    const update = () => {
      queued = false;
      const y = win.scrollY;
      const max = doc.documentElement.scrollHeight - win.innerHeight;
      this.y.set(y);
      this.progress.set(max > 0 ? Math.min(y / max, 1) : 0);
      this.listeners.forEach((fn) => fn(y));
    };
    inject(NgZone).runOutsideAngular(() => {
      win.addEventListener('scroll', () => {
        if (!queued) {
          queued = true;
          win.requestAnimationFrame(update);
        }
      }, { passive: true });
      win.addEventListener('resize', update, { passive: true });
    });
    update();
  }

  /** Képkockánként egyszer hívódik görgetéskor; a visszaadott függvénnyel leiratkozható. */
  onScroll(fn: (y: number) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
}
