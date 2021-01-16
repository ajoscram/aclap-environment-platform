import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Implementable, Implementation, User } from '@src/app/models';
import { Controller } from '@src/app/services/control/Controller.service';

@Component({
  selector: 'app-implementable-implementations',
  templateUrl: './implementable-implementations.component.html',
  styleUrls: ['./implementable-implementations.component.scss']
})
export class ImplementableImplementationsComponent implements OnInit {

  isAdmin: Boolean = false;
  isEducator: Boolean = false;
  implementableId : string;
  user: User;
  implementable : Implementable;
  implementations: Implementation[];

  constructor(private controller: Controller, private router: Router, private route: ActivatedRoute) { 
    this.implementableId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.controller.getUser()
      .then( user => { this.user = user} )
      .catch();

    this.controller.getImplementable(this.implementableId)
      .then( implementable => {this.implementable = implementable} )
      .catch()

    this.controller.getImplementations(true, this.implementableId);

    
  }

}
