import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitySection, Answer, Implementation, Location, Question, Score } from '@src/app/models';
import { GeoApiService } from '@src/app/services/apis/GeoApiService.service';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';
import { icon, latLng, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-implementation-page',
  templateUrl: './implementation-page.component.html',
  styleUrls: ['./implementation-page.component.scss']
})
export class ImplementationPageComponent implements OnInit {

  implementation: Implementation;
  id: string;
  files: any[] = [];
  questions: Question[] = [];
  answers: Answer[] = [];
  activities: ActivitySection[] = [];
  center = latLng(9.3699204, -83.7057385);
  currentPosition: string = "";
  form: FormGroup;

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 12,
    center: this.center
  };

  layers = [
    marker(this.center, {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'assets/leaflet/marker-icon-2x.png',
        shadowUrl: 'assets/leaflet/marker-shadow.png'
      })
    })
  ];



  constructor(private controller: Controller, private route: ActivatedRoute, private translator: ErrorTranslator, private geoApi: GeoApiService, private router: Router, private builder: FormBuilder) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    await this.controller.draftImplementation(this.id)
      .then(impl => {this.implementation = <Implementation> impl; console.log(this.implementation)})
      .catch( err => { alert(this.translator.translate(err)); });

    this.controller.getQuestions(this.id)
      .then(qstns => {this.questions = qstns; console.log(this.questions); qstns.map(q =>  {this.answers.push(new Answer("",q.id, q.question, "", Score.UNKNOWN))} )})
      .catch( err => { alert(this.translator.translate(err)); });
    
    this.controller.getSections(this.id)
      .then(sections => {
        sections = sections.filter( section => { return section instanceof ActivitySection} );
        this.activities = <ActivitySection[]> sections;
      })
      .catch( err => { alert(this.translator.translate(err)); });

    this.geoApi.getReverseGeocoding(this.center.lat , this.center.lng ).subscribe(
        (response) => {
          const localityInfo = response["localityInfo"];
          this.currentPosition = `${localityInfo.administrative[3].name}, ${localityInfo.administrative[2].name}, ${localityInfo.administrative[1].name}`; 
        }
      );
    
    this.form = this.builder.group({
        date: [this.implementation.date],
        maleParticipants : [''],
        femaleParticipants: [''],
        otherParticipants: ['']
      });
    
      
  }

  statusFormat(completed: boolean){
    return completed ? "Completado" : "En proceso" 
  }


  getRange(topLimit: number){
    return Array(topLimit).fill(0).map((_, i)=> (i*3 + 3 ));
  }

  async onSave(){
    this.onSubmit();
    alert('Cambios guardados correctamente');
    this.router.navigateByUrl(`/modulos`);
  }

  async onSubmit(){
    this.implementation.location = new Location(this.currentPosition, this.center.lat, this.center.lng);

    await this.controller.addImplementation(this.implementation)
      .then(implementation => { this.implementation = implementation;})
      .catch( err => { alert(this.translator.translate(err)); });

    console.log(this.answers);

    this.answers.forEach( ans => {
      this.controller.setAnswer(ans, this.implementation.id, ans.id)
        .then(_ => {})
        .catch( err => { alert(this.translator.translate(err)); });
    });

    this.files.forEach(
      (file) => {
        this.controller.addEvidence(this.implementation.id, file)
        .then( _ => {})
        .catch( err => { alert(this.translator.translate(err)); });
      }
    );
  }

  async onComplete(){
    await this.onSubmit();
    this.controller.completeImplementation(this.implementation.id)
      .then(implementation => {
        alert("Se finalizó la implementación correctamente, ya no es posible editar esta implementación");
        this.router.navigateByUrl(`/modulos`);
      })
      .catch( err => { alert(this.translator.translate(err)); });
  }

  showPos(){
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

    this.geoApi.getReverseGeocoding(this.center.lat , this.center.lng ).subscribe(
      (response) => {
        const localityInfo = response["localityInfo"];
        this.currentPosition = `${localityInfo.administrative[3].name}, ${localityInfo.administrative[2].name}, ${localityInfo.administrative[1].name}`; 
      }
    );
  }

}
