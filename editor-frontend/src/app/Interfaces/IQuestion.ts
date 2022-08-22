
export interface IQuestion {

  id: number | null;
  prompt: string;
  questionOrder: number;
  type: string;
  answers: Array<String> | null;

}

