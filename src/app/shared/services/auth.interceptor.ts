import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpInterceptorFn
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersistanceService } from './persistance.service';

export const AuthInterceptor : HttpInterceptorFn = (request, next) => {
  const persistanceService = inject(PersistanceService)
    const token = persistanceService.get('accessToken')

  if (token) {
      const cloned = request.clone({
          headers: request.headers.set("Authorization",
              "Bearer " + token)
      });

      return next(cloned);
  }
  else {
      return next(request);
  }

}
