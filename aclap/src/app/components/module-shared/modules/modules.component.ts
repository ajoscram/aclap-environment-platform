import { Component, OnInit } from '@angular/core';
import { Controller } from '../../../services/control/Controller.service';
import { Module } from '../../../models/implementables/Module.model';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})


export class ModulesComponent implements OnInit {

  modules: Module[];

  constructor(private controller: Controller) { }

  ngOnInit(): void {
    this.controller.getModules()
      .then( modules => { this.modules = modules; })
      //este console error hay que cambiarlo eventualmente por un mensaje de error
      //significativo para el usuario
      .catch( error => console.error(error) );
  }

}
