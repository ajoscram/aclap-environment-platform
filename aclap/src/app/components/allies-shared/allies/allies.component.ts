import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ally } from '@src/app/models';
import { Role } from '@src/app/services/authentication/Session.model';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';

@Component({
  selector: 'app-allies',
  templateUrl: './allies.component.html',
  styleUrls: ['./allies.component.scss']
})
export class AlliesComponent implements OnInit {

  allies: Ally[] = [];
  isAdmin: boolean = false;
  bg_img: string = "https://i.imgur.com/cXS4iWl.jpeg";
  text: string = "La consolidación de alianzas estratégicas es un importante objetivo del desarrollo sostenible. Nuestros aliados son todas las personas o entidades que contribuyen a una cultura ambiental en sus núcleos familiares, su comunidad, a nivel organizacional, institucional, regional o nacional. Estos son algunos de los aliados del Programa de Educación Ambiental del ACLA-P.";

  constructor(private controller: Controller, private router: Router, private translator: ErrorTranslator) { }

  ngOnInit(): void {
    this.controller.getAllies()
      .then( allies =>{ this.allies = allies;})
      .catch( err => { alert(this.translator.translate(err)); } );
      
    this.controller.getSession()
      .then(
        session => {
          if(session.role === Role.ADMINISTRATOR){
            this.isAdmin = true;
          }
        }
      )
      .catch( err => { alert(this.translator.translate(err)); } );
  }

}
