import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT, HOME } from '../content/ui';
import { SiteService } from '../services/site.service';

/** Sikeres beküldés: rajzolódó pipa, személyes megszólítás (ha az űrlapról jön), és mi történik ezután (a lépések valódi szövege). */
@Component({
  selector: 'app-thank-you',
  imports: [RouterLink],
  template: `
    @let t = site.ui().thanks;
    <section class="thank-you">
      <div class="container ty-grid">
        <div class="ty-main">
          <svg class="ty-check" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="54" pathLength="1" />
            <path d="M38 62 l15 15 l30 -34" pathLength="1" />
          </svg>
          <h1>{{ t.heading }}</h1>
          @if (name()) { <p class="ty-name">{{ site.lang() === 'hu' ? 'Kedves ' + name() + '!' : 'Dear ' + name() + ',' }}</p> }
          <p class="lead">{{ t.text }} <a [href]="contact.phoneHref">{{ contact.phone }}</a></p>
          <a [routerLink]="site.link('home')" class="btn btn-lg btn-arrow">{{ t.back }} <span class="btn-arrow-icon" aria-hidden="true">→</span></a>
        </div>
        <ol class="ty-next" [attr.aria-label]="steps().heading">
          <li class="ty-next-head">{{ steps().heading }}</li>
          @for (s of steps().items; track $index; let i = $index) {
            <li [class.done]="i === 0"><span>{{ i === 0 ? '✓' : i + 1 }}</span><p>{{ s }}</p></li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class ThankYou {
  protected readonly site = inject(SiteService);
  protected readonly contact = CONTACT;
  /** Az űrlap a navigáció „state”-jében adja át a keresztnevet (nem kerül az URL-be). */
  protected readonly name = signal<string>('');
  protected readonly steps = computed(() => {
    const h = HOME[this.site.lang()];
    return { heading: h.stepsHeading, items: h.steps.map((s) => s.text.join(' ')) };
  });

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      const state = history.state as { name?: unknown } | null;
      if (typeof state?.name === 'string') this.name.set(state.name.slice(0, 60));
    }
  }
}
