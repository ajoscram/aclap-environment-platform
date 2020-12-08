import { Component, OnInit, Input} from '@angular/core';
import { Module } from '@src/app/models/implementables/Module.model';
import { registerElement } from '@nativescript/angular';
import { CardView } from '@nstudio/nativescript-cardview';

registerElement('CardView', () => CardView);

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
