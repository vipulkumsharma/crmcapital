import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BulkUplodeComponent } from './bulk-uplode/bulk-uplode.component';
import { ControllerComponent } from './controller/controller.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailConfigComponent } from './email-config/email-config.component';
import { FieldAssociateComponent } from './field-associate/field-associate.component';
import { JobCardComponent } from './job-card/job-card.component';
import { JobForOperatorComponent } from './job-for-operator/job-for-operator.component';
import { ManageWorkLocationComponent } from './manage-work-location/manage-work-location.component';
import { OperatorComponent } from './operator/operator.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'controller', component: ControllerComponent
  },
  {
    path: 'operator', component: OperatorComponent
  },
  {
    path: 'field-associate', component: FieldAssociateComponent
  },
  {
    path: 'bulk-uplode', component: BulkUplodeComponent
  },
  {
    path: 'email-config', component: EmailConfigComponent,
  },
  {
    path: 'job-card', component: JobCardComponent,
  },
  {
    path: 'job-for-operator', component: JobForOperatorComponent,
  },
  {
    path: 'manage-work-location', component: ManageWorkLocationComponent
  },
  {
    path: 'report', component: ReportsComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


