import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/auth.service";
import { EmployeeService } from "src/app/service/employee.service";
import { UserService } from "src/app/service/user.service";

@Component({
    selector: 'app-addUser',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddUserComponent implements OnInit {


    roles: any[] = ["admin", "user"]
    employees: any
    userData = new FormGroup({
        userName: new FormControl(),
        password: new FormControl(),
        email: new FormControl(),
        employee: new FormControl(),
        role: new FormControl()
    })

    constructor(private authService: AuthService, private emps: EmployeeService, private userService: UserService, private router:Router) { }
    ngOnInit(): void {
        this.getEmployee()
    }
    getEmployee() {
        return this.emps.getAll().subscribe(response => {
            this.employees = response
            console.log(this.employees)
        })
    }

    addUser(){
        return this.userService.addUser(this.userData.value).subscribe({
            next: data => {
                
                alert(data.message)
                this.router.navigate(["users"])
            },
            error: err => {
                alert(err.error.message)
            }
        });
    }

    
}