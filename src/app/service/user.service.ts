import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor(private http: HttpClient) { }
  
  getAll(){
    return this.http.get(environment.API_OUT_URL+"api/auth/users");
  }

  addUser(data: any): Observable<any> {
  
    return this.http.post(environment.API_OUT_URL+"api/auth/signup",data);
  }

  deleteUser(id: any){
    return this.http.delete(environment.API_OUT_URL+"api/auth/users/user/"+id);
  }

  checkPassword(password: any): Observable<any> {
    return this.http.post(environment.API_OUT_URL+"api/auth/password",password);
}

updateUser(password:any,id:any): Observable<any>{
  return this.http.patch(environment.API_OUT_URL+"api/auth/update/"+id,password);
}
}
