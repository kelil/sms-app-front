import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private _httpClient: HttpClient) { }

  getList<T>(url: string) {
    return this._httpClient.get<T[]>(`${environment.API_URL}/${url}`).pipe(
      retry(1),
     
    )
  }
}

