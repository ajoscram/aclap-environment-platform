import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer, Implementation, Question } from '@src/app/models';
import { GeoApiService } from '@src/app/services/apis/GeoApiService.service';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';
import { icon, latLng, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-implementation-display',
  templateUrl: './implementation-display.component.html',
  styleUrls: ['./implementation-display.component.scss']
})
export class ImplementationDisplayComponent implements OnInit {

  implementation: Implementation;
  id: string;
  files: any[] = [];
  questions: Question[] = [];
  answers: Answer[] = [];
  center = latLng(9.3699204, -83.7057385);
  currentPosition: string = "";
  options = {};
  layers = {};

  constructor(private controller: Controller, private route: ActivatedRoute, private translator: ErrorTranslator, private geoApi: GeoApiService, private router: Router) {
    /* ID OF THE IMPLEMENTATION */
    this.id = this.route.snapshot.paramMap.get('id');  
  }

  async ngOnInit() {
    /* AWAIT FOR THE IMPLEMENTATION */
    console.log("display imp:", this.id);

    await this.controller.getImplementation(this.id)
      .then(implementation => { 
        this.implementation = implementation; 
        this.currentPosition = implementation.location.name;

      })
      .catch( err => { alert(this.translator.translate(err)); this.router.navigateByUrl('/perfil') })

      this.controller.getEvidence(this.id)
      .then( files => { this.files = files;} )
      .catch( err => { alert(this.translator.translate(err)); } );

    this.center = latLng(this.implementation.location.latitude, this.implementation.location.longitude);
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 12,
      center: this.center
    };

    this.layers = [
      marker(this.center, {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/leaflet/marker-icon-2x.png',
          shadowUrl: 'assets/leaflet/marker-shadow.png'
        })
      })
    ];

    this.controller.getQuestions(this.implementation.implementableId)
      .then(qstns => {this.questions = qstns;})
      .catch( err => { alert(this.translator.translate(err)); } );
    
    this.controller.getAnswers(this.id)
      .then(answers => {this.answers = answers})
      .catch( err => { alert(this.translator.translate(err)); } );

    this.geoApi.getReverseGeocoding(this.center.lat , this.center.lng ).subscribe(
      (response) => {
        const localityInfo = response["localityInfo"];
        this.currentPosition = `${localityInfo.administrative[3].name}, ${localityInfo.administrative[2].name}, ${localityInfo.administrative[1].name}`; 
      }
    );
  }

  statusFormat(completed: boolean){
    return completed ? "Completado" : "En proceso" 
  }

  deleteImplementation(){
    this.controller.deleteImplementation(this.id)
      .then(_ => {alert("Implementación borrada exitosamente"); this.router.navigateByUrl('/perfil')})
      .catch( err => { alert(this.translator.translate(err)); } );
  }  

}
