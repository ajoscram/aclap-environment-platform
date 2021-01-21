import { Component, OnInit } from '@angular/core';
import { Role } from '@src/app/services/authentication/Session.model';
import { Implementation, User } from '../../../models';
import { Controller } from '../../../services/control/Controller.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  implementationsCompleted: Implementation[] = [];
  implementationsIncomplete: Implementation[] = [];

  user: User;
  isAdmin: Boolean;
  len = 2;

  constructor(private controller: Controller) { }

  ngOnInit(): void {
    this.controller.getUser().then(
      user => {
        this.user = user;
      }
    );

    this.controller.getImplementations(true).then(
      implentations => {this.implementationsCompleted = implentations}
    );

    this.controller.getImplementations(false).then(
      implentations => {this.implementationsIncomplete = implentations}
    );

    this.controller.getSession().then(
      session => {
        if(session.role === Role.ADMINISTRATOR){
          this.isAdmin = true;
          this.len = 3;
        }else{
          this.isAdmin = false;
        }
      }
    );
  }

}
