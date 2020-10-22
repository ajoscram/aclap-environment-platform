import { Component, OnInit, Input } from '@angular/core';
import { ParagraphComponent } from '@src/app/models';

@Component({
  selector: 'app-display-paragraph',
  templateUrl: './display-paragraph.component.html',
  styleUrls: ['./display-paragraph.component.scss']
})
export class DisplayParagraphComponent implements OnInit {

  @Input() paragraph: ParagraphComponent;
  paraphs: Array<string>;

  constructor() {  }

  ngOnInit(): void {
    this.paraphs = this.paragraph.text.split('\n');
  }

}
