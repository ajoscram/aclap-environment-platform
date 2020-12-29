import { Component, Input, OnInit } from '@angular/core';
import { Discipline, Subject } from '@src/app/models';

@Component({
  selector: 'app-display-disciplines',
  templateUrl: './display-disciplines.component.html',
  styleUrls: ['./display-disciplines.component.scss']
})
export class DisplayDisciplinesComponent implements OnInit {

  @Input() disciplines: Discipline[];

  constructor() { }

  ngOnInit(): void {
  }

}
