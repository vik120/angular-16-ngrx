import { state } from "@angular/animations";
import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../type/authState.interface";
import { authActions } from './action';

const intialState: AuthStateInterface = {
    isSubmitting: false,
    isLoading: false,
    tokens: undefined,
    validationErrors: null,
    authResult: false,
    currentUser: null
}

const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        intialState, 
        on(authActions.loginAction, (state) => (
            {
                ...state, 
                isSubmitting: true,
                isLoading: true, 
                validationErrors: null
            }
        )),
        on(authActions.loginSuccess, (state, action) => (
            {
                ...state, 
                isSubmitting: true,
                validationErrors: null,
                tokens: action.tokens,
                authResult: true,
                isLoading: false
            }
        )),

        on(authActions.loginFailure, (state, action) => (
            {
                ...state, 
                isSubmitting: true,
                validationErrors: action.errors,
                tokens: undefined,
                isLoading: false,
                authResult: false
            }
        )),
        on(authActions.getCurrentUserAction, (state, action) => (
            {
                ...state,
            }
        )),
        on(authActions.getCurrentUserActionSuccess, (state, action) => (
             {
                 ...state,
                 currentUser: action.currentUser
             }
        )),
        on(authActions.logout, (state) => (
            {
                ...state,
                ...intialState,
                currentUser: null
            }
        ))
    )
})

export const {
    name: authFeatureKey,
    reducer: authReducer,
    selectIsSubmitting,
    selectIsLoading,
    selectTokens,
    selectValidationErrors,
    selectAuthResult,
    selectCurrentUser
  }  = authFeature
 