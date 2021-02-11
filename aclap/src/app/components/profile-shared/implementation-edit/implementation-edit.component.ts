import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitySection, Answer, File, Implementation, Location, Question } from '../../../models';
import { GeoApiService } from '@src/app/services/apis/GeoApiService.service';
import { Controller } from '@src/app/services/control/Controller.service';
import { ErrorTranslator } from '@src/app/services/ui/error_translator/ErrorTranslator.service';
import { icon, latLng, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-implementation-edit',
  templateUrl: './implementation-edit.component.html',
  styleUrls: ['./implementation-edit.component.scss']
})
export class ImplementationEditComponent implements OnInit {

  implementation: Implementation;
  form: FormGroup;
  id: string;
  files: any[] = [];
  questions: Question[] = [];
  answers: Answer[] = [];
  activities: ActivitySection[] = [];
  center = latLng(9.3699204, -83.7057385);
  currentPosition: string = "";
  options = {};
  layers = {};

  moduleFiles: File[] = [];
  deletedModuleFiles: File[] = [];

  constructor(private controller: Controller, private route: ActivatedRoute, private translator: ErrorTranslator, private geoApi: GeoApiService, private router: Router, private builder: FormBuilder) { 
    /* ID OF THE IMPLEMENTATION */
    this.id = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {

    /* AWAIT FOR THE IMPLEMENTATION */

    await this.controller.getImplementation(this.id)
      .then(implementation => { 
        this.implementation = implementation; 
        this.currentPosition = implementation.location.name;
      })
      .catch(_ => { this.router.navigateByUrl('/perfil'); })


    this.form = this.builder.group({
      date: [this.implementation.date],
      maleParticipants : [''],
      femaleParticipants: [''],
      otherParticipants: ['']
    });

    this.controller.getEvidence(this.id)
      .then( files => { this.moduleFiles = files;} )
      .catch( err => { alert(this.translator.translate(err)); });

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
      .catch( err => { alert(this.translator.translate(err)); });
    
    this.controller.getAnswers(this.id)
      .then(answers => {this.answers = answers;})
      .catch( err => { alert(this.translator.translate(err)); });
    
    this.controller.getSections(this.implementation.implementableId)
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
  }

  statusFormat(completed: boolean){
    return completed ? "Completado" : "En proceso" 
  }


  getRange(topLimit: number){
    return Array(topLimit).fill(0).map((_, i)=> (i*3 + 3 ));
  }

  async onSubmit(){
    this.implementation.location = new Location(this.currentPosition, this.center.lat, this.center.lng);

    await this.controller.updateImplementation(this.implementation.id, this.implementation)
      .then(implementation => { this.implementation = implementation })
      .catch( err => { alert(this.translator.translate(err)); });

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

    this.deletedModuleFiles.forEach(
      (file: File) => {
        this.controller.deleteEvidence(this.id, file.id)
        .then(_ => {})
        .catch( err => { alert(this.translator.translate(err)); });
      }
    );
  }

  async onSave(){
    this.onSubmit();
    alert('Cambios guardados correctamente');
    this.router.navigateByUrl(`/perfil`);
  }

  async onComplete(){
    this.controller.completeImplementation(this.implementation.id)
      .then(implementation => {
        alert("Se finalizó la implementación correctamente, ya no es posible editar esta implementación");
        this.router.navigateByUrl(`/perfil`);
      })
      .catch( err => { alert(this.translator.translate(err)); });
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

  deleteImplementation(){
    this.controller.deleteImplementation(this.id)
      .then(_ => {alert("Implementación borrada exitosamente"); this.router.navigateByUrl('/perfil')})
      .catch( err => { alert(this.translator.translate(err)); });
  }

}
