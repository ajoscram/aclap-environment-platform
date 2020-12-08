import { Component, Input, OnInit } from '@angular/core';
import { Implementable } from '../../../models';
import { Controller } from '../../../services/control/Controller.service';

@Component({
  selector: 'app-implementable-list',
  templateUrl: './implementable-list.component.html',
  styleUrls: ['./implementable-list.component.scss']
})
export class ImplementableListComponent implements OnInit {

  @Input() list: Implementable[];
  @Input() isAdmin: Boolean;

  constructor() { }

  ngOnInit(): void {
    
  }

}
