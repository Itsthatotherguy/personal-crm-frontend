import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Customer } from './customer.model';
import * as CustomerActions from './customer.actions';

export const customersFeatureKey = 'customer';

export interface State extends EntityState<Customer> {
    // additional entities state properties
    isFetchingCustomers: boolean;
    isSavingCustomer: boolean;
    isDeletingCustomer: boolean;
    savingCustomerErrors: string[];
    fetchingCustomersErrors: string[];
    deletingCustomerErrors: string[];
    currentCustomerId: string;
    filterString: string;
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    isFetchingCustomers: false,
    isSavingCustomer: false,
    isDeletingCustomer: false,
    savingCustomerErrors: null,
    fetchingCustomersErrors: null,
    deletingCustomerErrors: null,
    currentCustomerId: null,
    filterString: null,
});

export const reducer = createReducer(
    initialState,
    on(CustomerActions.addCustomerStart, (state, action) => ({
        ...state,
        isSavingCustomer: true,
        savingCustomerErrors: null,
    })),
    on(CustomerActions.addCustomerSuccess, (state, action) =>
        adapter.addOne(action.customer, {
            ...state,
            isSavingCustomer: false,
        })
    ),
    on(CustomerActions.addCustomerFail, (state, action) => ({
        ...state,
        isSavingCustomer: false,
        savingCustomerErrors: action.errors,
    })),
    on(CustomerActions.updateCustomerStart, (state, action) => ({
        ...state,
        isSavingCustomer: true,
        savingCustomerErrors: null,
    })),
    on(CustomerActions.updateCustomerSuccess, (state, action) =>
        adapter.setOne(action.customer, {
            ...state,
            isSavingCustomer: false,
        })
    ),
    on(CustomerActions.updateCustomerFail, (state, action) => ({
        ...state,
        isSavingCustomer: false,
        savingCustomerErrors: action.errors,
    })),
    on(CustomerActions.deleteCustomerStart, (state, action) => ({
        ...state,
        isDeletingCustomer: true,
        deletingCustomersErrors: null,
    })),
    on(CustomerActions.deleteCustomerSuccess, (state, action) =>
        adapter.removeOne(state.currentCustomerId, {
            ...state,
            isDeletingCustomer: false,
            currentCustomerId: null,
        })
    ),
    on(CustomerActions.deleteCustomerFail, (state, action) => ({
        ...state,
        isDeletingCustomer: false,
        deletingCustomersErrors: action.errors,
    })),
    on(CustomerActions.loadCustomersStart, (state, action) => {
        return {
            ...state,
            isFetchingCustomers: true,
            fetchingCustomersErrors: null,
        };
    }),
    on(CustomerActions.loadCustomersSuccess, (state, action) =>
        adapter.setAll(action.customers, {
            ...state,
            isFetchingCustomers: false,
        })
    ),
    on(CustomerActions.loadCustomersFail, (state, action) => {
        return {
            ...state,
            isFetchingCustomers: false,
            fetchingCustomersErrors: action.errors,
        };
    }),
    on(CustomerActions.initCustomerDetailPage, (state, action) => ({
        ...state,
        currentCustomerId: action.id,
    })),
    on(CustomerActions.destroyCustomerDetailPage, (state, action) => ({
        ...state,
        currentCustomerId: null,
    })),
    on(CustomerActions.setFilterString, (state, action) => ({
        ...state,
        filterString: action.filterString,
    }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
    adapter.getSelectors();
