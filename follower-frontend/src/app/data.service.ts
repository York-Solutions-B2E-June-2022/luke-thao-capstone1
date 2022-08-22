import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  error$ = new Subject<string>()

  constructor() { }
}
