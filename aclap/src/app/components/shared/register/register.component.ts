import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EducatorRequest, EducatorRequestState, Location, ParagraphSection, Section, TitleSection, TitleSectionSize } from '@src/app/models';
import { Controller } from '@src/app/services/control/Controller.service';
import { Validator } from '@src/app/services/database/validation/Validator.service';
import { ErrorTranslator } from '@src/app/services/ui/ErrorTranslator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  texts: Section[];
  form: FormGroup;
  request: EducatorRequest;



  constructor(private controller: Controller,private builder: FormBuilder, private translator: ErrorTranslator, private router: Router) { }

  ngOnInit(): void {
    this.request = new EducatorRequest("","","","","",new Location("",0,0),null,"",null,EducatorRequestState.PENDING);

    let titles:TitleSection[] = [new TitleSection("_-", 0, TitleSectionSize.H1, "¿Qué es una persona educadora?"), new TitleSection("__", 2, TitleSectionSize.H1, "Beneficios de una persona educadora")];
    const parags: ParagraphSection[] = [new ParagraphSection("__",1,""), new ParagraphSection("__",3,"- Poder subir evidencias de un módulo o evento\n- Ser un agente de cambio.")];

    this.texts = new Array();
    titles.forEach(element => {
      this.texts.push(element)  
    });
    parags.forEach(element => {
      this.texts.push(element)
    });

    this.texts = this.texts.sort(
      (obj1, obj2) => {
        if (obj1.index > obj2.index) {
          return 1;
        }
        if (obj1.index < obj2.index){
          return -1;
        } 
        return 0;
      }
    );

    this.form = this.builder.group({
      name: ['', Validators.requiredTrue],
      lastname: ['', Validators.requiredTrue],
      email: ['', Validators.requiredTrue],
      phone: ['', Validators.requiredTrue],
      birthdate: ['', Validators.requiredTrue],
      locationName: ['', Validators.requiredTrue],
      location: this.builder.array([
        ['', Validators.requiredTrue],
        ['', Validators.requiredTrue]
      ]),
      organization: ['', Validators.requiredTrue],      
    });
  }

  onSubmit(): void{
    const birthday = new Date(this.form.get("birthdate").value);

    this.request.birthday = birthday;

    this.controller.addEducatorRequest(this.request).then(
      res => {
        alert("Solicitud Enviada satisfactoriamente");
        this.router.navigateByUrl("inicio");
      }
    ).catch(
      error => {
        alert(this.translator.translate(error));
      }
    )

  }

}
