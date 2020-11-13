import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { YoutubeVideoSection } from '../../../models';
import { Controller } from '../../../services/control/Controller.service';

@Component({
  selector: 'app-edit-youtube',
  templateUrl: './edit-youtube.component.html',
  styleUrls: ['./edit-youtube.component.scss']
})
export class EditYoutubeComponent implements OnInit {

  private regex: String;
  form: FormGroup;
  video: YoutubeVideoSection;

  constructor(private controller: Controller, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      url: ['']
    });
  }

}
