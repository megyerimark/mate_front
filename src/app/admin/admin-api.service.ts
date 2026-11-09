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
  document_name: string | null;
  has_document: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuotePage {
  data: AdminQuote[];
  meta: { current_page: number; last_page: number; per_page: number; total: number; from: number | null; to: number | null };
}

export interface AdminStats {
  total: number;
  this_month: number;
  by_status: { status: QuoteStatus; label: string; total: number }[];
}

export type StatsPeriod = '12m' | 'year' | 'all';

export interface StatRow { key?: string; label: string; total: number }

export interface StatsOverview {
  period: StatsPeriod;
  from: string;
  to: string;
  totals: { total: number; won: number; lost: number; open: number; conversion: number | null; english: number };
  this_month: number;
  last_month: number;
  monthly: { month: string; label: string; total: number; won: number }[];
  by_service: StatRow[];
  by_status: StatRow[];
  by_locale: StatRow[];
  by_deadline: StatRow[];
  top_languages: StatRow[];
}

export interface QuoteFilters {
  status: QuoteStatus | '';
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

  overview(period: StatsPeriod): Observable<StatsOverview> {
    return this.http.get<StatsOverview>(`${this.base}/stats/overview`, { params: { period } });
  }

  private filterParams(filters: QuoteFilters): HttpParams {
    let params = new HttpParams();
    if (filters.status) params = params.set('status', filters.status);
    if (filters.search.trim()) params = params.set('search', filters.search.trim());
    if (filters.from) params = params.set('from', filters.from);
    if (filters.to) params = params.set('to', filters.to);
    return params;
  }

  stats(): Observable<AdminStats> {
    return this.http.get<AdminStats>(`${this.base}/stats`);
  }

  update(id: number, changes: Partial<Pick<AdminQuote, 'status' | 'admin_note'>>): Observable<AdminQuote> {
    return this.http.patch<{ data: AdminQuote }>(`${this.base}/quote-requests/${id}`, changes).pipe(map((r) => r.data));
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.base}/quote-requests/${id}`);
  }

  document(id: number): Observable<Blob> {
    return this.http.get(`${this.base}/quote-requests/${id}/document`, { responseType: 'blob' });
  }
}
