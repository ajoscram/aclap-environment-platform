import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Discipline, Module } from '../../../../models';

@Component({
  selector: 'app-edit-disciplines',
  templateUrl: './edit-disciplines.component.html',
  styleUrls: ['./edit-disciplines.component.scss']
})
export class EditDisciplinesComponent implements OnInit {

  @Input() discipline: Discipline;
  form: FormGroup;
  isEditing = false;

  constructor( private builder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      subject: ['', Validators.required],
      year: ['', Validators.required],
      theme: ['',Validators.required]
    });
  }
}
