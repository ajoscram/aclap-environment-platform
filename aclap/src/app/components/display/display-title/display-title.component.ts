import { Component, OnInit, Input } from '@angular/core';
import { TitleComponent } from '@src/app/models/components/TitleComponent.model';
import { TitleComponentSize } from '@src/app/models/components/TitleComponent.model';

@Component({
  selector: 'app-display-title',
  templateUrl: './display-title.component.html',
  styleUrls: ['./display-title.component.scss']
})
export class DisplayTitleComponent implements OnInit {

  @Input() title: TitleComponent;
  h1 = TitleComponentSize.H1;
  h2 = TitleComponentSize.H2;

  constructor() { }

  ngOnInit(): void {
    
  }

}
