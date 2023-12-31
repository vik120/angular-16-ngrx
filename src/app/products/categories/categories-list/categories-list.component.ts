import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'categories-list',
    templateUrl: 'categories-list.component.html'
})

export class CategoriesListComponent implements OnInit {
    
    constructor(private store: Store) { }

    ngOnInit() { }
}