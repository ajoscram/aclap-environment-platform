import { Component, Input, OnInit } from '@angular/core';
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

  callDate(date: any): Date {
    if(typeof date.toDate !== 'undefined'){
      return date.toDate()
    }else {
      return date;
    }
  }

}
