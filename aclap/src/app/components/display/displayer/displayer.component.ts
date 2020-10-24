import { Component, OnInit, Input } from '@angular/core';
import { ActivityComponent, ImageComponent, ParagraphComponent, TitleComponent, YoutubeVideoComponent } from '../../../models';

@Component({
  selector: 'app-displayer',
  templateUrl: './displayer.component.html',
  styleUrls: ['./displayer.component.scss']
})
export class DisplayerComponent implements OnInit {

  @Input() comps: Array<Component>; 

  constructor() { }

  ngOnInit(): void {
  }

  isActivity(component: Component): boolean {
    return component instanceof ActivityComponent;
  }

  isImage(component: Component): boolean {
    return component instanceof ImageComponent;
  }

  isParagraph(component: Component): boolean {
    return component instanceof ParagraphComponent;
  }

  isTitle(component: Component): boolean {
    return component instanceof TitleComponent;
  }

  isYoutube(component: Component): boolean {
    return component instanceof YoutubeVideoComponent;
  }

}
