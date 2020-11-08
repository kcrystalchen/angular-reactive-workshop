// effects - call the server and do something
// step 1: copy the snippets from gitbhub - link blow
// project effects

// HELPFUL SNIPPET
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';

import { Project, ProjectsService } from '@workshop/core-data';
import { ProjectsActionTypes, ProjectAdded, ProjectsLoaded,  AddProject, LoadProjects } from './projects.actions';
// step 0: importing the ProjectsState from reducer
import { ProjectsState } from './projects.reducer';

@Injectable({providedIn: 'root'})
export class ProjectsEffects {

  // step 3a: define the first @effect - loadProject, and going to use data persistence and fetch(first parameter is 'action type', the second parameter is an Object that going to handle or response to this action - [run(), onError()])

  @Effect()
    // create a loadedProjects$ effect that is listening for an Action Type - 'projectActionType.LoadProjects', then it will run the code inside the fetch - run:, after called this.projectsService.all(), we map the return result by calling projectService.all(), then passed the return result in the "new action object" - new ProjectsLoaded()

    // ProjectsActionTypes.LoadProjects is a trigger object - command / action / go do this thing
    // new projectsLoaded(res) is the 'completed action'
   loadProjects$ = this.dataPersistence.fetch(
    ProjectsActionTypes.LoadProjects, // [a. action type]
    {run: (action: LoadProjects, state: ProjectsState )=>{
      // async part - return observable
      return this.projectsService.all()
      .pipe(
        map((res: Project[]) => // pass the return value - res into reducer
        new ProjectsLoaded(res)))
    }, // [b. handle action type]

  // dataPersistence is kind of wrap the sequence, that provide an extra layer of protection for just a straight fetch [some utilities and guards build it there]
     onError: ()=>{}
    })

  // step 3b: define the second @effect - addProject
  @Effect()
   addProject$ = this.dataPersistence.pessimisticUpdate(
    ProjectsActionTypes.AddProject,
    {run: (action: AddProject, state: ProjectsState )=>{
      return this.projectsService.create(action.payload)
      .pipe(
        map((res: Project) =>
        new ProjectAdded(res)))
  // if we need to create or modify something in the serve, then we could use pessimistic or optimistical
  // pessimistic update is using for going to create something or modify something in the server. it will wait for server to complete before dispatching this into the reducer
  // optimistically update is passing on the data structure into the reducer, it will update you once something goes wrong
    },
     onError: ()=>{}
    })


  // step 2: takes three parameters
  // 1. actions.
  // 2. data persistence
  // 3. projects service - if we are going to do an asynchronous callback to the server, then we need projects service to handle it
  // In order for the @Effects to get registered in the application, we need to add the Effects module in state.module.ts
  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsState>,
    private projectsService: ProjectsService
  ) {}
}

// instead of going straight to the reducer from action, we are going to create a middleware or something in the middle - @Effect, that takes in incoming object [LoadProjects and AddProject], and take some actions, then puts the result of the actions out [ProjectsLoad and ProjectAdd]

// https://github.com/onehungrymind/angular-reactive-workshop/wiki/Reactive-Workshop-Steps#step-six-effects

