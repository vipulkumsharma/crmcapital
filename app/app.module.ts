import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';// for data-binding
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageWorkLocationComponent } from './manage-work-location/manage-work-location.component';
import { JobForOperatorComponent } from './job-for-operator/job-for-operator.component';
import { BulkUplodeComponent } from './bulk-uplode/bulk-uplode.component';
import { JobCardComponent } from './job-card/job-card.component';
import { EmailConfigComponent } from './email-config/email-config.component';
import { ReportsComponent } from './reports/reports.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ControllerComponent } from './controller/controller.component';
import { OperatorComponent } from './operator/operator.component';
import { FieldAssociateComponent } from './field-associate/field-associate.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ManageWorkLocationComponent,
    JobForOperatorComponent,
    BulkUplodeComponent,
    JobCardComponent,
    EmailConfigComponent,
    ReportsComponent,
    HeaderComponent,
    FooterComponent,
    ControllerComponent,
    OperatorComponent,
    FieldAssociateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule,
    Ng2SearchPipeModule,NgxPaginationModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
