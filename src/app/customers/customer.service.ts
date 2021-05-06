import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Customer } from './customer.model';

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

    createCustomer(customer: Customer): Observable<Customer> {
        return this.httpClient.post<Customer>('customers', customer).pipe(
            tap((newCustomer: Customer) => {
                this.customers.push(newCustomer);
                this.customersChanged.next(this.customers.slice());
            })
        );
    }

    updateCustomer(
        id: string,
        newCustomerInfo: Customer
    ): Observable<Customer> {
        return this.httpClient
            .put<Customer>(`customers/${id}`, newCustomerInfo)
            .pipe(
                tap(() => {
                    this.customers = this.customers.map((customer) => {
                        if (customer.id === id) {
                            const updatedCustomer = (customer = {
                                ...customer,
                                ...newCustomerInfo,
                            });

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
            tap(() => {
                this.customers = this.customers.filter(
                    (customer) => customer.id !== id
                );
                this.customersChanged.next(this.customers.slice());
            })
        );
    }

    private handleErrorMessages(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An unknown error has occurred';

        if (!errorResponse.error || !errorResponse.error.message) {
            return throwError(errorMessage);
        }

        // if (errorResponse.status === 401) {
        //     this.authService.logout();
        // }

        // switch (errorResponse.error) {
        //   case value:

        //     break;

        //   default:
        //     break;
        // }

        return throwError(errorMessage);
    }
}
