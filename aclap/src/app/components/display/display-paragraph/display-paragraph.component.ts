import { Component, OnInit, Input } from '@angular/core';
import { ParagraphComponent } from '../../../models/';

@Component({
  selector: 'app-display-paragraph',
  templateUrl: './display-paragraph.component.html',
  styleUrls: ['./display-paragraph.component.scss']
})
export class DisplayParagraphComponent implements OnInit {

  @Input() paragraph: ParagraphComponent;

  constructor() {  }

  ngOnInit(): void {
  }

}
