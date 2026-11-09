import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT } from '../content/ui';
import { SiteService } from '../services/site.service';
import { Icon } from './icon';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Icon],
  template: `
    @let ui = site.ui();
    <footer class="site-footer">
      <div class="container footer-inner">
        <div>
          <a [routerLink]="site.link('home')" class="logo">
            <span class="logo-mark" aria-hidden="true">✓</span>
            <span>Done<strong>Translations</strong></span>
          </a>
          <p>{{ ui.footer.tagline }}</p>
        </div>
        <div>
          <p class="footer-heading">{{ ui.footer.services }}</p>
          <p>
            <a [routerLink]="site.link('translation')">{{ ui.nav.translation }}</a><br />
            <a [routerLink]="site.link('proofreading')">{{ ui.nav.proofreading }}</a><br />
            <a [routerLink]="site.link('postEditing')">{{ ui.footer.postEditing }}</a><br />
            <a [routerLink]="site.link('interpreting')">{{ ui.nav.interpreting }}</a>
          </p>
        </div>
        <div>
          <p class="footer-heading">{{ ui.footer.info }}</p>
          <p>
            <a [routerLink]="site.link('privacy')">{{ ui.footer.privacy }}</a><br />
            <a [routerLink]="site.link('cookies')">{{ ui.footer.cookies }}</a><br />
            <a [routerLink]="site.link('imprint')">{{ ui.footer.imprint }}</a>
          </p>
        </div>
        <div>
          <p class="footer-heading">{{ ui.footer.contact }}</p>
          <p>
            <a [href]="'mailto:' + contact.email">{{ contact.email }}</a><br />
            <a [href]="contact.phoneHref">{{ contact.phone }}</a>
          </p>
        </div>
      </div>
      <div class="container copyright">© {{ year }} DONE Translations · {{ contact.company }} · {{ contact.address }}</div>
    </footer>

    <!-- Mobilon mindig látható gyorsgombok -->
    <div class="mobile-bar">
      <a [href]="contact.phoneHref"><app-icon name="phone" /> {{ ui.call }}</a>
      <a [routerLink]="site.link('quote')" class="primary">{{ ui.freeQuote }}</a>
    </div>
  `,
})
export class Footer {
  protected readonly site = inject(SiteService);
  protected readonly contact = CONTACT;
  protected readonly year = new Date().getFullYear();
}
