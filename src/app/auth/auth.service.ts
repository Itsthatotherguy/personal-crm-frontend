import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponse } from './responses/auth.response';
import { SignupRequest } from './requests/signup.request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { LoginRequest } from './requests/login.request.ts';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user = new BehaviorSubject<User>(null);

    constructor(private httpClient: HttpClient, private router: Router) {}

    signup(signupRequest: SignupRequest) {
        return this.httpClient
            .post<AuthResponse>('auth/signup', signupRequest)
            .pipe(
                catchError(this.handleError),
                tap((responseData) => {
                    this.handleAuthentication(
                        responseData.accessToken,
                        responseData.expiresIn
                    );
                })
            );
    }

    login(loginRequest: LoginRequest): Observable<AuthResponse> {
        return this.httpClient
            .post<AuthResponse>('auth/login', loginRequest)
            .pipe(
                catchError(this.handleError),
                tap((responseData) => {
                    this.handleAuthentication(
                        responseData.accessToken,
                        responseData.expiresIn
                    );
                })
            );
    }

    autoLogin() {
        const userData: {
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        const loadedUser = new User(
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['auth/login']);
        localStorage.removeItem('userData');
    }

    private handleAuthentication(accessToken: string, expiresIn): void {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
        const user = new User(accessToken, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.mesage) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.message) {
        }
        return throwError(errorMessage);
    }
}
