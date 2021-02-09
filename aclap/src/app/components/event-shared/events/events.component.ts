import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models';
import { Role } from '@src/app/services/authentication/Session.model';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: Event[];
  isAdmin: boolean = false;


  bg_img = "https://i.imgur.com/MkNJop5.jpeg";
  description = "Celebra las efemérides ambientales más queridas de nuestra institución. Organice un evento en su comunidad y comparta sus fotografías y aprendizajes con nosotros. Cada evento cuenta con sugerencias Todos los materiales pueden ser utilizados libremente por docentes, gestores - gestoras comunales, y personas educadoras de las organizaciones locales.";

  constructor(private controller: Controller, private translator: ErrorTranslator) { }

  ngOnInit(): void {
    this.controller.getSession().then(
      session => {
        if (session.role === Role.ADMINISTRATOR){
          this.isAdmin = true;
        }
      }
    );

    this.controller.getEvents()
      .then( events => { this.events = events; })
      .catch( err => { alert(this.translator.translate(err)); });
  }

}
