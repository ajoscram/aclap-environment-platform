import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitySection, Answer, File, Implementation, Location, Question } from '@src/app/models';
import { GeoApiService } from '@src/app/services/apis/GeoApiService.service';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/ErrorTranslator.service';
import { icon, latLng, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-implementation-edit',
  templateUrl: './implementation-edit.component.html',
  styleUrls: ['./implementation-edit.component.scss']
})
export class ImplementationEditComponent implements OnInit {

  implementation: Implementation;
  id: string;
  files: any[] = [];
  questions: Question[] = [];
  answers: Answer[] = [];
  activities: ActivitySection[] = [];
  center = latLng(9.3699204, -83.7057385);
  currentPosition: string = "";

  moduleFiles: File[] = [];
  deletedModuleFiles: File[] = [];

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

  constructor(private controller: Controller, private route: ActivatedRoute, private translator: ErrorTranslator, private geoApi: GeoApiService, private router: Router) { 
    /* ID OF THE IMPLEMENTATION */
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    /* AWAIT FOR THE IMPLEMENTATION */

    this.controller.getEvidence(this.id)
      .then( files => { this.moduleFiles = files;} )
      .catch( err => { console.log(this.translator.translate(err)); } );

    this.center = latLng(this.implementation.location.latitude, this.implementation.location.longitude);

    this.controller.getQuestions(this.implementation.implementableId)
      .then(qstns => {this.questions = qstns; qstns.map(q =>  {this.answers.push(new Answer(null,q.id, q.question, null, null))} )})
      .catch( err => { console.log(this.translator.translate(err)); } );
    
    this.controller.getSections(this.implementation.implementableId)
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

  async onSubmit(){
    this.implementation.location = new Location(this.currentPosition, this.center.lat, this.center.lng);

    await this.controller.addImplementation(this.implementation)
      .then(implementation => { this.implementation = implementation })
      .catch(err => { console.log(this.translator.translate(err));});

    this.answers.forEach( ans => {
      this.controller.setAnswer(ans, this.implementation.id, ans.id)
        .then(_ => {})
        .catch(err => { console.log(this.translator.translate(err));});
    });

    this.files.forEach(
      (file) => {
        this.controller.addEvidence(this.implementation.id, file)
        .then( _ => {})
        .catch(err => { console.log(this.translator.translate(err));});
      }
    );

    this.deletedModuleFiles.forEach(
      (file: File) => {
        this.controller.deleteEvidence(this.id, file.id)
        .then(_ => {})
        .catch(
          err => {
            console.log(this.translator.translate(err));
          }
        );
      }
    );
  }

  async onComplete(){
    await this.onSubmit();
    this.controller.completeImplementation(this.implementation.id)
      .then(implementation => {
        alert("Se completó la implementación correctamente, ya no es posible editar esta implementación");
        this.router.navigateByUrl(`/modulos/`);
      })
      .catch()
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
