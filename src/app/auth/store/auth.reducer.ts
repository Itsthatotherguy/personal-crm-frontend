import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
    user: User;
    isAuthenticating: boolean;
    authErrors: string[];
}

export const initialState: State = {
    user: null,
    isAuthenticating: false,
    authErrors: null,
};

export const reducer = createReducer(
    initialState,

    on(AuthActions.loginStart, (state) => ({
        ...state,
        isAuthenticating: true,
        authErrors: null,
    })),

    on(AuthActions.authSuccess, (state, action) => {
        console.log(state);
        console.log(action);
        return {
            ...state,
            isAuthenticating: false,
            user: action.user,
        };
    }),

    on(AuthActions.authFail, (state, action) => ({
        ...state,
        user: null,
        isAuthenticating: false,
        authErrors: action.errors,
    })),

    on(AuthActions.logout, (state) => ({
        ...state,
        user: null,
    })),

    on(AuthActions.signupStart, (state) => ({
        ...state,
        isAuthenticating: true,
        authErrors: null,
    }))
);
