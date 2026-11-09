import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminAuthService } from './admin-auth.service';
import { AdminLiveService } from './admin-live.service';

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
        <a routerLink="/admin/velemenyek" routerLinkActive="active" ariaCurrentWhenActive="page">Vélemények</a>
        <a routerLink="/admin/fiok" routerLinkActive="active" ariaCurrentWhenActive="page">Fiók</a>
      </nav>
      <div class="adm-top-right">
        <a routerLink="/admin" [queryParams]="{ uj: 1 }" class="adm-bell" [class.ring]="live.fresh().length" (click)="live.acknowledge()"
          [attr.aria-label]="live.fresh().length + ' új ajánlatkérés, ' + (live.stats()?.tasks_due ?? 0) + ' esedékes feladat'">
          <span aria-hidden="true">🔔</span>
          @if (live.fresh().length) { <b class="adm-badge">{{ live.fresh().length }}</b> }
          @if (live.stats()?.tasks_due; as due) { <span class="adm-badge gold" title="Mára esedékes vagy lejárt feladat">{{ due }}</span> }
        </a>
        <a href="/" target="_blank" rel="noopener" class="adm-link">Weboldal ↗</a>
        <span class="adm-user">{{ auth.user()?.email }}</span>
        <button type="button" class="btn btn-ghost btn-sm" (click)="logout()">Kilépés</button>
      </div>
    </header>
    @if (live.fresh().length) {
      <div class="adm-toast" role="status">
        <span><b>Új ajánlatkérés:</b> {{ live.fresh()[live.fresh().length - 1].name }}@if (live.fresh().length > 1) { és még {{ live.fresh().length - 1 }} }</span>
        <a routerLink="/admin" [queryParams]="{ uj: 1 }" class="btn btn-sm" (click)="live.acknowledge()">Megnyitás</a>
        @if (!live.notifyEnabled()) { <button type="button" class="adm-link" (click)="live.enableNotifications()">Asztali értesítés</button> }
        <button type="button" class="adm-close" (click)="live.acknowledge()" aria-label="Bezárás">×</button>
      </div>
    }
  `,
})
export class AdminHeader {
  protected readonly auth = inject(AdminAuthService);
  protected readonly live = inject(AdminLiveService);

  constructor() {
    this.live.start();
  }
  private readonly router = inject(Router);

  protected logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/admin/login');
  }
}
