import { Component, OnInit } from '@angular/core';
import { Implementation } from '@src/app/models';
import { Controller } from '@src/app/services/control/Controller.service';

@Component({
  selector: 'app-implementation-page',
  templateUrl: './implementation-page.component.html',
  styleUrls: ['./implementation-page.component.scss']
})
export class ImplementationPageComponent implements OnInit {

  implementation: Implementation;

  constructor(private controller: Controller) { }

  ngOnInit(): void {
    
  }

  statusFormat(completed: boolean){
    return completed ? "Completado" : "En proceso" 
  }

  getRange(topLimit: number){
    return [...Array(topLimit).keys()].map(element => {element + 1});
  }

}
