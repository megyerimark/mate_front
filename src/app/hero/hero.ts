import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HOME } from '../content/ui';
import { Parallax } from '../motion/parallax.directive';
import { SiteService } from '../services/site.service';

/**
 * Nyitó szakasz: a régi oldal szövegei (SEO), rétegzett fotókompozíció.
 * Mozgás: belépő animáció (CSS) és finom, görgetéshez kötött parallax; egérre nem reagál.
 */
@Component({
  selector: 'app-hero',
  imports: [RouterLink, Parallax],
  templateUrl: './hero.html',
})
export class Hero {
  protected readonly site = inject(SiteService);
  protected readonly home = computed(() => HOME[this.site.lang()]);
}
