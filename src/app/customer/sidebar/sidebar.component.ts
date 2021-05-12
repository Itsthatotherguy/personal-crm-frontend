import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../store/customer.model';
import { CustomerService } from '../customer.service';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
    selectAllCustomers,
    selectCustomersFetching,
} from '../store/customer.selectors';
import * as CustomerActions from '../store/customer.actions';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
    // customers: Customer[] = [];
    avatarColour: string;
    filterString: string;

    isFetching$: Observable<boolean>;
    customers$: Observable<Customer[]>;

    constructor(
        private store: Store,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.isFetching$ = this.store.pipe(select(selectCustomersFetching));

        this.customers$ = this.store.pipe(select(selectAllCustomers));

        this.store.dispatch(CustomerActions.loadCustomersStart());
    }

    onClickCreateCustomer(): void {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

    onChangeFilterString(): void {
        this.store.dispatch(
            CustomerActions.setFilterString({ filterString: this.filterString })
        );
    }
}
