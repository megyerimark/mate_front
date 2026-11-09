import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Az oldal saját vonalas ikonjai. A zöld körvonal a fő szín, a `w` osztályú részletek arany.
 * Csak ebben a fájlban rögzített jelölés kerül az innerHTML-be, felhasználói adat soha.
 */
const ICONS: Record<string, string> = {
  document: `
    <path d="M7 3h7l5 5v12.5a.5.5 0 0 1-.5.5h-11.5a.5.5 0 0 1-.5-.5v-17a.5.5 0 0 1 .5-.5z"/>
    <path d="M14 3v5h5"/><path d="M9 11.5h6"/><path d="M9 14.5h3.5"/>
    <circle class="w" cx="15.5" cy="17.5" r="2"/>`,
  legal: `
    <path d="M12 5v15"/><path d="M8 20h8"/><path d="M5 7.5h14"/>
    <path d="M5 7.5l-2.5 5.5a2.5 2.5 0 0 0 5 0z"/><path d="M19 7.5l-2.5 5.5a2.5 2.5 0 0 0 5 0z"/>
    <circle class="w" cx="12" cy="4" r="1.3"/>`,
  technical: `
    <circle cx="12" cy="12" r="3.2"/>
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>
    <circle class="w" cx="12" cy="12" r="1"/>`,
  finance: `
    <path d="M4 20V4"/><path d="M4 20h16"/>
    <path d="M7.5 15.5l4-4.5 3 3 5-6"/>
    <circle class="w" cx="19.5" cy="8" r="1.4"/>`,
  medical: `
    <rect x="3.5" y="3.5" width="17" height="17" rx="4"/>
    <path class="w" d="M12 8v8M8 12h8"/>`,
  marketing: `
    <path d="M4 10v4a1 1 0 0 0 1 1h2l6 4V5L7 9H5a1 1 0 0 0-1 1z"/>
    <path d="M7 15l1 4.5"/>
    <path class="w" d="M17 9.5a3.5 3.5 0 0 1 0 5M19.5 7a7 7 0 0 1 0 10"/>`,
  lock: `
    <rect x="5" y="10.5" width="14" height="10" rx="2"/>
    <path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/>
    <circle class="w" cx="12" cy="15.5" r="1.4"/>`,
  web: `
    <circle cx="12" cy="12" r="9"/><path d="M12 3a13.5 13.5 0 0 1 0 18"/><path d="M12 3a13.5 13.5 0 0 0 0 18"/>
    <path class="w" d="M3.5 9h17M3.5 15h17"/>`,
  proofread: `
    <circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5l5 5"/>
    <path class="w" d="M7.8 10.6l1.9 1.9 3.6-3.8"/>`,
  interpret: `
    <path d="M4 4.5h10.5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"/>
    <path class="w" d="M18.5 8.5H20a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1v3l-3-3h-4.5a1 1 0 0 1-1-1v-.5"/>`,
  award: `
    <circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5"/>
    <path class="w" d="M10 9l1.5 1.5L14.5 7.5"/>`,
  quality: `
    <path d="M12 3l7 3v5.5c0 4.3-3 8-7 9.5-4-1.5-7-5.2-7-9.5V6l7-3z"/>
    <path class="w" d="M8.8 12l2.2 2.2 4.3-4.6"/>`,
  reliable: `
    <circle cx="12" cy="13" r="7.5"/><path d="M12 9v4.2l2.6 1.6"/><path d="M9.5 2.5h5"/>
    <path class="w" d="M18.5 5.5l1.5-1.5"/>`,
  diploma: `
    <rect x="3" y="5" width="18" height="12" rx="1"/><path d="M7 9.5h7M7 12.5h4.5"/>
    <circle class="w" cx="17" cy="14" r="2.2"/><path class="w" d="M16 16l-.6 3.5 1.6-1 1.6 1-.6-3.5"/>`,
  coherence: `
    <circle cx="8.5" cy="12" r="5"/><circle cx="15.5" cy="12" r="5"/>
    <path class="w" d="M12 8.6a5 5 0 0 1 0 6.8 5 5 0 0 1 0-6.8z"/>`,
  target: `
    <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/>
    <circle class="w" cx="12" cy="12" r="1.4"/>`,
  fast: `
    <path d="M13 2.5L5 13.5h6l-1 8 8-11h-6l1-8z"/>
    <path class="w" d="M2.5 8h3M1.5 12h2.5M2.5 16h3"/>`,
  cost: `
    <ellipse cx="10" cy="7" rx="6" ry="2.5"/><path d="M4 7v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7"/>
    <path d="M4 11v4c0 1.4 2.7 2.5 6 2.5"/>
    <circle class="w" cx="17" cy="17" r="4"/><path class="w" d="M15.6 17.4l1 1 2-2.2"/>`,
  ai: `
    <rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 2.5v2.5M15 2.5v2.5M9 19v2.5M15 19v2.5M2.5 9H5M2.5 15H5M19 9h2.5M19 15h2.5"/>
    <path class="w" d="M9 15l1.8-6h.4L13 15M9.7 12.8h2.6M15 9v6"/>`,
  consecutive: `
    <path d="M3.5 5h9a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H8l-3 2.5V12H3.5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/>
    <path class="w" d="M20.5 12h-9a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1H16l3 2.5V18h1.5a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z"/>`,
  simultaneous: `
    <path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2.5" y="13.5" width="4" height="6" rx="1.5"/><rect x="17.5" y="13.5" width="4" height="6" rx="1.5"/>
    <path class="w" d="M10 17.5h4M12 15.5v4"/>`,
  remote: `
    <rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8.5 20h7M12 16v4"/>
    <circle class="w" cx="12" cy="9" r="2"/><path class="w" d="M8.8 13.5a3.5 3.5 0 0 1 6.4 0"/>`,
  whisper: `
    <path d="M8 18.5a6.5 6.5 0 1 1 7.5-6.4c0 2.4-2 3-2 5.2a2.6 2.6 0 0 1-4.8 1.3"/><path d="M10.5 11.5a2 2 0 1 1 3.4 1.4"/>
    <path class="w" d="M18.5 5.5a6 6 0 0 1 0 6M20.8 3.5a9 9 0 0 1 0 10"/>`,
  upload: `
    <path d="M7 3h7l5 5v12.5a.5.5 0 0 1-.5.5h-11.5a.5.5 0 0 1-.5-.5v-17a.5.5 0 0 1 .5-.5z"/><path d="M14 3v5h5"/>
    <path class="w" d="M12 17.5v-6M9.5 14l2.5-2.5 2.5 2.5"/>`,
  translate: `
    <path d="M3 5.5h9M7.5 3.5v2M5 5.5c.8 3.2 3 5.6 6 7M10 5.5c-.8 3.2-3 5.6-6 7"/>
    <path class="w" d="M12.5 20.5l4-9 4 9M14 17.5h5"/>`,
  send: `
    <path d="M21 3L10.5 13.5"/><path d="M21 3l-6.5 18-4-7.5-7.5-4L21 3z"/>
    <path class="w" d="M3 21l4-4"/>`,
  bell: `
    <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2H4.5l1.5-2z"/>
    <path class="w" d="M10 20.5a2 2 0 0 0 4 0"/>`,
  phone: `<path d="M5 3.5h3l2 5-2.5 1.5a11 11 0 0 0 5.5 5.5L14.5 13l5 2v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3 5.5a2 2 0 0 1 2-2z"/>`,
  mail: `<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>`,
  clock: `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>`,
};

@Component({
  selector: 'app-icon',
  template: `<span class="icon-svg" [innerHTML]="svg()"></span>`,
  styles: `
    :host { display: inline-grid; place-items: center; }
    .icon-svg { display: contents; }
  `,
})
export class Icon {
  readonly name = input.required<string>();
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly svg = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[this.name()] ?? ''}</svg>`,
    ),
  );
}
