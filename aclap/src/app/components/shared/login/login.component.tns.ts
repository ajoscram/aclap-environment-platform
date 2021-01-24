import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  loginForm: FormGroup;
  isAdmin: boolean;

  constructor(private controller: Controller, private builder: FormBuilder, private routerExtensions: RouterExtensions, private translator: ErrorTranslator) { }

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      username: ['',Validators.email],
      password: ['',Validators.required]
    });
    this.isAdmin = true;
  }

  onSubmit() {
    let usrname:string = this.loginForm.get('username').value;
    let password:string = this.loginForm.get('password').value;
    let role:Role = (this.isAdmin) ? Role.ADMINISTRATOR : Role.EDUCATOR;
    this.controller.login(usrname, password, role)
      .then(non => { 
        dialogs.alert({
          title: "Inicio de sesión",
          message: "Se ingreso exitosamente a la sesión.",
          okButtonText: "Ok"
        })
        this.routerExtensions.navigate(['inicio'], { clearHistory: false });
       })
      .catch(
        error => {
          alert(this.translator.translate(error));
        }
      );
  }

}
