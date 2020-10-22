import { Component, OnInit, Input} from '@angular/core';
import { Discipline } from '@src/app/models';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {

  @Input() discipline: Discipline;

  constructor() { }

  ngOnInit(): void {
  }

}
