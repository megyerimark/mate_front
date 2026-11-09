import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, isDevMode, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LAND, REGIONS, Region, WORLD_LANGUAGES, WorldLanguage } from '../content/languages-world';
import { PAGES } from '../content/ui';
import { Reveal } from '../motion/reveal.directive';
import { SiteService } from '../services/site.service';

/** Miskolc, ahonnan az ívek indulnak. */
const HOME_POINT: [number, number] = [20.8, 48.1];
const x = (lon: number) => +(lon + 180).toFixed(1);
const y = (lat: number) => +(LAND.latTop - lat + 2).toFixed(1);

/** A szárazföld pontjai egyetlen SVG útvonalként (kerek végű, nulla hosszú szakaszok = pöttyök). Egyszer számolódik. */
let landPath: string | undefined;
function buildLand(): string {
  const bytes = Uint8Array.from(atob(LAND.mask), (c) => c.charCodeAt(0));
  let d = '';
  for (let r = 0; r < LAND.rows; r++) {
    for (let c = 0; c < LAND.cols; c++) {
      const i = r * LAND.cols + c;
      if (bytes[i >> 3] & (0x80 >> (i & 7))) d += `M${c * LAND.step + 1} ${r * LAND.step + 2}h0`;
    }
  }
  return d;
}

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
  protected readonly hovered = signal<(WorldLanguage & { x: number; y: number }) | null>(null);
  protected readonly land = (landPath ??= buildLand());
  protected readonly home = { x: x(HOME_POINT[0]), y: y(HOME_POINT[1]) };
  protected readonly total = WORLD_LANGUAGES.length;

  /** Térképpontok (a klasszikus/mesterséges nyelveknek nincs). */
  protected readonly points = WORLD_LANGUAGES.filter((l) => l.lon !== undefined).map((l) => ({ ...l, x: x(l.lon!), y: y(l.lat!) }));

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

  /** Ívek Miskolcról az aktív régió nyelveihez (a régióban is beszélt nyelvek a régió központjába mutatnak). */
  protected readonly arcs = computed(() => {
    const region = REGIONS.find((r) => r.key === this.active());
    const targets = this.points.filter((p) => p.region === this.active() && p.hu !== 'magyar').map((p) => [p.x, p.y] as const);
    if (region?.also && region.hub) targets.push([x(region.hub[0]), y(region.hub[1])]);
    return targets.map(([tx, ty]) => {
      const mx = (this.home.x + tx) / 2;
      const dist = Math.hypot(tx - this.home.x, ty - this.home.y);
      const my = (this.home.y + ty) / 2 - Math.min(dist * 0.35, 40);
      return `M${this.home.x} ${this.home.y}Q${mx.toFixed(1)} ${my.toFixed(1)} ${tx} ${ty}`;
    });
  });

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
