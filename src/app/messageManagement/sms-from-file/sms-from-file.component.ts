
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SmsService } from 'src/app/service/sms.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-excelsheet',
  templateUrl: './sms-from-file.component.html',
  styleUrls: ['./sms-from-file.component.css']
})
export class SmsFromFileComponent implements OnInit {
  @ViewChild('file')
  files!: ElementRef;

  constructor(private smsService: SmsService, private storageService: StorageService) { }
  selectedFiles: any
  loading: boolean = false; 
  file!: File;
  user: any
  uploaded: boolean = false;
  successMessage="SuccessFully Uploaded and Submitted"
  ngOnInit(): void {
    this.user = this.storageService.getUser();

  }

  onChange(event: any) {
    this.file = event.target.files[0];
}

  uploadFile(){
   // console.log(this.uploadform.value)
   if(this.file==null){
    alert("please Select file!!")
    return;
   }
   this.uploaded=true
    return this.smsService.uploadFile(this.file, this.user.id).subscribe({
      next: data => {
        console.log(data.id)
        this.smsService.commitMessage(data.id).subscribe({
          next: data => {
            console.log(data)
          },
          error: err => {
            console.log(err)
          }
        })
        alert("Message Uploaded Successfully!! please copy this messageBatchNumber :"+data.id)
        this.files.nativeElement.value = null;
        this.uploaded=false;
       //window.location.reload()
      },
      error: err => {
       alert(err.error.message)
       this.files.nativeElement.value = null;
       this.uploaded=false;
      }
    });
  }
}