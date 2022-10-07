import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { EmployeeService } from "src/app/service/employee.service";
import { EmployeeComponent } from "./employee.component";

@Component({
    selector: 'app-update-employee',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css']
  })

  export class UpdateEmployeeComponent implements OnInit{

    updateData: any
    constructor(private employeeService: EmployeeService, private router: ActivatedRoute){

    }
    ngOnInit(): void {
        this.updateData = new FormGroup({
            firstName: new FormControl(),
            lastName: new FormControl(),
            email: new FormControl(),
            phone: new FormControl(),
            position: new FormControl(),
            process: new FormControl(),
            subprocess: new FormControl(),
            team: new FormControl()
          });
    }

   
  }