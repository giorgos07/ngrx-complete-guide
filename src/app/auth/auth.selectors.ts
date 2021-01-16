import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const getAuthState = createFeatureSelector<AuthState>('auth');
// Tip: Selectors are in fact memorized functions.
export const isLoggedIn = createSelector(getAuthState, (authState: AuthState) => !!authState.user);
