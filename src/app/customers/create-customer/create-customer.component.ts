import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { CreateCustomerRequest } from '../dto/requests/create-customer.request';
import { UpdateCustomerRequest } from '../dto/requests/update-customer.request';

@Component({
    selector: 'app-create-customer',
    templateUrl: './create-customer.component.html',
    styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
    customerId: string;
    customer: Customer = null;
    editingMode = false;
    isFetching = false;
    isSaving = false;
    errors: string[] = [];

    customerForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService,
        private message: NzMessageService
    ) {}

    ngOnInit(): void {
        this.initAddMode();
        this.initEditMode();
    }

    onSubmit(): void {
        this.isSaving = true;

        if (this.editingMode) {
            this.onEditSubmit();
        } else {
            this.onAddSubmit();
        }
    }

    onClear(): void {
        this.customerForm.reset();
    }

    private onEditSubmit(): void {
        const request = new UpdateCustomerRequest(
            this.customerId,
            this.customerForm.value.name,
            this.customerForm.value.emailAddress,
            this.customerForm.value.phoneNumber
        );

        this.customerService
            .updateCustomer(this.customerId, request)
            .subscribe({
                next: () => {
                    this.message.success('Customer successfully updated');
                    this.isSaving = false;
                    this.customerForm.reset();
                    this.router.navigate(['customers', this.customerId]);
                },
                error: (errorMessages) => {
                    this.errors = errorMessages;
                    this.isSaving = false;
                },
            });
    }

    private initEditMode() {
        this.route.params.subscribe({
            next: (params: Params) => {
                if (!!params['id']) {
                    this.customerId = params['id'];
                    this.editingMode = true;
                    this.customer = this.customerService.currentCustomer;

                    if (
                        !this.customer ||
                        this.customer.id !== this.customerId
                    ) {
                        this.fetchCustomerAndInitForm();
                    } else {
                        this.initForm();
                    }
                }
            },
            error: (errorMessages) => {
                this.errors = errorMessages;
            },
        });
    }

    private initAddMode() {
        if (!this.editingMode) {
            this.initForm();
        }
    }

    private onAddSubmit(): void {
        const request = new CreateCustomerRequest(
            this.customerForm.value.name,
            this.customerForm.value.emailAddress,
            this.customerForm.value.phoneNumber
        );
        console.log(request);
        this.customerService.createCustomer(request).subscribe({
            next: (customer) => {
                this.message.success('Customer successfully added');
                this.isSaving = false;
                this.customerForm.reset();
                this.router.navigate(['customers', customer.id]);
            },
            error: (errorMessages) => {
                this.errors = errorMessages;
                this.isSaving = false;
            },
        });
    }

    private fetchCustomerAndInitForm() {
        this.isFetching = true;
        this.customerService.getCustomer(this.customerId).subscribe({
            next: (customer: Customer) => {
                this.isFetching = false;
                this.customer = customer;
                this.initForm();
            },
            error: (errorMessages) => {
                this.isFetching = false;
                this.errors = errorMessages;
            },
        });
    }

    private initForm(): void {
        let customerName = '';
        let customerEmail = '';
        let customerPhoneNumber = '';

        if (this.editingMode) {
            console.log(this.customer);

            customerName = this.customer.name;
            customerEmail = this.customer.emailAddress;
            customerPhoneNumber = this.customer.phoneNumber;
        }

        this.customerForm = new FormGroup({
            name: new FormControl(customerName, {
                validators: [Validators.required],
                updateOn: 'blur',
            }),
            emailAddress: new FormControl(customerEmail, {
                validators: [Validators.required, Validators.email],
                updateOn: 'blur',
            }),
            phoneNumber: new FormControl(customerPhoneNumber, {
                validators: [Validators.required],
                updateOn: 'blur',
            }),
        });
    }
}
