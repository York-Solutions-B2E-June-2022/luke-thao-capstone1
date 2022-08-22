import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISurvey} from "../Interfaces/ISurvey";
import {IQuestion} from "../Interfaces/IQuestion";
import {SurveyService} from "../survey.service";
import {Subscription} from "rxjs";
import {ISurveyReq} from "../Interfaces/ISurveyReq";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit, OnDestroy {

  id!: number | null;
  prompt!: string;
  questionOrder!: number;
  questionType!: string;
  answer!: string;
  answers: Array<string> = [];

  survey!: ISurveyReq | null

  editing!: boolean;
  editIndex!: number | null;

  editQuestionSub: Subscription;

  notification!: Array<string | boolean>

  constructor(private surveyService: SurveyService) {

    this.questionOrder = surveyService.numOfQuestion
    this.editing = this.surveyService.editing
    this.survey = this.surveyService.survey

    if (this.editing) {
      this.getQuestion(this.surveyService.editQuestionIndex)
    }


    this.editQuestionSub = this.surveyService.editQuestion$.subscribe(qIndex => {

      this.getQuestion(qIndex)

    })
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.editQuestionSub.unsubscribe();
  }

  addAnswer() {
    if (this.answers.length > 5) {
      this.notification = ["Maximum of 6 answers", false];
      return
    }

    this.answers.push(this.answer)
    this.answer = ''
  }

  onAddQuestion() {
    if (!this.prompt || !this.questionType || !this.questionOrder) {
      this.notification = ["Question, Order and Question Type must have inputs.",false]
      return
    }

    let question: IQuestion = {
      "id": null,
      "prompt": this.prompt,
      "questionOrder": this.questionOrder,
      "type": this.questionType,
      "answers": this.answers
    };

    this.surveyService.addQuestion(question);

    this.resetInputs();
    this.questionOrder += 1;
  }

  deleteAnswer(i: number) {
    this.answers.splice(i, 1)
  }

  submitQuestionEdit() {

    if (!this.prompt || !this.questionType || !this.questionOrder) {
      this.notification = ["Question, Order and Question Type must have inputs.",false]
      return
    }

    let question: IQuestion = {
      "id": this.id,
      "prompt": this.prompt,
      "questionOrder": this.questionOrder,
      "type": this.questionType,
      "answers": this.answers
    };

    this.surveyService.submitQuestionEdit(question, this.editIndex!)
    this.resetInputs();

  }

  getQuestion(index: number) {

    this.editing = true;
    this.editIndex = index;
    this.id = this.surveyService.newSurvey.questions[index].id;
    this.prompt = this.surveyService.newSurvey.questions[index].prompt;
    this.questionOrder = this.surveyService.newSurvey.questions[index].questionOrder;
    this.questionType = this.surveyService.newSurvey.questions[index].type;
    this.answers = this.surveyService.newSurvey.questions[index].answers;
  }

  resetInputs() {
    this.notification = []
    this.prompt = '';
    this.questionType = '';
    this.answer = ''
    this.answers = []
    this.editing = false;
  };

}
