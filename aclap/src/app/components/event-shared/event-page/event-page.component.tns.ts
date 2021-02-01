import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event, File, Section } from '../../../models';
import { Role } from '@src/app/services/authentication/Session.model';
import { Controller } from '@src/app/services/control/Controller.service';
import * as dialogs from '@nativescript/core/ui/dialogs';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {

  event: Event;
  sections: Section[];
  id: string;

  constructor(private route:ActivatedRoute, private controller: Controller, private routerExtensions: RouterExtensions) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.controller.getImplementable(this.id)
      .then(event => { 
        this.event = <Event> event
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
