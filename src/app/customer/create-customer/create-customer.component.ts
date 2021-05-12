import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Customer } from '../store/customer.model';
import { CustomerService } from '../customer.service';
import { CreateCustomerRequest } from '../dto/requests/create-customer.request';
import { UpdateCustomerRequest } from '../dto/requests/update-customer.request';
import { select, Store } from '@ngrx/store';
import {
    selectCurrentCustomer,
    selectCustomerSaving,
    selectSavingErrors,
} from '../store/customer.selectors';
import * as CustomerActions from '../store/customer.actions';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-create-customer',
    templateUrl: './create-customer.component.html',
    styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit, OnDestroy {
    errors$: Observable<string[]>;
    isSaving$: Observable<boolean>;
    editingMode = false;
    customerId: string;
    customer: Customer;
    customerForm: FormGroup;

    constructor(private route: ActivatedRoute, private store: Store) {}

    ngOnInit(): void {
        this.route.params.subscribe({
            next: (params: Params) => {
                const id = params['id'];

                if (!!id) {
                    this.customerId = id;
                    this.store.dispatch(
                        CustomerActions.initCustomerDetailPage({ id })
                    );
                }
            },
        });

        this.store.pipe(select(selectCurrentCustomer)).subscribe({
            next: (customer) => {
                if (!!customer) {
                    this.editingMode = true;
                    this.customer = customer;
                }

                this.initForm();
            },
        });

        this.isSaving$ = this.store.pipe(select(selectCustomerSaving));

        this.errors$ = this.store.pipe(select(selectSavingErrors));
    }

    ngOnDestroy(): void {
        this.store.dispatch(CustomerActions.destroyCustomerDetailPage());
    }

    onSubmit(): void {
        if (this.editingMode) {
            const request = new UpdateCustomerRequest(
                this.customerId,
                this.customerForm.value.name,
                this.customerForm.value.emailAddress,
                this.customerForm.value.phoneNumber
            );

            this.store.dispatch(
                CustomerActions.updateCustomerStart({
                    updateCustomerRequest: request,
                })
            );
        } else {
            const request = new CreateCustomerRequest(
                this.customerForm.value.name,
                this.customerForm.value.emailAddress,
                this.customerForm.value.phoneNumber
            );

            this.store.dispatch(
                CustomerActions.addCustomerStart({
                    createCustomerRequest: request,
                })
            );
        }
    }

    onClear(): void {
        this.customerForm.reset();
    }

    private initForm(): void {
        let customerName = '';
        let customerEmail = '';
        let customerPhoneNumber = '';

        if (this.editingMode) {
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
