import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT } from '../content/ui';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-thank-you',
  imports: [RouterLink],
  template: `
    @let t = site.ui().thanks;
    <section class="section center thank-you">
      <div class="container narrow">
        <div class="logo-mark big" aria-hidden="true">✓</div>
        <h1>{{ t.heading }}</h1>
        <p class="lead">{{ t.text }} <a [href]="contact.phoneHref">{{ contact.phone }}</a></p>
        <a [routerLink]="site.link('home')" class="btn btn-lg">{{ t.back }}</a>
      </div>
    </section>
  `,
})
export class ThankYou {
  protected readonly site = inject(SiteService);
  protected readonly contact = CONTACT;
}
