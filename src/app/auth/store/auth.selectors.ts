import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
    fromAuth.authFeatureKey
);

export const selectUser = createSelector(
    selectAuthState,
    (state) => state.user
);

export const selectAuthenticating = createSelector(
    selectAuthState,
    (state) => state.isAuthenticating
);

export const selectAuthErrors = createSelector(
    selectAuthState,
    (state) => state.authErrors
);
