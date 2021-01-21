import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { ChildrenForm } from './ChildrenForm';

@Component({
  template: ''
})
export abstract class BaseForm {

  form: FormGroup;
  cont: number;
  children: ChildrenForm[];

  constructor(){
    this.form = this.initializeForm();
    this.cont = 1;
    this.children = new Array();
  }



  initializeForm(): FormGroup {
    return new FormGroup({})
  }

  addControlGroup(name: string, child: ChildrenForm, formGroup: FormGroup): void {
    this.form.addControl(name + (this.cont++) , formGroup );
    this.children.push(child);
  }

  removeControl(name: string){
    this.form.removeControl(name);
  }

}