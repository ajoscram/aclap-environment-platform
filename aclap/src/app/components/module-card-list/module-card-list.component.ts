import { Component, OnInit } from '@angular/core';
import { Module } from '@src/app/models';
import { Controller } from '@src/app/services/control/Controller.service';

@Component({
  selector: 'app-module-card-list',
  templateUrl: './module-card-list.component.html',
  styleUrls: ['./module-card-list.component.scss']
})
export class ModuleCardListComponent implements OnInit {

  private modules: Module[];

  constructor(private controller: Controller){}

  ngOnInit(): void {
    this.controller.getModules()
      .then( modules => { this.modules = modules; })
      .catch()
  }

}
