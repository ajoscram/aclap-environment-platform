import { Component, OnInit, Input } from '@angular/core';
import { Controller } from '../../../services/control/Controller.service';
import { Discipline, DisciplineMetadata, Module, Subject } from '../../../models';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-module-info',
  templateUrl: './edit-module-info.component.html',
  styleUrls: ['./edit-module-info.component.scss']
})
export class EditModuleInfoComponent implements OnInit {

  @Input() module: Module;
  
  disciplines: DisciplineMetadata;
  moduleForm: FormGroup;
  disciplineForm: FormGroup;
  discipline: Discipline;
  ageRange: any[];

  constructor(private controller: Controller, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.moduleForm = this.builder.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      imageUrl: ['', Validators.required],
      bannerImageUrl: ['', Validators.required],
      recommendedAge: ['', Validators.required],
      objective: ['', Validators.required],
      antecedents: ['', Validators.required],
      disciplines: this.builder.array([['', Validators.required]])
    });
    this.disciplineForm = this.builder.group({
      subject: ['',Validators.required],
      year: ['',Validators.required],
      theme: ['',Validators.required]
    });
    this.ageRange = Array(15).fill(0).map((_,i) =>(i+6));
    this.refreshDiscipline();

    this.controller.getDisciplineMetadata()
      .then( meta => {
        this.disciplines = meta;
        console.log(meta);
      })
      .catch( error => { console.error(error) });
  }

  addDiscipline(){
    this.module.disciplines.push(this.discipline);
    this.refreshDiscipline();
  }

  refreshDiscipline(): void{
    this.discipline = new Discipline(new Subject('',''),'','');
  }

  deleteModule():void {
    //Delete this
  }

}
