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

  throwError!: string;
  errorSub: Subscription

  constructor(private dataService: DataService, private httpService: HttpService) {
    this.errorSub = dataService.error$.subscribe(errorMsg => {
      this.throwError = errorMsg
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe()
  }

  onLogin():void {
    this.throwError = ''

    if (this.username && this.password) {
      // this.dataService.login(this.username, this.password)
    }

    else {
      this.throwError = 'Username and Password can not be empty.'
    }
  }

}
