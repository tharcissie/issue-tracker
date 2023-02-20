import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProjectsComponent } from './projects/projects.component';
import { IssuesComponent } from './issues/issues.component';
import { UsersComponent } from './users/users.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';

import * as CanvasJSAngularChart from '../../assets/canvasjs.angular.component';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { IssueTableComponent } from './components/issue-table/issue-table.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProfileComponent } from './profile/profile.component';
import { PaginationComponent } from './components/pagination/pagination.component';

var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
@NgModule({
  declarations: [
    DashboardRoutingModule.components,
    SidebarComponent,
    BodyComponent,
    HomepageComponent,
    ProjectsComponent,
    IssuesComponent,
    UsersComponent,
    DashboardCardComponent,
    CanvasJSChart,
    ProjectTableComponent,
    UserTableComponent,
    IssueTableComponent,
    ProfileComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ModalModule.forRoot(),
  ],
})
export class DashboardModule {}
