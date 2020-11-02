import { Action } from '@ngrx/store';
import { Project } from './../../projects/project.model';


// step 1: create an enum with all of the actions for the projects
// enum keeps all the Action Types and their string
// keep the ActionType unique
export enum ProjectsActionTypes {
  ProjectSelected = '[Projects] Selected',
  AddProject = '[Projects] Add Data',
  UpdateProject = '[Projects] Update Data',
  DeleteProject = '[Projects] Delete Data',
  LoadProjects = '[Projects] Load Data'
}

// step 2: create strongly type Action Object and import Action
export class SelectProject implements Action {
  readonly type = ProjectsActionTypes.ProjectSelected;
  constructor(private payload: Project) {}
}
export class AddProject implements Action {
  readonly type = ProjectsActionTypes.AddProject;
  constructor(private payload: Project) {}
}
export class UpdateProject implements Action {
  readonly type = ProjectsActionTypes.UpdateProject;
  constructor(private payload: Project) {}
}
export class DeleteProject implements Action {
  readonly type = ProjectsActionTypes.DeleteProject;
  constructor(private payload: Project) {}
}

export class LoadProjects implements Action {
  readonly type = ProjectsActionTypes.LoadProjects;
  constructor(private payload: Project[]) {}
}


// step 3: create an unit type
export type ProjectsActions = SelectProject
  | AddProject
  | UpdateProject
  | DeleteProject
  | LoadProjects
  ;
