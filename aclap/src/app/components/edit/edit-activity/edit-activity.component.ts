import { Component, Host, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivitySection } from '../../../models';
import { Controller } from '../../../services/control/Controller.service';
import { BaseForm } from '../BaseForm';
import { ChildrenForm } from '../ChildrenForm';
import { EditDisplayerComponent } from '../edit-displayer/edit-displayer.component';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.scss']
})
export class EditActivityComponent extends ChildrenForm{

  form: FormGroup; 
  activity: ActivitySection;

  constructor(private controller: Controller, private builder: FormBuilder, @Host() _motherForm: EditDisplayerComponent) {
    super(_motherForm);
  }
  
  ngOnInit(): void {
  }

  initializeForm(): FormGroup{
    this.form = new FormGroup({
      description: new FormControl('', Validators.requiredTrue),
      estimatedMinutes: new FormControl('', Validators.requiredTrue),
      tools: new FormControl('', Validators.requiredTrue),
      questions: new FormControl('', Validators.requiredTrue)
    });
    return this.form;
  }


  getFormName(): string {
    return "EditActivity";
  }

}
