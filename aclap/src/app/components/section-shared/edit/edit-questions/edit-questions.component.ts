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
  @Input() questions: Question[];
  options: string[];

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
    this.tempQuestion = new Question(null,"",null);

    this.tempQuestion.options = new Map(); 
  }

  addQuestion(){
    let qstn = new Question(null,"", new Map());

    qstn.options[Score.VERY_LOW] = this.options[0];
    qstn.options[Score.LOW] = this.options[1];
    qstn.options[Score.AVERAGE] = this.options[2];
    qstn.options[Score.HIGH] = this.options[3];
    qstn.options[Score.VERY_HIGH] = this.options[4];
    qstn.question = this.form.get("question").value;

    this.questions.push(qstn);
    this.initQuestion();
  }

  public get score(): typeof Score{
    return Score;
  }

}
