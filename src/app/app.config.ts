import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import {JwtModule} from "@auth0/angular-jwt";
import { MessageService } from 'primeng/api';
import { HttpInterceptorService } from './services/http.interceptor';
import { GlobalmessageService } from './services/globalmessage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimations(),
    MessageService,
    GlobalmessageService,
    importProvidersFrom(JwtModule.forRoot({
      config:{
        tokenGetter:()=>localStorage.getItem("token"),
        allowedDomains:["localhost:7146"],
      }
    })),
    provideHttpClient(withInterceptorsFromDi()),  
    {
        provide:HTTP_INTERCEPTORS,
        useClass:HttpInterceptorService,
        multi:true
    }
  ]
};