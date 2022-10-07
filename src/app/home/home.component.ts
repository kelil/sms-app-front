import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { MessageData } from '../messageManagement/view-messages/view-messages.component';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumn: string[] = ['sender','total','success','pending','failed','cost'];
  dataSource!: MatTableDataSource<MessageData>
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  posts:any = []

  total: number = 0
  success: number = 0
  pending: number = 0
  failed: number = 0
  response: any = []
  constructor(private smsService: MessageService) {
    this.smsService.getAll().subscribe({
      next: data => {

        this.response= data
        const grouped = groupBy(this.response, (message: { user: { userName: any; }; }) => message.user.userName);
        console.log(grouped)
  
        grouped.forEach((value,key) => {
          let sus = 0
          let pen = 0
          let fail = 0
          value.forEach((elements: { status: number; }) => {
            if(elements.status==1 || elements.status==8){
              this.success++
              sus++
            }else if(elements.status==0){
              this.pending++
              pen++
            }else if(elements.status==2 || elements.status==16 || elements.status==32){
              fail++
              this.failed++
            }
          });
          this.posts.push({sender:key,total:sus+pen+fail,pending:pen,success:sus,failed:fail})
          
        });

        
        this.total=this.response.length

       
        console.log(this.posts)
        this.dataSource = new MatTableDataSource(this.posts)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort

        function groupBy(list: any[], keyGetter: { (message: any): any; (arg0: any): any; }) {
          const map = new Map();
          list.forEach((item: any) => {
               const key = keyGetter(item);
               const collection = map.get(key);
               if (!collection) {
                   map.set(key, [item]);
               } else {
                   collection.push(item);
               }
          });
          return map;
      }
    
       // alert(this.response)
      }
    })
   }

   

  ngOnInit(): void {
   
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }
  }

}
