import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Controller } from '../../services/control/Controller.service';
import { Section, Module } from '../../models';

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
    this.controller.getModule(this.id)
      .then(module => { this.module = module })
      .catch(error => console.error(error));
    
    this.controller.getSections(this.id)
      .then(sections => { this.sections = sections; console.log(sections.toString()) })
      .catch(error => console.error(error));
  }

}
