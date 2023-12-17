import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from '../services/auth.service';
import { tokenInterface } from "../type/token.interface";
import { authActions } from "./action";

export const loginEffetcts = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService)
    ) => {
        return actions$.pipe(
            ofType(authActions.loginAction),
            switchMap(({ request }) => {
                return authService.login(request).pipe(
                    map((token: tokenInterface) => {
                        return authActions.loginSuccess(token)
                    }),
                    catchError((err: HttpErrorResponse) => {
                        console.log(err)
                        return of(
                            authActions.loginFailure()
                          )
                    })
                )
            })
        )
    }
)