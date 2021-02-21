import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EducatorRequest, EducatorRequestState, Location, ParagraphSection, Section, TitleSection, TitleSectionSize } from '@src/app/models';
import { GeoApiService } from '@src/app/services/apis/GeoApiService.service';
import { Controller } from '@src/app/services/control/Controller.service';
import { Validator } from '@src/app/services/database/validation/Validator.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  texts: Section[];
  form: FormGroup;
  gotLocation: boolean;
  request: EducatorRequest;

  bg_img = "https://i.imgur.com/06NXUmI.jpeg";
  credit = "Giancarlo Pucci / PNUD-Costa Rica";

  description = "Las personas que realizan actividades de educación ambiental en el Área de Conservación La Amistad Pacífico pueden registrarse en esta plataforma para compartir sus logros al utilizar nuestras herramientas de educación ambiental y contribuir en el mejoramiento continuo de nuestro programa.";


  constructor(private controller: Controller,private builder: FormBuilder, private translator: ErrorTranslator, private router: Router, private geoApi: GeoApiService) { }

  ngOnInit(): void {
    this.request = new EducatorRequest("","","","","",new Location("",9.693637,-84.051564),new Date(),"", new Date(Date.now()),EducatorRequestState.PENDING);

    const parags: ParagraphSection[] = [new ParagraphSection("__",1,"Las personas que realizan actividades de educación ambiental en el Área de Conservación La Amistad Pacífico pueden registrarse en esta plataforma para compartir sus logros al utilizar nuestras herramientas de educación ambiental y contribuir en el mejoramiento continuo de nuestro programa.")];

    this.texts = new Array();
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

    this.gotLocation = false;
  }

  onSubmit(): void{
    const birthday = new Date(this.form.get("birthdate").value);

    this.request.birthday = birthday;

    console.log(this.request);

    this.controller.addEducatorRequest(this.request).then(
      _ => {
        alert("Solicitud Enviada satisfactoriamente.\nUna vez la solicitud sea aprobada por los administradores, se le enviará un correo con la clave de acceso.\nNOTA: puede que el correo sea reconocido como spam");
        this.router.navigateByUrl("inicio");
      }
    )
    .catch( err => { alert(this.translator.translate(err)); });

  }

  getLocation(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.request.address.latitude = position.coords.latitude;
        this.request.address.longitude = position.coords.longitude;
        this.gotLocation = true;

        this.geoApi.getReverseGeocoding(position.coords.latitude, position.coords.longitude).subscribe(
          (response) => {
            const localityInfo = response["localityInfo"];
            this.request.address.name = `${localityInfo.administrative[3].name}, ${localityInfo.administrative[2].name}, ${localityInfo.administrative[1].name}`; 
          }
        );
      },(error)=>{
        alert(error.message);
      },{
        timeout:10000
    });
  }

}
