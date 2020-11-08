import { Action } from '@ngrx/store';
import { Project } from './../../projects/project.model';

export enum ProjectsActionTypes {
  // step 1: added Event Actions
  ProjectSelected = '[Projects] Selected',
  // step1-a: [command - 1]. load project || add project, this will be captured by the effect, when the operation is completed, then it 'dispatches' to either the same one [1 command] or [2 project loaded]
  LoadProjects = '[Projects] Load Data',
  AddProject = '[Projects] Add Data',
  UpdateProject = '[Projects] Update Data',
  DeleteProject = '[Projects] Delete Data',

  // step1-b: [completion - 2]. project loaded || project added, then operation is completed, then it will 'dispatches' the completion one if there is one available
  projectsLoaded = '[Projects] Data Loaded - completion',
  projectAdded = '[Projects] Data Added - completion ',
  ProjectUpdated = '[Projects] Data Updated - completion',
  ProjectDeleted = '[Projects] Data Deleted - Completion'
}

// step 2a: create an [action object] - implements Action
// for instance - projectLoaded and projectAdded implements Action and readOnly type

export class SelectProject implements Action {
  readonly type = ProjectsActionTypes.ProjectSelected;
  constructor(public payload: Project) {}
}

export class ProjectsLoaded implements Action {
  readonly type = ProjectsActionTypes.projectsLoaded;
  constructor(public payload: Project[]) {}
}

// 'LoadProjects' is no longer has [payload] because it is a trigger event now, the [payload] moves to 'projectLoaded' action
export class LoadProjects implements Action {
  readonly type = ProjectsActionTypes.LoadProjects;
  // constructor(private payload: Project[]) {}
}

// step 2a: create an action object - projectAdded
export class ProjectAdded implements Action {
  readonly type = ProjectsActionTypes.projectAdded;
  constructor(public payload: Project) {}
}

// 'AddProjects' is no longer has [payload] because it is a trigger event now, the [payload] moves to 'projectAdded' action
export class AddProject implements Action {
  readonly type = ProjectsActionTypes.AddProject;
  constructor(public payload: Project) {}
}

export class ProjectUpdated implements Action {
  readonly type = ProjectsActionTypes.ProjectUpdated;
  constructor(public payload: Project) {}
}

export class UpdateProject implements Action {
  readonly type = ProjectsActionTypes.UpdateProject;
  constructor(public payload: Project) {}
}

export class ProjectDeleted implements Action {
  readonly type = ProjectsActionTypes.ProjectDeleted;
  constructor(public payload: Project) {}
}

export class DeleteProject implements Action {
  readonly type = ProjectsActionTypes.DeleteProject;
  constructor(public payload: Project) {}
}


// step 3:
export type ProjectsActions =
  SelectProject
  | LoadProjects
  | ProjectsLoaded
  | AddProject
  | ProjectAdded
  | UpdateProject
  | ProjectUpdated
  | DeleteProject
  | ProjectDeleted
  ;
