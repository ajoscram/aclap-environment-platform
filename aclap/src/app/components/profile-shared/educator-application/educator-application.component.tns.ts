import { Component, Input, OnInit } from '@angular/core';
import { DatePicker } from '@nativescript/core/ui/date-picker';
import { EducatorRequest } from '../../../models';

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
