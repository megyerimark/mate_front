import { Routes } from '@angular/router';
import PATHS from './content/paths.json';
import { Lang, PageKey } from './content/types';
import { ContentPage } from './pages/content-page';
import { Home } from './pages/home';
import { NotFound } from './pages/not-found';
import { ThankYou } from './pages/thank-you';

const LANGS: Lang[] = ['hu', 'en'];

/** Minden oldal mindkét nyelven, a paths.json címeivel (a régi WordPress oldal magyar címei). */
const pageRoutes: Routes = LANGS.flatMap((lang) =>
  (Object.keys(PATHS) as PageKey[]).map((key) => ({
    path: PATHS[key][lang],
    component: key === 'home' ? Home : key === 'thanks' ? ThankYou : ContentPage,
    data: { key, lang },
  })),
);

export const routes: Routes = [
  ...pageRoutes,
  // Admin felület: külön töltődik be, a nyilvános oldalt nem lassítja.
  { path: 'admin', data: { key: 'admin', lang: 'hu' }, loadChildren: () => import('./admin/admin.routes') },
  { path: '**', component: NotFound, data: { key: 'notFound' } },
];
