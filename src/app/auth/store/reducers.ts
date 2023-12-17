import { createFeature, createReducer, on } from "@ngrx/store";
import { authActions } from './action';

const intialState = {
    isSubmitting: false
}

const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        intialState, 
        on(authActions.loginAction, (state) => ({...state, isSubmitting: true}))
    )
})

export const {
    name: authFeatureKey,
    reducer: authReducer,
    selectIsSubmitting
  }  = authFeature
 