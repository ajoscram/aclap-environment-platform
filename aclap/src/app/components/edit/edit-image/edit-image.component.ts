import { Component, Host, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageSection } from '../../../models';
import { Controller } from '../../../services/control/Controller.service';
import { ChildrenForm } from '../ChildrenForm';
import { EditDisplayerComponent } from '../edit-displayer/edit-displayer.component';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss']
})
export class EditImageComponent extends ChildrenForm {

  form: FormGroup;
  image: ImageSection;

  constructor(private controller: Controller, private builder: FormBuilder, @Host() _motherForm: EditDisplayerComponent) { 
    super(_motherForm);
    this.form = this.builder.group({
      footing: ['', Validators.required],
      url: ['', Validators.required],
      reference: ['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  initializeForm(): FormGroup{
    return this.form;
  }

  getFormName(): string {
    return "Image";
  }

}
