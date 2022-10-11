import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = 'please fill required fields';
  roles: string[] = [];
  constructor(private authService: AuthService, private storageService: StorageService, private router:Router) { }
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }
  onSubmit(){
   // const { username, password } = this.form;
   if(this.form.value.username=='' || this.form.value.password==''){
    return null;
   }
   return this.authService.login(this.form.value.username, this.form.value.password).subscribe({
      next: data => {
        
        console.log(data)
        this.storageService.saveUser(data);
        
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
        if(this.roles[0]=="ROLE_ADMIN"){
          this.router.navigate(["users"])
        }else{
          this.router.navigate(["home"])
        }
        
      },
      error: err => {
        console.log(err.error.message)
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.form.reset()
      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }

  autologout(expireIn: number){
   // alert(expireIn)
    setTimeout(()=>{
      this.logout()
    },expireIn)
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
      },
      error: err => {
        alert(err);
      }
    });
  }
  
}