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

  throwError!: string;
  errorSub: Subscription

  constructor(private dataService: DataService) {
    this.errorSub = dataService.error$.subscribe(errorMsg => {
      this.throwError = errorMsg
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe()
  }

  onSignUp() {
    if (this.username && this.password) {
      // this.dataService.signUp(this.username, this.password)
    }

    else if (!this.username || !this.password) {
      this.throwError = 'Username and Password can not be empty.'
    }
  }

}
