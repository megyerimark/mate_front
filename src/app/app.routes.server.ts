import { RenderMode, ServerRoute } from '@angular/ssr';

/** Előrenderelés: minden nyilvános oldal kész HTML-ként készül el buildeléskor. Az admin csak böngészőben fut. */
export const serverRoutes: ServerRoute[] = [
  { path: 'admin', renderMode: RenderMode.Client },
  { path: 'admin/**', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Prerender },
];
