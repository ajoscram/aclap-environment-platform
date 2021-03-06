import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';
import { Role } from '../../../services/authentication/Session.model';
import { Controller } from '../../../services/control/Controller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isAdmin: boolean;

  constructor(private controller: Controller, private builder: FormBuilder,private route: ActivatedRoute, private router: Router, private translator: ErrorTranslator) { }

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      username: ['',Validators.email],
      password: ['',Validators.required]
    });
    this.isAdmin = true;

    this.controller.getSession().then(
      session => {
        this.router.navigateByUrl("/inicio");
      }
    )
    .catch(err => {});
  }

  onSubmit() {
    let usrname:string = this.loginForm.get('username').value;
    let password:string = this.loginForm.get('password').value;
    this.controller.login(usrname, password)
      .then(non => {
        window.location.replace("");
        window.location.reload();
       })
       .catch( err => { alert(this.translator.translate(err)); });
  }

}
