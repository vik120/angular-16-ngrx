import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, Observable, of, switchMap, tap } from "rxjs";
import { backeneErrorInterface } from "src/app/shared/types/backendError.interface";
import { AuthService } from '../services/auth.service';
import { tokenInterface } from "../type/token.interface";
import { authActions } from "./action";
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { Router } from "@angular/router";
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { Store } from '@ngrx/store';

export const loginEffetcts = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService),
        persistanceService = inject(PersistanceService),
        store = inject(Store)
    ) => {
        return actions$.pipe(
            ofType(authActions.loginAction),
            switchMap(({ request }) => {
                return authService.login(request).pipe(
                    
                    map((token: tokenInterface) => {
                        persistanceService.set('accessToken', token.access_token)
                        persistanceService.set('refreshToken', token.refresh_token)
                        const tokens: tokenInterface = {
                            'access_token': persistanceService.get('accessToken') ? 'set' : 'unset',
                            'refresh_token': persistanceService.get('refreshToken') ? 'set' : 'unset'
                        }
                        
                        return authActions.loginSuccess({ tokens: tokens })
                    }),
                    catchError((err: HttpErrorResponse) => {
                        console.log(err)
                        let error: backeneErrorInterface = err
                        return of(
                            authActions.loginFailure({ errors: err.error })
                        )
                    }) 
                )
                
            })
            
        )
    },
    { functional: true }
)

export const redirectAfterLoginEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(authActions.loginSuccess),
            tap(() => {
                console.log('nvigte')
                router.navigateByUrl('/products')
            })
        )
    },
    { functional: true, dispatch: false }
)

export const getCurrentUserDetails = createEffect(
   ( 
    actions$ = inject(Actions),
    authService = inject(AuthService),
   ) => {
    return actions$.pipe(
        ofType(authActions.getCurrentUserAction),
        switchMap((request:any) => {
            return authService.getCurrentUser().pipe(
                map((user: CurrentUserInterface) => {
                    return authActions.getCurrentUserActionSuccess({currentUser: user})
                })
            )
        })

    )
   },
   { 
       functional: true
   }
)

export const LogoutEffect = createEffect(
    (
        actions$ = inject(Actions),
        router = inject(Router),
        authService = inject(AuthService),
    ) => {
        return actions$.pipe(
            ofType(authActions.logout),
            switchMap(() => {
                return of(authService.logout()).pipe(
                    tap(() => {
                        router.navigate(['/auth/'])
                    })
                )
            })
        )
    },{
        functional: true,
        dispatch: false
    }
)