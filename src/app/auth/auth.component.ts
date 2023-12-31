import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import { PersistanceService } from '../shared/services/persistance.service';

@Component({
    selector: 'app-auth',
    template: '<router-outlet></router-outlet>',
    standalone: true,
    imports: [
    
    RouterOutlet
    ]
})

export class authComponent implements OnInit {
    constructor(private persistance: PersistanceService, private route: Router) { }

    ngOnInit() { 
        if(this.persistance.isAuthenticated()) {
            this.route.navigateByUrl('/products')
        }
    }
}