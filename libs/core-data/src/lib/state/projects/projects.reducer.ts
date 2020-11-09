import { ProjectsActionTypes } from './projects.actions';
import { Project } from './../../projects/project.model';

// if we don't use NgRx, the initialProjects is setup in the project component
// Because it is using NgRx, so the initialProject will be here
const initialProjects: Project[] = [
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

// create, update, delete methods
const createProject = (projects, project) => [...projects, project];

const updateProject = (projects, project) => projects.map(p => {
  return p.id === project.id ? Object.assign({}, project) : p;
});

const deleteProject = (projects, project) => projects.filter(w => project.id !== w.id);


//01. Define the shape of my state [state for Project feature] [define what the table looks like]
export interface ProjectsState {
  projects: Project[]; // a collection of the projects
  selectedProjectId: string | null;
}

// 02. Definite the initial state - an object  [seed data]
export const initialState: ProjectsState = {
  projects: initialProjects, // hard code the initial project data
  selectedProjectId: null // initial projectId is null
}


// 03. build the most simplest reducer [reducer just a function with two parameters - 'state' and 'action']
// when to call 'reducer', it has an 'application state' and an 'action object: defined what just happened, the type of action'
// it takes a state and return a new state [reducer is immutable]
// [reducer is how we are going to control the access of the store]
export function projectsReducers (state = initialState, action): ProjectsState {
  // if there is not a match on the 'action.type', then it will pass and return the initial state
  switch(action.type) {
    // capture the action type, then delegate to a stand alone function - [testable later]
    // then return a new state object
    case ProjectsActionTypes.AddProject:
      return {
         selectedProjectId: state.selectedProjectId,
         projects: createProject(state.projects, action.payload)
      }
    case ProjectsActionTypes.UpdateProject:
      return {
        selectedProjectId: state.selectedProjectId,
        projects: updateProject(state.projects, action.payload)
      }
    case ProjectsActionTypes.DeleteProject:
      return {
        selectedProjectId: state.selectedProjectId,
        projects: deleteProject(state.projects, action.payload)
      }
    case ProjectsActionTypes.projectSelected:
      return {
        selectedProjectId: action.payload,
        projects: state.projects
      }
    // default is returning the default state
    default:
      return state;
  }
}
