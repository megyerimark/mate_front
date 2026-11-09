import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, ElementRef, PLATFORM_ID, afterNextRender, computed, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HOME } from '../content/ui';
import { ScrollService } from '../motion/scroll.service';
import { SiteService } from '../services/site.service';
import type { NightGlobe } from './night-globe';

/**
 * Nyitó szakasz: éjszakai világtérkép a városok fényeivel és Miskolcról induló, folyamatosan pulzáló ívekkel.
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
      // A vászon saját méretét figyeli (ablakméret, mobil elforgatás, rejtett → látható is).
      const ro = new ResizeObserver(() => globe.resize());
      ro.observe(this.canvas().nativeElement);
      // Csak akkor rajzol, ha a szakasz látszik (akkumulátor, processzor).
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? globe.start() : globe.stop()));
      io.observe(hero);
      destroyRef.onDestroy(() => { io.disconnect(); ro.disconnect(); globe.stop(); });
    });
  }
}
