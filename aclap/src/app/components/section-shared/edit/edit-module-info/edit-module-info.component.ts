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

  colors: Array<string> = ["#23aee5", "#528f41", "#ef6423", "#fab621"];
  selected: string = this.colors[0];
  
  disciplines: DisciplineMetadata;
  moduleForm: FormGroup;
  disciplineForm: FormGroup;
  discipline: Discipline;
  ageRange: any[];

  constructor(private controller: Controller, private builder: FormBuilder, private router: Router) { }

  async ngOnInit(): Promise<void> {
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

    try{
      this.disciplines = await this.controller.getDisciplineMetadata();
    }catch(error)  {
      console.log(error);
    }
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
