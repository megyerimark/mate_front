import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, isDevMode, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { REGIONS, Region, WORLD_LANGUAGES } from '../content/languages-world';
import { PAGES } from '../content/ui';
import { Reveal } from '../motion/reveal.directive';
import { SiteService } from '../services/site.service';

const COPY = {
  hu: {
    kicker: 'Nyelvek világa',
    title: 'Fordítás 86 nyelvre',
    text: 'Magyarországról a világ minden tájára: európai nyelvektől a távol-keleti, afrikai és klasszikus nyelvekig.',
    languages: 'nyelv',
    all: 'A teljes nyelvlista',
    also: 'a régióban szintén beszélt',
    hint: 'Válasszon régiót',
  },
  en: {
    kicker: 'A world of languages',
    title: 'Translation into 86 languages',
    text: 'From Hungary to every corner of the world: from European languages to Far Eastern, African and classical languages.',
    languages: 'languages',
    all: 'The full list of languages',
    also: 'also widely spoken in the region',
    hint: 'Choose a region',
  },
};

@Component({
  selector: 'app-language-world',
  imports: [RouterLink, Reveal],
  templateUrl: './language-world.html',
})
export class LanguageWorld {
  protected readonly site = inject(SiteService);
  protected readonly copy = computed(() => COPY[this.site.lang()]);
  protected readonly regions = REGIONS;
  protected readonly active = signal<Region>('europe');
  protected readonly total = WORLD_LANGUAGES.length;

  protected readonly regionLangs = computed(() => {
    const lang = this.site.lang();
    const region = this.active();
    const own = WORLD_LANGUAGES.filter((l) => l.region === region);
    const alsoKeys = REGIONS.find((r) => r.key === region)?.also ?? [];
    const also = WORLD_LANGUAGES.filter((l) => alsoKeys.includes(l.hu));
    return { own: own.map((l) => l[lang]), also: also.map((l) => l[lang]), count: own.length + also.length };
  });

  protected readonly counts = computed(() =>
    Object.fromEntries(REGIONS.map((r) => [r.key, WORLD_LANGUAGES.filter((l) => l.region === r.key).length + (r.also?.length ?? 0)])),
  );

  constructor() {
    if (isDevMode() && isPlatformBrowser(inject(PLATFORM_ID))) {
      const block = PAGES.hu.languages.blocks.find((b) => b.kind === 'languages');
      const listed = block?.kind === 'languages' ? block.groups.flat() : [];
      const missing = listed.filter((n) => !WORLD_LANGUAGES.some((l) => l.hu === n));
      if (missing.length || listed.length !== WORLD_LANGUAGES.length) {
        console.warn('A Nyelvek világa térkép nyelvlistája eltér a Nyelvek oldaltól:', missing);
      }
    }
  }

  protected select(region: Region): void {
    this.active.set(region);
  }

  protected regionName(key: Region): string {
    const r = REGIONS.find((r) => r.key === key)!;
    return this.site.lang() === 'hu' ? r.hu : r.en;
  }
}
