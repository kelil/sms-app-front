import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface EmployeeData{
  firstName: string,
  email: string,
  position: string,
  phone: string,
  process: any
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  displayedColumn: string[] = ['fullName','email','position','phone','division','actions'];
  dataSource!: MatTableDataSource<EmployeeData>
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  posts:any
  post: any =[];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe(response => {
      this.posts = response
      this.posts.forEach((element: { givenName: string; fatherName: string; grandFatherName: string; email: any; phoneNumber: any; division: { name: any; }; position: any; }) => {
        this.post.push({fullName: element.givenName+" "+element.fatherName+" "+element.grandFatherName,email: element.email, phoneNumber:element.phoneNumber,division:element.division.name,position: element.position})
      });
      this.dataSource = new MatTableDataSource(this.post)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    });
  }

  getAll(){

    return this.employeeService.getAll().subscribe(response => {
      console.log("hello this is :"+JSON.stringify(response));
    });
  }

   applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }
  }

  deleteEmployee(id: any){
   
    if(confirm("Are you sure, you want to delete this employee ?")){
      return this.employeeService.deleteEmployee(id).subscribe(response => {
        console.log(response)
        this.ngOnInit()
      })
    }
    return null
    
  }
  
}
