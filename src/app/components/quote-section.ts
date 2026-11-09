import { Component, inject, input } from '@angular/core';
import { ServiceKey } from '../content/types';
import { CONTACT } from '../content/ui';
import { SiteService } from '../services/site.service';
import { Icon } from './icon';
import { QuoteForm, QuoteFormMode } from './quote-form';

/** „Kérjen nem kötelező érvényű árajánlatot!” – a régi oldal minden szolgáltatásoldalának alján is ez volt. */
@Component({
  selector: 'app-quote-section',
  imports: [QuoteForm, Icon],
  template: `
    @let ui = site.ui();
    <section class="section section-cta" [id]="ui.quoteAnchor">
      <div class="container form-wrap">
        <div class="form-intro">
          <h2 class="display">{{ ui.quoteHeading }}</h2>
          @for (p of ui.quoteText; track $index) {
            <p>{{ p }}</p>
          }
          <ul class="contact-list">
            <li><span>E-mail</span><a [href]="'mailto:' + contact.email"><app-icon name="mail" />{{ contact.email }}</a></li>
            <li><span>{{ ui.form.phone }}</span><a [href]="contact.phoneHref"><app-icon name="phone" />{{ contact.phone }}</a></li>
          </ul>
        </div>
        <app-quote-form [mode]="mode()" [service]="service()" idPrefix="quote" />
      </div>
    </section>
  `,
})
export class QuoteSection {
  readonly mode = input<QuoteFormMode>('quote');
  readonly service = input<ServiceKey>('translation');
  protected readonly site = inject(SiteService);
  protected readonly contact = CONTACT;
}
