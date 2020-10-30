import { Project } from './../../../../../libs/core-data/src/lib/projects/project.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Customer, ProjectsService, NotificationsService, CustomersService, ProjectsState } from '@workshop/core-data';
import { select, Store } from '@ngrx/store';

// Wire the States into the components

// Because of using State, so the Project Object here will be removed from this component, and added it into the store, then selects it, and then brings it into the app.
const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit {
  // step 2: set projects, with observable with projects
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject: Project;

  constructor(
    private projectsService: ProjectsService,
    private customerService: CustomersService,
    // step 1: import the Store that has 'ProjectState'
    // Store here is acting as a Database
    private store: Store<ProjectsState>,
    private ns: NotificationsService) {
    // step 3, it will send the projects data to this component from state - reducer.
    // get the projects through service
    // returns 'Observable string' from [this.projects$], Then we put into a pipe operator, then select the entire 'projects state'
      this.projects$ = store.pipe(
        select('projects'),
        map((projectsState: ProjectsState) =>
        projectsState.projects
        )
      )
    }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.currentProject = emptyProject;
  }

  selectProject(project) {
    this.currentProject = project;
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    // this.projects$ = this.projectsService.all();
    // no longer to make http call the service to get the projects data
    // the data now is coming from the store

  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.projectsService.create(project)
      .subscribe(response => {
        this.ns.emit('Project created!');
        this.getProjects();
        this.resetCurrentProject();
      });
  }

  updateProject(project) {
    this.projectsService.update(project)
      .subscribe(response => {
        this.ns.emit('Project saved!');
        this.getProjects();
        this.resetCurrentProject();
      });
  }

  deleteProject(project) {
    this.projectsService.delete(project)
      .subscribe(response => {
        this.ns.emit('Project deleted!');
        this.getProjects();
        this.resetCurrentProject();
      });
  }
}

