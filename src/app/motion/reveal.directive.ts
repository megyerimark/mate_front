import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, OnDestroy, PLATFORM_ID, afterNextRender, inject, input } from '@angular/core';
import { ScrollService } from './scroll.service';

let observer: IntersectionObserver | undefined;
const pending = new WeakMap<Element, () => void>();

/** Egy közös IntersectionObserver minden beúszó elemnek (kevesebb memória, mint elemenként egy). */
function observe(el: Element, onEnter: () => void): void {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        observer!.unobserve(e.target);
        pending.get(e.target)?.();
        pending.delete(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  pending.set(el, onEnter);
  observer.observe(el);
}

/**
 * Beúszás görgetéskor, egyszer.
 * `appReveal="up"` (alapértelmezés), `"clip"` (alulról kinyíló maszk), `"fade"`, `"scale"`.
 * `revealDelay`: ms, lépcsőzetes megjelenéshez. A már látható elemeket nem rejti el (nincs villanás, nincs layout shift).
 */
@Directive({ selector: '[appReveal]' })
export class Reveal implements OnDestroy {
  readonly appReveal = input<'up' | 'clip' | 'fade' | 'scale' | ''>('up');
  readonly revealDelay = input(0);

  private readonly el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
  private readonly scroll = inject(ScrollService);

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    afterNextRender(() => {
      if (this.scroll.reducedMotion || !('IntersectionObserver' in window)) return;
      // Ami már a képernyőn van, az marad, ahogy van.
      if (this.el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      const kind = this.appReveal() || 'up';
      this.el.classList.add('rv', `rv-${kind}`);
      this.el.style.setProperty('--rv-delay', `${this.revealDelay()}ms`);
      observe(this.el, () => this.el.classList.add('rv-in'));
    });
  }

  ngOnDestroy(): void {
    observer?.unobserve(this.el);
    pending.delete(this.el);
  }
}
