import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "./Interfaces/IUser";
import {Observable} from "rxjs";
import {ISurvey} from "./Interfaces/ISurvey";
import {ISurveyReq} from "./Interfaces/ISurveyReq";
import {IQuestion} from "./Interfaces/IQuestion";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getSurveys() {
    return this.httpClient.get("http://localhost:8080/survey/all") as Observable<Array<ISurveyReq>>
  }

  login(username: string, password: string) {
    return this.httpClient.post("http://localhost:8080/user/login",
      {
        username, password
      }
    ) as Observable<IUser>;
  }

  signUp(username: string, password: string) {
    return this.httpClient.post("http://localhost:8080/user/create",
      {
        username, password
      }
    )
  }

  submitSurvey(survey: ISurvey) {
    console.log(survey.title)
    return this.httpClient.post("http://localhost:8080/survey",{
      title: survey.title, questions: survey.questions
    })
  }

  updateSurvey(id: number, title: string) {
    return this.httpClient.patch("http://localhost:8080/survey", {id: id, title: title})
  }

  updateQuestions(questions: Array<IQuestion>) {

    return this.httpClient.patch("http://localhost:8080/question", {
      questions: questions
    })
  }

  deleteQuestions(questions: Array<number>, surveyId: number) {
    return this.httpClient.patch("http://localhost:8080/question/delete", {
      questionIds: questions,
      id: surveyId
    })
  }

  createQuestions(questions: Array<IQuestion>, surveyId: number) {
    return this.httpClient.post("http://localhost:8080/question", {
      questions: questions,
      id: surveyId
    })
  }

  deleteSurvey(id: number) {
    return this.httpClient.delete(`http://localhost:8080/survey?id=${id}`)
  }


}
