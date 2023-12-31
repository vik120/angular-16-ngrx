import { tokenInterface } from "./token.interface";
import { backeneErrorInterface } from '../../shared/types/backendError.interface';

export interface AuthStateInterface {
    isSubmitting: boolean,
    tokens: tokenInterface | null | undefined,
    authResult: boolean,
    isLoading: boolean,
    validationErrors: backeneErrorInterface,
    currentUser: any
}