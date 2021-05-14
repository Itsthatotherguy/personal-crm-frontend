import { catchError } from 'rxjs/operators';
import { AuthResponse } from './responses/auth.response';
import { SignupRequest } from './requests/signup.request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { LoginRequest } from './requests/login.request.ts';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private httpClient: HttpClient) {}

    signup(signupRequest: SignupRequest): Observable<AuthResponse> {
        return this.httpClient
            .post<AuthResponse>('auth/signup', signupRequest)
            .pipe(catchError(this.handleErrorMessages.bind(this)));
    }

    login(loginRequest: LoginRequest): Observable<AuthResponse> {
        return this.httpClient
            .post<AuthResponse>('auth/login', loginRequest)
            .pipe(catchError(this.handleErrorMessages.bind(this)));
    }

    private handleErrorMessages(
        errorResponse: HttpErrorResponse
    ): Observable<never> {
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
            case AuthErrors.INVALID_CREDENTIALS:
                errorMessage = 'Invalid credentials';
                break;
            default:
                break;
        }

        return errorMessage;
    }
}
