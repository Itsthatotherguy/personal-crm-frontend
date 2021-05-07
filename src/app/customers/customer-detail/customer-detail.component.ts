import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.css'],
})
export class CustomerDetailComponent implements OnInit {
    customerId: string;
    customer: Customer;
    isDeleting = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService,
        private modal: NzModalService,
        private message: NzMessageService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe({
            next: (params: Params) => {
                this.customerId = params['id'];
                this.customer = this.customerService.getCustomer(
                    this.customerId
                );
                console.log(this.customer);
                if (!this.customer) {
                    this.router.navigate(['not-found']);
                }
            },
        });
    }

    onClickEditCustomer(): void {
        this.router.navigate(['edit'], {
            relativeTo: this.route,
        });
    }

    onClickDeleteCustomer(): void {
        this.modal.confirm({
            nzTitle: 'Are you sure you want to delete this customer?',
            nzOkText: 'Yes',
            nzOkType: 'primary',
            nzOkDanger: true,
            nzOnOk: () => this.onDeleteCustomer(),
            nzCancelText: 'No',
            nzOkLoading: this.isDeleting,
        });
    }

    onDeleteCustomer(): void {
        this.customerService.deleteCustomer(this.customerId).subscribe({
            next: () => {
                this.message.success('Customer successfully deleted.');
                this.isDeleting = true;
            },
            error: (errorMessage) => {
                this.message.error('An error occurred. Please try again later');
                this.isDeleting = true;
            },
        });
        this.router.navigate(['/']);
    }
}
