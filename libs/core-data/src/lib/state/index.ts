import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Project } from '@workshop/core-data';

import * as fromCustomers from './customers/customers.reducer';
import * as fromProjects from './projects/projects.reducer';

// Updated the shape of the entire application state
export interface AppState {
  customers: fromCustomers.CustomersState,
  projects: fromProjects.ProjectsState
}
// Add in feature reducer into combined reducer
export const reducers: ActionReducerMap<AppState> = {
  customers: fromCustomers.customersReducer,
  projects: fromProjects.projectsReducers
};

// -------------------------------------------------------------------
// PROJECT SELECTORS - Top Level Reducer
// -------------------------------------------------------------------
// combined with all the low level selectors in the reducer.ts
// build up the selector that we want to expose the selectors outside the world

// 1. create feature selector [selectProjectState]- I want to select the feature from the main state, which is equivalent of projects.component.ts file - store.pipe(select('projects))
export const selectProjectState = createFeatureSelector<fromProjects.ProjectsState>('projects');

// 2. create feature selector [selectProjectIds]
export const selectProjectIds = createSelector(
  selectProjectState,
  fromProjects.selectProjectIds
)

//  [selectProjectEntities]
export const selectProjectEntities = createSelector(
  selectProjectState,
  fromProjects.selectProjectEntities
)

//  [selectAllProjects]
export const selectAllProjects = createSelector(
  selectProjectState,
  fromProjects.selectAllProjects
)

// [SelectProjectId]
export const selectCurrentProjectId = createSelector(
  selectProjectState,
  fromProjects.getSelectedProjectId // from reducer
)

const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
}

// every time when Id changes {in the projects.component.ts}, it notices it is selecting, that ID is changing in the [store], then it is triggering/firing the [selector] {in the state/index.ts}
// [get project that is associated with the ID]
export const selectCurrentProject = createSelector(
  selectProjectEntities,
  selectCurrentProjectId,
  (projectEntities, projectId) => {
    console.log('SELECTOR! ',projectId);
   return projectId ? projectEntities[projectId] : emptyProject;
  } // Selector is a function

)


// when the state changes, it run through the 'selector' and re-computes and returns its value, but if there is nothing changes, then it will return the last known state || the latest caching version, its the memorization pattern, this is very efficient that only going to compute the data when the state changes || one more more of the parameters were changed


// -------------------------------------------------------------------
// CUSTOMERS SELECTORS
// -------------------------------------------------------------------
export const selectCustomersState = createFeatureSelector<fromCustomers.CustomersState>('customers');

export const selectAllCustomers = createSelector(
  selectCustomersState,
  fromCustomers.selectAllCustomers
);

export const selectCustomersProjects = createSelector(
  selectAllCustomers,
  selectAllProjects,
  (customers, projects) => {
    return customers.map(customer => {
      return Object.assign({}, {
        ...customer,
        projects: projects.filter(project => project.customerId === customer.id)
      })
    })
  }
)


