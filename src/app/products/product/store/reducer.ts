import { ProductStateInterface } from "../type/productState.interface";
import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductsAction } from "./action";
import { state } from "@angular/animations";


const initialState: ProductStateInterface = {
    isLoading: false,
    error: null,
    data: null,
    singleProduct: null,
    addedProduct: null
}

const productFeature = createFeature({
    name: 'product',
    reducer: createReducer(
        initialState,
        on(ProductsAction.getAllProductsAction, (state) => (
            {
                ...state,
                isLoading: true
            }
        )),
        on(ProductsAction.getAllProductsActionSuccess, (state, action) => (
            {
                ...state,
                isLoading: false,
                data: action.products
            }
        )),
        on(ProductsAction.getAllProductsActionFailuer, (state, action) => (
            {
                ...state,
                data: [],
                error: action.error
            }
        )),
        on(ProductsAction.getSingleProductAction, (state) => (
            {
                ...state,
                isLoading: true
            }
        )),
        on(ProductsAction.getSingleProductActionSuccess, (state, action) => (
            {
                ...state,
                isLoading: false,
                singleProduct: action.product
            }
        )),
        on(ProductsAction.getSingleProductActionFailure, (state, action) => (
            {
                ...state, 
                isLoading: false,
                singleProduct: null,
                error: action.error
                
            }
        )),
        on(ProductsAction.getCreateProductAction, (state) => (
            {
                ...state,
                isLoading: true,

            }
        )),
        on(ProductsAction.getCreateProductActionSuccess, (state, action) => (
            {
                ...state,
                isLoading: false
            }
        ))
    )
})

export const {
    name: productFeatureKey,
    reducer: productReducer,
    selectIsLoading,
    selectError,
    selectData,
    selectSingleProduct
} = productFeature