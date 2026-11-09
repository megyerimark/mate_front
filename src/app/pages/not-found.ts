import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    @let t = site.ui().notFound;
    <section class="section center thank-you">
      <div class="container narrow">
        <p class="kicker center-kicker">404</p>
        <h1>{{ t.heading }}</h1>
        <p class="lead">{{ t.text }}</p>
        <a [routerLink]="site.link('home')" class="btn btn-lg">{{ t.back }}</a>
      </div>
    </section>
  `,
})
export class NotFound {
  protected readonly site = inject(SiteService);
}
