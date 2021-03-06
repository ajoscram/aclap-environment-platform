import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParagraphSection } from '../../../../models';
import { Controller } from '../../../../services/control/Controller.service';

@Component({
  selector: 'app-edit-paragraph',
  templateUrl: './edit-paragraph.component.html',
  styleUrls: ['./edit-paragraph.component.scss']
})
export class EditParagraphComponent implements OnInit {

  form: FormGroup;
  @Input() paragraph: ParagraphSection;
  
  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      text: [this.paragraph.text]
    });
  }

}
