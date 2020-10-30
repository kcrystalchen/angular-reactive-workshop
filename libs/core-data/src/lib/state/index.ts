import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCustomers from './customers/customers.reducer';
// step 1: import every application state from the state folders
import * as fromProjects from './projects/projects.reducer';


// Purpose of this file: Take the Feature Level Reducers and combined Them to the Top Level Reducer

// step 2: Updated the Shape of entire Application State from reducer.ts file
export interface AppState {
  customers: fromCustomers.CustomersState,
  projects: fromProjects.ProjectsState
}


// step 3: Added all the feature reducers and combined them to the Top Level Reducer
export const reducers: ActionReducerMap<AppState> = {
  customers: fromCustomers.customersReducer,
  projects: fromProjects.projectsReducers
};


// -------------------------------------------------------------------
// CUSTOMERS SELECTORS
// -------------------------------------------------------------------
export const selectCustomersState = createFeatureSelector<fromCustomers.CustomersState>('customers');

export const selectAllCustomers = createSelector(
  selectCustomersState,
  fromCustomers.selectAllCustomers
);


