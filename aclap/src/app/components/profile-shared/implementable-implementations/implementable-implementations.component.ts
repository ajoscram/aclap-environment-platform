import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Implementable, Implementation, User } from '@src/app/models';
import { Role } from '@src/app/services/authentication/Session.model';
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
  implementable : string;
  implementations: Implementation[];

  constructor(private controller: Controller, private router: Router, private route: ActivatedRoute) { 
    this.implementableId = this.route.snapshot.paramMap.get('id');
    this.implementable = this.route.snapshot.paramMap.get('name');
  }

  ngOnInit(): void {
    this.controller.getUser()
      .then( user => { this.user = user } )
      .catch();

    this.controller.getSession()
      .then( session => {
          if(session.role === Role.ADMINISTRATOR){
            this.isAdmin = true;
          }else{
            this.router.navigateByUrl("/inicio");
          }
        })
      .catch(_ => { this.router.navigateByUrl("/inicio"); });

    this.controller.getImplementations(true, this.implementableId);
  }

}
