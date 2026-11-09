import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { AdminApiService, AdminUser } from './admin-api.service';
import { AdminAuthService } from './admin-auth.service';
import { AdminHeader } from './admin-header';

type Errors = Record<string, string>;

function flatten(err: HttpErrorResponse, fallback: string): Errors {
  if (err.status === 422 && err.error?.errors) {
    return Object.fromEntries(Object.entries(err.error.errors as Record<string, string[]>).map(([k, v]) => [k, v[0]]));
  }
  return { general: err.error?.message ?? fallback };
}

/** Saját jelszó módosítása és a többi admin kezelése. */
@Component({
  selector: 'app-admin-account',
  imports: [FormsModule, AdminHeader],
  templateUrl: './admin-account.html',
})
export class AdminAccount {
  private readonly api = inject(AdminApiService);
  protected readonly auth = inject(AdminAuthService);

  // Jelszócsere
  protected readonly pw = { current: signal(''), next: signal(''), again: signal('') };
  protected readonly pwErrors = signal<Errors>({});
  protected readonly pwSaving = signal(false);
  protected readonly pwDone = signal(false);

  // Adminok
  protected readonly users = signal<AdminUser[]>([]);
  protected readonly newName = signal('');
  protected readonly newEmail = signal('');
  protected readonly addErrors = signal<Errors>({});
  protected readonly adding = signal(false);
  protected readonly created = signal<{ email: string; password: string } | null>(null);
  protected readonly copied = signal(false);
  protected readonly confirmId = signal<number | null>(null);
  protected readonly listError = signal('');

  constructor() {
    inject(Meta).updateTag({ name: 'robots', content: 'noindex' });
    this.loadUsers();
  }

  private loadUsers(): void {
    this.api.users().subscribe({ next: (u) => this.users.set(u), error: () => this.listError.set('Nem sikerült betölteni az adminokat.') });
  }

  protected changePassword(): void {
    this.pwSaving.set(true);
    this.pwErrors.set({});
    this.pwDone.set(false);
    this.api
      .changePassword({ current_password: this.pw.current(), password: this.pw.next(), password_confirmation: this.pw.again() })
      .subscribe({
        next: () => {
          this.pwSaving.set(false);
          this.pwDone.set(true);
          this.pw.current.set('');
          this.pw.next.set('');
          this.pw.again.set('');
        },
        error: (err: HttpErrorResponse) => {
          this.pwSaving.set(false);
          this.pwErrors.set(flatten(err, 'A jelszó módosítása nem sikerült.'));
        },
      });
  }

  protected addUser(): void {
    this.adding.set(true);
    this.addErrors.set({});
    this.created.set(null);
    this.copied.set(false);
    this.api.addUser({ name: this.newName().trim(), email: this.newEmail().trim() }).subscribe({
      next: (res) => {
        this.adding.set(false);
        this.created.set({ email: res.data.email, password: res.password });
        this.newName.set('');
        this.newEmail.set('');
        this.loadUsers();
      },
      error: (err: HttpErrorResponse) => {
        this.adding.set(false);
        this.addErrors.set(flatten(err, 'Az admin létrehozása nem sikerült.'));
      },
    });
  }

  protected copy(text: string): void {
    navigator.clipboard?.writeText(text).then(() => this.copied.set(true), () => {});
  }

  protected remove(user: AdminUser): void {
    this.api.removeUser(user.id).subscribe({
      next: () => {
        this.confirmId.set(null);
        this.loadUsers();
      },
      error: (err: HttpErrorResponse) => this.listError.set(err.error?.message ?? 'A törlés nem sikerült.'),
    });
  }
}
