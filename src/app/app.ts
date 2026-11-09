import { ViewportScroller } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { SiteService } from './services/site.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    @if (!isAdmin()) {
      <a class="skip-link" href="#tartalom">{{ site.ui().skipToContent }}</a>
      @if (site.key() === 'home') {
        <div class="intro" aria-hidden="true">
          <div class="intro-logo"><span class="logo-mark">✓</span> Done<strong>Translations</strong></div>
        </div>
      }
      <app-header />
      <main id="tartalom"><router-outlet /></main>
      <app-footer />
    } @else {
      <router-outlet />
    }
  `,
})
export class App {
  protected readonly site = inject(SiteService);
  /** Az admin oldalakon nincs nyilvános fejléc és lábléc. */
  protected readonly isAdmin = computed(() => this.site.key() === 'admin');

  constructor() {
    // A ragadós fejléc ne takarja ki a horgonnyal elért szakasz tetejét.
    inject(ViewportScroller).setOffset([0, 90]);
  }
}
