import { Component, Input, OnInit } from '@angular/core';
import { Implementation } from '@src/app/models';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';

@Component({
  selector: 'app-implementation-list',
  templateUrl: './implementation-list.component.html',
  styleUrls: ['./implementation-list.component.scss']
})
export class ImplementationListComponent implements OnInit {
  
  @Input() unfinished: boolean = false;
  @Input() finished: boolean = false;
  implementations: Implementation[] = [];

  constructor(private controller: Controller, private translator: ErrorTranslator) { 

  }

  ngOnInit(): void {
    if(this.unfinished){
      this.controller.getImplementations(false)
        .then(impls => {
          impls.forEach(e => {this.implementations.push(e)})
        });
    }else if(this.finished){
      this.controller.getImplementations(true)
        .then(impls => {
          impls.forEach(e => {this.implementations.push(e)})
        });
    }else if(!this.finished && !this.unfinished){
      this.controller.getImplementations(false)
        .then(impls => {
          impls.forEach(e => {this.implementations.push(e)})
        })
        .catch( err => { alert(this.translator.translate(err)); });
      this.controller.getImplementations(true)
        .then(impls => {
          impls.forEach(e => {this.implementations.push(e)})
        })
        .catch( err => { alert(this.translator.translate(err)); });
    }
  }

  editOrView(implementation: Implementation){
    if(this.finished){
      return ['/implementacion','ver',implementation.id];
    }else if(this.unfinished){
      return ['/implementacion','editar',implementation.id];
    }else{
      return ['/perfil'];
    }
  }

}
