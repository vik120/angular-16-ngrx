import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ProductsAction } from '../store/action';
import { selectError, selectIsLoading, selectSingleProduct } from '../store/reducer';
import { combineLatest } from 'rxjs';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'single-product',
    templateUrl: 'single-product.component.html',
    standalone: true,
    imports: [
        CommonModule,
        NgbCarouselModule
    ]
})

export class SingleProductComponent implements OnInit {

    productId = this.route.snapshot.paramMap.get('id') ?? ''

    data$ = combineLatest(
        {
            isLoading$: this.store.select(selectIsLoading),
            isError$: this.store.select(selectError),
            isSingleProduct: this.store.select(selectSingleProduct)
        }
    )

    constructor(private store: Store, private route: ActivatedRoute) { }
    ngOnInit():void { 
        this.store.dispatch(ProductsAction.getSingleProductAction({param: this.productId}))
    }

   
}