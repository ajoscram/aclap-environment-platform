import { Component, OnInit } from '@angular/core';
import { Ally } from '../../../models';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';
import { Utils } from "@nativescript/core";

@Component({
  selector: 'app-allies',
  templateUrl: './allies.component.html',
  styleUrls: ['./allies.component.scss']
})

export class AlliesComponent implements OnInit {
  
  allies: Ally[];

  constructor(private controller: Controller, private translator: ErrorTranslator) { }

  ngOnInit(): void {

    this.controller.getAllies()
      .then( allies => { this.allies = <Ally[]> allies })
      .catch( error => console.error(this.translator.translate(error)));
      
  }

  openLink(link): void{
    Utils.openUrl(link);
  }

}
