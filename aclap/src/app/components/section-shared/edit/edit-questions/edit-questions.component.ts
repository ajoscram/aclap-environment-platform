import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question, Score } from '@src/app/models';
import { Controller } from '@src/app/services/control/Controller.service';

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.scss']
})
export class EditQuestionsComponent implements OnInit {

  form: FormGroup;
  tempQuestion: Question;
  @Input() questions: Question[] = [];
  @Input() deleted: Question[] = [];
  options: string[] = [];

  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    this.options = ["Muy bajo", "Bajo", "Medio", "Alto", "Muy Alto"];
    
    this.initQuestion();

    this.form = this.builder.group({
      question: ['', Validators.requiredTrue],
      v_low: ['', Validators.requiredTrue],
      low: ['', Validators.requiredTrue],
      average: ['', Validators.requiredTrue],
      high: ['', Validators.requiredTrue],
      v_high: ['', Validators.requiredTrue]
    });
  }

  initQuestion(){
    this.tempQuestion = new Question("","",null);

    this.tempQuestion.options = new Map(); 
  }

  addQuestion(){
    let qstn = new Question("","", new Map());

    qstn.options.set(Score.VERY_LOW, this.options[0]);
    qstn.options.set(Score.LOW, this.options[1]);
    qstn.options.set(Score.AVERAGE, this.options[2]);
    qstn.options.set(Score.HIGH, this.options[3]);
    qstn.options.set(Score.VERY_HIGH, this.options[4]);
    qstn.question = this.form.get("question").value;

    this.questions.push(qstn);
    this.initQuestion();
  }

  deleteQuestion(i: number):void {
    this.deleted.push(this.questions[i]);
    this.questions.splice(i,1);
  }

  public get score(): typeof Score{
    return Score;
  }

}
