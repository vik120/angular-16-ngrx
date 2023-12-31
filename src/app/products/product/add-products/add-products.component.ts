import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ProductsAction } from '../store/action';

@Component({
    selector: 'add-products',
    templateUrl: 'add-products.component.html',
    standalone: true,
    imports: [
    
    FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]
})

export class AddProductComponent implements OnInit {

    addProductForm = this.fb.nonNullable.group({
        categoryId: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        images: this.fb.array([this.getImage()])
    })

    activeModal = inject(NgbActiveModal);
    
    constructor(private fb: FormBuilder, private store: Store) { }

    ngOnInit() { }

    getImage():FormGroup {
        return this.fb.group({
            imgbox: ['', [Validators.required]]
        })
    }

    get imageArr(): FormArray {
		return this.addProductForm.get('images') as FormArray;
	}

    removeBook(i: number) {
        this.imageArr.removeAt(i);
    }

    addImage() {
        const img = this.getImage()
        this.imageArr.push(img)
    }

    onSubmit() {
        let formValue = this.addProductForm.value
        let imgArr = []
        formValue.images.forEach(element => {
            imgArr.push(element.imgbox)
        });
        formValue.images = imgArr
        
       this.store.dispatch(ProductsAction.getCreateProductAction({request: formValue}))
       this.activeModal.close()
      }

}