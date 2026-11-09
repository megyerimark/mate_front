import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../components/icon';
import { QuoteForm } from '../components/quote-form';
import { QuoteSection } from '../components/quote-section';
import { PageKey } from '../content/types';
import { CONTACT, PAGES } from '../content/ui';
import { SiteService } from '../services/site.service';

/** Egy szolgáltatás- vagy információs oldal a tartalomfájl blokkjaiból. */
@Component({
  selector: 'app-content-page',
  imports: [RouterLink, Icon, QuoteForm, QuoteSection],
  templateUrl: './content-page.html',
})
export class ContentPage {
  protected readonly site = inject(SiteService);
  protected readonly contact = CONTACT;
  protected readonly page = computed(() => {
    const key = this.site.key() as Exclude<PageKey, 'home' | 'thanks'>;
    return PAGES[this.site.lang()][key];
  });
}
