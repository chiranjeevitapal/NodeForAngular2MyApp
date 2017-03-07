import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { FBService } from './fb.service';
@Component({
    selector: 'walkinshub-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    isLoggedIn: boolean;
    constructor(private appService: AppService, private fbService: FBService) { }
    ngOnInit(){
      this.fbService.initiate();
    }
    checkLoginState() {
        this.fbService.checkLoginState();
    }
    logOut() {
        this.fbService.logOut();
    }
    statusChangeCallback(response) {
        this.fbService.statusChangeCallback(response);
    }

}
