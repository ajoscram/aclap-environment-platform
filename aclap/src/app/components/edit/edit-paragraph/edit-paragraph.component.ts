import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParagraphSection } from '../../../models';
import { Controller } from '../../../services/control/Controller.service';

@Component({
  selector: 'app-edit-paragraph',
  templateUrl: './edit-paragraph.component.html',
  styleUrls: ['./edit-paragraph.component.scss']
})
export class EditParagraphComponent implements OnInit {

  form: FormGroup;
  paragraph: ParagraphSection;
  
  constructor(private controller: Controller, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      text: ['']
    });
  }

}
