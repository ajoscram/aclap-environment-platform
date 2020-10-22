import { Component, OnInit, Input } from '@angular/core';
import { ImageComponent } from '@src/app/models';

@Component({
  selector: 'app-display-image',
  templateUrl: './display-image.component.html',
  styleUrls: ['./display-image.component.scss']
})
export class DisplayImageComponent implements OnInit {

  @Input() image: ImageComponent;
 
  constructor() { }

  ngOnInit(): void {
  }

}
