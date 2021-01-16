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
      this.q_colors.push({color: this.colors[0], status: false});
    }
  }

  selectOption(index: number, option: number){
    this.q_colors[index] = {color: this.colors[option], status: true};
    console.log(this.q_colors);
  }

}
