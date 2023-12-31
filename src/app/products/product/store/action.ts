import { createActionGroup } from '@ngrx/store';
import { props } from '@ngrx/store';
import { Product } from '../type/product.interface';
import { emptyProps } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductFromValueState } from '../type/ProductFromValueState.interface';

export const ProductsAction = createActionGroup({
    source: 'products',
    events: {
        getAllProductsAction: emptyProps(),
        getAllProductsActionSuccess: props<{products: Product[]}>(),
        getAllProductsActionFailuer: props<{error: HttpErrorResponse}>(),

        getSingleProductAction: props<{param: any}>(),
        getSingleProductActionSuccess: props<{product: Product}>(),
        getSingleProductActionFailure: props<{error: HttpErrorResponse}>(),

        getCreateProductAction: props<{request: any}>(),
        getCreateProductActionSuccess: props<{product: Product}>(),
        getCreateProductActionFailure: props<{error: HttpErrorResponse}>
    }
})
