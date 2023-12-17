import { Route, Routes } from '@angular/router';

export const AppRoute: Route[] = [
  {
    path: 'register',
    loadChildren: () => import('src/app/auth/auth.routing').then((m) => m.registerRoutes)
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/auth/auth.routing').then((m) => m.loginRoutes)
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
]