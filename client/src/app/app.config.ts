import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http'; 
import { customInterceptor } from './service/custom.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([customInterceptor])),
    importProvidersFrom(
      MatCardModule, 
      MatButtonModule,
      MatGridListModule, 
      MatFormFieldModule, 
      MatInputModule,
      HttpClientModule 
    )



  ]
};
