import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ProjectsActionTypes, ProjectsActions } from './projects.actions';
import { Project } from './../../projects/project.model';

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Project One',
    details: 'This is a sample project',
    percentComplete: 20,
    approved: false,
    customerId: null
  },
  {
    id: '2',
    title: 'Project Two',
    details: 'This is a sample project',
    percentComplete: 40,
    approved: false,
    customerId: null
  },
  {
    id: '3',
    title: 'Project Three',
    details: 'This is a sample project',
    percentComplete: 100,
    approved: true,
    customerId: null
  }
];

const createProject = (projects, project) => [...projects, project];
const updateProject = (projects, project) => projects.map(p => {
  return p.id === project.id ? Object.assign({}, project) : p;
});
const deleteProject = (projects, project) => projects.filter(w => project.id !== w.id);


// converting Reducer by using NgRx entity

// 01 Define the shape of my state
export interface ProjectsState extends EntityState<Project> {
  selectedProjectId: string | null;
}

// 02 Create entity adapter
export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

// 03 Define the initial state
export const initialState: ProjectsState = adapter.getInitialState({
  selectedProjectId: null
})

// 03 Build the MOST simplest reducer
export function projectsReducers(
  state = initialState, action: ProjectsActions): ProjectsState {
  switch (action.type) {
    case ProjectsActionTypes.ProjectSelected:
      return Object.assign({}, state, { selectedProjectId: action.payload });
  // step 4: Effect as a middleware between Reducer and application, Reducer should listen to completed action from effects, and it should update completed projectsLoaded and projectAdded instead of loadProjects and addProject
    case ProjectsActionTypes.projectsLoaded:
      return adapter.addAll(action.payload, state);

    case ProjectsActionTypes.projectAdded:
      return adapter.addOne(action.payload, state);

    case ProjectsActionTypes.UpdateProject:
      return adapter.updateOne({id: action.payload.id, changes: action.payload}, state);
    case ProjectsActionTypes.DeleteProject:
      return adapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}

// Selectors: Build up the 'Low Level Selector' in the feature reducer, then expose them in kind of the top level reducer, because ultimately you want to combine them, so that having all the selectors in one place

// step 1:

// Selector is just a function
// step 2: destructing adapter library EntityAdapter - getSelector()
const {selectIds, selectEntities, selectAll, selectTotal} = adapter.getSelectors();

// step 3a: get the projectId from state
export const getSelectedProjectId = (state: ProjectsState) => state.selectedProjectId;

// step 3b: because selectIds, selectEntities, selectAll, selectTotal are not descriptive enough, so we are going to export these keys with a more informative name
export const selectProjectIds = selectIds;

export const selectProjectEntities = selectEntities;

export const selectAllProjects = selectAll;

// take a selector, then do some logic to produce a new data
