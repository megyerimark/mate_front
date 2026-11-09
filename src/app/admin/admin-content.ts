import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { AdminApiService, Partner, Testimonial } from './admin-api.service';
import { AdminHeader } from './admin-header';

type Errors = Record<string, string>;
const errorsOf = (err: HttpErrorResponse): Errors =>
  err.status === 422 && err.error?.errors
    ? Object.fromEntries(Object.entries(err.error.errors as Record<string, string[]>).map(([k, v]) => [k, v[0]]))
    : { general: 'A mentés nem sikerült. Próbáld újra.' };

const EMPTY_T = { id: 0, name: '', company: '', role: '', text: '', locale: 'all' as const, rating: null as number | null, is_published: false, sort: 0 };

/** Vélemények és partnerek: csak valódi, hozzájárulással közölt tartalom kerüljön ide; a weboldalon a publikáltak látszanak. */
@Component({
  selector: 'app-admin-content',
  imports: [FormsModule, AdminHeader],
  templateUrl: './admin-content.html',
})
export class AdminContent {
  private readonly api = inject(AdminApiService);

  protected readonly testimonials = signal<Testimonial[]>([]);
  protected readonly partners = signal<Partner[]>([]);
  protected readonly logos = signal<Record<number, string>>({});
  protected readonly draft = signal<Testimonial>({ ...EMPTY_T });
  protected readonly tErrors = signal<Errors>({});
  protected readonly pDraft = signal({ name: '', url: '' });
  protected readonly pLogo = signal<File | null>(null);
  protected readonly pErrors = signal<Errors>({});
  protected readonly saving = signal(false);

  constructor() {
    inject(Meta).updateTag({ name: 'robots', content: 'noindex' });
    inject(DestroyRef).onDestroy(() => Object.values(this.logos()).forEach((u) => URL.revokeObjectURL(u)));
    this.load();
  }

  private load(): void {
    this.api.testimonials().subscribe((t) => this.testimonials.set(t));
    this.api.partners().subscribe((p) => {
      this.partners.set(p);
      for (const partner of p) {
        if (partner.logo && !this.logos()[partner.id]) {
          this.api.partnerLogo(partner.logo).subscribe((blob) => this.logos.update((l) => ({ ...l, [partner.id]: URL.createObjectURL(blob) })));
        }
      }
    });
  }

  protected patchDraft(field: keyof Testimonial, value: unknown): void {
    this.draft.update((d) => ({ ...d, [field]: value }));
  }

  protected edit(t: Testimonial): void {
    this.draft.set({ ...t });
    this.tErrors.set({});
  }

  protected cancel(): void {
    this.draft.set({ ...EMPTY_T });
    this.tErrors.set({});
  }

  protected saveTestimonial(): void {
    const d = this.draft();
    this.saving.set(true);
    this.api.saveTestimonial({ ...d, id: d.id || undefined, rating: d.rating || null, company: d.company || null, role: d.role || null }).subscribe({
      next: () => { this.saving.set(false); this.cancel(); this.load(); },
      error: (e) => { this.saving.set(false); this.tErrors.set(errorsOf(e)); },
    });
  }

  protected togglePublished(t: Testimonial): void {
    this.api.saveTestimonial({ id: t.id, is_published: !t.is_published }).subscribe(() => this.load());
  }

  protected removeTestimonial(t: Testimonial): void {
    if (!confirm(`Törlöd ${t.name} véleményét?`)) return;
    this.api.removeTestimonial(t.id).subscribe(() => this.load());
  }

  protected pickLogo(event: Event): void {
    this.pLogo.set((event.target as HTMLInputElement).files?.[0] ?? null);
  }

  protected addPartner(form: HTMLFormElement): void {
    this.saving.set(true);
    this.api.savePartner({ name: this.pDraft().name, url: this.pDraft().url || null }, this.pLogo()).subscribe({
      next: () => { this.saving.set(false); this.pDraft.set({ name: '', url: '' }); this.pLogo.set(null); this.pErrors.set({}); form.reset(); this.load(); },
      error: (e) => { this.saving.set(false); this.pErrors.set(errorsOf(e)); },
    });
  }

  protected togglePartner(p: Partner): void {
    this.api.savePartner({ id: p.id, is_published: !p.is_published, url: p.url }, null).subscribe(() => this.load());
  }

  protected removePartner(p: Partner): void {
    if (!confirm(`Törlöd a(z) ${p.name} partnert?`)) return;
    this.api.removePartner(p.id).subscribe(() => this.load());
  }
}
