import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Customer } from '../store/customer.model';
import { select, Store } from '@ngrx/store';
import {
    deleteCustomerStart,
    destroyCustomerDetailPage,
    initCustomerDetailPage,
} from '../store/customer.actions';
import {
    selectCurrentCustomer,
    selectCustomerDeleting,
} from '../store/customer.selectors';
import { async, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.css'],
})
export class CustomerDetailComponent implements OnInit, OnDestroy {
    errors: string[] = [];

    customer$: Observable<Customer>;
    isDeleting: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private modal: NzModalService,
        private store: Store
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe({
            next: (params: Params) => {
                const id = params['id'];

                if (!!id) {
                    this.store.dispatch(initCustomerDetailPage({ id }));
                }
            },
        });

        this.customer$ = this.store.pipe(select(selectCurrentCustomer));

        this.store.pipe(select(selectCustomerDeleting)).subscribe({
            next: (isDeleting) => {
                this.isDeleting = isDeleting;
            },
        });
    }

    ngOnDestroy(): void {
        this.store.dispatch(destroyCustomerDetailPage());
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
        this.store.dispatch(deleteCustomerStart());
    }
}
