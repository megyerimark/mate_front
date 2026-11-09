import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../components/icon';
import { LanguageWorld } from '../components/language-world';
import { QuoteSection } from '../components/quote-section';
import { HOME, HOME_EXTRA, PAGES, UI } from '../content/ui';
import { Hero } from '../hero/hero';
import { Reveal } from '../motion/reveal.directive';
import { SiteService } from '../services/site.service';
import { MARQUEE } from '../site.config';

@Component({
  selector: 'app-home',
  imports: [RouterLink, QuoteSection, Hero, Icon, Reveal, LanguageWorld],
  templateUrl: './home.html',
})
export class Home {
  private readonly host = inject(ElementRef<HTMLElement>);
  protected readonly site = inject(SiteService);
  protected readonly home = computed(() => HOME[this.site.lang()]);
  protected readonly extra = computed(() => HOME_EXTRA[this.site.lang()]);
  protected readonly marquee = computed(() => MARQUEE[this.site.lang()]);
  /** A tolmácsolás típusai (az űrlap választható értékei). */
  protected readonly interpretingTypes = computed(() => Object.values(UI[this.site.lang()].form.interpretingTypes).slice(0, 4));
  /** Az épp a képernyő közepén lévő lépés (sticky storytelling). */
  protected readonly activeStep = signal(0);
  /** „Szakfordítás 3,0 Ft/karakter ártól…”, az Árak oldal kiemelt mondata. */
  protected readonly priceHighlight = computed(() => {
    const block = PAGES[this.site.lang()].prices.blocks.find((b) => b.kind === 'price');
    return block && block.kind === 'price' ? block.highlight : '';
  });

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const cleanup = this.animate();
      destroyRef.onDestroy(cleanup);
    });
  }

  /** A számlálók akkor pörögnek fel, amikor a képernyőre érnek (a beúszást a közös Reveal direktíva végzi). */
  private animate(): () => void {
    const root: HTMLElement = this.host.nativeElement;
    if (!('IntersectionObserver' in window)) return () => {};

    // Lépések: amelyik a képernyő középső sávjába ér, az az aktív (csökkentett mozgásnál is, ez nem díszítés).
    const steps = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) this.activeStep.set(Number((e.target as HTMLElement).dataset['step']));
    }, { rootMargin: '-45% 0px -45% 0px' });
    root.querySelectorAll<HTMLElement>('[data-step]').forEach((el) => steps.observe(el));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => steps.disconnect();

    // Számlálók: akkor pörögnek fel, amikor a képernyőre érnek.
    const fmt = new Intl.NumberFormat(this.site.lang() === 'hu' ? 'hu-HU' : 'en-GB');
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        this.count(entry.target as HTMLElement, fmt);
      }
    });
    root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => io.observe(el));
    return () => { io.disconnect(); steps.disconnect(); };
  }

  private count(el: HTMLElement, fmt: Intl.NumberFormat): void {
    const target = Number(el.dataset['count']);
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / 1600, 1);
      el.textContent = fmt.format(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  protected format(n: number): string {
    return new Intl.NumberFormat(this.site.lang() === 'hu' ? 'hu-HU' : 'en-GB').format(n);
  }
}
