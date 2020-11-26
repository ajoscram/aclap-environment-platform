import { Component, OnInit } from '@angular/core';
import { Module } from '../../models/implementables/Module.model';
import { Controller } from '@src/app/services/control/Controller.service';

@Component({
  selector: 'app-module-card-list',
  templateUrl: './module-card-list.component.html',
  styleUrls: ['./module-card-list.component.scss']
})
export class ModuleCardListComponent implements OnInit {

  modules: Module[];

  constructor(private controller: Controller){
    this.controller.getModules()
      .then( modules => { this.modules = modules; })
      //este console error hay que cambiarlo eventualmente por un mensaje de error
      //significativo para el usuario
      .catch( error => console.error(error) );
  }

  ngOnInit(): void {}
}
