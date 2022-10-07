import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMenu } from '../IMenu';
import { MenuService } from '../service/menu.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  menuList: Observable<IMenu[]> | undefined;
  loggedInUser: any
  loggedInUserRole: any
  constructor(private httpService: MenuService,  private currentuser: StorageService) { }

  ngOnInit(): void {
    this.loggedInUser=this.currentuser.getUser();
    this.menuList = this.httpService.getList<IMenu>("/assets/menu.json")
    this.loggedInUserRole=this.loggedInUser.roles[0]
    console.log(this.loggedInUserRole)
  }

  hasRole(roles: any[]){
    return roles.includes(this.loggedInUserRole);
  }

 
  
}
