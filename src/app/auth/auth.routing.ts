import { ActivatedRouteSnapshot,
    CanActivateFn,
    RouterStateSnapshot,
    Routes } from '@angular/router';
import { AuthenticationGuard } from '../shared/guard/auth.guard';
import { inject } from '@angular/core';
import { LoginComponent } from "./component/login/login.component";
import { RegisterComponent } from "./component/register/register.component";
import { authComponent } from './auth.component';

const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthenticationGuard).isAuthenticated(route, state);
};

export const AuthRoute : Routes = [
  {
      path: '',
      providers: [AuthenticationGuard],
      // canActivate: [canActivate],
      // canActivateChild: [canActivate],
      component: authComponent,
      children: [
          {
              path: 'register',
              component: RegisterComponent
          },
          {
            path: 'login',
            component: LoginComponent
          },
          {
              path: '',
              redirectTo: 'login',
              pathMatch: 'full'
          }
      ]
  }
]

// export const registerRoutes: Route[] = [
//   {
//     path: '',
//     component: RegisterComponent
//   }
// ]

// export const loginRoutes: Routes = [
//   {
//     path: '',
//     component: LoginComponent
//   }
// ]