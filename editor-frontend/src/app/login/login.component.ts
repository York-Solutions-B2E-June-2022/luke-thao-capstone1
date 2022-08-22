import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Subscription} from "rxjs";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  notification!: Array<string | boolean>;
  notificationSub: Subscription

  constructor(private dataService: DataService, private httpService: HttpService) {
    this.notificationSub = dataService.notification$.subscribe(message => {
      this.notification = message
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.notificationSub.unsubscribe()
  }

  onLogin():void {
    this.notification = [];

    if (this.username && this.password) {
      this.dataService.login(this.username, this.password)
    }

    else {
      this.notification = ['Username and Password can not be empty.', false]
    }
  }

}
