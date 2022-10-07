import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { IgxButtonModule, IgxIconModule, IgxCardModule, IgxRippleModule } from "igniteui-angular";
import { httpInterceptorProviders } from './_helpers/http.interceptors';
import { SmsFromFileComponent } from './messageManagement/sms-from-file/sms-from-file.component';
import { BnNgIdleService } from 'bn-ng-idle';

import { DivisionComponent } from './employeeManagement/division/division.component';
import { AddEmployeeComponent } from './employeeManagement/employee/add.component';
import { EmployeeComponent } from './employeeManagement/employee/employee.component';
import { ViewMessagesComponent } from './messageManagement/view-messages/view-messages.component';
import { HomeComponent } from './home/home.component';
import { AddDivisionComponent } from './employeeManagement/division/add.component';
import { UserComponent } from './employeeManagement/user/user.component';
import { AddUserComponent } from './employeeManagement/user/add.component';
import { UserProfileComponent } from './employeeManagement/user/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    SmsFromFileComponent,
    DivisionComponent,
    AddEmployeeComponent,
    EmployeeComponent,
    ViewMessagesComponent,
    HomeComponent,
    AddDivisionComponent,
    UserComponent,
    AddUserComponent,
    UserProfileComponent

  


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    HttpClientModule,
    MatExpansionModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    NgApexchartsModule,
    IgxButtonModule,
    IgxIconModule,
    IgxCardModule,
    IgxRippleModule,
    

    //I keep the new line
  ],
  providers: [
    httpInterceptorProviders,
    BnNgIdleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
