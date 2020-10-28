import { Component, OnInit, Input } from '@angular/core';
import { Section, Module } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { Controller } from '../../services/control/Controller.service';

@Component({
  selector: 'app-module-page',
  templateUrl: './module-page.component.html',
  styleUrls: ['./module-page.component.scss']
})
export class ModulePageComponent implements OnInit {

  module: Module;
  sections: Section[];
  id: string;

  constructor(private route:ActivatedRoute, private controller: Controller) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.controller.getModule(this.id)
      .then(module => { this.module = module })
      .catch(error => console.error(error));
    
    this.controller.getSections(this.id)
      .then(sections => { this.sections = sections; console.log(sections.toString()) })
      .catch(error => console.error(error));
  }

}
