import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer, Implementation, Question } from '@src/app/models';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/ErrorTranslator.service';

@Component({
  selector: 'app-implementation-page',
  templateUrl: './implementation-page.component.html',
  styleUrls: ['./implementation-page.component.scss']
})
export class ImplementationPageComponent implements OnInit {

  implementation: Implementation;
  id: string;
  files: any[] = [];
  questions: Question[] = [];
  answers: Answer[] = [];

  constructor(private controller: Controller, private route: ActivatedRoute, private translator: ErrorTranslator) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.controller.draftImplementation(this.id)
      .then(impl => {this.implementation = <Implementation> impl})
      .catch( err => { console.log(this.translator.translate(err)); } );

    this.controller.getQuestions(this.id)
      .then(qstns => {this.questions = qstns; qstns.map(q =>  {this.answers.push(new Answer(null,q.id, q.question, null, null))} )})
      .catch( err => { console.log(this.translator.translate(err)); } );
  }

  statusFormat(completed: boolean){
    return completed ? "Completado" : "En proceso" 
  }

  getRange(topLimit: number){
    return [...Array(topLimit).keys()].map(element => {element + 1});
  }

  onsubmit(){

  }

}
