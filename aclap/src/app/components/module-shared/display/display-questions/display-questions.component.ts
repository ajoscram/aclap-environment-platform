import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Answer, Question } from '../../../../models';

@Component({
  selector: 'app-display-questions',
  templateUrl: './display-questions.component.html',
  styleUrls: ['./display-questions.component.scss']
})
export class DisplayQuestionsComponent implements OnInit {

  @Input() questions: Question[] = [];
  @Input() answers: Answer[] = [];
  q_colors: any[] = [];
  colors: string[] = ["#555", "#F13939", "#FE760E", "#FAD621", "#A1FB2B", "#329F22"];


  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    for (let index = 0; index < this.questions.length; index++) {
      this.q_colors.push({color: this.colors[0], status: false, option: 0});
    }
  }

  selectOption(index: number, option: number){
    if(this.q_colors[index].status === true && this.q_colors[index].option === option){
      /* UNSELECTED */
      this.q_colors[index] = {color: this.colors[0], status: false, option: option};
      this.answers[index].score = null;
      this.answers[index].option = null;
    }else{
      /* NEW SELECTION */
      this.q_colors[index] = {color: this.colors[option], status: true, option: option};
      this.answers[index].score = this.ntoscore(option);
      this.answers[index].option = this.questions[index].options[this.ntoscore(option)];
    }
    console.log(this.answers);
  }

  public get score(): typeof Score{
    return Score;
  }

  ntoscore(n: number){
    if(n == 1) {
      return Score.VERY_LOW;
    }
    if(n == 2) {
      return Score.LOW;
    }
    if(n == 3) {
      return Score.AVERAGE;
    }
    if(n == 4) {
      return Score.HIGH;
    }
    if(n == 5) {
      return Score.VERY_HIGH;
    }
  }


}
