import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, OnDestroy, PLATFORM_ID, afterNextRender, inject, input } from '@angular/core';
import { ScrollService } from './scroll.service';

/**
 * Finom, görgetéshez kötött mélységhatás (nem egérhez kötött).
 * `appParallax="0.08"`: ennyiszer a görgetés mértékével mozdul el függőlegesen. Csak asztali méreten és ha a látogató nem kért csökkentett mozgást.
 */
@Directive({ selector: '[appParallax]' })
export class Parallax implements OnDestroy {
  readonly appParallax = input(0.08, { transform: (v: string | number) => Number(v) || 0 });

  private readonly el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
  private readonly scroll = inject(ScrollService);
  private off?: () => void;

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    afterNextRender(() => {
      if (this.scroll.reducedMotion || !window.matchMedia('(min-width: 961px)').matches) return;
      this.el.style.willChange = 'transform';
      this.off = this.scroll.onScroll((y) => {
        // Csak a hajtás közelében számol: lent, a szakaszon kívül nincs mit mozgatni.
        if (y > window.innerHeight * 1.5) return;
        this.el.style.transform = `translate3d(0, ${(y * this.appParallax()).toFixed(1)}px, 0)`;
      });
    });
  }

  ngOnDestroy(): void {
    this.off?.();
  }
}
