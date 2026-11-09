import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, ElementRef, PLATFORM_ID, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HOME } from '../content/ui';
import { ScrollService } from '../motion/scroll.service';
import { SiteService } from '../services/site.service';
import type { NightGlobe } from './night-globe';

/**
 * Nyitó szakasz: éjszakai Föld. Görgetésre a teljes világtérkép kivilágított földgömbbé formálódik.
 * A szövegek a régi oldaléi (SEO); a rajzoló külön töltődik be a böngészőben, a HTML-t nem nehezíti.
 */
@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
})
export class Hero {
  protected readonly site = inject(SiteService);
  protected readonly home = computed(() => HOME[this.site.lang()]);
  /** A szakasz végiggörgetett része (0..1); CSS-ből is olvasható (--p). */
  protected readonly progress = signal(0);

  private readonly heroEl = viewChild.required<ElementRef<HTMLElement>>('heroEl');
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly scroll = inject(ScrollService);

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    const destroyRef = inject(DestroyRef);
    afterNextRender(async () => {
      const { NightGlobe } = await import('./night-globe');
      const globe: NightGlobe = new NightGlobe(this.canvas().nativeElement, !this.scroll.reducedMotion);
      const hero = this.heroEl().nativeElement;

      const update = () => {
        const r = hero.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
        this.progress.set(+p.toFixed(3));
        globe.progress = this.scroll.reducedMotion ? 0 : Math.min(1, p / 0.75);
      };
      update();
      const off = this.scroll.onScroll(update);
      const onResize = () => globe.resize();
      addEventListener('resize', onResize, { passive: true });
      // Csak akkor rajzol, ha a szakasz látszik (akkumulátor, processzor).
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? globe.start() : globe.stop()));
      io.observe(hero);
      destroyRef.onDestroy(() => { off(); io.disconnect(); globe.stop(); removeEventListener('resize', onResize); });
    });
  }
}
