import { Component, OnInit } from '@angular/core';
import { Role } from '@src/app/services/authentication/Session.model';
import { Event, Module, User } from '../../../models';
import { Controller } from '../../../services/control/Controller.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  tabTags = ["Módulos","Eventos","Solicitud de Educador Ambiental"]
  tabIndex = -1
  user: User;
  events: Event[];
  modules: Module[];
  isAdmin: Boolean;


  constructor(private controller: Controller) { }

  ngOnInit(): void {
    this.controller.getUser().then(
      user => {
        this.user = user;
      }
    );

    this.controller.getModules().then(
      modules => {this.modules = modules}
    );

    this.controller.getEvents().then(
      events => {this.events = events}
    );

    this.controller.getSession().then(
      session => {
        if(session.role === Role.ADMINISTRATOR){
          this.isAdmin = true;
        }else{
          this.isAdmin = false;
        }
      }
    );
  }

}
