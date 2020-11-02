import { Project } from './../../projects/project.model';
import { Action } from "@ngrx/store";

// purpose: create four action type objects, become strongly type safe action objects that can be pass around in the application, not worry about the colliding

// step 1: create an enum with all of the actions for the projects
export enum ProjectsActionTypes {
  projectSelected = '[Projects Page] Selected',
  AddProject = '[Projects Page] Add Data',
  UpdateProject = '[Projects Page] Update Data',
  DeleteProject = '[Projects Page] Delete data'
}

// step 2:  create an action object, that has a type - readonly, which is pulling from the enum,
// and also it has payload property on it
export class SelectProject implements Action{
  readonly type = ProjectsActionTypes.projectSelected;
  constructor(private payload: Project){}
}

export class AddProject implements Action{
   readonly type = ProjectsActionTypes.AddProject;
   constructor(private payload: Project){}
}

export class UpdateProject implements Action{
  readonly type = ProjectsActionTypes.UpdateProject;
  constructor(private payload: Project){}
}

export class DeleteProject implements Action{
   readonly type = ProjectsActionTypes.DeleteProject;
   constructor(private payload: Project){}
}
// step 3: creat an unit type
export type ProjectsAction = SelectProject | AddProject | UpdateProject | DeleteProject;

