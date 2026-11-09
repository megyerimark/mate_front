import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export type QuoteStatus = 'new' | 'in_progress' | 'quoted' | 'won' | 'lost';

export interface AdminQuote {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  service_label: string;
  locale: 'hu' | 'en';
  deadline: string;
  deadline_label: string;
  source_language: string | null;
  target_language: string | null;
  message: string | null;
  admin_note: string | null;
  status: QuoteStatus;
  status_label: string;
  status_changed_at: string | null;
  needs_follow_up: boolean;
  /** Ajánlott / megrendelt ár forintban. */
  price: number | null;
  /** Mikor ment ki az értesítő (irodának) és a visszaigazolás (ügyfélnek); hiba esetén az üzenete. */
  notified_at: string | null;
  confirmed_at: string | null;
  mail_error: string | null;
  /** Előzmények; csak az egy ajánlatkérést lekérő válaszban van benne. */
  events?: { type: 'status' | 'price' | 'note' | 'contact'; channel: ContactChannel | null; text: string; user: string | null; created_at: string }[];
  document_name: string | null;
  has_document: boolean;
  documents: { index: number; name: string; size: number | null; mime: string | null }[];
  created_at: string;
  updated_at: string;
}

export interface QuotePage {
  data: AdminQuote[];
  meta: { current_page: number; last_page: number; per_page: number; total: number; from: number | null; to: number | null };
}

export interface AdminStats {
  total: number;
  follow_up: number;
  latest: { id: number; name: string; created_at: string } | null;
  tasks_due: number;
  this_month: number;
  by_status: { status: QuoteStatus; label: string; total: number }[];
}

export type StatsPeriod = '12m' | 'year' | 'all';
export type StatsGroup = 'month' | 'week';

export interface AdminTask {
  id: number;
  title: string;
  due_at: string | null;
  done_at: string | null;
  overdue: boolean;
  quote: { id: number; name: string } | null;
  user: string | null;
}

export type ContactChannel = 'phone' | 'email' | 'meeting' | 'other';

export interface StatRow { key?: string; label: string; total: number }

export interface StatsOverview {
  period: StatsPeriod;
  from: string;
  to: string;
  totals: {
    total: number; won: number; lost: number; open: number; conversion: number | null; english: number;
    revenue: number; average_order: number | null; priced_orders: number;
    response_hours: number | null; responded: number;
  };
  group: StatsGroup;
  conversion_by_service: { key: string; label: string; total: number; won: number; rate: number | null }[];
  follow_up: number;
  this_month: number;
  last_month: number;
  monthly: { month: string; label: string; total: number; won: number; revenue: number }[];
  by_service: StatRow[];
  by_status: StatRow[];
  by_locale: StatRow[];
  by_deadline: StatRow[];
  top_languages: StatRow[];
}

export interface Testimonial {
  id: number;
  name: string;
  company: string | null;
  role: string | null;
  text: string;
  locale: 'hu' | 'en' | 'all';
  rating: number | null;
  is_published: boolean;
  sort: number;
}

export interface Partner {
  id: number;
  name: string;
  url: string | null;
  is_published: boolean;
  sort: number;
  logo: string | null;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  created_at?: string;
  is_me: boolean;
}

export interface QuoteFilters {
  status: QuoteStatus | '';
  followUp: boolean;
  /** Ügyféladatlaphoz: pontos e-mail-cím. */
  email?: string;
  search: string;
  from: string;
  to: string;
}

/** Az admin felület sorrendje és címkéi; a backend ugyanezeket a kulcsokat fogadja el. */
export const STATUSES: { value: QuoteStatus; label: string }[] = [
  { value: 'new', label: 'Új' },
  { value: 'in_progress', label: 'Folyamatban' },
  { value: 'quoted', label: 'Ajánlat elküldve' },
  { value: 'won', label: 'Megrendelve' },
  { value: 'lost', label: 'Elmaradt' },
];

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/api/admin`;

  list(filters: QuoteFilters & { page: number }): Observable<QuotePage> {
    const params = this.filterParams(filters).set('page', filters.page);
    return this.http.get<QuotePage>(`${this.base}/quote-requests`, { params });
  }

  /** Excel-fájl a szűrésnek megfelelő ajánlatkérésekkel. */
  export(filters: QuoteFilters): Observable<Blob> {
    return this.http.get(`${this.base}/quote-requests/export`, { params: this.filterParams(filters), responseType: 'blob' });
  }

  overview(period: StatsPeriod, group: StatsGroup = 'month'): Observable<StatsOverview> {
    return this.http.get<StatsOverview>(`${this.base}/stats/overview`, { params: { period, group } });
  }

  // ---------- Feladatok, kommunikációs napló ----------
  tasks(params: { status?: 'open' | 'done' | 'all'; quote_request_id?: number } = {}): Observable<AdminTask[]> {
    return this.http.get<{ data: AdminTask[] }>(`${this.base}/tasks`, { params: params as Record<string, string | number> }).pipe(map((r) => r.data));
  }
  addTask(task: { title: string; due_at?: string | null; quote_request_id?: number | null }): Observable<AdminTask> {
    return this.http.post<{ data: AdminTask }>(`${this.base}/tasks`, task).pipe(map((r) => r.data));
  }
  updateTask(id: number, changes: { title?: string; due_at?: string | null; done?: boolean }): Observable<AdminTask> {
    return this.http.patch<{ data: AdminTask }>(`${this.base}/tasks/${id}`, changes).pipe(map((r) => r.data));
  }
  removeTask(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/tasks/${id}`);
  }
  logContact(id: number, channel: ContactChannel, note: string): Observable<AdminQuote> {
    return this.http.post<{ data: AdminQuote }>(`${this.base}/quote-requests/${id}/contact`, { channel, note }).pipe(map((r) => r.data));
  }

  users(): Observable<AdminUser[]> {
    return this.http.get<{ data: AdminUser[] }>(`${this.base}/users`).pipe(map((r) => r.data));
  }

  /** Új admin; a generált jelszó csak ebben a válaszban jön vissza. */
  addUser(user: { name: string; email: string }): Observable<{ data: AdminUser; password: string }> {
    return this.http.post<{ data: AdminUser; password: string }>(`${this.base}/users`, user);
  }

  removeUser(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/users/${id}`);
  }

  changePassword(body: { current_password: string; password: string; password_confirmation: string }): Observable<unknown> {
    return this.http.put(`${this.base}/password`, body);
  }

  private filterParams(filters: QuoteFilters): HttpParams {
    let params = new HttpParams();
    if (filters.status) params = params.set('status', filters.status);
    if (filters.followUp) params = params.set('follow_up', 1);
    if (filters.email) params = params.set('email', filters.email);
    if (filters.search.trim()) params = params.set('search', filters.search.trim());
    if (filters.from) params = params.set('from', filters.from);
    if (filters.to) params = params.set('to', filters.to);
    return params;
  }

  stats(): Observable<AdminStats> {
    return this.http.get<AdminStats>(`${this.base}/stats`);
  }

  show(id: number): Observable<AdminQuote> {
    return this.http.get<{ data: AdminQuote }>(`${this.base}/quote-requests/${id}`).pipe(map((r) => r.data));
  }

  update(id: number, changes: Partial<Pick<AdminQuote, 'status' | 'admin_note' | 'price'>>): Observable<AdminQuote> {
    return this.http.patch<{ data: AdminQuote }>(`${this.base}/quote-requests/${id}`, changes).pipe(map((r) => r.data));
  }

  resendMail(id: number, which: ('notify' | 'confirm')[]): Observable<AdminQuote> {
    return this.http.post<{ data: AdminQuote }>(`${this.base}/quote-requests/${id}/resend-mail`, { which }).pipe(map((r) => r.data));
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/quote-requests/${id}`);
  }

  document(id: number, index = 0): Observable<Blob> {
    return this.http.get(`${this.base}/quote-requests/${id}/documents/${index}`, { responseType: 'blob' });
  }

  // ---------- Vélemények, partnerek ----------
  testimonials(): Observable<Testimonial[]> {
    return this.http.get<{ data: Testimonial[] }>(`${this.base}/testimonials`).pipe(map((r) => r.data));
  }
  saveTestimonial(t: Partial<Testimonial>): Observable<Testimonial> {
    const req = t.id
      ? this.http.patch<{ data: Testimonial }>(`${this.base}/testimonials/${t.id}`, t)
      : this.http.post<{ data: Testimonial }>(`${this.base}/testimonials`, t);
    return req.pipe(map((r) => r.data));
  }
  removeTestimonial(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/testimonials/${id}`);
  }
  partners(): Observable<Partner[]> {
    return this.http.get<{ data: Partner[] }>(`${this.base}/partners`).pipe(map((r) => r.data));
  }
  savePartner(p: Partial<Partner>, logo: File | null): Observable<Partner> {
    const body = new FormData();
    if (p.name !== undefined) body.append('name', p.name);
    body.append('url', p.url ?? '');
    if (p.is_published !== undefined) body.append('is_published', p.is_published ? '1' : '0');
    if (p.sort !== undefined) body.append('sort', String(p.sort));
    if (logo) body.append('logo', logo);
    return this.http.post<{ data: Partner }>(`${this.base}/partners${p.id ? '/' + p.id : ''}`, body).pipe(map((r) => r.data));
  }
  removePartner(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/partners/${id}`);
  }
  /** A logó Bearer tokennel töltődik be, ezért blobként. */
  partnerLogo(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }
}
