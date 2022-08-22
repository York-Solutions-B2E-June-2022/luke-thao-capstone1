import {Component, OnDestroy, OnInit} from '@angular/core';
import {SurveyService} from "../survey.service";
import {Subscription} from "rxjs";
import {IQuestion} from "../Interfaces/IQuestion";
import {Router} from "@angular/router";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit, OnDestroy {

  title!: string;

  questions!: Array<IQuestion>;

  notification!: Array<string | boolean>;
  notificationSub: Subscription;

  newQuestion: boolean = false
  numOfQuestionSub: Subscription;

  survey: number| null = null;

  constructor(private surveyService: SurveyService, private router: Router) {

    if (this.surveyService.survey) {
      this.survey = this.surveyService.survey.id;
    }

    this.title = surveyService.newSurvey.title;

    this.questions = surveyService.newSurvey.questions;

    this.numOfQuestionSub = surveyService.numOfQuestion$.subscribe(update => {
      this.newQuestion = false;
      this.questions = surveyService.newSurvey.questions;

    })

    this.notificationSub = surveyService.notification$.subscribe(message => {
      this.notification = message
      if (message[1] === true && !this.survey) {
        this.title = ''
      }
    })
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.numOfQuestionSub.unsubscribe();
    this.notificationSub.unsubscribe();

  }

  editQuestion(i: number) {
    this.surveyService.editQuestion(i);
    this.newQuestion = true;
  }

  deleteQuestion(i: number) {
    this.surveyService.deleteQuestion(i, this.questions[i]);
  }

  createQuestion() {
    this.newQuestion = true
  }

  cancelQuestion() {
    this.newQuestion = false
    this.surveyService.editing = false;
  }

  cancelSurvey() {
    this.surveyService.survey = null;
    this.surveyService.resetSurvey();
    this.router.navigate([''])
  }

  submitSurvey() {

    if (!this.title) {
      this.notification = ["Title must have input", false]
      return
    }

    if (!this.questions.length) {
      this.notification = ["One Question Minimum Required", false]
      return
    }

    if (this.survey) {
      this.surveyService.submitSurveyUpdate(this.title);
      return
    }

    this.surveyService.createSurvey(this.title);
  }

  deleteSurvey() {
    this.surveyService.deleteSurvey();
  }

  reset() {

    if (this.survey) {
      this.title = this.surveyService.survey!.title;
      this.surveyService.resetSurvey();
      return
    }

    this.title = '';
    this.surveyService.resetSurvey();
  }

}
