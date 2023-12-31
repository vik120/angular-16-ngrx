import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Route, RouterStateSnapshot, Routes } from '@angular/router';
import { AddProductComponent } from './products/product/add-products/add-products.component';
import { AuthenticationGuard } from './shared/guard/auth.guard';


const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthenticationGuard).isAuthenticated(route, state);
};


export const AppRoute: Route[] = [
  // {
  //   path: 'register',
  //   loadChildren: () => import('src/app/auth/auth.routing').then((m) => m.registerRoutes),
  //   canActivate: [!canActivate]
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('src/app/auth/auth.routing').then((m) => m.loginRoutes),
  //   canActivate: [!canActivate]
  // },
  {
    path: 'auth',
    loadChildren: () => import('src/app/auth/auth.routing').then((m) => m.AuthRoute),
  },
  {
    path: 'products',
    loadChildren: () => import ('src/app/products/product.routing').then((m) => m.ProductsRoute),
  },

  {
    path: 'products/new',
    component: AddProductComponent
},

  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  }
]