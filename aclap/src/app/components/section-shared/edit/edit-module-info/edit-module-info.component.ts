import { Component, OnInit, Input } from '@angular/core';
import { Controller } from '../../../../services/control/Controller.service';
import { Discipline, DisciplineMetadata, ImageSection, Module, Subject } from '../../../../models';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-module-info',
  templateUrl: './edit-module-info.component.html',
  styleUrls: ['./edit-module-info.component.scss']
})
export class EditModuleInfoComponent implements OnInit {

  @Input() module: Module;
  @Input() imageProxy: Map<String, File>;

  @Input() moduleImage: ImageSection;
  @Input() bannerImage: ImageSection;

  colors: Array<string> = ["rgb(35,175,229)","rgb(82,143,65)","rgb(239,100,35)","rgb(250,182,33)"];
  selected: string = this.colors[0];
  
  disciplines: DisciplineMetadata;
  moduleForm: FormGroup;
  disciplineForm: FormGroup;
  discipline: Discipline;
  ageRange: any[];

  constructor(private controller: Controller, private builder: FormBuilder, private router: Router) { }

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
    this.ageRange = ["6 a 9 años", "10 a 12 años", "13 a 15 años", "16 a 18 años", "18 años en adelante"];
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
    this.controller.deleteImplementable(this.module.id).then(
      _ => {
        this.router.navigateByUrl("/modulos");
      }
    );
  }

  setColor(i: number){
    this.selected = this.colors[i];
    this.module.color = this.selected;
  }

}