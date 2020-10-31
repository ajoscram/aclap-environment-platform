import { Component, OnInit, Input } from '@angular/core';
import { Controller } from '../../../services/control/Controller.service';
import { DisciplineMetadata, Module } from '../../../models';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit-module-info',
  templateUrl: './edit-module-info.component.html',
  styleUrls: ['./edit-module-info.component.scss']
})
export class EditModuleInfoComponent implements OnInit {

  @Input() module: Module;
  
  disciplines: DisciplineMetadata;

  moduleForm = new FormGroup({
    name: new FormControl(''),
    imageUrl: new FormControl('url://'),
    publisherId: new FormControl(''),
    publisherName: new FormControl(''),
    publisherLastname: new FormControl(''),
    recommendedAge: new FormControl(''),
    objectives: new FormArray([new FormControl('')]),
    requirements: new FormArray([new FormControl('')]),
    disciplines: new FormArray([new FormControl('')])
  });

  constructor(private controller: Controller) { }

  ngOnInit(): void {
    this.controller.getDisciplineMetadata()
      .then( meta => {
        this.disciplines = meta;
        this.disciplines.subjects.map( sub =>console.log(JSON.stringify(sub)) );
        this.disciplines.years.map( year => console.log(year));
      })
      .catch( error => { console.error(error) });
    
      this.moduleForm.setValue({
        name: this.module.name,
        imageUrl: this.module.imageUrl,
        recommendedAge: this.module.recommendedAge.toString()
      });
  }

}
