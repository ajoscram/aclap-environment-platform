import { Component, OnInit, Input } from '@angular/core';
import { ImageSection } from '../../../models';

@Component({
  selector: 'app-display-image',
  templateUrl: './display-image.component.html',
  styleUrls: ['./display-image.component.scss']
})
export class DisplayImageComponent implements OnInit {

  @Input() image: ImageSection;
 
  constructor() { }

  ngOnInit(): void {
  }

}
