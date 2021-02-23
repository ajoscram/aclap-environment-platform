import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';
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
  @Input() implementableId: string;
  @Input() implementationId: string;
  q_colors: any[] = [];
  colors: string[] = ["#555", "#F13939", "#FE760E", "#FAD621", "#A1FB2B", "#329F22"];


  constructor(private controller: Controller, private translator: ErrorTranslator) { }

  async ngOnInit(): Promise<void> {

    await this.controller.getQuestions(this.implementableId)
      .then(qstns => {
        this.questions = qstns; console.log("Display-q.getQuestions",this.questions, this.implementableId); 
        if (!this.editing) { 
          qstns.map(q =>  { this.answers.push(new Answer("",q.id, q.question, "", Score.UNKNOWN))})
        } 
      })
      .catch( err => { alert(this.translator.translate(err)); });

    for (let index = 0; index < this.questions.length; index++) {
      this.q_colors.push({color: this.colors[0], status: false, option: 0});
    }

    if(this.editing){
      await this.controller.getAnswers(this.implementationId)
      .then(answers => {answers.map( (element, i) => {this.answers.push(element)}  )})
      .catch( err => { alert(this.translator.translate(err)); });
      this.assignColors();
    }
  }

  selectOption(index: number, option: number){
    if ( !this.editable) { return; }
    if(this.q_colors[index].status === true && this.q_colors[index].option === option){
      /* UNSELECTED */
      this.q_colors[index] = {color: this.colors[0], status: false, option: option};
      this.answers[index].score = Score.UNKNOWN;
      this.answers[index].option = "";
    }else{
      /* NEW SELECTION */
      this.q_colors[index] = {color: this.colors[option], status: true, option: option};
      this.answers[index].score = this.ntoscore(option);
      this.answers[index].option = this.questions[index].options.get(this.ntoscore(option));
    }
  }

  assignColors(){
    this.answers.map((answer, index) => {
      if(answer.id != null){
        this.q_colors[index] = {color: this.colors[this.scoreton(answer.score)], status: true, option: this.scoreton(answer.score)};
      }
    });
  }

  public get score(): typeof Score{
    return Score;
  }

  scoreton(score: Score){
    if(score == Score.UNKNOWN){
      return 0;
    }if(score == Score.VERY_LOW){
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
    if(n == 0) {
      return Score.UNKNOWN;
    }if(n == 1) {
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
