import { DefaultUrlSerializer, UrlTree } from '@angular/router';

/**
 * A régi WordPress oldal címei perjellel végződnek (/forditas/). Ez a szerializáló a linkeket is így írja ki,
 * hogy a Google ugyanazokat a címeket lássa, mint eddig.
 */
export class TrailingSlashUrlSerializer extends DefaultUrlSerializer {
  /** Beolvasáskor a perjel nem számít: a /forditas/ ugyanaz az útvonal, mint a /forditas. */
  override parse(url: string): UrlTree {
    const [pathAndQuery, fragment] = url.split('#');
    const [path, query] = pathAndQuery.split('?');
    const trimmed = path.length > 1 ? path.replace(/\/+$/, '') : path;
    return super.parse(trimmed + (query !== undefined ? `?${query}` : '') + (fragment !== undefined ? `#${fragment}` : ''));
  }

  override serialize(tree: UrlTree): string {
    const url = super.serialize(tree);
    const [pathAndQuery, fragment] = url.split('#');
    const [path, query] = pathAndQuery.split('?');
    const withSlash = path === '/' || path.endsWith('/') || /\.[a-z0-9]+$/i.test(path) ? path : `${path}/`;
    return withSlash + (query !== undefined ? `?${query}` : '') + (fragment !== undefined ? `#${fragment}` : '');
  }
}
