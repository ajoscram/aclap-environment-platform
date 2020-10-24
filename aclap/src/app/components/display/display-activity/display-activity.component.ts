import { Component, OnInit, Input} from '@angular/core';
import { ActivityComponent } from '../../../models';

@Component({
  selector: 'app-display-activity',
  templateUrl: './display-activity.component.html',
  styleUrls: ['./display-activity.component.scss']
})
export class DisplayActivityComponent implements OnInit {

  @Input() activity: ActivityComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
