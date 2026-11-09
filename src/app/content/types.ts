import PATHS from './paths.json';

export type Lang = 'hu' | 'en';
export type PageKey = keyof typeof PATHS;
export type ServiceKey = 'translation' | 'proofreading' | 'post_editing' | 'interpreting' | 'spelling';

export const SITE_URL = 'https://donetranslations.hu';

/** Az oldal címe (útvonala) az adott nyelven, perjellel a végén, ahogy a régi WordPress oldalon. */
export function pathFor(key: PageKey, lang: Lang): string {
  const p = PATHS[key][lang];
  return p ? `/${p}/` : '/';
}

export interface Feature {
  icon: string;
  title: string;
  text: string[];
}

/** Az oldalak építőkockái; a tartalmuk a régi oldalról származik (magyar), illetve annak fordítása. */
export type Block =
  | { kind: 'text'; heading?: string; paragraphs: string[] }
  | { kind: 'features'; heading?: string; items: Feature[]; after?: string[] }
  | { kind: 'list'; heading: string; items: string[]; after?: string[] }
  | { kind: 'steps'; heading: string; steps: Feature[]; after?: string[] }
  | { kind: 'languages'; groups: string[][] }
  | { kind: 'price'; highlight: string; paragraphs: string[] }
  | { kind: 'contact' }
  | { kind: 'spelling'; heading: string; text: string }
  | { kind: 'legal'; items: { tag: 'h2' | 'h3' | 'p' | 'li'; text: string }[] };

export interface PageContent {
  title: string;
  description: string | null;
  h1: string;
  lead: string[];
  /** Ajánlatkérés gomb a bevezető alatt */
  cta: boolean;
  blocks: Block[];
  /** Ajánlatkérő űrlap az oldal alján */
  quote: false | 'standard' | 'interpreting';
  service: ServiceKey;
  noindex?: boolean;
}

export interface HomeContent {
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  lead: string[];
  spellingButton: string;
  servicesHeading: string;
  services: { key: PageKey; icon: string; title: string; text: string }[];
  whyHeading: string;
  why: Feature[];
  stepsHeading: string;
  steps: Feature[];
  stats: { value: number; suffix: string; label: string }[];
  slogan: string[];
}
