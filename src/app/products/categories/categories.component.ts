import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
    selector: 'product-categories',
    template: '<router-outlet></router-outlet>',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        RouterLink
    ]
})

export class CategoryComponent {
    constructor() { }
}