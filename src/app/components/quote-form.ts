import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, ElementRef, OnInit, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ServiceKey } from '../content/types';
import { QuoteService, ValidationErrorResponse } from '../services/quote.service';
import { RecaptchaService } from '../services/recaptcha.service';
import { SiteService } from '../services/site.service';
import { ACCEPTED_FILES, MAX_FILES, MAX_FILE_MB, MAX_TOTAL_MB } from '../site.config';

/** quote: ajánlatkérés dokumentummal; interpreting: tolmácsolás; spelling: ingyenes helyesírási tanácsadás. */
export type QuoteFormMode = 'quote' | 'interpreting' | 'spelling';

interface PickedFile {
  file: File;
  /** Képeknél előnézet (object URL), egyébként null. */
  preview: string | null;
  ext: string;
}

/** Melyik lépésen van az adott mező (szerverhiba esetén oda lép vissza az űrlap). */
const FIELD_STEP: Record<string, number> = {
  service: 0, interpreting_type: 1, deadline: 1, source_language: 1, target_language: 1, documents: 1, document: 1,
  name: 2, email: 2, phone: 2, message: 2, privacy_accepted: 2,
};

/**
 * Ajánlatkérő. Ajánlatkérésnél és tolmácsolásnál többlépéses (szolgáltatás → részletek → elérhetőség → összefoglaló),
 * helyesírási kérdésnél egyetlen rövid lépés. A backend validáció és a reCAPTCHA változatlan.
 */
@Component({
  selector: 'app-quote-form',
  imports: [ReactiveFormsModule, RouterLink, NgTemplateOutlet],
  templateUrl: './quote-form.html',
})
export class QuoteForm implements OnInit {
  readonly mode = input<QuoteFormMode>('quote');
  readonly service = input<ServiceKey>('translation');
  /** Egyedi azonosító előtag, ha egy oldalon több űrlap is van. */
  readonly idPrefix = input('q');

  private readonly fb = inject(FormBuilder);
  private readonly quotes = inject(QuoteService);
  private readonly router = inject(Router);
  private readonly recaptcha = inject(RecaptchaService);
  private readonly host = inject(ElementRef<HTMLElement>);
  protected readonly site = inject(SiteService);
  protected readonly ui = computed(() => this.site.ui().form);

  protected readonly serviceKeys: ServiceKey[] = ['translation', 'proofreading', 'post_editing', 'interpreting'];
  protected readonly interpretingKeys = ['consecutive', 'simultaneous', 'remote', 'chuchotage', 'other'] as const;
  protected readonly deadlineKeys = ['normal', 'urgent', 'express'] as const;
  protected readonly accept = ACCEPTED_FILES;
  protected readonly limits = { files: MAX_FILES, mb: MAX_FILE_MB, total: MAX_TOTAL_MB };

  protected readonly step = signal(0);
  protected readonly stepCount = 4;
  protected readonly sending = signal(false);
  protected readonly files = signal<PickedFile[]>([]);
  protected readonly fileError = signal('');
  protected readonly dragging = signal(false);
  protected readonly serverErrors = signal<Record<string, string>>({});
  protected readonly generalError = signal('');

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    service: ['translation' as string],
    interpreting_type: ['consecutive'],
    deadline: ['normal'],
    source_language: [''],
    target_language: [''],
    message: ['', Validators.maxLength(5000)],
    privacy_accepted: [false, Validators.requiredTrue],
    website: [''],
  });

  protected readonly selectedService = signal<string>('translation');
  protected readonly interpreting = computed(() => this.selectedService() === 'interpreting');

  constructor() {
    // A képelőnézetek memóriáját felszabadítjuk.
    inject(DestroyRef).onDestroy(() => this.files().forEach((f) => f.preview && URL.revokeObjectURL(f.preview)));
  }

  ngOnInit(): void {
    const service = this.mode() === 'spelling' ? 'spelling' : this.mode() === 'interpreting' ? 'interpreting' : this.service();
    this.form.controls.service.setValue(service);
    this.selectedService.set(service);
    if (this.mode() === 'spelling') this.form.controls.message.addValidators(Validators.required);
    this.form.controls.service.valueChanges.subscribe((v) => this.selectedService.set(v));
  }

  protected id(name: string): string {
    return `${this.idPrefix()}-${name}`;
  }

  protected invalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return (control.invalid && control.touched) || !!this.serverErrors()[name];
  }

  // ---------- Lépések ----------

  private readonly stepFields: (keyof typeof this.form.controls)[][] = [[], [], ['name', 'email', 'message', 'privacy_accepted'], []];

  protected next(): void {
    const fields = this.stepFields[this.step()];
    fields.forEach((f) => this.form.controls[f].markAsTouched());
    if (fields.some((f) => this.form.controls[f].invalid)) {
      this.focusFirstError();
      return;
    }
    this.goTo(this.step() + 1);
  }

  protected goTo(step: number): void {
    this.step.set(Math.max(0, Math.min(step, this.stepCount - 1)));
    // A lépés tetejére ugrunk, és oda tesszük a fókuszt (képernyőolvasónak is).
    queueMicrotask(() => {
      const panel = this.host.nativeElement.querySelector('.qf-panel') as HTMLElement | null;
      panel?.focus({ preventScroll: true });
      const top = (this.host.nativeElement as HTMLElement).getBoundingClientRect().top;
      if (top < 80) window.scrollBy({ top: top - 100, behavior: 'smooth' });
    });
  }

  protected chooseService(key: ServiceKey): void {
    this.form.controls.service.setValue(key);
  }

  private focusFirstError(): void {
    queueMicrotask(() => (this.host.nativeElement.querySelector('.has-error input, .has-error textarea') as HTMLElement | null)?.focus());
  }

  // ---------- Fájlok ----------

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);
    this.addFiles(Array.from(event.dataTransfer?.files ?? []));
  }

  protected onPick(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.addFiles(Array.from(input.files ?? []));
    input.value = '';
  }

  private addFiles(incoming: File[]): void {
    const t = this.ui().errors;
    const allowed = ACCEPTED_FILES.split(',');
    this.fileError.set('');
    const current = [...this.files()];
    for (const file of incoming) {
      const ext = '.' + (file.name.split('.').pop() ?? '').toLowerCase();
      if (!allowed.includes(ext)) { this.fileError.set(`${file.name}: ${t.badType}`); continue; }
      if (file.size > MAX_FILE_MB * 1024 * 1024) { this.fileError.set(`${file.name}: ${t.fileTooBig(MAX_FILE_MB)}`); continue; }
      if (current.length >= MAX_FILES) { this.fileError.set(t.tooManyFiles(MAX_FILES)); break; }
      const total = current.reduce((s, f) => s + f.file.size, 0) + file.size;
      if (total > MAX_TOTAL_MB * 1024 * 1024) { this.fileError.set(t.totalTooBig(MAX_TOTAL_MB)); break; }
      if (current.some((f) => f.file.name === file.name && f.file.size === file.size)) continue;
      const preview = /^image\/(png|jpe?g)$/.test(file.type) ? URL.createObjectURL(file) : null;
      current.push({ file, preview, ext: ext.slice(1) });
    }
    this.files.set(current);
  }

  protected removeFile(index: number): void {
    const f = this.files()[index];
    if (f?.preview) URL.revokeObjectURL(f.preview);
    this.files.set(this.files().filter((_, i) => i !== index));
    this.fileError.set('');
  }

  protected size(bytes: number): string {
    return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1).replace('.', this.site.lang() === 'hu' ? ',' : '.')} MB`;
  }

  // ---------- Összefoglaló, beküldés ----------

  protected readonly summary = computed(() => {
    this.step(); // a lépés váltásakor frissül
    const v = this.form.getRawValue();
    const t = this.ui();
    const rows: { label: string; value: string; step: number }[] = [
      { label: t.service, value: t.services[v.service as ServiceKey] ?? v.service, step: 0 },
    ];
    if (v.service === 'interpreting') {
      rows.push({ label: t.interpretingType, value: t.interpretingTypes[v.interpreting_type as keyof typeof t.interpretingTypes], step: 1 });
      if (v.target_language) rows.push({ label: t.languagePairs, value: v.target_language, step: 1 });
      rows.push({ label: t.files, value: this.files().map((f) => f.file.name).join(', ') || t.noFiles, step: 1 });
    } else {
      const langs = [v.source_language, v.target_language].filter(Boolean).join(' → ');
      if (langs) rows.push({ label: t.languages, value: langs, step: 1 });
      rows.push({ label: t.deadline, value: t.deadlines[v.deadline as keyof typeof t.deadlines], step: 1 });
      rows.push({ label: t.files, value: this.files().map((f) => f.file.name).join(', ') || t.noFiles, step: 1 });
    }
    rows.push({ label: t.name, value: v.name, step: 2 }, { label: t.email, value: v.email, step: 2 });
    if (v.phone) rows.push({ label: t.phone, value: v.phone, step: 2 });
    if (v.message) rows.push({ label: t.message, value: v.message, step: 2 });
    return rows;
  });

  protected preloadRecaptcha(): void {
    this.recaptcha.preload();
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      if (this.mode() !== 'spelling') this.goTo(2);
      this.focusFirstError();
      return;
    }
    this.sending.set(true);
    this.serverErrors.set({});
    this.generalError.set('');

    const value = this.form.getRawValue();
    const interpreting = value.service === 'interpreting';
    const token = await this.recaptcha.token('quote');
    this.quotes
      .send(
        {
          ...value,
          interpreting_type: interpreting ? value.interpreting_type : '',
          source_language: interpreting ? '' : value.source_language,
          deadline: this.mode() === 'spelling' ? 'normal' : value.deadline,
          locale: this.site.lang(),
          ...(token ? { recaptcha_token: token } : {}),
        },
        this.mode() === 'spelling' ? [] : this.files().map((f) => f.file),
      )
      .subscribe({
        next: () =>
          this.router.navigateByUrl(this.site.link('thanks'), {
            state: { name: value.name.split(' ').slice(-1)[0] || value.name, service: value.service, files: this.files().length },
          }),
        error: (err: HttpErrorResponse) => {
          this.sending.set(false);
          const errors = this.ui().errors;
          if (err.status === 422) {
            const body = err.error as ValidationErrorResponse;
            const flat: Record<string, string> = {};
            for (const [key, messages] of Object.entries(body.errors ?? {})) flat[key.replace(/\.\d+$/, '')] = messages[0];
            this.serverErrors.set(flat);
            // A reCAPTCHA hibának nincs saját mezője: általános hibaként jelenik meg.
            if (flat['recaptcha_token']) this.generalError.set(flat['recaptcha_token']);
            const firstStep = Math.min(...Object.keys(flat).map((k) => FIELD_STEP[k] ?? 3));
            if (this.mode() !== 'spelling' && firstStep < 3) this.goTo(firstStep);
          } else if (err.status === 429) {
            this.generalError.set(errors.tooMany);
          } else {
            this.generalError.set(errors.generic);
          }
        },
      });
  }
}
