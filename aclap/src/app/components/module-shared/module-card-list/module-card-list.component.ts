import { Component, OnInit } from '@angular/core';
import { Module } from '../../../models/implementables/Module.model';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';

@Component({
  selector: 'app-module-card-list',
  templateUrl: './module-card-list.component.html',
  styleUrls: ['./module-card-list.component.scss']
})
export class ModuleCardListComponent implements OnInit {

  modules: Module[];

  constructor(private controller: Controller, private translator: ErrorTranslator){
    this.controller.getModules()
      .then( modules => { this.modules = modules; })
      .catch( err => { alert(this.translator.translate(err)); });
  }

  ngOnInit(): void {}
}
