import { Route, Routes } from "@angular/router";
import { AddProductComponent } from "./add-products/add-products.component";
import { AllProducts } from "./all-products/allProducts.component";
import { ProductComponent } from "./product.component";
import { SingleProductComponent } from "./single-product/single-product.component";

export const productsRoute: Routes = [
    {
        path: '',
        component: ProductComponent,
        children: [
            {
                path: '',
                component: AllProducts
            },
            {
                path: 'item/:id',
                component: SingleProductComponent
            }
        ]
    }
    
]