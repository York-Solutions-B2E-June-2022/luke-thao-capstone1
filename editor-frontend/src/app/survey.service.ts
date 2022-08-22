import { Injectable } from '@angular/core';
import {ISurvey} from "./Interfaces/ISurvey";
import {IQuestion} from "./Interfaces/IQuestion";
import {first, Subject} from "rxjs";
import {HttpService} from "./http.service";
import {ISurveyReq} from "./Interfaces/ISurveyReq";
import {DataService} from "./data.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class SurveyService {

  newSurvey: ISurvey = {title: '', questions: []};
  survey: ISurveyReq | null = null;

  numOfQuestion: number = 1;
  numOfQuestion$ = new Subject<number>();

  editing: boolean = false;
  editQuestionIndex!: number;
  editQuestIndex$ = new Subject<number>();

  notification$ = new Subject<Array<string | boolean>>();

  editQuestion$ = new Subject<number>();

  questionsToUpdate: Array<number> = [];

  questionsToDelete: Array<number> = [];

  newQuestions: boolean = false;

  constructor(private httpService: HttpService, private dataService: DataService, private router: Router) {

  }

  addQuestion(question: IQuestion) {

    if (this.survey) {
      this.newQuestions = true
    }

    this.numOfQuestion += 1

    this.newSurvey.questions.push(question);

    this.numOfQuestion$.next(this.numOfQuestion)
  }

  editQuestion(i: number) {
    this.editing = true;
    this.editQuestionIndex = i;
    this.editQuestIndex$.next(i);
  }

  submitQuestionEdit(question: IQuestion, i: number) {

    if (question.id !== null && !this.questionsToUpdate.includes(question.id!)) {
      this.questionsToUpdate.push(question.id)
    }

    this.newSurvey.questions.splice(i, 1, question);

    this.numOfQuestion$.next(this.numOfQuestion);
    this.editing = false
  }

  deleteQuestion(i: number, question: IQuestion) {

    if (question.id !== null && !this.questionsToDelete.includes(question.id!)) {
      this.questionsToDelete.push(question.id);
    }

    this.newSurvey.questions.splice(i, 1)

    this.numOfQuestion$.next(this.numOfQuestion)
  }

  createSurvey(title: string) {
    this.newSurvey.title = title;

    this.httpService.submitSurvey(this.newSurvey).pipe(first()).subscribe({

      next: (data) => {
        this.notification$.next(["Survey Created", true]);
        this.resetSurvey();
        this.dataService.getSurveys();
      },

      error: (error) => {this.notification$.next([error.message, false])}
    })
  }

  submitSurveyUpdate(title: string) {

    if (this.survey!.title !== title) {
      this.updateTitle(title)
    }

    if (this.questionsToUpdate.length) {
      this.updateQuestions()
    }

    if (this.questionsToDelete.length) {
      this.deleteQuestions()
    }

    if (this.newQuestions) {
      this.createQuestions()
    }

  }

  updateTitle(title: string) {
    console.log("title")
    this.httpService.updateSurvey(this.survey!.id, title).pipe(first()).subscribe({

      next: (data) => {
        this.notification$.next(['Survey Updated', true])
        this.dataService.getSurveys();
      },

      error: (error) => {
        this.notification$.next(["title failed", false])
      }
    })
  }

  updateQuestions() {
    console.log("update")
    let updatedQuestions: Array<IQuestion> = this.newSurvey.questions.filter(question => {
      return this.questionsToUpdate.includes(question.id!)
    })

    this.httpService.updateQuestions(updatedQuestions).pipe(first()).subscribe({

      next: () => {
        this.dataService.getSurveys();
        this.notification$.next(['Survey Updated', true])
      },

      error: (error) => {
        this.notification$.next(["update failed", false])
      }
    })
  }

  deleteQuestions() {
    console.log('delete')
    console.log(this.questionsToDelete)
    this.httpService.deleteQuestions(this.questionsToDelete, this.survey!.id).pipe(first()).subscribe({

      next: () => {
        this.dataService.getSurveys();
        this.notification$.next(['Survey Updated', true])
      },

      error: (error) => {
        this.notification$.next(["delete failed", false])
      }
    })
  }

  createQuestions() {
    console.log('create')
    let newQuestions: Array<IQuestion> = this.newSurvey.questions.filter(question => {
      return !question.id
    })

    this.httpService.createQuestions(newQuestions, this.survey!.id).pipe(first()).subscribe({

      next: () => {
        this.dataService.getSurveys();
        this.notification$.next(['Survey Updated', true])
      },

      error: (error) => {
        this.notification$.next(["create failed", false])
      }
    })

  }

  deleteSurvey() {
    this.httpService.deleteSurvey(this.survey!.id).pipe(first()).subscribe({

      next: () => {
        this.dataService.getSurveys();
        this.notification$.next(['Survey Deleted', true])
        this.survey = null;
        this.resetSurvey()
        setTimeout(() => this.router.navigate(['']), 700)
      },

      error: () => {
        this.notification$.next(["Delete failed", false])
      }
    })
  }

  resetSurvey() {
    if (this.survey) {
      this.newSurvey.title = this.survey.title;
      this.newSurvey.questions = [...this.survey.questions];
      this.numOfQuestion = this.survey.questions.length;;
      this.numOfQuestion$.next(this.numOfQuestion)
      this.questionsToUpdate = []
      this.questionsToDelete = []
      this.newQuestions = false

      return
    }

    this.newSurvey.title = '';
    this.newSurvey.questions = [];
    this.numOfQuestion = 1;
    this.numOfQuestion$.next(1)
    this.survey = null;
    this.questionsToUpdate = []
    this.questionsToDelete = []
    this.newQuestions = false
  }

  editSurvey(survey: ISurveyReq) {
    this.survey = survey;
    this.newSurvey.title = this.survey.title;
    this.newSurvey.questions = [...this.survey.questions];
    this.numOfQuestion = survey.questions.length;
    this.numOfQuestion$.next(this.numOfQuestion);
    this.router.navigate(['/survey'])
  }
}
