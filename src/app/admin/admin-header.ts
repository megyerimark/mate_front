import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminAuthService } from './admin-auth.service';

/** Az admin oldalak közös fejléce: márka, menü, kilépés. */
@Component({
  selector: 'app-admin-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="adm-top">
      <div class="adm-brand"><span class="logo-mark" aria-hidden="true">✓</span><span>Done<strong>Translations</strong></span> <span class="adm-tag">Admin</span></div>
      <nav class="adm-nav" aria-label="Admin menü">
        <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" ariaCurrentWhenActive="page">Ajánlatkérések</a>
        <a routerLink="/admin/statisztika" routerLinkActive="active" ariaCurrentWhenActive="page">Statisztika</a>
        <a routerLink="/admin/fiok" routerLinkActive="active" ariaCurrentWhenActive="page">Fiók</a>
      </nav>
      <div class="adm-top-right">
        <a href="/" target="_blank" rel="noopener" class="adm-link">Weboldal ↗</a>
        <span class="adm-user">{{ auth.user()?.email }}</span>
        <button type="button" class="btn btn-ghost btn-sm" (click)="logout()">Kilépés</button>
      </div>
    </header>
  `,
})
export class AdminHeader {
  protected readonly auth = inject(AdminAuthService);
  private readonly router = inject(Router);

  protected logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/admin/login');
  }
}
