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

    signup(signupRequest: SignupRequest): Observable<AuthResponse> {
        console.log(signupRequest);
        return this.httpClient
            .post<AuthResponse>('auth/signup', signupRequest)
            .pipe(
                catchError(this.handleErrorMessages.bind(this)),
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
                catchError(this.handleErrorMessages.bind(this)),
                tap((responseData) => {
                    this.handleAuthentication(
                        responseData.accessToken,
                        responseData.expiresIn
                    );
                })
            );
    }

    autoLogin(): void {
        const userData: {
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);
        }
    }

    logout(): void {
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

    private handleErrorMessages(
        errorResponse: HttpErrorResponse
    ): Observable<never> {
        console.log(errorResponse);

        let errorMessages: string[] = [
            'An unknown error has occurred. Please try again in a while.',
        ];

        if (!errorResponse.error || !errorResponse.error.message) {
            return throwError(errorMessages);
        }

        if (Array.isArray(errorResponse.error.message)) {
            const messages = errorResponse.error.message;

            errorMessages = messages.map((errorResponseMessage) =>
                this.determineErrorMessage(errorResponseMessage)
            );
        } else {
            const message = errorResponse.error.message;

            errorMessages = [this.determineErrorMessage(message)];
        }

        return throwError(errorMessages);
    }

    private determineErrorMessage(errorResponseMessage: string): any {
        let errorMessage: string;

        enum AuthErrors {
            DUPLICATE_EMAIL = 'DUPLICATE_EMAIL',
            INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
            UNAUTHORIZED = 'UNAUTHORIZED',
            EMPTY_EMAIL = 'EMPTY_EMAIL',
            EMPTY_PASSWORD = 'EMPTY_PASSWORD',
            EMPTY_NAME = 'EMPTY_NAME',
        }

        switch (errorResponseMessage) {
            case AuthErrors.DUPLICATE_EMAIL:
                errorMessage = 'This email address already exists';
                break;
            case AuthErrors.DUPLICATE_EMAIL:
                errorMessage = 'Please provide valid credentials';
                break;
            case AuthErrors.EMPTY_EMAIL:
                errorMessage = 'Please provide a valid email';
                break;
            case AuthErrors.EMPTY_NAME:
                errorMessage = 'Please provide a name';
                break;
            case AuthErrors.EMPTY_PASSWORD:
                errorMessage = 'Please provide a password';
                break;
            default:
                break;
        }

        return errorMessage;
    }
}
