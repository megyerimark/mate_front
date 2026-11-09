import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Reveal } from '../motion/reveal.directive';
import { SiteService } from '../services/site.service';

interface Trust {
  testimonials: { id: number; name: string; company: string | null; role: string | null; text: string; rating: number | null }[];
  partners: { id: number; name: string; url: string | null; logo: string }[];
}

/**
 * Ügyfélvélemények és partnerek – kizárólag az adminban felvitt, publikált, valódi tartalom.
 * Amíg nincs ilyen, a szakasz nem jelenik meg (nincs kitalált vélemény vagy logó).
 */
@Component({
  selector: 'app-trust-section',
  imports: [Reveal],
  template: `
    @if (data(); as d) {
      @if (d.testimonials.length || d.partners.length) {
        <section class="section trust" aria-labelledby="trust-title">
          <div class="container">
            <h2 id="trust-title" class="display">{{ copy().title }}</h2>
            @if (d.testimonials.length) {
              <div class="quotes">
                @for (t of d.testimonials; track t.id; let i = $index) {
                  <figure class="quote-card" [class.wide]="i === 0" appReveal [revealDelay]="i * 90">
                    @if (t.rating) { <p class="stars" [attr.aria-label]="t.rating + '/5'">{{ '★'.repeat(t.rating) }}<span>{{ '★'.repeat(5 - t.rating) }}</span></p> }
                    <blockquote>„{{ t.text }}”</blockquote>
                    <figcaption><b>{{ t.name }}</b>@if (t.role || t.company) { <span>{{ byline(t) }}</span> }</figcaption>
                  </figure>
                }
              </div>
            }
            @if (d.partners.length) {
              <p class="partners-title">{{ copy().partners }}</p>
              <ul class="partners">
                @for (p of d.partners; track p.id) {
                  <li>
                    @if (p.url) {
                      <a [href]="p.url" target="_blank" rel="noopener"><img [src]="p.logo" [alt]="p.name" loading="lazy" decoding="async" /></a>
                    } @else {
                      <img [src]="p.logo" [alt]="p.name" loading="lazy" decoding="async" />
                    }
                  </li>
                }
              </ul>
            }
          </div>
        </section>
      }
    }
  `,
})
export class TrustSection {
  protected readonly site = inject(SiteService);
  protected readonly data = signal<Trust | null>(null);
  protected readonly copy = computed(() =>
    this.site.lang() === 'hu' ? { title: 'Ügyfeleink mondták', partners: 'Partnereink' } : { title: 'What our clients say', partners: 'Our partners' },
  );

  protected byline(t: { role: string | null; company: string | null }): string {
    return [t.role, t.company].filter((v) => !!v).join(', ');
  }

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    inject(HttpClient)
      .get<Trust>(`${environment.apiUrl}/api/trust`, { params: { lang: this.site.lang() } })
      .subscribe({ next: (d) => this.data.set(d), error: () => {} });
  }
}
