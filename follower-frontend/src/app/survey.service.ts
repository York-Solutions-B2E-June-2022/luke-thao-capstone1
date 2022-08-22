import { Injectable } from '@angular/core';
import {ISurvey} from "./Interfaces/ISurvey";
import {Router} from "@angular/router";
import {HttpService} from "./http.service";
import {IQuestion} from "./Interfaces/IQuestion";
import {first, Subject, Subscription} from "rxjs";
import {IUser} from "./Interfaces/IUser";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})

export class SurveyService {

  survey!: ISurvey | null
  questions!: Array<IQuestion> | null;
  questions$ = new Subject<Array<IQuestion>>();

  notification$ = new Subject<Array<string | boolean>>()

  constructor(private router: Router, private httpService: HttpService, private dataService: DataService) {

  }

  takeSurvey(survey: ISurvey) {
    this.survey = survey;

    this.httpService.getQuestions(survey.id).pipe(first()).subscribe({

      next: (data: Array<IQuestion>) => {
        this.questions = data;
        this.questions$.next(data);
        this.router.navigate(['survey']);
      },

      error: () => {this.dataService.notification$.next(["Can not retrieve Survey", false])}
    })

  }

  submitSurvey(answers: Array<string>) {

    this.httpService.submitSurvey(this.survey!.id, this.dataService.user!.id, answers).pipe(first()).subscribe({

      next: () => {
        this.notification$.next(["Survey Submitted!", true])
        setTimeout(() => this.router.navigate(['']), 700)
      },

      error: () => {this.notification$.next(["Failed to submit Survey", false])}
    })

  }
}
