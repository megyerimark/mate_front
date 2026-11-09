import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

interface Grecaptcha {
  ready(cb: () => void): void;
  execute(siteKey: string, options: { action: string }): Promise<string>;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

/**
 * Google reCAPTCHA v3: láthatatlan, a látogatónak nem kell semmit kattintania.
 * A Google szkriptje csak akkor töltődik be, amikor valaki elkezdi kitölteni az űrlapot,
 * így a weboldal betöltését nem lassítja.
 */
@Injectable({ providedIn: 'root' })
export class RecaptchaService {
  private readonly document = inject(DOCUMENT);
  private readonly siteKey = environment.recaptchaSiteKey;
  private loading?: Promise<Grecaptcha | null>;

  /** Előtöltés, pl. az űrlap első érintésekor. */
  preload(): void {
    void this.load();
  }

  /** Token a beküldéshez; null, ha ki van kapcsolva vagy a szkript nem töltődött be (a szerver dönt). */
  async token(action: string): Promise<string | null> {
    const grecaptcha = await this.load();
    if (!grecaptcha) return null;
    try {
      return await new Promise<string>((resolve, reject) =>
        grecaptcha.ready(() => grecaptcha.execute(this.siteKey, { action }).then(resolve, reject)),
      );
    } catch {
      return null;
    }
  }

  private load(): Promise<Grecaptcha | null> {
    const win = this.document.defaultView;
    if (!this.siteKey || !win) return Promise.resolve(null);
    this.loading ??= new Promise((resolve) => {
      const script = this.document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(this.siteKey)}`;
      script.async = true;
      script.onload = () => resolve(win.grecaptcha ?? null);
      script.onerror = () => {
        this.loading = undefined; // következő próbálkozásnál újra
        resolve(null);
      };
      this.document.head.appendChild(script);
      setTimeout(() => resolve(win.grecaptcha ?? null), 8000);
    });
    return this.loading;
  }
}
