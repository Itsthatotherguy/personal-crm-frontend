import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    customersChanged = new Subject<Customer[]>();
    filterStringHasChanged = new Subject<string>();
    private nextId = 3;

    private customers: Customer[] = [
        {
            id: 1,
            name: 'Chris',
            email: 'chrisvdm0410@gmail.com',
            phoneNumber: '074 066 9832',
        },
        {
            id: 2,
            name: 'Melanie',
            email: 'kennedy.melanie.mk@gmail.com',
            phoneNumber: '076 307 2380',
        },
    ];

    constructor() {}

    getCustomers(): Customer[] {
        return this.customers;
    }

    getCustomer(id: number): Customer {
        return this.customers.find((customer) => customer.id === id);
    }

    createCustomer(customer: Customer): number {
        const id = this.nextId;
        this.nextId++;

        this.customers.push({
            id,
            ...customer,
        });
        this.customersChanged.next(this.customers.slice());

        return id;
    }

    updateCustomer(id: number, newCustomerInfo: Customer): void {
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
    }

    deleteCustomer(id: number): void {
        this.customers = this.customers.filter(
            (customer) => customer.id !== id
        );
        this.customersChanged.next(this.customers.slice());
    }
}
