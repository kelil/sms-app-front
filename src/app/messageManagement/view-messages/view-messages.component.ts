import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from "lodash";
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/service/message.service';


export interface MessageData {
    phoneNumber: string,
    messageContent: string,
    messageBatch: any,
    messageBatchDate: any,
    sender: any,
    status: any
}

@Component({
    selector: 'app-view-messages',
    templateUrl: './view-messages.component.html',
    styleUrls: ['./view-messages.component.css']
})
export class ViewMessagesComponent implements OnInit {

    displayedColumn: string[] = ['phoneNumber', 'messageContent', 'messageBatch', 'messageBatchDate', 'sender', 'status'];
    dataSource!: MatTableDataSource<MessageData>
    @ViewChild(MatPaginator) paginator!: MatPaginator
    @ViewChild(MatSort) sort!: MatSort
    posts: any = []
    post: any
    batchFilter: any = []
    statusFilter: any = []
    formData = new FormGroup({
        statusField: new FormControl()
    });

    constructor(private messageService: MessageService) { }

    ngOnInit(): void {

        this.messageService.getAll().subscribe(response => {
            console.log("hello this is :" + JSON.stringify(response));
            this.post = response

            this.post.forEach((element: any) => {
                let status;
                if (element.status == 0) {
                    status = 'Pending';

                } else if (element.status == 1 || element.status == 8) {
                    status = 'Success';
                } else if (element.status == 2 || element.status == 16 || element.status == 32) {
                    status = 'Failed';
                }
                this.posts.push({ phoneNumber: element.phoneNumber, messageContent: element.messageContent, messageBatch: element.messageBatch.id, messageBatchDate: element.messageBatch.messageBatchDate, status: status, sender: element.user.employee.givenName + " " + element.user.employee.fatherName })
            });
            console.log(this.posts)

            this.dataSource = new MatTableDataSource(this.posts)
            this.dataSource.paginator = this.paginator
            this.dataSource.sort = this.sort
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value
        this.dataSource.filter = filterValue.trim().toLowerCase()

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage()
        }
    }

    statusFilterFun(value: any, obj: any) {
        return _.filter(obj, (item) => {
            return item.status.toLowerCase() == value;
        });
    }

    batchFilterFun(value: any, obj: any) {
        return _.filter(obj, (item) => {
            return item.messageBatch == value;
        });
    }


    applyBatchFilter(event: Event) {
        
        const filterValue = (event.target as HTMLInputElement).value
        this.formData.reset()
        if(filterValue!=''){
        this.batchFilter = this.batchFilterFun(filterValue, this.posts)
        this.dataSource = new MatTableDataSource(this.batchFilter)
        }else{
        this.dataSource = new MatTableDataSource(this.posts)

    }
       
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
    }

    applyChange(event: any) {
        if (this.batchFilter.length != 0) {
            this.statusFilter = this.statusFilterFun(event.value, this.batchFilter)
        } else {
            this.statusFilter = this.statusFilterFun(event.value, this.posts)
        }
        this.dataSource = new MatTableDataSource(this.statusFilter)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
    }}

