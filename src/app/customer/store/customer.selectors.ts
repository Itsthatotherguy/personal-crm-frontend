import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from '../../store/reducer';
import * as fromCustomer from './customer.reducer';
import * as _ from 'lodash';

export const selectCustomerState = createFeatureSelector<
    fromApp.State,
    fromCustomer.State
>(fromCustomer.customersFeatureKey);

export const selectFilterString = createSelector(
    selectCustomerState,
    (state) => state.filterString
);

export const selectAllCustomers = createSelector(
    selectCustomerState,
    selectFilterString,
    (state, filterString) => {
        let customers = fromCustomer.selectAll(state);

        if (filterString && filterString.trim().length > 0) {
            customers = customers.filter((customer) =>
                customer.name
                    .toLocaleLowerCase()
                    .startsWith(filterString.toLocaleLowerCase())
            );
        }

        return _.orderBy(customers, ['name'], ['asc']);
    }
);

export const selectCustomerEntities = createSelector(
    selectCustomerState,
    fromCustomer.selectEntities
);

export const selectCustomersFetching = createSelector(
    selectCustomerState,
    (state) => state.isFetchingCustomers
);

export const selectCurrentCustomerId = createSelector(
    selectCustomerState,
    (state) => state.currentCustomerId
);

export const selectCurrentCustomer = createSelector(
    selectCustomerEntities,
    selectCurrentCustomerId,
    (customerEntities, customerId) => customerEntities[customerId]
);

export const selectCustomerSaving = createSelector(
    selectCustomerState,
    (state) => state.isSavingCustomer
);

export const selectFetchingErrors = createSelector(
    selectCustomerState,
    (state) => state.fetchingCustomersErrors
);

export const selectSavingErrors = createSelector(
    selectCustomerState,
    (state) => state.savingCustomerErrors
);

export const selectCustomerDeleting = createSelector(
    selectCustomerState,
    (state) => state.isDeletingCustomer
);

export const selectDeletingerrors = createSelector(
    selectCustomerState,
    (state) => state.deletingCustomerErrors
);
