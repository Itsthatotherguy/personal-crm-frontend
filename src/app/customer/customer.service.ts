import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Customer } from './store/customer.model';
import { UpdateCustomerRequest } from './dto/requests/update-customer.request';
import { CreateCustomerRequest } from './dto/requests/create-customer.request';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    constructor(private httpClient: HttpClient) {}

    getCustomers(): Observable<Customer[]> {
        return this.httpClient
            .get<Customer[]>('customers')
            .pipe(catchError(this.handleErrorMessages.bind(this)));
    }

    createCustomer(
        createCustomerRequest: CreateCustomerRequest
    ): Observable<Customer> {
        return this.httpClient
            .post<Customer>('customers', createCustomerRequest)
            .pipe(catchError(this.handleErrorMessages.bind(this)));
    }

    updateCustomer(
        id: string,
        updateCustomerRequest: UpdateCustomerRequest
    ): Observable<Customer> {
        return this.httpClient
            .put<Customer>(`customers/${id}`, updateCustomerRequest)
            .pipe(catchError(this.handleErrorMessages.bind(this)));
    }

    deleteCustomer(id: string): Observable<void> {
        return this.httpClient
            .delete<void>(`customers/${id}`)
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

        enum CustomerErrors {
            CUSTOMER_NOT_FOUND = 'CUSTOMER_NOT_FOUND',
            DUPLICATE_NAME = 'DUPLICATE_NAME',
            EMPTY_NAME = 'EMPTY_NAME',
            EMPTY_EMAIL = 'EMPTY_EMAIL',
            INVALID_EMAIL = 'INVALID_EMAIL',
            EMPTY_PHONE_NUMBER = 'EMPTY_PHONE_NUMBER',
            INVALID_SEARCH = 'INVALID_SEARCH',
        }

        switch (errorResponseMessage) {
            case CustomerErrors.DUPLICATE_NAME:
                errorMessage = 'A customer with this name already exists';
                break;
            case CustomerErrors.EMPTY_EMAIL:
                errorMessage = 'Please provide an email address';
                break;
            case CustomerErrors.INVALID_EMAIL:
                errorMessage = 'Please provide a valid email address';
                break;
            case CustomerErrors.EMPTY_PHONE_NUMBER:
                errorMessage = 'Please provide a phone number';
                break;
            case CustomerErrors.EMPTY_NAME:
                errorMessage = 'Please provide a name';
                break;
            default:
                break;
        }

        return errorMessage;
    }
}
