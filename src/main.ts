/// <reference types="@angular/localize" />

import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom, isDevMode, Type } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { provideState, provideStore, Store } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppRoute } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { authFeatureKey, authReducer } from './app/auth/store/reducers';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './app/auth/store/effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AuthInterceptor } from './app/shared/services/auth.interceptor'; 
import { productFeatureKey, productReducer } from './app/products/product/store/reducer';
import * as productEffect  from './app/products/product/store/effects';

  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      importProvidersFrom(BrowserModule, HttpClientModule),
      provideRouter(AppRoute),
      provideStore(),
      provideState(authFeatureKey, authReducer),
      provideState(productFeatureKey, productReducer),
      // provideState(authFeatureKey, authReducer),
      provideEffects(
        authEffects,
        productEffect
      ),
      provideStoreDevtools({
        maxAge: 125,
        logOnly: !isDevMode(),
        autoPause: true,
        trace: false,
        traceLimit: 175,
      }),
      provideAnimations(), // required animations providers
      provideToastr(),
      provideHttpClient(
        withInterceptors([AuthInterceptor])
      ),
    ]
  }).catch((err) => console.error(err));
