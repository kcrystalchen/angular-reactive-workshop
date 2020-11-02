export { AuthGuardService } from './lib/auth/auth-guard.service';
export { AuthService } from './lib/auth/auth.service';
export { CoreDataModule } from './lib/core-data.module';
export { NotificationsService } from './lib/notifications/notifications.service';
export { CustomersService } from './lib/customers/customers.service';
export { Customer } from './lib/customers/customer.model';
export { Project } from './lib/projects/project.model';
export { ProjectsService } from './lib/projects/projects.service';
export { CustomersFacade } from './lib/state/customers/customers.facade';

// tips: when we get to facades, we are gonna bypass all of that [currently we need to export the states]


// export the states, then consume them into the application [could be modules, projects]  - Expose projects state
export { ProjectsState } from './lib/state/projects/projects.reducer';

// step 4 from projects.actions.ts
//  export the project.actions.ts because it will be need expose them to inside the application
export {SelectProject, AddProject, UpdateProject, DeleteProject} from './lib/state/projects/projects.actions'


