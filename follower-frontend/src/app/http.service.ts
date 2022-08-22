import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "./Interfaces/IUser";
import {Observable} from "rxjs";
import {ISurvey} from "./Interfaces/ISurvey";
import {IQuestion} from "./Interfaces/IQuestion";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getSurveys() {
    return this.httpClient.get("http://localhost:8081/survey/all") as Observable<Array<ISurvey>>
  }

  login(username: string, password: string) {
    return this.httpClient.post("http://localhost:8081/user/login",
      {
        username, password
      }
    ) as Observable<IUser>;
  }

  signUp(username: string, password: string) {
    return this.httpClient.post("http://localhost:8081/user/create",
      {
        username, password
      }
    )
  }

  getQuestions(id: number) {
    return this.httpClient.get(`http://localhost:8081/survey?id=${id}`) as Observable<Array<IQuestion>>
  }

  submitSurvey(surveyId: number, userId: number, answers: Array<string>) {
    return this.httpClient.post('http://localhost:8081/submitSurvey', {
      surveyId: surveyId, userId: userId, answers: answers
    })
  }

}
