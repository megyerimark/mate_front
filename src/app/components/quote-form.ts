import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServiceKey } from '../content/types';
import { QuoteService, ValidationErrorResponse } from '../services/quote.service';
import { SiteService } from '../services/site.service';
import { ACCEPTED_FILES, MAX_FILE_MB } from '../site.config';

/** quote: ajánlatkérés dokumentummal; interpreting: tolmácsolás; spelling: ingyenes helyesírási tanácsadás. */
export type QuoteFormMode = 'quote' | 'interpreting' | 'spelling';

@Component({
  selector: 'app-quote-form',
  imports: [ReactiveFormsModule, RouterLink],
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
  protected readonly site = inject(SiteService);
  protected readonly ui = computed(() => this.site.ui().form);

  protected readonly serviceKeys: ServiceKey[] = ['translation', 'proofreading', 'post_editing', 'interpreting'];
  protected readonly interpretingKeys = ['consecutive', 'simultaneous', 'remote', 'chuchotage', 'other'] as const;
  protected readonly deadlineKeys = ['normal', 'urgent', 'express'] as const;
  protected readonly accept = ACCEPTED_FILES;
  protected readonly maxMb = MAX_FILE_MB;

  protected readonly sending = signal(false);
  protected readonly file = signal<File | null>(null);
  protected readonly fileError = signal('');
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

  protected onFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const chosen = input.files?.[0] ?? null;
    this.fileError.set('');
    if (chosen && chosen.size > MAX_FILE_MB * 1024 * 1024) {
      this.fileError.set(this.ui().errors.fileTooBig(MAX_FILE_MB));
      input.value = '';
      this.file.set(null);
      return;
    }
    this.file.set(chosen);
  }

  protected invalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return (control.invalid && control.touched) || !!this.serverErrors()[name];
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sending.set(true);
    this.serverErrors.set({});
    this.generalError.set('');

    const value = this.form.getRawValue();
    const interpreting = value.service === 'interpreting';
    this.quotes
      .send(
        {
          ...value,
          interpreting_type: interpreting ? value.interpreting_type : '',
          deadline: this.mode() === 'spelling' ? 'normal' : value.deadline,
          locale: this.site.lang(),
        },
        this.mode() === 'spelling' || interpreting ? null : this.file(),
      )
      .subscribe({
        next: () => this.router.navigateByUrl(this.site.link('thanks')),
        error: (err: HttpErrorResponse) => {
          this.sending.set(false);
          const errors = this.ui().errors;
          if (err.status === 422) {
            const body = err.error as ValidationErrorResponse;
            const flat: Record<string, string> = {};
            for (const [key, messages] of Object.entries(body.errors ?? {})) flat[key] = messages[0];
            this.serverErrors.set(flat);
          } else if (err.status === 429) {
            this.generalError.set(errors.tooMany);
          } else {
            this.generalError.set(errors.generic);
          }
        },
      });
  }
}
