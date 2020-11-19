import { Component, OnInit, Input } from '@angular/core';
import { Controller } from '../../../services/control/Controller.service';
import { DisciplineMetadata, Module } from '../../../models';
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

  constructor(private controller: Controller, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.moduleForm = this.builder.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      recommendedAge: ['', Validators.required],
      objectives: ['', Validators.required],
      requirements: this.builder.array([['', Validators.required]]),
      disciplines: this.builder.array([['', Validators.required]])
    });

    this.controller.getDisciplineMetadata()
      .then( meta => {
        this.disciplines = meta;
      })
      .catch( error => { console.error(error) });
  }

}
