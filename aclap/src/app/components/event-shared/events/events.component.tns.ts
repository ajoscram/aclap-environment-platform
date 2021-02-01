import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models';
import { Role } from '@src/app/services/authentication/Session.model';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: Event[];

  constructor(private controller: Controller, private routerExtensions: RouterExtensions, private translator: ErrorTranslator) { }

  ngOnInit(): void {

    this.controller.getEvents()
      .then( events => { this.events = events; })
      .catch( error => console.error(this.translator.translate(error)));
  }

  navigateToEvent(id): void {
    this.routerExtensions.navigate(['/events', id], { clearHistory: false });
  }

}
