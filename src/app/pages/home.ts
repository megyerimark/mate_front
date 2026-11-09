import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../components/icon';
import { QuoteSection } from '../components/quote-section';
import { HOME, HOME_EXTRA, PAGES } from '../content/ui';
import { Hero } from '../hero/hero';
import { SiteService } from '../services/site.service';
import { MARQUEE } from '../site.config';

@Component({
  selector: 'app-home',
  imports: [RouterLink, QuoteSection, Hero, Icon],
  templateUrl: './home.html',
})
export class Home {
  private readonly host = inject(ElementRef<HTMLElement>);
  protected readonly site = inject(SiteService);
  protected readonly home = computed(() => HOME[this.site.lang()]);
  protected readonly extra = computed(() => HOME_EXTRA[this.site.lang()]);
  protected readonly marquee = computed(() => MARQUEE[this.site.lang()]);
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

  /**
   * Visszafogott mozgás: a kártyák egyszer, finoman beúsznak, a számlálók felpörögnek.
   * Semmi nem rögzül a képernyőn és semmi nem a görgetés ütemére mozog.
   */
  private animate(): () => void {
    const root: HTMLElement = this.host.nativeElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return () => {};

    const fmt = new Intl.NumberFormat(this.site.lang() === 'hu' ? 'hu-HU' : 'en-GB');
    const reveal = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    reveal.forEach((el) => el.classList.add('reveal'));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          // Az egy sorban lévő elemek kis késéssel egymás után jelennek meg.
          const siblings = Array.from(el.parentElement?.children ?? []);
          el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 5) * 70}ms`;
          el.classList.add('in');
          el.querySelectorAll<HTMLElement>('[data-count]').forEach((counter) => this.count(counter, fmt));
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    reveal.forEach((el) => io.observe(el));
    return () => io.disconnect();
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
