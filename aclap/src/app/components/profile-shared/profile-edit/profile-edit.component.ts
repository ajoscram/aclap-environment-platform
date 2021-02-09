import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@src/app/models';
import { Role } from '@src/app/services/authentication/Session.model';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  form: FormGroup;
  isAdmin: Boolean = false;
  isEducator: Boolean = false;
  user: User;

  constructor(private controller: Controller, private builder: FormBuilder, private translator: ErrorTranslator, private router: Router) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      password: [''],
      confirmPassword: ['']
    });

    this.controller.getSession()
    .then(
      session => {
        if(session.role === Role.ADMINISTRATOR){
          this.isAdmin = true;
        }else if(session.role === Role.EDUCATOR){
          this.isEducator = true;
        }
      }
    )
    .catch(_ => {
      this.router.navigateByUrl("/inicio");
    });

    this.controller.getUser().then(
      user => {
        this.user = user;
      }
    )
    .catch(_ => {
      this.router.navigateByUrl("/inicio");
    });
  }

  updatePassword(){
    let password: string, c_password: string;
    password = this.form.get('password').value;
    c_password = this.form.get('confirmPassword').value;
    if(password !== c_password){
      alert('Las contraseñas no coinciden');
    }else{
      this.controller.setPassword(password)
        .then(_ => {
          alert("Contraseña actualizada exitosamente");
        })
        .catch( err => { alert(this.translator.translate(err)); } );
    }
  }

}
