import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Division } from '../employeeManagement/division/add.component';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  constructor(private http: HttpClient) { }


  getDivisions() {
    return this.http.get(environment.API_OUT_URL+"api/v1/divisions")
  }

  updateDivision(data: any, id: any) {
   return this.http.put(environment.API_OUT_URL+"api/v1/divisions/division/"+id,data)
  }
  addDivision(data: any) {
    return this.http.post(environment.API_OUT_URL+"api/v1/divisions/division",data)
  }
  getDivision(id: any): Observable<any> {
    return this.http.get(environment.API_OUT_URL+"api/v1/divisions/division/"+id)
  }
  deleteDivision(id: any): Observable<any>{
    return this.http.delete(environment.API_OUT_URL+"api/v1/divisions/delete/"+id);
  }


}
