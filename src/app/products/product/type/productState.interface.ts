import { Product } from "./product.interface";
import { HttpErrorResponse } from '@angular/common/http';

export interface ProductStateInterface {
    isLoading: boolean,
    error: HttpErrorResponse | null,
    data: Product[] | null,
    singleProduct: Product | null,
    addedProduct: Product | null
}   