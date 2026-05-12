import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withHashLocation, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { headerInterceptor } from './core/interceptors/header-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withViewTransitions(),
      withHashLocation()
    ),
    provideHttpClient(withFetch(), withInterceptors([errorInterceptor , loadingInterceptor , headerInterceptor])),

    provideToastr(),

    importProvidersFrom(NgxSpinnerModule),

    provideAnimations()
  ]
};