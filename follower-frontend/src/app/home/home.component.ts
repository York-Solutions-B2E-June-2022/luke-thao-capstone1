import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Subscription} from "rxjs";
import {ISurvey} from "../Interfaces/ISurvey";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  surveys!: Array<ISurvey>;
  surveysSub: Subscription;

  constructor(private dataService: DataService) {
    this.surveys = this.dataService.surveys;
    this.surveysSub = this.dataService.surveys$.subscribe(surveys => {
      this.surveys = surveys;
    })
  }

  ngOnInit(): void {
  }

}
