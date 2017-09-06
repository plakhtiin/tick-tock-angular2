import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {Http} from '@angular/http';
import { UiSwitchModule } from 'angular2-ui-switch';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'main-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit{
    authToken:string = '';
    addNewUser:boolean = false;

    constructor(private router : Router, private route: ActivatedRoute){

    }

    ngOnInit(){
        console.log(localStorage);
        let storedToken:string = localStorage.getItem('authToken');
        if(storedToken)
            this.authToken = storedToken;
        else
            this.router.navigateByUrl('/login');


        // grab users
        // this.http.get('https://reqres.in/api/users?page=2')
        //     .map(res => res.json().data)
        //     .subscribe(users => this.users = users);

        // this.http.get('https://reqres.in/api/users?page=2')
        //     .toPromise()
        //     .then(data =>{
        //         console.log(data)
        //     });
        // this.service.getUsers()
        //     .subscribe(
        //         users => this.users = users,
        //         err =>{
        //             //show error msg
        //         }
        //     );
    }
    // getUsers(){
    //     return this.http.get('http://blambloom.com/api/comments')
    // }

    // getUsers().subscribe(users => console.log(users));

    goToStatistic(){
        this.router.navigate(['../statistic'], { relativeTo: this.route });
    }
    goToSettings(){
        this.router.navigate(['../settings'], { relativeTo: this.route });
    }

}