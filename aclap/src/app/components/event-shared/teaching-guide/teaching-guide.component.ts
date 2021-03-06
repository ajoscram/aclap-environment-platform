import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event, Section } from '@src/app/models';
import { Role } from '@src/app/services/authentication/Session.model';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';

@Component({
  selector: 'app-t-guide',
  templateUrl: './teaching-guide.component.html',
  styleUrls: ['./teaching-guide.component.scss']
})
export class TGuideComponent implements OnInit {

  module: Event;
  sections: Section[];
  id: string;
  isAdmin: boolean = false;

  constructor(private route:ActivatedRoute, private controller: Controller, private translator: ErrorTranslator) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.controller.getSession().then(
      res => {
        if(res.role == Role.ADMINISTRATOR){
          this.isAdmin = true;
        }else{
          this.isAdmin = false;
        }
      }
    );
    
    this.controller.getImplementable(this.id)
      .then(module => { this.module = <Event> module })
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
      .catch( err => { alert(this.translator.translate(err)); });
  }

}
