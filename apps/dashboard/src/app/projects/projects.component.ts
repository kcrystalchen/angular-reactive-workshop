import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Customer, Project, ProjectsService, NotificationsService, CustomersService, ProjectsState,
  LoadProjects, AddProject, UpdateProject, DeleteProject, initialProjects, selectAllProjects, SelectProject, selectCurrentProject } from '@workshop/core-data';

// const emptyProject: Project = {
//   id: null,
//   title: '',
//   details: '',
//   percentComplete: 0,
//   approved: false,
//   customerId: null
// }

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  // currentProject: Project;
  currentProject$: Observable<Project>;

// Selectors: that allows us to condense or abstract out some of this data manipulation into the composable query

  constructor(
    // private projectsService: ProjectsService,
    private customerService: CustomersService,
    private store: Store<ProjectsState>,
    private ns: NotificationsService) {
      this.projects$ = store.pipe(
        select(selectAllProjects),
        // no longer need to manually manipulate the data here, instead of using entity adapter - a pre-build selector, on top of the reducer, we can handle any kinda of data that we want to do, when it hits the component, it is exactly the shape that we need
        // select('projects'),
        // map(data => data.entities),
        // map(data => Object.keys(data).map(k => data[k]))
      )
      this.currentProject$ = store.pipe(
        select(selectCurrentProject)
      )
    }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    // this.currentProject = emptyProject;
    this.store.dispatch(new SelectProject(null));
  }

  selectProject(project) {
    // this.currentProject = project;
    this.store.dispatch(new SelectProject(project.id));
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    this.store.dispatch(new LoadProjects());
    // step 6: no longer need payload, it only needs to trigger the LoadProjects, the payload will be the return value in the ProjectsLoaded
  }

  createProject(project) {
  // the dispatch action is no longer going to the reducer, it goes to @Effect middleware first, then get the data by called the service, then dispatch a new action object with the result and sends in the reducer
    this.store.dispatch(new AddProject(project));
    // These will go away
    this.ns.emit('Project created!');
    this.resetCurrentProject();
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project));
    // These will go away
    this.ns.emit('Project updated!');
    this.resetCurrentProject();
  }

  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project));

    // These will go away
    this.ns.emit('Project deleted!');
    this.resetCurrentProject();
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }
}

