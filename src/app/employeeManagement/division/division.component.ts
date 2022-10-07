import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DivisionService } from 'src/app/service/division.service';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {

dataSource!: MatTableDataSource<any>;
displayedColumn: string[] = ['name','parent','actions'];
@ViewChild(MatPaginator) paginator!: MatPaginator
@ViewChild(MatSort) sort!: MatSort
divisions: any


  constructor(private divisionService: DivisionService) { }

  ngOnInit(): void {
    this.divisionService.getDivisions().subscribe({
      next: data => {
        this.divisions=data
        console.log(this.divisions)
        this.dataSource = new MatTableDataSource(this.divisions)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      }
    })
  }


  deleteDivision(arg0: any) {
    if (confirm("Are you sure,You want to delete this division?")) {
      return this.divisionService.deleteDivision(arg0).subscribe({
        next: resp => {
          alert(resp.message)
        },
        error: (err: any) => {
  
        }
      })
    }
    else {
      return null
    }
   
    }

  applyFilter($event: KeyboardEvent) {
    throw new Error('Method not implemented.');
    }

}
