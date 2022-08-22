import {Component, Input, OnInit} from '@angular/core';
import {ISurveyReq} from "../Interfaces/ISurveyReq";

@Component({
  selector: 'app-survey-display',
  templateUrl: './survey-display.component.html',
  styleUrls: ['./survey-display.component.css']
})
export class SurveyDisplayComponent implements OnInit {

  @Input() survey!: ISurveyReq;

  constructor() { }

  ngOnInit(): void {
  }

}
