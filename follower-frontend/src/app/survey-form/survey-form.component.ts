import { Component, OnInit } from '@angular/core';
import {SurveyService} from "../survey.service";
import {IQuestion} from "../Interfaces/IQuestion";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {

  notification: Array<string | boolean> =[]
  notificationSub: Subscription;
  title!: string

  questions!: Array<IQuestion>;

  form!: FormGroup;

  currentQuestion: number = 0;
  answer: string = ''

  surveyAnswers: Array<string> = [];

  constructor(private surveyService: SurveyService, private fb: FormBuilder) {
    this.title = this.surveyService.survey!.title;
    this.questions = this.surveyService.questions!;
    this.notificationSub = this.surveyService.notification$.subscribe(message => {
      this.notification = message
    })
  }

  ngOnInit(): void {
    for (let i = 0; i < this.questions.length; i ++) {
      this.surveyAnswers.push("")
    }
  }

  nextQuestion() {
    if (this.currentQuestion !== this.questions.length - 1) {
      this.currentQuestion +=1
      this.answer = this.surveyAnswers[this.currentQuestion]
      this.notification = []
    }
  }

  prevQuestion() {
    if (this.currentQuestion !== 0) {
      this.currentQuestion -=1
      this.notification = []
    }
  }


  submitSurvey() {
    if (this.surveyAnswers.every(element => element.length > 0)) {
      this.surveyService.submitSurvey(this.surveyAnswers);
    }

    else {
      this.notification = ['Missing Answers', false]
    }
  }

}
