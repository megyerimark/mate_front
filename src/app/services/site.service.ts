import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { HOME, PAGES, UI } from '../content/ui';
import { Lang, PageKey, SITE_URL, pathFor } from '../content/types';

export type RouteKey = PageKey | 'notFound' | 'admin';

/**
 * Az aktuális oldal és nyelv, és a hozzá tartozó SEO címkék a <head>-ben.
 * Előrendereléskor is lefut, így minden oldal HTML-je a saját címével, leírásával és nyelvi párjaival készül.
 */
@Injectable({ providedIn: 'root' })
export class SiteService {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  readonly lang = signal<Lang>('hu');
  readonly key = signal<RouteKey>('home');
  readonly ui = computed(() => UI[this.lang()]);

  /** Ugyanez az oldal a másik nyelven (a nyelvváltó linkje). */
  readonly alternate = computed(() => {
    const key = this.key();
    const other: Lang = this.lang() === 'hu' ? 'en' : 'hu';
    return key === 'notFound' || key === 'admin' ? pathFor('home', other) : pathFor(key, other);
  });

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      let snap: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
      while (snap.firstChild) snap = snap.firstChild;
      const lang = (snap.data['lang'] as Lang) ?? (this.router.url.startsWith('/en') ? 'en' : 'hu');
      const key = (snap.data['key'] as RouteKey) ?? 'notFound';
      this.lang.set(lang);
      this.key.set(key);
      this.apply(key, lang);
    });
  }

  link(key: PageKey): string {
    return pathFor(key, this.lang());
  }

  private apply(key: RouteKey, lang: Lang): void {
    this.doc.documentElement.lang = lang;
    if (key === 'admin') return;

    const ui = UI[lang];
    let title: string;
    let description: string | null = null;
    let noindex = false;
    if (key === 'home') {
      title = HOME[lang].title;
      description = HOME[lang].description;
    } else if (key === 'thanks') {
      title = ui.thanks.title;
      noindex = true;
    } else if (key === 'notFound') {
      title = ui.notFound.title;
      noindex = true;
    } else {
      const page = PAGES[lang][key];
      title = page.title;
      description = page.description;
    }

    this.title.setTitle(title);
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:locale', content: lang === 'hu' ? 'hu_HU' : 'en_GB' });
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
    } else {
      this.meta.removeTag('name="description"');
      this.meta.removeTag('property="og:description"');
    }
    this.meta.updateTag({
      name: 'robots',
      content: noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    });

    // Kanonikus cím és nyelvi párok (hreflang)
    this.doc.head.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    if (key === 'notFound') return;
    const url = SITE_URL + pathFor(key, lang);
    this.meta.updateTag({ property: 'og:url', content: url });
    this.addLink({ rel: 'canonical', href: url });
    if (key !== 'thanks') {
      this.addLink({ rel: 'alternate', hreflang: 'hu', href: SITE_URL + pathFor(key, 'hu') });
      this.addLink({ rel: 'alternate', hreflang: 'en', href: SITE_URL + pathFor(key, 'en') });
      this.addLink({ rel: 'alternate', hreflang: 'x-default', href: SITE_URL + pathFor(key, 'hu') });
    }
  }

  private addLink(attrs: Record<string, string>): void {
    const link = this.doc.createElement('link');
    for (const [k, v] of Object.entries(attrs)) link.setAttribute(k, v);
    this.doc.head.appendChild(link);
  }
}
