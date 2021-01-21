import { Component, OnInit, Input } from '@angular/core';
import { TitleSection, TitleSectionSize } from '../../../../models';

@Component({
  selector: 'app-display-title',
  templateUrl: './display-title.component.html',
  styleUrls: ['./display-title.component.scss']
})
export class DisplayTitleComponent implements OnInit {

  @Input() title: TitleSection;
  h1 = TitleSectionSize.H1;
  h2 = TitleSectionSize.H2;

  constructor() { }

  ngOnInit(): void {
    
  }

}
