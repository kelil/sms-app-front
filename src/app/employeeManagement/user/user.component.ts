import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/service/user.service';

export interface userData {
  userName: string,
  email: string,
  employee: any
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumn: string[] = ['userName','email','employee','actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  dataSource!: MatTableDataSource<userData>
  posts:any
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(response => {
      console.log(JSON.stringify(response))
      this.posts=response
      this.dataSource = new MatTableDataSource(this.posts)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }
  }
  check(data: any){
    return false
  }

  deleteUser(id: any){
   if(confirm("Are you sure, you want to delete this user ?")){
    return this.userService.deleteUser(id).subscribe(response => {
      console.log(response)
      this.ngOnInit()
    })
   }
   return null
    
  }

}
