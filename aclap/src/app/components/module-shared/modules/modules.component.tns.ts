import { Component, OnInit } from '@angular/core';
import { Controller } from '../../../services/control/Controller.service';
import { Module } from '../../../models/implementables/Module.model';
import { RouterExtensions } from '@nativescript/angular';

import { registerElement } from '@nativescript/angular';
import { CardView } from '@nstudio/nativescript-cardview';

registerElement('CardView', () => CardView);

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})

export class ModulesComponent implements OnInit {

  modules: Module[];

  constructor(private controller: Controller, private routerExtensions: RouterExtensions) { }

  ngOnInit(): void {
    this.controller.getModules()
      .then( modules => { this.modules = modules; })
      .catch( error => console.error(error) );
  }

  navigateToModule(id): void {
      this.routerExtensions.navigate(['/modulos', id], { clearHistory: false });
  }

}
