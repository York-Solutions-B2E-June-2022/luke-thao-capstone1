import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  username!: string;
  password!: string;

  notification!: Array<string | boolean>;
  notificationSub: Subscription

  constructor(private dataService: DataService) {
    this.notificationSub = dataService.notification$.subscribe(message => {
      this.notification = message
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.notificationSub.unsubscribe()
  }

  onSignUp() {
    if (this.username && this.password) {
      this.dataService.signUp(this.username, this.password)
    }

    else if (!this.username || !this.password) {
      this.notification = ['Username and Password can not be empty.', false]
    }
  }

}
