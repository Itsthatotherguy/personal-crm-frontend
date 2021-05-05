import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.css'],
})
export class CustomerDetailComponent implements OnInit {
    customerId: number;
    customer: Customer;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService,
        private modal: NzModalService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe({
            next: (params: Params) => {
                this.customerId = +params['id'];
                this.customer = this.customerService.getCustomer(
                    this.customerId
                );

                if (!this.customer) {
                    this.router.navigate(['not-found']);
                }
            },
        });
    }

    onClickEditCustomer() {
        this.router.navigate(['edit'], {
            relativeTo: this.route,
        });
    }

    onClickDeleteCustomer() {
        this.modal.confirm({
            nzTitle: 'Are you sure you want to delete this customer?',
            nzOkText: 'Yes',
            nzOkType: 'primary',
            nzOkDanger: true,
            nzOnOk: () => this.onDeleteCustomer(),
            nzCancelText: 'No',
        });
    }

    onDeleteCustomer() {
        this.customerService.deleteCustomer(this.customerId);
        this.router.navigate(['/']);
    }
}
