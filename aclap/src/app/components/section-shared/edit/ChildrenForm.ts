import { Component, Host, Input, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { BaseForm } from './BaseForm';

@Component({
  template: ''
})

export abstract class ChildrenForm implements OnInit, OnDestroy {

  @Input() initialValue: any
  form: FormGroup

  constructor(@Host() private _motherForm: BaseForm){
    this.form = this.initializeForm();
  }

  
  initializeForm() : FormGroup{
    return new FormGroup({});
  }

  getFormName(): string {
    return 'emptyForm'
  }

  ngOnInit(){
    if (this.initialValue){
      this.form.setValue(this.initialValue)
    }
    this._motherForm.addControlGroup(this.getFormName(), this, this.form);
  }
  
  ngOnDestroy(){
    this._motherForm.removeControl(this.getFormName());
  }
}