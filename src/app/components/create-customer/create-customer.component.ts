import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
    selector: 'app-create-customer',
    templateUrl: './create-customer.component.html',
    styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
    customerId: number;
    editingMode = false;

    customerForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe({
            next: (params: Params) => {
                if (!!params['id']) {
                    this.customerId = +params['id'];
                    this.editingMode = true;
                }
            },
        });

        this.initForm();
    }

    onSubmit(): void {
        let returningId: number;

        if (this.editingMode) {
            this.customerService.updateCustomer(
                this.customerId,
                this.customerForm.value
            );

            returningId = this.customerId;
        } else {
            const id = this.customerService.createCustomer(
                this.customerForm.value
            );

            returningId = id;
        }

        this.router.navigate(['customers', returningId]);
        this.customerForm.reset();
    }

    onClear(): void {
        this.customerForm.reset();
    }

    private initForm(): void {
        let customerName = '';
        let customerEmail = '';
        let customerPhoneNumber = '';

        if (this.editingMode) {
            const customer = this.customerService.getCustomer(this.customerId);

            customerName = customer.name;
            customerEmail = customer.email;
            customerPhoneNumber = customer.phoneNumber;
        }

        this.customerForm = new FormGroup({
            name: new FormControl(customerName, Validators.required),
            email: new FormControl(customerEmail, [
                Validators.required,
                Validators.email,
            ]),
            phoneNumber: new FormControl(
                customerPhoneNumber,
                Validators.required
            ),
        });
    }
}