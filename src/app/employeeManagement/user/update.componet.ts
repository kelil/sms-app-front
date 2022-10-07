import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/service/user.service";

@Component({
    selector: "app-updateUser",
    templateUrl: "./update.component.html",
    styleUrls: ["./user.component.scss"]
})

export class UpdateUserComponent implements OnInit {

    editUseData = new FormGroup({
        userName: new FormControl(),
        password: new FormControl(),
        newPassword: new FormControl(),
        confirmNewPassword: new FormControl()
    });

    constructor(private userService: UserService, private router: ActivatedRoute){

    }

    ngOnInit(): void {
        
    }

    editUser(){
        return this
    }
}