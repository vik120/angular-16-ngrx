import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { registerRequestInterface } from "../type/registerRequest.interface";
import { loginRequestInterface } from '../type/loginRequest.interface';
import { tokenInterface } from '../type/token.interface';

// export const registerAction = createAction('[Auth] Register', props<{request: registerRequestInterface}>())


// export const LoginAction = createAction('[Auth] Login', props<{request: loginRequestInterface}>())
// export const LoginActionSuccess = createAction('[Auth] Login Success', props<{request: loginRequestInterface}>())
// export const LoginActionFailure = createAction('[Auth] Login Failure', props<{request: loginRequestInterface}>())

export const authActions = createActionGroup({
    source: 'auth',
    events: {
        RegisterAction: props<{request: registerRequestInterface}>(),
        RegisterSuccess: props<tokenInterface>(),
        RegisterFailure: emptyProps(),
        LoginAction: props<{request: loginRequestInterface}>(),
        LoginSuccess: props<tokenInterface>(),
        LoginFailure: emptyProps()
    }
})