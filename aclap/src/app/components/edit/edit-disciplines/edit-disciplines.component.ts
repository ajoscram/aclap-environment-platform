import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Module } from '../../../models';

@Component({
  selector: 'app-edit-disciplines',
  templateUrl: './edit-disciplines.component.html',
  styleUrls: ['./edit-disciplines.component.scss']
})
export class EditDisciplinesComponent implements OnInit {

  @Input() module: Module;
  form: FormGroup;

  constructor( private builder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      disciplines: this.builder.array([ this.createSubject()])
    })
  }

  createSubject(): FormGroup{
    return this.builder.group({
      subject: [''],
      year: [''],
      theme: ['']
    });

  }

}
