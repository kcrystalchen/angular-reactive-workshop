import { ProjectsActionTypes } from './projects.actions';
import { Project } from './../../projects/project.model';

// Expose projects state
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

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
];


// Creating NgRx Entity in the Reducer:
// NgRx Entity is a library from NgRx to help you work with collections, quickly and efficiently look things up

// it happens when we deal with large collections, or do data manipulation or get data out of that collection with an efficient way to traves the data collects - the solution is to convert the collection from an array into a key-value store, so it will get the data based on the key was given
// it looks like a classic database design - key - value pair

// Step 1: **Redefine the shape of the state by giving additional properties


const createProject = (projects, project) => [...projects, project];
const updateProject = (projects, project) => projects.map(p => {
  return p.id === project.id ? Object.assign({}, project) : p;
});
const deleteProject = (projects, project) => projects.filter(w => project.id !== w.id);

// 01 - 1 Define the shape of my state:
// export interface ProjectsState {
//   projects: Project[];
//   selectedProjectId: string | null;
// }
export interface ProjectsState extends EntityState<Project>{
  // we want to keep track the selectedProjectId
  selectedProjectId: string | null;
}

// 01 - 2 create an 'Entity adapter' and it takes a project type
export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();


// Step 2: Define the initial state by using Entity adapter
// export const initialState: ProjectsState = {
//   projects: initialProjects,
//   selectedProjectId: null
// }
export const initialState: ProjectsState = adapter.getInitialState({selectedProjectId: null});


// Step 3: Build the MOST simplest reducer
export function projectsReducers(
  state = initialState, action): ProjectsState {

  switch (action.type) {
    case ProjectsActionTypes.ProjectSelected:
      return Object.assign({}, state, {selectedProjectId: action.payload}) // a new object, it takes state,and only one update based on the selectedProjectId
    case ProjectsActionTypes.AddProject:
      return adapter.addOne(action.payload, state);
      // return {
      //   selectedProjectId: state.selectedProjectId,
      //   projects: createProject(state.projects, action.payload)
      // }
    case ProjectsActionTypes.UpdateProject:
      return adapter.updateOne(action.payload, state);
      // return {
      //   selectedProjectId: state.selectedProjectId,
      //   projects: updateProject(state.projects, action.payload)
      // }
    case ProjectsActionTypes.DeleteProject:
      return adapter.removeOne(action.payload, state);
      // return {
      //   selectedProjectId: state.selectedProjectId,
      //   projects: deleteProject(state.projects, action.payload)
      // }
    case ProjectsActionTypes.LoadProjects:
      return adapter.addMany(action.payload, state);
    default:
      return state;
  }
}
