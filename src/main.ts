/// <reference types="@angular/localize" />

import { provideHttpClient } from '@angular/common/http';
import { isDevMode, Type } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { provideState, provideStore, Store } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppRoute } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { authFeatureKey, authReducer } from './app/auth/store/reducers';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './app/auth/store/effects';
// const authEffectsType: Type<any> = authEffects;
export function getEffects() {
  return [authEffects];
}
  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      provideRouter(AppRoute),
      provideStore(),
      provideState(authFeatureKey, authReducer),
      provideEffects(authEffects),
      provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
        autoPause: true,
        trace: false,
        traceLimit: 75,
      }),
     
    ]
  })
