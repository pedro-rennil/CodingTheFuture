import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
// MUDANÇA AQUI: Trocamos 'animations/async' por apenas 'animations'
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    // MUDANÇA AQUI: Usamos a função padrão, que é mais estável para deploy
    provideAnimations(),
    provideHttpClient()
  ]
};