import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { UrlSerializer, provideRouter, withInMemoryScrolling } from '@angular/router';

import { adminInterceptor } from './admin/admin.interceptor';
import { routes } from './app.routes';
import { TrailingSlashUrlSerializer } from './trailing-slash';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([adminInterceptor])),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    { provide: UrlSerializer, useClass: TrailingSlashUrlSerializer },
  ],
};
