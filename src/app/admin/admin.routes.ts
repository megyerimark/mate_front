import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { AdminAuthService } from './admin-auth.service';

const requireLogin: CanActivateFn = () => {
  const auth = inject(AdminAuthService);
  return auth.loggedIn() ? true : inject(Router).createUrlTree(['/admin/login']);
};

const guestOnly: CanActivateFn = () => {
  const auth = inject(AdminAuthService);
  return auth.loggedIn() ? inject(Router).createUrlTree(['/admin']) : true;
};

export default [
  {
    path: 'login',
    canActivate: [guestOnly],
    title: 'Bejelentkezés – Done Translations admin',
    loadComponent: () => import('./admin-login').then((m) => m.AdminLogin),
  },
  {
    path: '',
    canActivate: [requireLogin],
    title: 'Ajánlatkérések – Done Translations admin',
    loadComponent: () => import('./admin-dashboard').then((m) => m.AdminDashboard),
  },
  {
    path: 'statisztika',
    canActivate: [requireLogin],
    title: 'Statisztika – Done Translations admin',
    loadComponent: () => import('./admin-stats').then((m) => m.AdminStats),
  },
  {
    path: 'velemenyek',
    canActivate: [requireLogin],
    title: 'Vélemények és partnerek – Done Translations admin',
    loadComponent: () => import('./admin-content').then((m) => m.AdminContent),
  },
  {
    path: 'fiok',
    canActivate: [requireLogin],
    title: 'Fiók és adminok – Done Translations admin',
    loadComponent: () => import('./admin-account').then((m) => m.AdminAccount),
  },
] satisfies Routes;
