import { createEffect, Actions } from '@ngrx/effects';
import { inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ofType } from '@ngrx/effects';
import { ProductsAction } from './action';
import { map, switchMap, catchError, of, tap } from 'rxjs';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';

export const ProductEffect = createEffect(
    (
        action$ = inject(Actions),
        productsService = inject(ProductsService),
        persistanceService = inject(PersistanceService),
        toaster= inject(ToastrService)
    ) => {
        return action$.pipe(
            ofType(ProductsAction.getAllProductsAction),
            switchMap ((request: any) => {
                return productsService.getProducts().pipe(
                    map((response: any) => {
                        return ProductsAction.getAllProductsActionSuccess({products: response})
                    }),
                    catchError((err: any) =>  {
                        toaster.error(err.message)
                        return of (
                            ProductsAction.getAllProductsActionFailuer({error: err})
                        )
                    })
                )
                
            })
        )
    },
    { functional: true }
)

export const getSingleProduct = createEffect(
    (
        action$ = inject(Actions),
        productService = inject(ProductsService),
        toaster= inject(ToastrService)
    ) => {
        return action$.pipe(
            ofType(ProductsAction.getSingleProductAction),
            switchMap(({param}) => {
                return productService.getSingleProduct(param).pipe(
                    map((response: any) => {
                        return ProductsAction.getSingleProductActionSuccess({product: response})
                    }),
                    catchError((err: any) =>  {
                        toaster.error(err.message)
                        return of (
                            ProductsAction.getSingleProductActionFailure({error: err})
                        )
                    })
                )
            }),
            
        )
    },
    {
        functional: true
    }
)

export const postProduct = createEffect(
    (
        action$ = inject(Actions),
        productService= inject(ProductsService),
        store = inject(Store)
    ) =>{
        return action$.pipe(
            ofType(ProductsAction.getCreateProductAction),
            switchMap(({request}) => {
                return productService.addNewProduct({request}).pipe(
                    map(
                        ({request}) => {
                            return ProductsAction.getCreateProductActionSuccess({product: request})
                        }
                    ),
                    tap(() => {
                        store.dispatch(ProductsAction.getAllProductsAction()) 
                    }),
                    catchError((err: HttpErrorResponse) => {
                        ProductsAction.getCreateProductActionFailure
                        throw err
                    })
                )
            })
        )
    },
    {
        functional: true
    }
)