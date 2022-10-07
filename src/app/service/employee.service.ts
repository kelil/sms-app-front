import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private ApiUrl = `${environment.API_OUT_URL}` + "api/v1/employees"
  private piUrl = `${environment.API_OUT_URL}` + "api/v1/divisions"
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.ApiUrl);
  }

  addEmployee(data: any) {
 
  return this.http.post(this.ApiUrl + "/employee", data);
  }

  updateEmployee(data: any, id: any){
    return this.http.patch(this.ApiUrl+"/employee/"+id,data);
  }

  getEmployee(id:any): Observable<any>{
    return this.http.get(this.ApiUrl+"/employee/"+id);
  }

  deleteEmployee(id: any){
    return this.http.delete(this.ApiUrl+"/employee/"+id);
  }

  getDivisions() {
    return this.http.get(this.piUrl);
  }
}
