import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Answer, Question, Score } from '../../../../models';

@Component({
  selector: 'app-display-questions',
  templateUrl: './display-questions.component.html',
  styleUrls: ['./display-questions.component.scss']
})
export class DisplayQuestionsComponent implements OnInit {

  @Input() questions: Question[] = [];
  @Input() answers: Answer[] = [];
  @Input() editing: boolean = false;
  @Input() editable: boolean = true;
  q_colors: any[] = [];
  colors: string[] = ["#555", "#F13939", "#FE760E", "#FAD621", "#A1FB2B", "#329F22"];


  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    for (let index = 0; index < this.questions.length; index++) {
      this.q_colors.push({color: this.colors[0], status: false, option: 0});
    }
    if(this.editing){
      this.assignColors();
    }
  }

  selectOption(index: number, option: number){
    if ( !this.editable) { return; }
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
  }

  assignColors(){
    this.answers.map((answer, index) => {
      if(answer.id != null){
        this.q_colors[index] = {color: this.colors[this.scoreton(answer.score)], status: true, option: this.scoreton(answer.score)};
      }
    });
    console.log(this.answers);
  }

  public get score(): typeof Score{
    return Score;
  }

  scoreton(score: Score){
    if(score == Score.VERY_LOW){
      return 1;
    }else if(score == Score.LOW){
      return 2;
    }else if(score == Score.AVERAGE){
      return 3;
    }else if(score == Score.HIGH){
      return 4;
    }else if(score == Score.VERY_HIGH){
      return 5;
    }
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
