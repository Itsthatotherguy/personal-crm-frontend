import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Customer } from './customer.model';
import { UpdateCustomerRequest } from './dto/requests/update-customer.request';
import { CreateCustomerRequest } from './dto/requests/create-customer.request';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    customersChanged = new Subject<Customer[]>();
    filterStringHasChanged = new Subject<string>();
    private nextId = 3;

    // private customers: Customer[] = [
    //     {
    //         id: 1,
    //         name: 'Chris',
    //         email: 'chrisvdm0410@gmail.com',
    //         phoneNumber: '074 066 9832',
    //     },
    //     {
    //         id: 2,
    //         name: 'Melanie',
    //         email: 'kennedy.melanie.mk@gmail.com',
    //         phoneNumber: '076 307 2380',
    //     },
    // ];

    private customers: Customer[] = [];

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) {}

    private setCustomers(customers: Customer[]): void {
        this.customers = customers;
        this.customersChanged.next(this.customers.slice());
    }

    getCustomers(): Observable<Customer[]> {
        return this.httpClient.get<Customer[]>('customers').pipe(
            catchError(this.handleErrorMessages),
            tap((customers) => {
                this.setCustomers(customers);
            })
        );
    }

    getCustomer(id: string): Customer {
        // return this.httpClient.get<Customer>(`customers/${id}`);
        return this.customers.find((customer) => customer.id === id);
    }

    createCustomer(
        createCustomerRequest: CreateCustomerRequest
    ): Observable<Customer> {
        return this.httpClient
            .post<Customer>('customers', createCustomerRequest)
            .pipe(
                catchError(this.handleErrorMessages.bind(this)),
                tap((newCustomer: Customer) => {
                    this.customers.push(newCustomer);
                    this.customersChanged.next(this.customers.slice());
                })
            );
    }

    updateCustomer(
        id: string,
        updateCustomerRequest: UpdateCustomerRequest
    ): Observable<Customer> {
        return this.httpClient
            .put<Customer>(`customers/${id}`, updateCustomerRequest)
            .pipe(
                catchError(this.handleErrorMessages),
                tap((updatedCustomer: Customer) => {
                    this.customers = this.customers.map((customer) => {
                        if (customer.id === updatedCustomer.id) {
                            return updatedCustomer;
                        } else {
                            return customer;
                        }
                    });

                    this.customersChanged.next(this.customers.slice());
                })
            );
    }

    deleteCustomer(id: string): Observable<void> {
        return this.httpClient.delete<void>(`customers/${id}`).pipe(
            catchError(this.handleErrorMessages),
            tap(() => {
                this.customers = this.customers.filter(
                    (customer) => customer.id !== id
                );
                this.customersChanged.next(this.customers.slice());
            })
        );
    }

    private handleErrorMessages(
        errorResponse: HttpErrorResponse
    ): Observable<never> {
        const errorMessages = [];

        if (!errorResponse.error || !errorResponse.error.message) {
            return throwError(
                'An unknown error has occurred. Please try again in a while.'
            );
        }

        if (Array.isArray(errorResponse.error.message)) {
            console.log(errorResponse.error.message.length);
            errorResponse.error.message.forEach((errorResponseMessage) => {
                console.log('hit');
                console.log(errorResponseMessage);

                const errorMessage = this.determineErrorMessage(
                    errorResponseMessage
                );
                errorMessages.push(errorMessage);
            });
        } else {
            errorMessages.push(
                this.determineErrorMessage(errorResponse.error.message)
            );
        }

        return throwError(errorMessages);
    }

    private determineErrorMessage(errorResponseMessage: string): any {
        console.log(errorResponseMessage);
        // let errorMessage: string;

        // enum CustomerErrors {
        //     CUSTOMER_NOT_FOUND = 'CUSTOMER_NOT_FOUND',
        //     DUPLICATE_NAME = 'DUPLICATE_NAME',
        //     EMPTY_NAME = 'EMPTY_NAME',
        //     EMPTY_EMAIL = 'EMPTY_EMAIL',
        //     INVALID_EMAIL = 'INVALID_EMAIL',
        //     EMPTY_PHONE_NUMBER = 'EMPTY_PHONE_NUMBER',
        //     INVALID_SEARCH = 'INVALID_SEARCH',
        // }

        // switch (errorResponseMessage) {
        //     case CustomerErrors.DUPLICATE_NAME:
        //         errorMessage = 'A customer with this name already exists';
        //         break;
        //     case CustomerErrors.EMPTY_EMAIL:
        //         errorMessage = 'Please provide an email address';
        //         break;
        //     case CustomerErrors.INVALID_EMAIL:
        //         errorMessage = 'Please provide a valid email address';
        //         break;
        //     case CustomerErrors.EMPTY_PHONE_NUMBER:
        //         errorMessage = 'Please provide a phone number';
        //         break;
        //     case CustomerErrors.EMPTY_NAME:
        //         errorMessage = 'Please provide a name';
        //         break;
        //     default:
        //         break;
        // }

        // return errorMessage;
    }
}
