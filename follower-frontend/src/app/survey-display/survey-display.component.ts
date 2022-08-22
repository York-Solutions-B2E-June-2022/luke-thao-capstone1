import {Component, Input, OnInit} from '@angular/core';
import {ISurvey} from "../Interfaces/ISurvey";
import {SurveyService} from "../survey.service";

@Component({
  selector: 'app-survey-display',
  templateUrl: './survey-display.component.html',
  styleUrls: ['./survey-display.component.css']
})
export class SurveyDisplayComponent implements OnInit {

  @Input() survey!: ISurvey;

  constructor(private surveyService: SurveyService) {

  }

  ngOnInit(): void {
  }

  takeSurvey() {
    this.surveyService.takeSurvey(this.survey)
  }

}
