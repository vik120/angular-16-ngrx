import { AppProducts } from './products.component';
import { ActivatedRouteSnapshot,
    CanActivateFn,
    RouterStateSnapshot,
    Routes } from '@angular/router';
import { AuthenticationGuard } from '../shared/guard/auth.guard';
import { inject } from '@angular/core';
import { CategoryComponent } from './categories/categories.component';
import { AllProducts } from './product/all-products/allProducts.component';
import { AddProductComponent } from './product/add-products/add-products.component';

const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    return inject(AuthenticationGuard).isAuthenticated(route, state);
};

export const ProductsRoute : Routes = [
    {
        path: '',
        providers: [AuthenticationGuard],
        canActivate: [canActivate],
        canActivateChild: [canActivate],
        component: AppProducts,
        children: [
            {
                path: 'category',
                loadChildren: () => import('./categories/catgories.routing').then((m) => m.categoriesRouting)
            },
            {
                path: '',
                loadChildren: () => import('./product/products.routing').then((m)=> m.productsRoute)
            },
            // {
            //     path: 'new',
            //     component: AddProductComponent
            // }
        ]
    }
]