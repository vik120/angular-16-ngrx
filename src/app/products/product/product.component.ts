import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
    selector: 'product.component.ts',
    template: '<router-outlet></router-outlet>',
    imports: [
    CommonModule,
    RouterModule,
    RouterOutlet
    ],
    standalone: true
})

export class ProductComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}