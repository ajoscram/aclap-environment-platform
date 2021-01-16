import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivitySection, Answer, Implementation, Question } from '@src/app/models';
import { GeoApiService } from '@src/app/services/apis/GeoApiService.service';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/ErrorTranslator.service';
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



  constructor(private controller: Controller, private route: ActivatedRoute, private translator: ErrorTranslator, private geoApi: GeoApiService) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.controller.draftImplementation(this.id)
      .then(impl => {this.implementation = <Implementation> impl})
      .catch( err => { console.log(this.translator.translate(err)); } );

    this.controller.getQuestions(this.id)
      .then(qstns => {this.questions = qstns; qstns.map(q =>  {this.answers.push(new Answer(null,q.id, q.question, null, null))} )})
      .catch( err => { console.log(this.translator.translate(err)); } );
    
    this.controller.getSections(this.id)
      .then(sections => {
        sections = sections.filter( section => { return section instanceof ActivitySection} );
        this.activities = <ActivitySection[]> sections;
      });

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


  getRange(topLimit: number){
    return Array(topLimit).fill(0).map((_, i)=> (i*3 + 3 ));
  }

  onSubmit(){

  }

  showPos(){
    console.log(this.center)
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
