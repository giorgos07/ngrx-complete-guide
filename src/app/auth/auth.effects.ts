import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './action-types';
import { LocalStorageKeys } from '../local-storage-keys';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private router: Router
    ) { }

    public login$ = createEffect(() => this.actions.pipe(
        ofType(AuthActions.login),
        tap(action => localStorage.setItem(LocalStorageKeys.User, JSON.stringify(action.user)))
    ), { dispatch: false });

    public logout$ = createEffect(() => this.actions.pipe(
        ofType(AuthActions.logout),
        tap(_ => {
            localStorage.removeItem(LocalStorageKeys.User);
            this.router.navigateByUrl('/');
        })
    ), { dispatch: false });
}
