import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../services/authentication/Session.model';
import { Controller } from '../../services/control/Controller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isAdmin: boolean;

  constructor(private controller: Controller, private builder: FormBuilder) { }

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
      .then( response => {console.log(JSON.stringify(response))} ) /* TODO: act after result from the controller */
      .catch( );
  }

}
