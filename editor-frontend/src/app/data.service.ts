import { Injectable } from '@angular/core';
import {first, Subject} from "rxjs";
import {Router} from "@angular/router";
import {HttpService} from "./http.service";
import {IUser} from "./Interfaces/IUser";
import {ISurveyReq} from "./Interfaces/ISurveyReq";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user!: IUser | null;
  user$ = new Subject<IUser | null>()

  surveys!: Array<ISurveyReq>;
  surveys$ = new Subject<Array<ISurveyReq>>()

  notification$ = new Subject<Array<string | boolean>>();

  constructor(private router: Router, private httpService: HttpService) {
    this.getSurveys()
  }

  getSurveys() {
    let observable = this.httpService.getSurveys().pipe(first()).subscribe({

      next: (data: Array<ISurveyReq>) => {
        this.surveys = data;
        this.surveys$.next(data);
      },

      error: () => {this.notification$.next(['Invalid Username or Password', false])}
    })
  }

  login(username: string, password: string) {

    let observable = this.httpService.login(username, password).pipe(first()).subscribe({

      next: (data: IUser) => {
        this.user = data;
        this.user$.next(this.user);
        this.router.navigate(['']);
      },

      error: () => {this.notification$.next(['Invalid Username or Password', false])}
    })
  }

  signUp(username: string, password: string) {
    let observable = this.httpService.signUp(username, password).pipe(first()).subscribe({
      next: () => {
        this.notification$.next(["Sign up successful!", true]);
        setTimeout(() => this.router.navigate(["/login"]), 700);
      },

      error: (error) => this.notification$.next(["Username taken", false])
    })
  }

  logOut() {
    this.user = null
    this.user$.next(null)
    this.router.navigate(['login'])
  }
}
