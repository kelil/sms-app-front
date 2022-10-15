import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddDivisionComponent } from './employeeManagement/division/add.component';
import { DivisionComponent } from './employeeManagement/division/division.component';
import { AddEmployeeComponent } from './employeeManagement/employee/add.component';
import { EmployeeComponent } from './employeeManagement/employee/employee.component';
import { AddUserComponent } from './employeeManagement/user/add.component';
import { UserProfileComponent } from './employeeManagement/user/profile.component';
import { UpdateUserComponent } from './employeeManagement/user/update.componet';
import { UserComponent } from './employeeManagement/user/user.component';
import { HomeComponent } from './home/home.component';
import { SmsFromFileComponent } from './messageManagement/sms-from-file/sms-from-file.component';
import { ViewMessagesComponent } from './messageManagement/view-messages/view-messages.component';
import { RoleGuard } from './role-guard.guard';
import { SmsGuard } from './sms.guard';


const routes: Routes = [{ path: "home", component: HomeComponent },
{ path: "dashboard", component: DashboardComponent },
{path: "login", component: LoginComponent },
{path: "users/register", component: RegisterComponent },
{path: "messages/smsfromfile", canActivate:[SmsGuard], component: SmsFromFileComponent},
{path: "messages/viewmessages", canActivate:[SmsGuard], component: ViewMessagesComponent},
{path: "users", canActivate:[RoleGuard],  children: [
  {
    path: "profile", component: UserProfileComponent
  },
  {
    path: "", component: UserComponent
  },
  {
    path:"user", component: AddUserComponent
  },
  {
    path: "user/:id", component: UpdateUserComponent
  }
]},

{
  path: "employees", canActivate:[RoleGuard], children: [
    {
      path: "", component: EmployeeComponent
    },
    {path: "add", component: AddEmployeeComponent},
    {path: "add/:id", component: AddEmployeeComponent}
  ]
},
{
  path: "divisions", canActivate:[RoleGuard],  children: [
    {
      path: "", component: DivisionComponent
    },
    {path: "add", component: AddDivisionComponent},
    {path: "add/:id", component:AddDivisionComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
