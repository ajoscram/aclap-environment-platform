import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event, File } from '../../../models';
import { Role } from '@src/app/services/authentication/Session.model';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {

  module: Event;
  id: string;
  files: File[];
  showingFiles: boolean = false;
  isAdmin: boolean = false;
  isEducator: boolean = false;
  isAnonymous: boolean = false;
  months: string[] = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','setiembre','octubre','noviembre','diciembre'];

  constructor(private route:ActivatedRoute, private controller: Controller, private translator: ErrorTranslator) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.controller.getSession().then(
      res => {
        if(res.role == Role.ADMINISTRATOR){
          this.isAdmin = true;
        }else if(res.role == Role.EDUCATOR){
          this.isEducator = true;
        }
      }
    )
    .catch(_ => {
      this.isAnonymous = true;
    });

    this.controller.getFiles(this.id)
      .then(
        files => {
          this.files = files;
        }
      )
      .catch( err => { alert(this.translator.translate(err)); });

    this.showingFiles = false;

    this.controller.getImplementable(this.id)
      .then(module => { this.module = <Event> module })
      .catch(error => console.error(error));
  }

  switchFiles(){
    this.showingFiles = !this.showingFiles;
    console.log(this.files)
  }

  dateFormat(date: Date){
    return `${date.getDay()} de ${this.months[date.getMonth()]}`
  }

}
