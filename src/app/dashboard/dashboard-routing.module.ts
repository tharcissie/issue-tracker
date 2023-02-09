import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { IssuesComponent } from './issues/issues.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
    { path: '', component: DashboardComponent },
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: HomepageComponent },
            { path: 'projects', component: ProjectsComponent },
            { path: 'issues', component: IssuesComponent },
            { path: 'users', component: UsersComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
    static components = [DashboardComponent];
}