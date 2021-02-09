import { Component, Input, OnInit } from '@angular/core';
import { EducatorRequest } from '../../../models';
import { registerElement } from '@nativescript/angular';

registerElement("Mapbox", () => require("@nativescript-community/ui-mapbox").MapboxView);

@Component({
  selector: 'app-educator-application',
  templateUrl: './educator-application.component.html',
  styleUrls: ['./educator-application.component.scss']
})
export class EducatorApplicationComponent implements OnInit {
  
  @Input() application: EducatorRequest;

  constructor() { }

  ngOnInit(): void {
  }

  minDate: Date = new Date(1940, 0, 29);
  maxDate: Date = new Date(2045, 4, 12);
  

}
