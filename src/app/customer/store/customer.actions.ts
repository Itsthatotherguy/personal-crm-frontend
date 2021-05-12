import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Customer } from './customer.model';
import { CreateCustomerRequest } from '../dto/requests/create-customer.request';
import { UpdateCustomerRequest } from '../dto/requests/update-customer.request';

export const loadCustomersStart = createAction(
    '[Customer/API] Load Customers Start'
);

export const loadCustomersSuccess = createAction(
    '[Customer/API] Load Customers Success',
    props<{ customers: Customer[] }>()
);

export const loadCustomersFail = createAction(
    '[Customer/API] Load Customers Fail',
    props<{ errors: string[] }>()
);

export const addCustomerStart = createAction(
    '[Customer/API] Add CustomerStart',
    props<{ createCustomerRequest: CreateCustomerRequest }>()
);

export const addCustomerSuccess = createAction(
    '[Customer/API] Add Customer Success',
    props<{ customer: Customer }>()
);

export const addCustomerFail = createAction(
    '[Customer/API] Add Customer Fail',
    props<{ errors: string[] }>()
);

export const updateCustomerStart = createAction(
    '[Customer/API] Update Customer Start',
    props<{ updateCustomerRequest: UpdateCustomerRequest }>()
);

export const updateCustomerSuccess = createAction(
    '[Customer/API] Update Customer Success',
    props<{ customer: Customer }>()
);

export const updateCustomerFail = createAction(
    '[Customer/API] Update Customer Fail',
    props<{ errors: string[] }>()
);

export const deleteCustomerStart = createAction(
    '[Customer/API] Delete Customer Start'
);

export const deleteCustomerSuccess = createAction(
    '[Customer/API] Delete Customer Success'
);

export const deleteCustomerFail = createAction(
    '[Customer/API] Delete Customer Fail',
    props<{ errors: string[] }>()
);

export const initCustomerDetailPage = createAction(
    '[Customer/API] Init Customer Detail Page',
    props<{ id: string }>()
);

export const destroyCustomerDetailPage = createAction(
    '[Customer/API] Destroy Customer Detail Page'
);

export const setFilterString = createAction(
    '[Customer/API] Set Filter String',
    props<{ filterString: string }>()
);
