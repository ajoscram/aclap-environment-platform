import { Component, OnInit, Input } from '@angular/core';
import { Section, Module, Discipline } from '../../../models';
import { ActivatedRoute } from '@angular/router';
import { Controller } from '../../../services/control/Controller.service';
import * as dialogs from '@nativescript/core/ui/dialogs';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-module-page',
  templateUrl: './module-page.component.html',
  styleUrls: ['./module-page.component.scss']
})
export class ModulePageComponent implements OnInit {

  module: Module;
  sections: Section[];
  disciplines: Discipline[];
  id: string;

  constructor(private route:ActivatedRoute, private controller: Controller, private routerExtensions: RouterExtensions) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.controller.getImplementable(this.id)
      .then(module => { 
        this.module = <Module> module
        this.disciplines = this.module.disciplines 
      })
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

  showTheme(theme): void{
    dialogs.alert({
      title: "Eje tematico",
      message: theme,
      okButtonText: "Ok"
    })
  }

  navigateToQuestions_EducatorApplication(id): void {
    this.controller.getSession()
    .then(
      session => {
        this.routerExtensions.navigate(['preguntas', id], { clearHistory: false });
      })
    .catch(_ => {
      this.routerExtensions.navigate(['educatorApplication'], { clearHistory: false });
    });
  }

  navigateToDisplayer(id): void {
    this.routerExtensions.navigate(['guia', id], { clearHistory: false });
  }
  
  navigateToDisplayFiles(id): void {
    this.routerExtensions.navigate(['material', id], { clearHistory: false });
  } 

  navigateToQuestions(id): void {
    this.routerExtensions.navigate(['preguntas', id], { clearHistory: false });
  } 

}
