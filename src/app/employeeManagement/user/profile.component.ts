import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { StorageService } from "src/app/service/storage.service";
import { UserService } from "src/app/service/user.service";

@Component({
    selector: "app-userProfile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"]
})

export class UserProfileComponent implements OnInit {

    isSignUpFailed = false;
    isUpdateFailed = false;
    isUpdated = false;
    successMessage = ''
    errorMessage = '';
    loggedinUser: any
    editUseData: any = {
      userName: null,
      password: null,
      newPassword: null,
      confirmPassword: null
    };
  
    constructor(private userService: UserService, private router: ActivatedRoute, private currentuser: StorageService) {
  
    }
  
    ngOnInit(): void {
      this.loggedinUser = this.currentuser.getUser()
      console.log(this.loggedinUser.id)
    }
  
  
    updateProfile() {
      this.isUpdated=false
      this.isUpdateFailed = false
      console.log("woow " + this.editUseData.password)
      this.userService.checkPassword(this.editUseData.password).subscribe({
        next: data => {
          if (this.editUseData.password === this.editUseData.newPassword) {
            this.errorMessage = "Please enter another new password!"
  
          } else {
            this.userService.updateUser(this.editUseData.newPassword, this.loggedinUser.id).subscribe({
              next: data => {
                this.successMessage = data.message
                this.isUpdated = true
                this.editUseData.password = null
                this.editUseData.newPassword = null
                this.editUseData.confirmPassword = null
                // window.location.reload();
              },
              error: err => {
                console.log(err)
                this.errorMessage = err.error.message
                this.isUpdateFailed = true
                console.log(err.error.message)
                window.location.reload();
              }
            });
          }
  
  
        },
        error: err => {
          this.errorMessage = "Password is not correct!";
          this.isUpdateFailed = true
          this.isSignUpFailed = true;
          this.editUseData.password = null
          this.editUseData.newPassword = null
          this.editUseData.confirmPassword = null
  
        }
      });
  
    }
}