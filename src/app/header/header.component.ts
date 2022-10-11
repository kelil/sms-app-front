import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForm : EventEmitter<any>= new EventEmitter();
  constructor( private authService: AuthService, private storageService: StorageService, private router: Router) { }

  currentUser: any
  ngOnInit(): void {
    this.currentUser=this.storageService.getUser()
  }

  toggleSidebar(){
    this.toggleSidebarForm.emit()
  }
  autologout(expireIn: number){
    alert(expireIn)
    setTimeout(()=>{
      this.logout()
    },expireIn)
  }
  logout() {
    return this.authService.logout().subscribe({
      next: res => {
        
        console.log(res);
        this.storageService.clean();
        this.router.navigate(["login"])
        window.location.reload();
      },
      error: err => {
        alert(err.error.message);
        this.storageService.clean();
        window.location.reload();
      }
    });
    
   
  }

}
