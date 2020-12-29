import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Module, Section } from '@src/app/models';
import { Role } from '@src/app/services/authentication/Session.model';
import { Controller } from '@src/app/services/control/Controller.service';

@Component({
  selector: 'app-teaching-guide',
  templateUrl: './teaching-guide.component.html',
  styleUrls: ['./teaching-guide.component.scss']
})
export class TeachingGuideComponent implements OnInit {

  module: Module;
  sections: Section[];
  id: string;
  isAdmin: boolean = false;

  constructor(private route:ActivatedRoute, private controller: Controller) { 
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

}
