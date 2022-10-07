import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SmsService {
  
 
 

  constructor(private http:HttpClient) { }

  getEmployees() {
    return this.http.get(environment.API_OUT_URL+"api/v1/employees/");
  }
  process() {
    return this.http.get(environment.API_OUT_URL+"api/v1/processes");
  }
  team(args: any) {
    return this.http.get(environment.API_OUT_URL+"api/v1/teams/subprocesses?"+args);
  }
  subprocess(args: any) {
    return this.http.get(environment.API_OUT_URL+"api/v1/subprocesses/processes?"+args);
  }


  commitMessage(batch: any): Observable<any> {
    console.log("committed")
   return this.http.get(environment.API_OUT_URL+"api/v1/messages/batch_id?id="+batch)
  }  
  sendMessage(employees: any, messages: any, user_id: any): Observable<any> {
   let  messageObj = {
      employees: employees,
      messages: messages,
      user_id: user_id
    }
    return this.http.post(environment.API_OUT_URL+"api/v1/messages/message",messageObj);
  }

  getAllByTeam(teams: any) {
    return this.http.get(environment.API_OUT_URL+"api/v1/employees/teams?"+teams)
  }
  getAllByProcess(processes: any) {
   return this.http.get(environment.API_OUT_URL+"api/v1/employees/processes?"+processes)
  }
  getAllBySubProcess(subprocesses: any) {
    return this.http.get(environment.API_OUT_URL+"api/v1/employees/subprocesses?"+subprocesses)
  }

  uploadFile(file: File, user: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file",file);
    formData.append("user_id",user);
    return this.http.post(environment.API_OUT_URL+"api/v1/messages/uploadfile",formData);
  }
}
