import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TitleSection } from '@src/app/models';
import { Controller } from '../../../services/control/Controller.service';

@Component({
  selector: 'app-edit-title',
  templateUrl: './edit-title.component.html',
  styleUrls: ['./edit-title.component.scss']
})
export class EditTitleComponent implements OnInit {

  form: FormGroup;
  title: TitleSection;

  constructor(private controller: Controller, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      text: [''],
      size: ['H1']
    });
  }

}
