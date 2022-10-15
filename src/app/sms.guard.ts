import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SmsGuard implements CanActivate {
  constructor(private storage:StorageService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.storage.getUser().roles[0]==="ROLE_USER"){
        return true
      }
    window.alert("You do not have permission to access this resource")
    return false;
  }
  
}
