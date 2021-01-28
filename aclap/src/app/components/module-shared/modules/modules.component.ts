import { Component, OnInit } from '@angular/core';
import { Controller } from '../../../services/control/Controller.service';
import { Module } from '../../../models/implementables/Module.model';
import { Role } from '@src/app/services/authentication/Session.model';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})


export class ModulesComponent implements OnInit {

  modules: Module[];
  isAdmin: boolean = false;

  description = "Los módulos son herramientas para la educación ambiental sobre temas de interés para la conservación de los recursos naturales y el desarrollo sostenible de las comunidades.\n\nCada módulo incluye una guía didáctica con instrucciones para preparar e implementar las actividades, materiales descargables para lectura, juegos y dinámicas grupales. Todos los materiales pueden ser utilizados libremente por docentes, gestores - gestoras comunales, y personas educadoras de las organizaciones locales.";

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
