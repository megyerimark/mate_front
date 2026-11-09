import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HOME } from '../content/ui';
import { SiteService } from '../services/site.service';

/** Nyitó szakasz: a régi oldal szövegei (SEO) és a csapat fotója. Egérre nem reagál. */
@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
})
export class Hero {
  protected readonly site = inject(SiteService);
  protected readonly home = computed(() => HOME[this.site.lang()]);
}
