import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, computed, effect, inject, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { Icon } from '../components/icon';
import { AdminApiService, AdminQuote, AdminStats, AdminTask, ContactChannel, QuotePage, QuoteStatus, STATUSES } from './admin-api.service';
import { AdminLiveService } from './admin-live.service';
import { ActivatedRoute } from '@angular/router';
import { AdminHeader } from './admin-header';
import { mailto, replyTemplates } from './reply-templates';

const dateFmt = new Intl.DateTimeFormat('hu-HU', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

@Component({
  selector: 'app-admin-dashboard',
  imports: [FormsModule, Icon, AdminHeader],
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard implements OnInit {
  private readonly api = inject(AdminApiService);

  protected readonly statuses = STATUSES;
  protected readonly stats = signal<AdminStats | null>(null);
  protected readonly page = signal<QuotePage | null>(null);
  protected readonly loading = signal(true);
  protected readonly listError = signal('');

  protected readonly filterStatus = signal<QuoteStatus | ''>('');
  protected readonly followUp = signal(false);
  protected readonly search = signal('');
  protected readonly currentPage = signal(1);
  protected readonly from = signal('');
  protected readonly to = signal('');
  protected readonly exporting = signal(false);
  protected readonly exportError = signal('');
  protected readonly exportScope = computed(() => {
    const total = this.page()?.meta.total;
    return total === undefined ? '' : ` (${total} db)`;
  });

  protected readonly selected = signal<AdminQuote | null>(null);
  protected readonly note = signal('');
  protected readonly saving = signal(false);
  protected readonly saved = signal('');
  protected readonly detailError = signal('');
  protected readonly confirmDelete = signal(false);
  /** Az ár szerkesztőmezője (szövegként, hogy üresen is hagyható legyen). */
  protected readonly priceInput = signal('');
  protected readonly priceChanged = computed(() => this.parsePrice(this.priceInput()) !== (this.selected()?.price ?? null));
  protected readonly priceInvalid = computed(() => this.priceInput().trim() !== '' && this.parsePrice(this.priceInput()) === null);
  protected readonly templates = computed(() => {
    const q = this.selected();
    return q ? replyTemplates(q).map((t) => ({ t, missing: t.needs?.(q) ?? null, href: mailto(q, t) })) : [];
  });

  protected readonly noteChanged = computed(() => (this.selected()?.admin_note ?? '') !== this.note());
  protected readonly newCount = computed(() => this.stats()?.by_status.find((s) => s.status === 'new')?.total ?? 0);

  private searchTimer?: ReturnType<typeof setTimeout>;

  private readonly live = inject(AdminLiveService);
  private readonly route = inject(ActivatedRoute);

  // Teendők (nyitott feladatok), ügyféladatlap, kommunikációs napló
  protected readonly tasks = signal<AdminTask[]>([]);
  protected readonly newTask = signal({ title: '', due: '' });
  protected readonly quoteTasks = computed(() => this.tasks().filter((t) => t.quote?.id === this.selected()?.id));
  protected readonly client = signal<{ count: number; won: number; value: number; others: AdminQuote[] } | null>(null);
  protected readonly contactChannel = signal<ContactChannel>('phone');
  protected readonly contactNote = signal('');
  protected readonly channels: { value: ContactChannel; label: string }[] = [
    { value: 'phone', label: 'Telefon' }, { value: 'email', label: 'E-mail' }, { value: 'meeting', label: 'Találkozó' }, { value: 'other', label: 'Egyéb' },
  ];
  private lastLatest = 0;

  constructor() {
    inject(Meta).updateTag({ name: 'robots', content: 'noindex' });
    // Új ajánlatkérés érkezett: frissül az összesítő és (az első oldalon, szűrés nélkül) a lista is.
    effect(() => {
      const s = this.live.stats();
      if (!s) return;
      this.stats.set(s);
      const latest = s.latest?.id ?? 0;
      if (this.lastLatest && latest > this.lastLatest && this.currentPage() === 1 && !this.filterStatus() && !this.search() && !this.followUp()) {
        untracked(() => this.load());
      }
      this.lastLatest = latest;
    });
  }

  ngOnInit(): void {
    // A csengőről érkezve az új kéréseket mutatjuk.
    if (this.route.snapshot.queryParamMap.get('uj')) this.filterStatus.set('new');
    this.load();
    this.loadTasks();
    this.live.acknowledge();
  }

  protected loadTasks(): void {
    this.api.tasks({ status: 'open' }).subscribe({ next: (t) => this.tasks.set(t), error: () => {} });
  }

  protected addTask(quoteId: number | null = null): void {
    const { title, due } = this.newTask();
    if (!title.trim()) return;
    this.api.addTask({ title: title.trim(), due_at: due ? new Date(due).toISOString() : null, quote_request_id: quoteId }).subscribe({
      next: () => { this.newTask.set({ title: '', due: '' }); this.loadTasks(); this.live.refresh(); },
      error: () => this.detailError.set('A feladat mentése nem sikerült.'),
    });
  }

  protected completeTask(t: AdminTask): void {
    this.api.updateTask(t.id, { done: true }).subscribe(() => { this.loadTasks(); this.live.refresh(); });
  }

  protected removeTask(t: AdminTask): void {
    this.api.removeTask(t.id).subscribe(() => { this.loadTasks(); this.live.refresh(); });
  }

  protected openById(id: number): void {
    const inPage = this.page()?.data.find((q) => q.id === id);
    if (inPage) this.open(inPage);
    else this.api.show(id).subscribe((q) => this.open(q));
  }

  protected logContact(): void {
    const q = this.selected();
    if (!q) return;
    this.api.logContact(q.id, this.contactChannel(), this.contactNote().trim()).subscribe({
      next: (updated) => { this.selected.set(updated); this.contactNote.set(''); this.saved.set('Bejegyzés rögzítve'); },
      error: () => this.detailError.set('A bejegyzés mentése nem sikerült.'),
    });
  }

  /** Válaszsablon megnyitásakor az előzményekbe is bekerül (kommunikációs napló). */
  protected templateUsed(label: string): void {
    const q = this.selected();
    if (!q) return;
    this.api.logContact(q.id, 'email', `${label} sablon megnyitva`).subscribe({ next: (u) => this.selected.set(u), error: () => {} });
  }

  private loadClient(q: AdminQuote): void {
    this.client.set(null);
    this.api.list({ page: 1, status: '', followUp: false, search: '', from: '', to: '', email: q.email }).subscribe({
      next: (res) => {
        const all = res.data;
        const won = all.filter((x) => x.status === 'won');
        this.client.set({ count: res.meta.total, won: won.length, value: won.reduce((s, x) => s + (x.price ?? 0), 0), others: all.filter((x) => x.id !== q.id) });
      },
      error: () => {},
    });
  }

  protected load(): void {
    this.loading.set(true);
    this.listError.set('');
    this.api.list({ page: this.currentPage(), ...this.filters() }).subscribe({
      next: (page) => {
        this.page.set(page);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        if (err.status !== 401) this.listError.set('Nem sikerült betölteni az ajánlatkéréseket. Próbálja újra.');
      },
    });
    this.live.refresh();
  }

  protected statTotal(status: QuoteStatus): string {
    const found = this.stats()?.by_status.find((s) => s.status === status);
    return found ? String(found.total) : '–';
  }

  private filters() {
    return { status: this.filterStatus(), followUp: this.followUp(), search: this.search(), from: this.from(), to: this.to() };
  }

  protected setDate(which: 'from' | 'to', value: string): void {
    (which === 'from' ? this.from : this.to).set(value ?? '');
    this.currentPage.set(1);
    this.load();
  }

  protected clearDates(): void {
    this.from.set('');
    this.to.set('');
    this.currentPage.set(1);
    this.load();
  }

  protected exportExcel(): void {
    this.exporting.set(true);
    this.exportError.set('');
    this.api.export(this.filters()).subscribe({
      next: (blob) => {
        this.exporting.set(false);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ajanlatkeresek-${new Date().toLocaleDateString('sv-SE')}.xlsx`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      },
      error: () => {
        this.exporting.set(false);
        this.exportError.set('Az Excel-fájl nem készült el. Próbálja újra.');
      },
    });
  }

  protected toggleFollowUp(): void {
    this.followUp.set(!this.followUp());
    if (this.followUp()) this.filterStatus.set('');
    this.currentPage.set(1);
    this.load();
  }

  protected setStatusFilter(status: QuoteStatus | ''): void {
    this.followUp.set(false);
    this.filterStatus.set(this.filterStatus() === status ? '' : status);
    this.currentPage.set(1);
    this.load();
  }

  protected onSearch(value: string): void {
    this.search.set(value);
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.currentPage.set(1);
      this.load();
    }, 300);
  }

  protected goTo(page: number): void {
    this.currentPage.set(page);
    this.load();
  }

  protected open(quote: AdminQuote): void {
    this.selected.set(quote);
    this.note.set(quote.admin_note ?? '');
    this.priceInput.set(quote.price === null ? '' : String(quote.price));
    this.loadClient(quote);
    // Az előzmények csak az egyedi lekérésben vannak benne.
    this.api.show(quote.id).subscribe({
      next: (full) => {
        if (this.selected()?.id === full.id) this.selected.set(full);
      },
      error: () => {},
    });
    this.saved.set('');
    this.detailError.set('');
    this.confirmDelete.set(false);
  }

  protected close(): void {
    this.selected.set(null);
  }

  protected setStatus(status: QuoteStatus): void {
    const quote = this.selected();
    if (!quote || quote.status === status) return;
    this.persist(quote.id, { status }, 'Állapot mentve');
  }

  protected saveNote(): void {
    const quote = this.selected();
    if (!quote) return;
    this.persist(quote.id, { admin_note: this.note() || null }, 'Jegyzet mentve');
  }

  protected readonly resending = signal(false);

  protected resend(): void {
    const quote = this.selected();
    if (!quote) return;
    const which: ('notify' | 'confirm')[] = [];
    if (!quote.notified_at) which.push('notify');
    if (!quote.confirmed_at) which.push('confirm');
    if (!which.length) return;
    this.resending.set(true);
    this.api.resendMail(quote.id, which).subscribe({
      next: (updated) => {
        this.resending.set(false);
        this.selected.set(updated);
        this.page.update((p) => (p ? { ...p, data: p.data.map((q) => (q.id === updated.id ? updated : q)) } : p));
        if (updated.mail_error) this.detailError.set('Most sem ment ki: ' + updated.mail_error);
        else this.saved.set('E-mail elküldve');
      },
      error: () => {
        this.resending.set(false);
        this.detailError.set('Az újraküldés nem sikerült.');
      },
    });
  }

  protected savePrice(): void {
    const quote = this.selected();
    if (!quote || this.priceInvalid()) return;
    this.persist(quote.id, { price: this.parsePrice(this.priceInput()) }, 'Ár mentve');
  }

  /** „12 000”, „12000 Ft”, „12.000” → 12000; üres → null; értelmetlen → null (és priceInvalid jelez). */
  private parsePrice(value: string): number | null {
    const digits = value.replace(/[\s.,]|ft|huf/gi, '');
    return /^\d{1,9}$/.test(digits) ? Number(digits) : null;
  }

  protected price(n: number | null): string {
    return n === null ? '' : new Intl.NumberFormat('hu-HU').format(n) + ' Ft';
  }

  private persist(id: number, changes: Partial<Pick<AdminQuote, 'status' | 'admin_note' | 'price'>>, message: string): void {
    this.saving.set(true);
    this.saved.set('');
    this.detailError.set('');
    this.api.update(id, changes).subscribe({
      next: (updated) => {
        this.saving.set(false);
        this.saved.set(message);
        this.selected.set(updated);
        this.note.set(updated.admin_note ?? '');
        this.priceInput.set(updated.price === null ? '' : String(updated.price));
        this.page.update((p) => (p ? { ...p, data: p.data.map((q) => (q.id === id ? updated : q)) } : p));
        this.live.refresh();
      },
      error: (err: HttpErrorResponse) => {
        this.saving.set(false);
        this.detailError.set(err.error?.message ?? 'A mentés nem sikerült. Próbálja újra.');
      },
    });
  }

  protected download(index = 0): void {
    const quote = this.selected();
    const doc = quote?.documents?.[index];
    if (!quote || !doc) return;
    this.api.document(quote.id, index).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      },
      error: () => this.detailError.set('A dokumentum nem tölthető le. Lehet, hogy törölték a szerverről.'),
    });
  }

  protected remove(): void {
    const quote = this.selected();
    if (!quote) return;
    this.api.remove(quote.id).subscribe({
      next: () => {
        this.selected.set(null);
        this.load();
      },
      error: () => this.detailError.set('A törlés nem sikerült. Próbálja újra.'),
    });
  }

  protected replyLink(quote: AdminQuote): string {
    const pair = [quote.source_language, quote.target_language].filter(Boolean).join(' → ');
    const subject = `Árajánlat${pair ? ' – ' + pair + ' fordítás' : ''}`;
    const body = `Kedves ${quote.name}!\n\nKöszönjük az ajánlatkérését.\n\n`;
    return `mailto:${quote.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  protected fileSize(bytes: number | null): string {
    if (bytes === null) return '';
    return bytes < 1048576 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1048576).toFixed(1).replace('.', ',')} MB`;
  }

  protected date(iso: string): string {
    return dateFmt.format(new Date(iso));
  }

  protected ago(iso: string): string {
    const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
    if (minutes < 1) return 'most';
    if (minutes < 60) return `${minutes} perce`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours} órája`;
    return `${Math.round(hours / 24)} napja`;
  }

  protected pair(quote: AdminQuote): string {
    if (!quote.source_language && !quote.target_language) return '–';
    if (!quote.source_language) return quote.target_language ?? '–';
    return `${quote.source_language} → ${quote.target_language || '?'}`;
  }
}
