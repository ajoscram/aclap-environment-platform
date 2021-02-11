import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '@src/app/services/authentication/Session.model';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {

  loginForm: FormGroup;
  isAdmin: boolean;

  constructor(private controller: Controller, private builder: FormBuilder,private route: ActivatedRoute, private router: Router, private translator: ErrorTranslator) { }

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      email: ['',Validators.email]
    });
    this.isAdmin = true;
  }

  onSubmit() {
    let usrname:string = this.loginForm.get('email').value;

    this.controller.requestPasswordReset(usrname)
      .then(message => {
        alert(message);
      })
      .catch( err => { alert(this.translator.translate(err)); });
  }

}
