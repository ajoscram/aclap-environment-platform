import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TitleSection, TitleSectionSize } from '../../../models';
import { Controller } from '../../../services/control/Controller.service';

@Component({
  selector: 'app-edit-title',
  templateUrl: './edit-title.component.html',
  styleUrls: ['./edit-title.component.scss']
})
export class EditTitleComponent implements OnInit {

  form: FormGroup;
  @Input() title: TitleSection;
  titleSize=[TitleSectionSize.H1,TitleSectionSize.H2];

  constructor(private controller: Controller, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      text: [''],
      size: ['H1']
    });
  }

}
