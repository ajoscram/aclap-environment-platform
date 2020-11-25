import { Component, Host, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageSection } from '../../../models';
import { Controller } from '../../../services/control/Controller.service';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss']
})
export class EditImageComponent  implements OnInit {

  form: FormGroup;
  @Input() image: ImageSection;
  isOnline = true;


  constructor(private controller: Controller, private builder: FormBuilder) { 

  }

  ngOnInit(): void {
    this.form = this.builder.group({
      footing: ['', Validators.required],
      url: ['', Validators.required],
      reference: ['',Validators.required],
      online: ['',Validators.required]
    });
  }

  initializeForm(): FormGroup{
    return this.form;
  }

  getFormName(): string {
    return "Image";
  }

}
