import {Component, OnInit} from "@angular/core";
import {Http} from '@angular/http';

import { MainService } from '../../services/mainService';

export class CreateNewUser{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: string;
}

@Component({
    selector: 'new-user',
    templateUrl: 'new-user.component.html'
})

export class NewUserComponent implements OnInit{
    message:string = 'hello';
    userData: CreateNewUser = new CreateNewUser();

    systemRoles : Object = {
        admin: 'Administrator',
        manager: 'Manager',
        user: 'User'
    };

    constructor(private mainService: MainService){

    }

    onSubmit(){
        this.mainService.createUser(this.userData)
    }

    ngOnInit(){

    }

}