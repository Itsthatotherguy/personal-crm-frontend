import { ActionReducerMap } from '@ngrx/store';

import * as fromCustomer from '../customer/store/customer.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface State {
    customer: fromCustomer.State;
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
    customer: fromCustomer.reducer,
    auth: fromAuth.reducer,
};
