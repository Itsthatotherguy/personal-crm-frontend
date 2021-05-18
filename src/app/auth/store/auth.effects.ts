import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
    catchError,
    switchMap,
    map,
    mergeMap,
    tap,
    take,
} from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginStart),
            switchMap((action) =>
                this.authService.login(action.loginRequest).pipe(
                    map((responseData) => {
                        const user = this.handleAuthentication(
                            responseData.accessToken,
                            responseData.expiresIn
                        );

                        return AuthActions.authSuccess({
                            user,
                            redirect: true,
                        });
                    }),
                    catchError((errors: string[]) =>
                        of(AuthActions.authFail({ errors }))
                    )
                )
            )
        )
    );

    signup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.signupStart),
            switchMap((action) =>
                this.authService.signup(action.signupRequest).pipe(
                    map((responseData) => {
                        const user = this.handleAuthentication(
                            responseData.accessToken,
                            responseData.expiresIn
                        );

                        return AuthActions.authSuccess({
                            user,
                            redirect: true,
                        });
                    }),
                    catchError((errors: string[]) =>
                        of(AuthActions.authFail({ errors }))
                    )
                )
            )
        )
    );

    authSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.authSuccess),
                tap((action) => {
                    if (action.redirect) {
                        this.router.navigate(['/']);
                    }
                })
            ),
        { dispatch: false }
    );

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.autoLogin),
            map(() => {
                const userData: {
                    _token: string;
                    _tokenExpirationDate: string;
                } = JSON.parse(localStorage.getItem('userData'));

                if (!userData) {
                    return AuthActions.logout();
                }

                const loadedUser = new User(
                    userData._token,
                    new Date(userData._tokenExpirationDate)
                );

                if (loadedUser.token) {
                    return AuthActions.authSuccess({
                        user: loadedUser,
                        redirect: false,
                    });
                }

                return AuthActions.logout();
            })
        );
    });

    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logout),
                tap(() => {
                    this.router.navigate(['/auth']);
                    localStorage.removeItem('userData');
                })
            ),
        { dispatch: false }
    );

    private handleAuthentication(accessToken: string, expiresIn): User {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );

        const user = new User(accessToken, expirationDate);

        localStorage.setItem('userData', JSON.stringify(user));

        return user;
    }

    // deleteCustomer$ = createEffect(() =>
    //       this.actions$.pipe(
    //           ofType(CustomerActions.deleteCustomerStart),
    //           concatLatestFrom(() =>
    //               this.store.pipe(select(selectCurrentCustomerId))
    //           ),
    //           mergeMap(([action, currentCustomerId]) =>
    //               this.customerService.deleteCustomer(currentCustomerId).pipe(
    //                   map(() => CustomerActions.deleteCustomerSuccess()),
    //                   catchError((errors: string[]) =>
    //                       of(CustomerActions.deleteCustomerFail({ errors }))
    //                   )
    //               )
    //           )
    //       )
    //   );
}
