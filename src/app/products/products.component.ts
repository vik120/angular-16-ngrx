import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../auth/store/action';
import { AuthenticationGuard } from '../shared/guard/auth.guard';
import { HeaderComponent } from '../shared/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-products',
    template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    `,
    standalone: true,
    imports: [
        HeaderComponent,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule
    ]
    
})

export class AppProducts implements OnInit {
    constructor(private store: Store) { }

    ngOnInit() { 
        this.store.dispatch(authActions.getCurrentUserAction())
    }
}