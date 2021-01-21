import { Component, OnInit } from '@angular/core';
import { Controller } from '../../../services/control/Controller.service';
import { Module } from '../../../models/implementables/Module.model';
import { Role } from '@src/app/services/authentication/Session.model';
import { ErrorTranslator } from '@src/app/services/ui/ErrorTranslator.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})


export class ModulesComponent implements OnInit {

  modules: Module[];
  isAdmin: boolean = false;

  constructor(private controller: Controller, private translator: ErrorTranslator) { }

  ngOnInit(): void {
    this.controller.getSession().then(
      session => {
        if (session.role === Role.ADMINISTRATOR){
          this.isAdmin = true;
        }
      }
    );

    this.controller.getModules()
      .then( modules => { this.modules = modules; })
      .catch( error => console.error(this.translator.translate(error)));
  }

}
