import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Controller } from '../../services/control/Controller.service';
import { Section, Module, Implementable } from '../../models';

@Component({
  selector: 'app-module-edit',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.scss']
})
export class ModuleEditComponent implements OnInit {

  id: string;
  module: Module;
  sections: Section[];

  constructor(private route:ActivatedRoute, private controller: Controller) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.controller.getImplementable(this.id)
      .then(module => { this.module = <Module> module })
      .catch(error => console.error(error));
    
    this.controller.getSections(this.id)
      .then(sections => { this.sections = sections; 
        this.sections = this.sections.sort(
          (obj1, obj2) => {
            if (obj1.index > obj2.index) {
              return 1;
            }
            if (obj1.index < obj2.index){
              return -1;
            } 
            return 0;
          }
        );
      })
      .catch(error => console.error(error));
  }

  checkStatus(){
    console.log(this.sections);
  }

}
