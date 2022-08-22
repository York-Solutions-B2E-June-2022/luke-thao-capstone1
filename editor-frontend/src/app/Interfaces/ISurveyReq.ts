import {IQuestion} from "./IQuestion";

export interface ISurveyReq {

  id: number;
  title: string;
  questions: Array<IQuestion>

}
