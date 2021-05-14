import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { CustomerService } from '../customer.service';
import * as CustomerActions from './customer.actions';
import { selectCurrentCustomerId } from './customer.selectors';

@Injectable()
export class CustomerEffects {
    constructor(
        private actions$: Actions,
        private customerService: CustomerService,
        private store: Store,
        private message: NzMessageService,
        private router: Router
    ) {}

    loadCustomers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CustomerActions.loadCustomersStart),
            mergeMap(() =>
                this.customerService.getCustomers().pipe(
                    map((customers) =>
                        CustomerActions.loadCustomersSuccess({ customers })
                    ),
                    catchError((errors: string[]) => {
                        console.error(errors);

                        return of(
                            CustomerActions.loadCustomersFail({ errors })
                        );
                    })
                )
            )
        )
    );

    addCustomer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CustomerActions.addCustomerStart),
            mergeMap((action) =>
                this.customerService
                    .createCustomer(action.createCustomerRequest)
                    .pipe(
                        map((customer) =>
                            CustomerActions.addCustomerSuccess({ customer })
                        ),
                        catchError((errors: string[]) =>
                            of(CustomerActions.addCustomerFail({ errors }))
                        )
                    )
            )
        )
    );

    addCustomerSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CustomerActions.addCustomerSuccess),
                tap((action) => {
                    this.message.success('Customer successfully added');
                    this.router.navigate(['/', 'customer', action.customer.id]);
                })
            ),
        { dispatch: false }
    );

    updateCustomer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CustomerActions.updateCustomerStart),
            withLatestFrom(this.store.pipe(select(selectCurrentCustomerId))),
            mergeMap(([action, currentCustomerId]) =>
                this.customerService
                    .updateCustomer(
                        currentCustomerId,
                        action.updateCustomerRequest
                    )
                    .pipe(
                        map((customer) =>
                            CustomerActions.updateCustomerSuccess({ customer })
                        ),
                        catchError((errors: string[]) =>
                            of(CustomerActions.updateCustomerFail({ errors }))
                        )
                    )
            )
        )
    );

    updateCustomerSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CustomerActions.updateCustomerSuccess),
                concatLatestFrom(() =>
                    this.store.pipe(select(selectCurrentCustomerId))
                ),
                tap(([action, currentCustomerId]) => {
                    this.message.success('Customer successfully updated');
                    this.router.navigate(['/', 'customer', currentCustomerId]);
                })
            ),
        {
            dispatch: false,
        }
    );

    deleteCustomer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CustomerActions.deleteCustomerStart),
            concatLatestFrom(() =>
                this.store.pipe(select(selectCurrentCustomerId))
            ),
            mergeMap(([action, currentCustomerId]) =>
                this.customerService.deleteCustomer(currentCustomerId).pipe(
                    map(() => CustomerActions.deleteCustomerSuccess()),
                    catchError((errors: string[]) =>
                        of(CustomerActions.deleteCustomerFail({ errors }))
                    )
                )
            )
        )
    );

    deleteCustomerSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CustomerActions.deleteCustomerSuccess),
                tap(() => {
                    this.message.success('Customer successfully deleted');
                    this.router.navigate(['/', 'customer']);
                })
            ),
        {
            dispatch: false,
        }
    );
}
