import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  form: FormGroup;

  constructor(private controller: Controller, private builder: FormBuilder, private translator: ErrorTranslator) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      password: [''],
      confirmPassword: ['']
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
        .then()
        .catch( err => { alert(this.translator.translate(err)); } );
    }
  }

}
