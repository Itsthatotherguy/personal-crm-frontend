import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
    customers: Customer[] = [];
    avatarColour: string;
    filterString: string;
    isFetching = true;

    constructor(
        private router: Router,
        private customerService: CustomerService
    ) {}

    ngOnInit(): void {
        // this.customers = this.customerService.getCustomers();
        this.customerService.customersChanged.subscribe({
            next: (customers: Customer[]) => {
                this.customers = customers;
            },
        });

        this.fetchCustomers();
    }

    private fetchCustomers(): void {
        this.customerService.getCustomers().subscribe({
            next: () => {
                // this.isFetching = false;
            },
            error: (errorResponse: HttpErrorResponse) => {
                if (!errorResponse.status) {
                    console.log('An unexpected error occured');
                }
            },
        });
    }

    onClickCreateCustomer(): void {
        this.router.navigate(['/customers/new']);
    }
}
