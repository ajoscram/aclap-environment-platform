import { Component, OnInit, Input} from '@angular/core';
import { Module } from '@src/app/models/implementables/Module.model';

@Component({
  selector: 'app-module-card',
  templateUrl: './module-card.component.html',
  styleUrls: ['./module-card.component.scss']
})
export class ModuleCardComponent implements OnInit {

  @Input() module: Module;

  constructor() { }

  ngOnInit(): void {
  }

}
