import { Component, Input, OnInit } from '@angular/core';
import { EducatorRequest, IEducatorRequest } from '../../../models';
import { registerElement, RouterExtensions } from '@nativescript/angular';
import { Controller } from '@src/app/services/control/Controller.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';
import * as dialogs from '@nativescript/core/ui/dialogs';
import * as geocoding from "nativescript-geocoding";
import { Location } from '../../../models';

registerElement("Mapbox", () => require("@nativescript-community/ui-mapbox").MapboxView);

@Component({
  selector: 'app-educator-application',
  templateUrl: './educator-application.component.html',
  styleUrls: ['./educator-application.component.scss']
})
export class EducatorApplicationComponent implements OnInit {

  txtFirstName: string;
  txtLastName: string;
  txtNumber: string;
  txtEmail: string;
  txtOrg: string;
  txtAddress: string;
  pickerDate: Date;

  constructor(private controller: Controller, private builder: FormBuilder, private routerExtensions: RouterExtensions, private translator: ErrorTranslator) { }

  ngOnInit(): void { }

  async onSubmit() {

    try {

      let locName = this.txtAddress + ", Costa Rica";
      let loc = await geocoding.getLocationFromName(locName);
  
      const request: IEducatorRequest = {
        name: this.txtFirstName,
        lastname: this.txtLastName,
        email: this.txtEmail,
        phone: this.txtNumber,
        address: new Location(locName, loc.latitude, loc.longitude),
        birthday: this.pickerDate,
        organization: this.txtOrg
      };
  
      await this.controller.addEducatorRequest(request);

      dialogs.alert({
        title: "Solicitud enviada exitosamente",
        message: "La confirmación de la solicitud llegará a su correo.",
        okButtonText: "Ok"
      })

    } catch (error) {
      dialogs.alert({
        title: "Error!",
        message: this.translator.translate(error),
        okButtonText: "Ok"
      })
    }
  }

  minDate: Date = new Date(1940, 0, 29);
  maxDate: Date = new Date(2045, 4, 12);
  

}
