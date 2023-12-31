import { inject } from '@angular/core'; 
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { PersistanceService } from '../services/persistance.service';

export class AuthenticationGuard {
  persistanceService = inject(PersistanceService);
  router = inject(Router);

  isAuthenticated(route: ActivatedRouteSnapshot, _: RouterStateSnapshot): boolean {
     
    // if (!this.persistanceService.isAuthenticated()) {
    //   console.log('auth guard')
    //   this.router.navigate(['/']).then();
    //   return false;
    // }

    let isAuthentic = this.persistanceService.isAuthenticated()

    if(isAuthentic ){
      return true;
    } else {
      this.persistanceService.removeToken('accessToken');
      this.router.navigate(['/auth/']);
      return false;
    }
       
  }
}