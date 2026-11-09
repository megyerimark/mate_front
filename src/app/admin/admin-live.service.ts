import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AdminApiService, AdminStats } from './admin-api.service';
import { AdminAuthService } from './admin-auth.service';

const SEEN_KEY = 'done-admin-last-seen-id';

/**
 * Új ajánlatkérések jelzése valós időben (percenkénti lekérdezés; egyszerű tárhelyen nincs websocket).
 * Új kérésnél: felugró jelzés, számláló a böngészőfül címében, és – ha engedélyezték – asztali értesítés.
 */
@Injectable({ providedIn: 'root' })
export class AdminLiveService {
  private readonly api = inject(AdminApiService);
  private readonly auth = inject(AdminAuthService);
  private readonly title = inject(Title);
  private readonly doc = inject(DOCUMENT);

  readonly stats = signal<AdminStats | null>(null);
  /** Az admin megnyitása óta érkezett új kérések (a jelzéshez). */
  readonly fresh = signal<{ id: number; name: string }[]>([]);
  readonly notifyEnabled = signal(typeof Notification !== 'undefined' && Notification.permission === 'granted');
  private timer?: ReturnType<typeof setInterval>;
  private baseTitle = '';
  private lastSeen = Number(this.read() ?? 0);

  start(): void {
    if (this.timer) return;
    this.poll();
    this.timer = setInterval(() => this.poll(), 60_000);
    this.doc.addEventListener('visibilitychange', () => { if (!this.doc.hidden) this.poll(); });
  }

  refresh(): void {
    this.poll();
  }

  /** A felhasználó látta az újakat (pl. megnyitotta a listát). */
  acknowledge(): void {
    this.fresh.set([]);
    const latest = this.stats()?.latest?.id;
    if (latest) this.write(String((this.lastSeen = latest)));
    this.updateTitle();
  }

  async enableNotifications(): Promise<void> {
    if (typeof Notification === 'undefined') return;
    this.notifyEnabled.set((await Notification.requestPermission()) === 'granted');
  }

  private poll(): void {
    if (!this.auth.loggedIn()) return;
    this.api.stats().subscribe({
      next: (s) => {
        const first = this.stats() === null;
        this.stats.set(s);
        const latest = s.latest;
        if (latest && latest.id > this.lastSeen) {
          if (first && !this.lastSeen) {
            // Első megnyitás ezen a gépen: nincs mihez viszonyítani, nem jelzünk régi kéréseket újként.
            this.write(String((this.lastSeen = latest.id)));
          } else if (!this.fresh().some((f) => f.id === latest.id)) {
            this.fresh.update((f) => [...f, { id: latest.id, name: latest.name }]);
            if (this.notifyEnabled() && this.doc.hidden) {
              new Notification('Új ajánlatkérés', { body: latest.name, tag: 'quote-' + latest.id });
            }
          }
        }
        this.updateTitle();
      },
      error: () => {},
    });
  }

  private updateTitle(): void {
    const current = this.title.getTitle().replace(/^\(\d+\) /, '');
    this.baseTitle = current;
    const n = this.fresh().length;
    this.title.setTitle(n ? `(${n}) ${this.baseTitle}` : this.baseTitle);
  }

  private read(): string | null {
    try { return localStorage.getItem(SEEN_KEY); } catch { return null; }
  }

  private write(v: string): void {
    try { localStorage.setItem(SEEN_KEY, v); } catch { /* privát mód */ }
  }
}
