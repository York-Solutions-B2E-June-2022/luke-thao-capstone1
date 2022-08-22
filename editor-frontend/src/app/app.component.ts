import { Component } from '@angular/core';
import {DataService} from "./data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Ez-Money Editor';

  username!: string | null
  usernameSub: Subscription

  constructor(private dataService: DataService) {

    if (dataService.user) {
      this.username = dataService.user.username
    }

    this.usernameSub = dataService.user$.subscribe(userUpdate => {
      if (userUpdate) {
        this.username = userUpdate.username
      }

      else {
        this.username = null
      }

    })
  }

  onLogOut() {
    this.dataService.logOut();
  }

}
