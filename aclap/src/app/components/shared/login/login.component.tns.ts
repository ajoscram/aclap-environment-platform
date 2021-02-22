import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { TextField } from '@nativescript/core';
import { Role } from '../../../services/authentication/Session.model';
import { Controller } from '../../../services/control/Controller.service';
import { ErrorTranslator } from '../../../services/ui/error_translator/ErrorTranslator.service';
import * as dialogs from '@nativescript/core/ui/dialogs';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  txtUsername: string;
  txtPassword: string;

  constructor(private controller: Controller, private builder: FormBuilder, private routerExtensions: RouterExtensions, private translator: ErrorTranslator) { }

  ngOnInit(): void { }

  async onSubmit() {
    try {
      let username: string = this.txtUsername;
      let password: string = this.txtPassword;
      await this.controller.login(username, password)
      .then(non => {
        dialogs.alert({
          title: "Inicio de sesión",
          message: "Se ingreso exitosamente a la sesión.",
          okButtonText: "Ok"
        })
          this.routerExtensions.navigate(['inicio'], { clearHistory: true });
        })
    } catch (error) {
      dialogs.alert({
        title: "Error!",
        message: this.translator.translate(error),
        okButtonText: "Ok"
      })
    }
  }

  async changePassword() {
    try {
      dialogs.prompt({
        title: "Cambio de contraseña",
        message: "Digite el correo asociado a la cuenta.",
        okButtonText: "Ok",
        cancelButtonText: "Cancelar",
        defaultText: "",
      }).then(async r1 => {
        if(r1.result){
          await this.controller.requestPasswordReset(r1.text);
        }
      });
    } catch (error) {
      dialogs.alert({
        title: "Error!",
        message: this.translator.translate(error),
        okButtonText: "Ok"
      })
    }
  }

}
