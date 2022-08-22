import {Component, Input, OnInit} from '@angular/core';
import {ISurveyReq} from "../Interfaces/ISurveyReq";
import {SurveyService} from "../survey.service";

@Component({
  selector: 'app-survey-display',
  templateUrl: './survey-display.component.html',
  styleUrls: ['./survey-display.component.css']
})
export class SurveyDisplayComponent implements OnInit {

  @Input() survey!: ISurveyReq;

  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
  }

  editSurvey() {
    this.surveyService.editSurvey(this.survey)
  }

}
