import { DOCUMENT } from '@angular/common';
import { Component, HostListener, computed, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PageKey } from '../content/types';
import { CONTACT, UI } from '../content/ui';
import { ScrollService } from '../motion/scroll.service';
import { SiteService } from '../services/site.service';

type NavKey = keyof typeof UI.hu.nav;

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    @let ui = site.ui();
    <header class="site-header" [class.scrolled]="scrolled()" [class.menu-open]="open()">
      <div class="topbar">
        <div class="container topbar-inner">
          <a [href]="'mailto:' + contact.email">{{ contact.email }}</a>
          <a [href]="contact.phoneHref">{{ contact.phone }}</a>
        </div>
      </div>
      <div class="container header-inner">
        <a [routerLink]="site.link('home')" class="logo" [attr.aria-label]="'DONE Translations – ' + ui.nav.services" (click)="close()">
          <span class="logo-mark" aria-hidden="true">✓</span>
          <span>Done<strong>Translations</strong></span>
        </a>
        <nav class="nav" id="nav" [class.open]="open()" [attr.aria-label]="ui.menu">
          @for (group of groups; track group.label) {
            <div class="nav-group">
              <button type="button" class="nav-group-btn" [attr.aria-expanded]="openGroup() === group.label"
                (click)="toggleGroup(group.label)">{{ ui.nav[group.label] }} <span aria-hidden="true">▾</span></button>
              <div class="nav-dropdown" [class.show]="openGroup() === group.label">
                @for (key of group.items; track key) {
                  <a [routerLink]="site.link(key)" routerLinkActive="active" (click)="close()">{{ ui.nav[key] }}</a>
                }
              </div>
            </div>
          }
          @for (key of links; track key) {
            <a class="nav-link" [routerLink]="site.link(key)" routerLinkActive="active" (click)="close()">{{ ui.nav[key] }}</a>
          }
          <a class="lang-switch" [routerLink]="site.alternate()" [attr.hreflang]="site.lang() === 'hu' ? 'en' : 'hu'"
            [attr.lang]="site.lang() === 'hu' ? 'en' : 'hu'" (click)="close()">{{ ui.otherLangLabel }}</a>
          <a class="btn btn-sm" [routerLink]="site.link('quote')" (click)="close()">{{ ui.nav.contact }}</a>
          <div class="menu-contact">
            <a [href]="contact.phoneHref">{{ contact.phone }}</a>
            <a [href]="'mailto:' + contact.email">{{ contact.email }}</a>
          </div>
        </nav>
        <button class="nav-toggle" [attr.aria-label]="ui.menu" aria-controls="nav" [attr.aria-expanded]="open()" (click)="open.set(!open())">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="scroll-progress" aria-hidden="true" [style.--p]="scroll.progress()"></div>
    </header>
  `,
})
export class Header {
  protected readonly site = inject(SiteService);
  protected readonly contact = CONTACT;
  protected readonly open = signal(false);
  protected readonly openGroup = signal<string | null>(null);
  protected readonly scroll = inject(ScrollService);
  protected readonly scrolled = computed(() => this.scroll.y() > 40);

  // A régi oldal menüje: Szolgáltatások, Szakterületek, majd Árak, Rólunk, Nyelvek, Karrier.
  protected readonly groups: { label: NavKey; items: (PageKey & NavKey)[] }[] = [
    { label: 'services', items: ['translation', 'proofreading', 'postEditing', 'interpreting'] },
    { label: 'fields', items: ['technical', 'financial', 'legal', 'medical', 'marketing'] },
  ];
  protected readonly links: (PageKey & NavKey)[] = ['prices', 'about', 'languages', 'careers'];

  constructor() {
    // Nyitott mobilmenünél a háttér ne görögjön.
    const body = inject(DOCUMENT).body;
    effect(() => body.classList.toggle('no-scroll', this.open()));
  }

  @HostListener('document:keydown.escape')
  protected close(): void {
    this.open.set(false);
    this.openGroup.set(null);
  }

  protected toggleGroup(label: string): void {
    this.openGroup.set(this.openGroup() === label ? null : label);
  }
}
