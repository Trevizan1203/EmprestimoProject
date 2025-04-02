import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi
} from '@angular/common/http';

export const TokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const allowedRoutes = ['/users', '/users/login'];

  if (!allowedRoutes.some(route => req.url.includes(route))) {
    console.log('teste')
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    return next(clonedReq);
  }
  return next(req);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        TokenInterceptor
      ]),
      withInterceptorsFromDi()
    ),
  ]
};
