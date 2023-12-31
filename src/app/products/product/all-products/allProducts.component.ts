import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsAction } from '../store/action';
import { selectError, selectIsLoading, selectData } from '../store/reducer';
import { combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from '../add-products/add-products.component';

@Component({
    selector: 'all-products',
    templateUrl: 'allProducts.component.html',
    standalone: true,
    imports: [
        AddProductComponent,
        CommonModule,
        RouterModule
    ]
})

export class AllProducts {
    
    private modalService = inject(NgbModal);

    data$ = combineLatest(
        {
            loading$: this.store.select(selectIsLoading),
            error$: this.store.select(selectError),
            products$: this.store.select(selectData)
        }
    )
    constructor(private store: Store, config: NgbModalConfig) { 
        this.store.dispatch(ProductsAction.getAllProductsAction())
        config.backdrop = 'static';
		config.keyboard = false;
    }

    open() {
		const modalRef = this.modalService.open(AddProductComponent);
	}
}