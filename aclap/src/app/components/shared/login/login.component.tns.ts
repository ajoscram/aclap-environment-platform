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

  onSubmit() {

    let username: string = this.txtUsername;
    let password: string = this.txtPassword;
    let role: Role = Role.ANY
    this.controller.login(username, password, role)
      .then(non => { 
        dialogs.alert({
          title: "Inicio de sesión",
          message: "Se ingreso exitosamente a la sesión.",
          okButtonText: "Ok"
        })
        this.routerExtensions.navigate(['inicio'], { clearHistory: true });
       })
      .catch(
        error => {
          dialogs.alert(this.translator.translate(error));
        }
      );
  }

  changePassword(): void{
    dialogs.prompt({
      title: "Cambio de contraseña",
      message: "Digite el correo asociado a la cuenta.",
      okButtonText: "Ok",
      cancelButtonText: "Cancelar",
      defaultText: "",
    }).then(r1 => {
      if(r1.result){
        // controller reset password
      }
    });
  }

}
