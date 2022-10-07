import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeService } from "src/app/service/employee.service";


export interface Employee{
  givenName: string,
  fatherName: string,
  grandFatherName: string,
  email: string,
  phoneNumber: string,
  position: string,
  division: any
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})



export class AddEmployeeComponent implements OnInit {

  userData: any
  updateData: any
  router: any
  divisions: any = [];
  employee!: Employee

  constructor(private employeeService: EmployeeService, router: ActivatedRoute, private routerLink: Router) {
    this.router = router;
  }
  ngOnInit(): void {
    this.userData = new FormGroup({
    //  coopId: new FormControl(),
      givenName: new FormControl(),
      fatherName: new FormControl(),
      grandFatherName: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl(),
      position: new FormControl(),
      division: new FormControl(),
     
    });

    this.updateData = new FormGroup({
      //coopId: new FormControl(),
      givenName: new FormControl(),
      fatherName: new FormControl(),
      grandFatherName: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl(),
      position: new FormControl(),
      division: new FormControl(),
    });

    this.employeeService.getEmployee(this.router.snapshot.params['id']).subscribe(response => {
      this.employee= response
      //this.userData.controls['coopId'].setValue(Object.values(response)[1])
      this.userData.controls['givenName'].setValue(this.employee.givenName)
      this.userData.controls['fatherName'].setValue(this.employee.fatherName)
      this.userData.controls['grandFatherName'].setValue(this.employee.grandFatherName)
      this.userData.controls['email'].setValue(this.employee.email)
      this.userData.controls['phoneNumber'].setValue(this.employee.phoneNumber)
      this.userData.controls['position'].setValue(this.employee.position)
      this.userData.controls['division'].setValue(this.employee.division)

    })

    this.employeeService.getDivisions().subscribe({
      next: resp => {
        this.divisions=resp
      },
      error: err => {
        console.log(err.error.message)
      }
    })

   
  }

  addEmployee() {

      console.log(this.userData.value)
    this.employeeService.addEmployee(this.userData.value).subscribe({
      next: data => {
        alert("successfully submitted!")
        this.routerLink.navigate(['employees'])
      },
      error: er => {
        alert("operation is not successful! "+er.error.message)
      }
    })
  }
  updateEmployee() {
    console.log("from update: " + this.userData.value)
    return this.employeeService.updateEmployee(this.userData.value, this.router.snapshot.params['id']).subscribe(response => {
      console.log(response)
      this.routerLink.navigate(['employees'])
    })
  }

}